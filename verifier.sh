#!/bin/bash
#
# packager.sh  Copyright (c) 2015, GEM Foundation.
#
# OpenQuake is free software: you can redistribute it and/or modify it
# under the terms of the GNU Affero General Public License as published
# by the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# OpenQuake is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with OpenQuake.  If not, see <http://www.gnu.org/licenses/>.

#
# DESCRIPTION
#
# packager.sh automates procedures to:
#  - test sources
#  - build Ubuntu package (official or development version)
#  - test Ubuntu package
#
# tests are performed inside linux containers (lxc) to achieve
# a good compromise between speed and isolation
#
# all lxc instances are ephemeral
#
# ephemeral containers are "clones" of a base container and have a
# temporary file system that reflects the contents of the base container
# but any modifications are stored in another overlayed
# file system (in-memory or disk)
#


# MAYBE GOOD FOR PRODUCTION TEST PART
# sudo apt-get install git
# git clone --depth 1 -b ci-test1 https://github.com/gem/oq-platform.git
# sudo sed -i  's/127.0.1.1   \+\([^ ]\+\)/127.0.1.1   \1 \1.gem.lan/g'  /etc/hosts
# # get name from hosts
# hname=...
# sed -i 's/127.0.1.1   \+\([^ ]\+\)/127.0.1.1   \1 \1.gem.lan/g'  /etc/hosts
# echo -e "y\ny\ny\n" | ./oq-platform/openquakeplatform/bin/deploy.sh -H $hname


# curl -c first.jar -L -X GET -o first.htm 'http://ubuntu-lxc-eph-temp-pl3o3hb.gem.lan/explore/'
# curl -L -c second.jar -d username=admin -d password=admin -o second.htm -X POST 'http://ubuntu-lxc-eph-temp-pl3o3hb.gem.lan/account/login/?next=/explore/'



# export PS4='+${BASH_SOURCE}:${LINENO}:${FUNCNAME[0]}: '
if [ $GEM_SET_DEBUG ]; then
    set -x
fi
set -e
GEM_GIT_REPO="git://github.com/gem"
GEM_GIT_PACKAGE="oq-platform"
GEM_DEB_PACKAGE="python-${GEM_GIT_PACKAGE}"
GEM_DEB_SERIE="master"
if [ -z "$GEM_DEB_REPO" ]; then
    GEM_DEB_REPO="$HOME/gem_ubuntu_repo"
fi
if [ -z "$GEM_DEB_MONOTONE" ]; then
    GEM_DEB_MONOTONE="$HOME/monotone"
fi

GEM_BUILD_ROOT="build-deb"
GEM_BUILD_SRC="${GEM_BUILD_ROOT}/${GEM_DEB_PACKAGE}"

GEM_MAXLOOP=20

GEM_ALWAYS_YES=false

if [ "$GEM_EPHEM_CMD" = "" ]; then
    GEM_EPHEM_CMD="lxc-start-ephemeral"
fi
if [ "$GEM_EPHEM_NAME" = "" ]; then
    GEM_EPHEM_NAME="ubuntu-x11-lxc-eph"
fi

if command -v lxc-shutdown &> /dev/null; then
    # Older lxc (< 1.0.0) with lxc-shutdown
    LXC_TERM="lxc-shutdown -t 10 -w"
    LXC_KILL="lxc-stop"
else
    # Newer lxc (>= 1.0.0) with lxc-stop only
    LXC_TERM="lxc-stop -t 10"
    LXC_KILL="lxc-stop -k"
fi

NL="
"
TB="	"

#
#  functions

#
#  sig_hand - manages cleanup if the build is aborted
#
sig_hand () {
    trap ERR
    echo "signal trapped"
    if [ "$lxc_name" != "" ]; then
        set +e
        ssh -t  $lxc_ip "cd ~/$GEM_GIT_PACKAGE; . platform-env/bin/activate ; cd openquakeplatform ; sleep 5 ; fab stop"
        scp "${lxc_ip}:ssh.log" ssh.history || true
        scp "${lxc_ip}:.pip/pip.log" pip.history || true
        scp "${lxc_ip}:$GEM_GIT_PACKAGE/openquakeplatform/bootstrap.log" bootstrap.history || true
        echo "Destroying [$lxc_name] lxc"
        upper="$(mount | grep "${lxc_name}.*upperdir" | sed 's@.*upperdir=@@g;s@,.*@@g')"
        if [ -f "${upper}.dsk" ]; then
            loop_dev="$(sudo losetup -a | grep "(${upper}.dsk)$" | cut -d ':' -f1)"
        fi
        sudo $LXC_KILL -n $lxc_name
        sudo umount /var/lib/lxc/$lxc_name/rootfs
        sudo umount /var/lib/lxc/$lxc_name/ephemeralbind
        echo "$upper" | grep -q '^/tmp/'
        if [ $? -eq 0 ]; then
            sudo umount "$upper"
            sudo rm -r "$upper"
            if [ "$loop_dev" != "" ]; then
                sudo losetup -d "$loop_dev"
                if [ -f "${upper}.dsk" ]; then
                    sudo rm -f "${upper}.dsk"
                fi
            fi
        fi
        sudo lxc-destroy -n $lxc_name
    fi
    if [ -f /tmp/packager.eph.$$.log ]; then
        rm /tmp/packager.eph.$$.log
    fi
}


#
#  dep2var <dep> - converts in a proper way the name of a dependency to a variable name
#      <dep>    the name of the dependency
#
dep2var () {
    echo "$1" | sed 's/[-.]/_/g;s/\(.*\)/\U\1/g'
}

#
#  repo_id_get - retry git repo from local git remote command
repo_id_get () {
    local repo_name repo_line

    if ! repo_name="$(git rev-parse --abbrev-ref --symbolic-full-name @{u} 2>/dev/null)"; then
        repo_line="$(git remote -vv | grep "^origin[ ${TB}]" | grep '(fetch)$')"
        if [ -z "$repo_line" ]; then
            echo "no remote repository associated with the current branch, exit 1"
            exit 1
        fi
    else
        repo_name="$(echo "$repo_name" | sed 's@/.*@@g')"

        repo_line="$(git remote -vv | grep "^${repo_name}[ ${TB}].*(fetch)\$")"
    fi

    if echo "$repo_line" | grep -q '[0-9a-z_-\.]\+@[a-z0-9_-\.]\+:'; then
        repo_id="$(echo "$repo_line" | sed "s/^[^ ${TB}]\+[ ${TB}]\+[^ ${TB}@]\+@//g;s/.git[ ${TB}]\+(fetch)$/.git/g;s@/${GEM_GIT_PACKAGE}.git@@g;s@:@/@g")"
    else
        repo_id="$(echo "$repo_line" | sed "s/^[^ ${TB}]\+[ ${TB}]\+git:\/\///g;s/.git[ ${TB}]\+(fetch)$/.git/g;s@/${GEM_GIT_PACKAGE}.git@@g")"
    fi

    echo "$repo_id"
}

#
#  mksafedir <dname> - try to create a directory and rise an alert if it already exists
#      <dname>    name of the directory to create
#
mksafedir () {
    local dname

    dname="$1"
    if [ "$GEM_ALWAYS_YES" != "true" -a -d "$dname" ]; then
        echo "$dname already exists"
        echo "press Enter to continue or CTRL+C to abort"
        read a
    fi
    rm -rf $dname
    mkdir -p $dname
}

#
#  usage <exitcode> - show usage of the script
#      <exitcode>    value of exitcode
#
usage () {
    local ret

    ret=$1

    echo
    echo "USAGE:"
    echo "    $0 devtest <branch-name>"
    echo "                                                 put oq-platform sources in a lxc,"
    echo "                                                 setup environment and run development tests."
    echo
    exit $ret
}

#
#  _wait_ssh <lxc_ip> - wait until the new lxc ssh daemon is ready
#      <lxc_ip>    the IP address of lxc instance
#
_wait_ssh () {
    local lxc_ip="$1"

    for i in $(seq 1 20); do
        if ssh $lxc_ip "echo begin"; then
            break
        fi
        sleep 2
    done
    if [ $i -eq 20 ]; then
        return 1
    fi
}

#
#  _devtest_innervm_run <branch_id> <lxc_ip> - part of source test performed on lxc
#                     the following activities are performed:
#                     - extracts dependencies from oq-{engine,hazardlib, ..} debian/control
#                       files and install them
#                     - builds oq-hazardlib speedups
#                     - installs oq-engine sources on lxc
#                     - set up postgres
#                     - upgrade db
#                     - runs celeryd
#                     - runs tests
#                     - runs coverage
#                     - collects all tests output files from lxc
#
#      <branch_id>    name of the tested branch
#      <lxc_ip>       the IP address of lxc instance
#
_devtest_innervm_run () {
    local i old_ifs pkgs_list dep branch_id="$1" lxc_ip="$2"

    trap 'local LASTERR="$?" ; trap ERR ; (exit $LASTERR) ; return' ERR

    ssh -t  $lxc_ip "rm -f ssh.log"

    ssh -t  $lxc_ip "sudo apt-get update"
    ssh -t  $lxc_ip "sudo apt-get -y upgrade"

    ssh -t  $lxc_ip "sudo apt-get install -y build-essential python-dev python-imaging python-virtualenv git postgresql-9.1 postgresql-server-dev-9.1 postgresql-9.1-postgis openjdk-6-jre libxml2 libxml2-dev libxslt1-dev libxslt1.1 libblas-dev liblapack-dev curl wget xmlstarlet imagemagick gfortran"

    ssh -t  $lxc_ip "sudo sed -i '1 s@^@local   all             all                                     trust\nhost    all             all             $lxc_ip/32          md5\n@g' /etc/postgresql/9.1/main/pg_hba.conf"
    
    ssh -t  $lxc_ip "sudo sed -i \"s/\([#        ]*listen_addresses[     ]*=[    ]*\)[^#]*\(#.*\)*/listen_addresses = '*'    \2/g\" /etc/postgresql/9.1/main/postgresql.conf"

    ssh -t  $lxc_ip "sudo service postgresql restart"

    repo_id="$GEM_GIT_REPO"
    ssh -t  $lxc_ip "git clone --depth=1 -b $branch_id $repo_id/$GEM_GIT_PACKAGE"
    ssh -t  $lxc_ip "export GEM_SET_DEBUG=$GEM_SET_DEBUG
set -e
if [ \$GEM_SET_DEBUG ]; then
    set -x
fi
cd ~/$GEM_GIT_PACKAGE
virtualenv --system-site-packages platform-env
. platform-env/bin/activate
pip install -e openquakeplatform
cd openquakeplatform
nohup fab --show=everything bootstrap &
bootstrap_pid=\$!
bootstrap_tout=900
for i in \$(seq 1 \$bootstrap_tout); do
    if ! kill -0 \$bootstrap_pid >/dev/null 2>&1 ; then
        wait \$bootstrap_pid
        ret=\$?
        mv nohup.out bootstrap.log
        break
    fi
    sleep 5
done
if [ \$i -eq \$bootstrap_tout ]; then
    echo "timeout reached"
    kill -TERM \$bootstrap_pid
    sleep 5
    kill -KILL \$bootstrap_pid || true
    ret=126
fi
if [ \$ret -ne 0 ]; then
    exit \$ret
fi

cd test
export PYTHONPATH=\$(pwd)
cp config.py.tmpl config.py
export DISPLAY=:1
./test_isc.py

sleep 3
cd ~/$GEM_GIT_PACKAGE
. platform-env/bin/activate
cd openquakeplatform
fab stop
"

    echo "_devtest_innervm_run: exit"

    return 0
}


#
#  _lxc_name_and_ip_get <filename> - retrieve name and ip of the runned ephemeral lxc and
#                                    put them into global vars "lxc_name" and "lxc_ip"
#      <filename>    file where lxc-start-ephemeral output is saved
#
_lxc_name_and_ip_get()
{
    local filename="$1" i e

    i=-1
    e=-1
    for i in $(seq 1 40); do
        sleep 2
        if grep -q "sudo lxc-console -n $GEM_EPHEM_NAME" $filename 2>&1 ; then
            lxc_name="$(grep "sudo lxc-console -n $GEM_EPHEM_NAME" $filename | sed "s/.*sudo lxc-console -n \($GEM_EPHEM_NAME\)/\1/g")"
            for e in $(seq 1 40); do
                sleep 2
                if grep -q "$lxc_name" /var/lib/misc/dnsmasq*.leases ; then
                    lxc_ip="$(grep " $lxc_name " /var/lib/misc/dnsmasq*.leases | tail -n 1 | cut -d ' ' -f 3)"
                    break
                fi
            done
            break
        fi
    done
    if [ $i -eq 40 -o $e -eq 40 ]; then
        return 1
    fi
    echo "SUCCESSFULY RUNNED $lxc_name ($lxc_ip)"

    return 0
}

#
#  devtest_run <branch_id> - main function of source test
#      <branch_id>    name of the tested branch
#
devtest_run () {
    local deps old_ifs branch_id="$1"

    sudo echo
    sudo ${GEM_EPHEM_CMD} -o $GEM_EPHEM_NAME -d 2>&1 | tee /tmp/packager.eph.$$.log &
    _lxc_name_and_ip_get /tmp/packager.eph.$$.log
    rm /tmp/packager.eph.$$.log

    _wait_ssh $lxc_ip
    set +e
    _devtest_innervm_run "$branch_id" "$lxc_ip"
    inner_ret=$?

    scp "${lxc_ip}:ssh.log" devtest.history || true
    scp "${lxc_ip}:.pip/pip.log" pip.history || true
    scp "${lxc_ip}:$GEM_GIT_PACKAGE/openquakeplatform/bootstrap.log" bootstrap.history || true

    if [ $inner_ret != 0 ]; then
        ssh -t  $lxc_ip "cd ~/$GEM_GIT_PACKAGE; . platform-env/bin/activate ; cd openquakeplatform ; sleep 5 ; fab stop"
    fi

    sudo $LXC_TERM -n $lxc_name

    set -e

    return $inner_ret
}


#
#  MAIN
#
BUILD_FLAGS=""

trap sig_hand SIGINT SIGTERM
#  args management
while [ $# -gt 0 ]; do
    case $1 in
        devtest)
            # Sed removes 'origin/' from the branch name
            devtest_run $(echo "$2" | sed 's@.*/@@g')
            exit $?
            break
            ;;
        *)
            usage 1
            break
            ;;
    esac
    BUILD_FLAGS="$BUILD_FLAGS $1"
    shift
done

exit 0

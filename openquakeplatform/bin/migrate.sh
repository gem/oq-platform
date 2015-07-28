#!/bin/bash
# Copyright (c) 2015, GEM Foundation.
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

# export PS4='+${BASH_SOURCE}:${LINENO}:${FUNCNAME[0]}: '

#
#  vars

if [ $GEM_SET_DEBUG ]; then
    set -x
fi

MIGRATIONS_HISTORY="/var/lib/openquake/platform/migrations/history"
PLATFORM_LOG="/var/log/openquake/platform"
export NL='
'
export TB='	'

#
#  functions

sighand () {
    echo "===== ERROR OCCURRED =====" >> "$PLATFORM_LOG"/migrations.log
    echo "===== END MIGRATIONS =====" >> "$PLATFORM_LOG"/migrations.log
    echo "An error is occurred during $mig_name processing, look '$PLATFORM_LOG/migrations.log' for more details"
    exit 1
}


#
#  <name_long>|<opt>[:],[...]
#
declare -A globargs

parsargs () {
    local frmt="$1"
    local st=0 skip=0
    local i e
    shift
    declare -a args=("$@")
    for i in $(seq 0 $(( ${#args[*]} - 1 )) ); do
        arg="${args[$i]}"
        if [ $skip -gt 0 ]; then
            skip=$((skip - 1))
            continue
        fi
        # echo "ARG: [${args[$i]}]"
        if [ $st -eq 0 ]; then
            if [ "${arg:0:2}" = "--" ]; then
                if [ "${arg:2:1}" = "" ]; then
                    return
                fi
                # long name case
                name="$(echo "${arg:2}" | cut -d '=' -f 1)"
                if ! echo "$frmt" | tr ',' '\n' | grep -q "$name|[a-zA-Z:]\+" ; then
                    echo "argument --$name not found"
                    exit 1
                fi

                if echo "$frmt" | tr ',' '\n' | grep -q "\b$name|[a-zA-Z]\+:" ; then
                    # echo "WITH PARAMETER"
                    if echo "$arg" | grep -q "^--${name}=" ; then
                        # with equal case
                        value="$(echo "${arg:2}" | cut -d '=' -f 2-)"
                    else
                        value=${args[$(( i + 1 ))]}
                        skip=1
                    fi
                else
                    value="true"
                fi
                # echo "LONG NAME: [$name] VAL: [$value]"
                globargs[$name]="$value"
            elif [ "${arg:0:1}" = "-" -a "${arg:1:1}" != "-" ]; then
                args_short="${arg:1}"
                for e in $(seq 0 $(( ${#args_short} - 1 )) ); do
                    arg_short="${args_short:$e:1}"
                    if ! echo "$frmt" | tr ',' '\n' | grep -q "|$arg_short:\?$"; then
                        echo "argument -$arg_short not found"
                        exit 1
                    fi
                    name="$(echo "$frmt" | tr ',' '\n' | grep "|$arg_short:\?$" | cut -d '|' -f 1)"
                    # echo "LETTER[$e]: $arg_short  NAME [$name]"
                    if echo "$frmt" | tr ',' '\n' | grep -q "\b$name|[a-zA-Z]\+:" ; then
                        # echo "WITH PARAMETER"
                        if [ "${args_short:$((e + 1)):1}" != "" ]; then
                            echo "argument -$arg_short require argument"
                            exit 1
                        fi
                        value=${args[$(( i + 1 ))]}
                        skip=1
                        # echo "SHORT NAME: [$name] VAL: [$value]"
                        globargs[$name]="$value"
                        break
                    else
                        value="true"
                        # echo "SHORT NAME: [$name] VAL: [$value]"
                        globargs[$name]="$value"
                    fi
                done
            fi
        fi
    done
}

migrate () {
    local norm_user norm_dir db_info db_name db_port mig

    set -e
    set -o pipefail
    trap sighand ERR

    if [ "${globargs['norm_user']}" == "" -o "${globargs['norm_dir']}" == "" ]; then
        usage "$0" 1
    fi
    norm_user="${globargs['norm_user']}"
    norm_dir="${globargs['norm_dir']}"

    if [ ! -d "$MIGRATIONS_HISTORY" ]; then
        mkdir -p "$MIGRATIONS_HISTORY"
    fi

    if [ ! -d "$PLATFORM_LOG" ]; then
        mkdir -p "$PLATFORM_LOG"
        chgrp adm "$PLATFORM_LOG"
        chmod g+s "$PLATFORM_LOG"
    fi
    db_info="$(python -c "execfile('/etc/openquake/platform/local_settings.py'); db = DATABASES['default'] ; print '%s:%s:%s:%s:%s:%s' % (db['ENGINE'], db['HOST'], db['NAME'], db['PASSWORD'], db['PORT'], db['USER'])")"
    db_name="$(echo "$db_info" | cut -d ':' -f 3 )"
    db_port="$(echo "$db_info" | cut -d ':' -f 5 )"
    echo "===== BEGIN MIGRATIONS =====" >> "$PLATFORM_LOG"/migrations.log

    oldifs="$IFS"
    IFS="
"
    for mig in $(ls oq-platform/openquakeplatform/migrations/*.{py,sh,sql} 2>/dev/null); do
        mig_name="$(basename "$mig")"
        if [ -f "${MIGRATIONS_HISTORY}/$mig_name" ]; then
            if ! diff -q "${MIGRATIONS_HISTORY}/$mig_name" "$mig"; then
                echo "WARNING: '${MIGRATIONS_HISTORY}/$mig_name' and '$mig' are different"
            fi
            echo "Migration $mig_name already found, skip it"
            continue
        fi

        mkdir -p "$PLATFORM_LOG/migration_${mig_name}_$$"
        case "$mig" in
            *.sh)
                date | tee -a "$PLATFORM_LOG"/migrations.log
                echo "Shell script found: $mig"  | tee -a "$PLATFORM_LOG"/migrations.log
                "$mig" "$PLATFORM_LOG/migration_${mig_name}_$$" 2>&1 | tee -a "$PLATFORM_LOG"/migrations.log
                ;;
            *.sql)
                echo "SQL: $mig"
                sudo -u postgres psql -e "$db_name" -p "$db_port" -f "$mig"
                ;;
            *.py)
                echo "PY: $mig"
                echo "not yet implemented"
                return 1
                ;;
            *)
                echo "Unknown type for [$mig]"
                return 1
                ;;
        esac
        rm -rf "$PLATFORM_LOG/migration_${mig_name}_$$"
        cp "$mig" "${MIGRATIONS_HISTORY}/"
    done
    IFS="$oldifs"

    echo "===== END MIGRATIONS =====" >> "$PLATFORM_LOG"/migrations.log

    return 0
}

#
#  MAIN
#

# check the current path
fil_inode="$(ls -i "$0" | cut -d ' ' -f 1)"
ext_inode="$(ls -i "$PWD/oq-platform/openquakeplatform/bin/$(basename $0)" 2>/dev/null | cut -d ' ' -f 1)"

if [ "$fil_inode" != "$ext_inode" ]; then
    echo "  This script must be run from the parent directory of oq-platform repository."
    echo "  Change the current directory and run ./oq-platform/openquakeplatform/bin/deploy.sh script again."
    exit 1
fi

wai="$(whoami)"

if [ "$wai" = "root" ]; then

    parsargs "norm_user|U:,norm_dir|D:" "$@"
    migrate
    exit $?
else
    echo "You are running the openquake platform migration script."
    echo
    read -p "press ENTER to continue or CTRL+C to abort:" a
    echo
    sudo -p "To apply missing migrations root permissions are required.${NL}Please type password for $wai: " GEM_SET_DEBUG=$GEM_SET_DEBUG $0 --norm_user="$wai" --norm_dir="$PWD" "$@"
    exit $?
fi

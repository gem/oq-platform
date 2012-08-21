#!/bin/bash
set -x

IFS='
'
for sb in $(git submodule status); do
    first="$(echo "$sb" | cut -c 1)"
    if [ "$first" != " " ]; then
        echo "submodule status not aligned"
        echo "fix it and try again"
        echo "$sb"
        exit 1
    fi
done

if [ -d /var/tmp ]; then
    TMPDIR=/var/tmp
else
    TMPDIR=/tmp
fi
prepref="oq-platform"
vers="HEAD"
while [ $# -gt 0 ]; do
    case $1 in
        --prefix|-p)
            shift
            pref=$1
            ;;
        *)
            break
            ;;
    esac
    shift
done

if [ $# -ne 0 ]; then
    vers=$1
fi

if [ "$pref" = "" ]; then
    pref="$(git log -1 --pretty=format:%h)"
fi
tarname="${prepref}_${pref}.tgz"
drname="${prepref}-${pref}"
git archive --format=tar --prefix=${drname}/ $vers | (cd "$TMPDIR" && tar xf -)
git submodule foreach "git archive HEAD | (cd \"$TMPDIR/${drname}/\$path\" ; tar x ) "
cd "$TMPDIR"
tar zcf "$tarname" "$drname"
rm -rf "$drname"
cd -
mv "$TMPDIR/$tarname" ..
exit 0
    
    
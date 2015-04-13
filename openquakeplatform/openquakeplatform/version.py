import os
import subprocess


def git_suffix(fname):
    """
    :returns: `<short git hash>` if Git repository found
    """
    try:
        gh = subprocess.check_output(
            ['git', 'rev-parse', '--short', 'HEAD'],
            stderr=open(os.devnull, 'w'),
            cwd=os.path.dirname(fname)).strip()
        gh = "-git" + gh if gh else ''
        return gh
    except:
        # trapping everything on purpose; git may not be installed or it
        # may not work properly
        return ''

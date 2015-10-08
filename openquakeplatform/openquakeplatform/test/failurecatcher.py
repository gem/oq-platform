import os

from nose.plugins import Plugin
from openquakeplatform.test import pla

class FailureCatcher(Plugin):
    name = 'failurecatcher'

    def options(self, parser, env=os.environ):
        parser.add_option('--failurecatcher', action="store_true", dest="failurecatcher_enabled",
                          default=False)

    def configure(self, options, conf):
        if options.failurecatcher_enabled:
            self.enabled = True
        super(FailureCatcher, self).configure(options, conf)

    def addFailure(self, test, err):
        pla.screenshot('%s.png' % test.id())


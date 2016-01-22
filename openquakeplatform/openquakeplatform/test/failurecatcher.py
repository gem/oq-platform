import os
import sys

from nose.plugins import Plugin
from selenium.common.exceptions import (NoAlertPresentException,
                                        UnexpectedAlertPresentException,
                                        )


class FailureCatcher(Plugin):
    name = 'failurecatcher'
    prefix = ""
    enabled = False

    def options(self, parser, env=os.environ):
        parser.add_option('--failurecatcher',
                          action="store", dest="failurecatcher_prefix",
                          default="", help="prefix for any output file")

    def configure(self, options, conf):
        if options.failurecatcher_prefix:
            self.enabled = True
            self.prefix = options.failurecatcher_prefix
        super(FailureCatcher, self).configure(options, conf)

    # uncomment this method to screenshot successful tests too
    # def addSuccess(self, test):
    #     from openquakeplatform.test import pla
    #     pla.screenshot('%s_%s.png' % (self.prefix, test.id()))
    #

    @classmethod
    def alert_manager(cls, pla):
        # selenium can't take a screenshot if an alert is displayed
        try:
            alert = pla.switch_to_alert()
            sys.stderr.write("Found alert during cleanup: [%s]\n" % alert.text)
            alert.accept()
        except (NoAlertPresentException, UnexpectedAlertPresentException):
            pass

    def addError(self, test, err):
        from openquakeplatform.test import pla
        self.alert_manager(pla)
        pla.screenshot('%s_%s.png' % (self.prefix, test.id()))

    def addFailure(self, test, err):
        from openquakeplatform.test import pla
        self.alert_manager(pla)
        pla.screenshot('%s_%s.png' % (self.prefix, test.id()))

    def describeTest(self, test):
        return "%s" % test.id()

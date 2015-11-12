import time
from utils import TimeoutError, NotUniqError, wait_for
from selenium.webdriver.common.by import By


class Platform(object):
    DT = 0.1

    def __init__(self):

        self.driver = None
        self.basepath = None
        self.user = None
        self.passwd = None
        self.debugger = None

    def init(self):
        # we import configuration variables here to keep highest
        # level of isolation without creating unnecessary globals
        try:
            from openquakeplatform.test.config import (
                pla_basepath, pla_user, pla_passwd, pla_debugger)
        except ImportError:
            sys.exit("ERROR: config.py not found. Copy config.py.tmpl in "
                     "config.py and modify it properly.")

        self.debugger = pla_debugger
        self.driver = self.driver_create("firefox", self.debugger)
        self.basepath = pla_basepath
        self.user = pla_user
        self.passwd = pla_passwd

        self.driver.maximize_window()
        self.main_window = None
        while not self.main_window:
            self.main_window = self.driver.current_window_handle

        self.homepage_login()

    @staticmethod
    def driver_create(name, debugger):
        from selenium import webdriver
        if name == "firefox":
            fp = webdriver.FirefoxProfile()
            if debugger != "":
                fp.add_extension(extension=debugger)
                fp.native_events_enabled = False
                fp.set_preference("browser.tabs.warnOnClose", False)
                fp.set_preference("extensions.firebug.allPagesActivation",
                                  "on")
                fp.set_preference("extensions.firebug.console.enableSites",
                                  True)
                fp.set_preference("extensions.firebug.defaultPanelName",
                                  "console")
            driver = webdriver.Firefox(firefox_profile=fp)
        else:
            driver = None

        return driver

    def homepage_login(self):
        from selenium.webdriver.common.by import By
        self.driver.get(self.basepath)
        # <a class="dropdown-toggle" data-toggle="dropdown" href="#">
        #Sign in</a>
        inputs = self.driver.find_elements(By.XPATH, "//a[text()='Sign in']")
        if len(inputs) != 1:
            return False
        inputs[0].click()

        #<input id="id_username" type="text" name="username">
        #<label for="id_password">Password:</label>
        #<input id="id_password" type="password" name="password">
        #<label class="checkbox">
        user_field = self.xpath_finduniq(
            "//input[@id='id_username' and @type='text' "
            "and @name='username']")
        user_field.send_keys(self.user)

        passwd_field = self.xpath_finduniq(
            "//input[@id='id_password' and @type='password' "
            "and @name='password']")
        passwd_field.send_keys(self.passwd)

        #<button class="btn pull-right" type="submit">Sign in</button>
        submit_button = self.xpath_finduniq(
            "//button[@type='submit' and text()='Sign in']")
        submit_button.click()

    @property
    def url(self):
        return self.driver.current_url

    def fini(self):
        # return to main window
        self.windows_reset()

        # try to find logout button (in the header)
        try:
            self.xpath_finduniq("//a[@href='#' and b[@class='caret']]")
        except (TimeoutError, ValueError, NotUniqError):
            self.driver.get(self.basepath)

        #<a class="dropdown-toggle" data-toggle="dropdown" href="#">
        #nastasi
        #<b class="caret"></b>
        #</a>
        user_button = self.xpath_finduniq(
            "//a[@href='#' and b[@class='caret']]")
        user_button.click()

        #<a href="/account/logout/">
        #<i class="icon-off"></i>
        #Log out
        #</a>
        logout_button = self.xpath_finduniq(
            "//a[@href='/account/logout/' and normalize-space(text())"
            " = 'Log out']")

        logout_button.click()

        #check new url
        self.wait_new_page(logout_button, '/account/logout/')

        #<button class="btn btn-primary" type="submit">Log out</button>
        logout_button = self.xpath_finduniq(
            "//button[@type='submit' and normalize-space("
            "text()) = 'Log out']")
        logout_button.click()

        self.driver.quit()

    def navigate(self, dest):
        # driver, basepath, self.dest):
        if dest not in ["calc", "explore", "share"]:
            raise ValueError

        try:
            dest_button = self.xpath_finduniq("//a[@href='/%s/']" % dest)
        except (TimeoutError, ValueError, NotUniqError):
            self.driver.get(self.basepath)
            dest_button = self.xpath_finduniq("//a[@href='/%s/']" % dest)

        dest_button.click()
        self.wait_new_page(dest_button, '/%s/' % dest)

    def get(self, url):
        self.driver.get(self.basepath + url)

    def xpath_finduniq(self, xpath_str, times=1, postfind=0.2):
        for t in range(0, times):
            field = self.driver.find_elements(By.XPATH, xpath_str)
            if len(field) > 0:
                break
            if times > 1:
                time.sleep(self.DT)
        else:
            if times > 1:
                raise TimeoutError(
                    "Timeout waiting '{}' for {} seconds.".format(
                        xpath_str, times * self.DT)
                    )
            else:
                raise ValueError(
                    "Search path '{}' not matches.".format(xpath_str)
                    )

        if len(field) > 1:
            raise NotUniqError(
                "Waiting for '{}' returned {} matches.".format(xpath_str,
                                                               len(field))
                )

        if postfind > 0:
            time.sleep(postfind)
        return field[0]

    def wait_new_page(self, element, url):
        from selenium.common.exceptions import StaleElementReferenceException
        def link_has_gone_stale():
            try:
                # poll the link with an arbitrary call
                element.find_elements_by_id('doesnt-matter')
                return False
            except StaleElementReferenceException:
                if (self.driver.current_url == url
                        or self.driver.current_url == (self.basepath + url)):
                    return True
                else:
                    raise ValueError
        wait_for(link_has_gone_stale)

    def screenshot(self, filename):
        self.driver.get_screenshot_as_file(filename)

    def add_click_event(self):
        self.driver.execute_script('''

    pla_click_show = function (x,y) {
        var div = document.createElement("div");
        div.style.left = x+"px";
        div.style.top  = y+"px";
        div.style.position = "fixed";
        div.style.width = "50px";
        div.style.height = "50px";
        div.style.background = "red";
        div.style.opacity = "0.5";
        document.body.appendChild(div);
    };

    pla_click = function (x,y){
        var ev = document.createEvent("MouseEvent");
        var el = document.elementFromPoint(x,y);
        console.log(x,y);
        ev.initMouseEvent(
            "click",
            true /* bubble */, true /* cancelable */,
            window, null,
            x, y, x, y, /* coordinates */
            false, false, false, false, /* modifier keys */
            0 /*left*/, null
        );
        el.dispatchEvent(ev);

        // pla_click_show(x,y);
    };

    pla_click_doc = function (x,y){
        var ev = document.createEvent("MouseEvent");
        ev.initMouseEvent(
            "click",
            true /* bubble */, true /* cancelable */,
            window, null,
            x, y, 0, 0, /* coordinates */
            false, false, false, false, /* modifier keys */
            0 /*left*/, null
        );
        document.getElementsByTagName("html")[0].dispatchEvent(ev);

        pla_click_show(x,y);
    };

    '''
                                   )

    def click_at(self, x, y):
        self.driver.execute_script('pla_click(%d, %d);' % (x, y))


    @staticmethod
    def select_item_set(sel_obj, name):
        for option in sel_obj.find_elements_by_tag_name('option'):
            if option.text == name:
                option.click() # select() in earlier versions of webdriver
                break


    def select_window_by_name(self, title):
        win_cur = self.driver.current_window_handle
        for handle in self.driver.window_handles:
            self.driver.switch_to.window(handle)
            if self.driver.title == title:
                return True
        else:
            self.driver.switch_to.window(win_cur)
        raise ValueError

    def select_main_window(self):
        if self.main_window:
            self.driver.switch_to.window(self.main_window)

    def windows_reset(self):
        for handle in self.driver.window_handles:
            if handle == self.main_window:
                continue
            self.driver.switch_to.window(handle)
            self.driver.close()
        self.driver.switch_to.window(self.driver.window_handles)

    def window_close(self):
        self.driver.close()

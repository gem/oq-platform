#!/usr/bin/env python
import time
import sys

from selenium import webdriver
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains

from selenium.common.exceptions import StaleElementReferenceException

def pla_driver(name, debugger):
    if name == "firefox":
        fp = webdriver.FirefoxProfile()
        if debugger != "":
            fp.add_extension(extension=debugger)
            fp.native_events_enabled = False
            fp.set_preference("extensions.firebug.currentVersion", "2.0.9") 
            fp.set_preference("extensions.firebug.allPagesActivation", "on") 
            fp.set_preference("extensions.firebug.console.enableSites", True) 
            fp.set_preference("extensions.firebug.defaultPanelName", "console") 
        driver = webdriver.Firefox(firefox_profile=fp)
    else:
        driver = None

    return driver

def wait_for(condition_function):
    start_time = time.time()
    while time.time() < start_time + 3:
        if condition_function():
            return True
        else:
            time.sleep(0.1)
    raise Exception(
        'Timeout waiting for {}'.format(condition_function.__name__)
    )


def wait_new_page(driver, element, url):
    def link_has_gone_stale():
        try:
            # poll the link with an arbitrary call
            element.find_elements_by_id('doesnt-matter') 
            return False
        except StaleElementReferenceException:
            if driver.current_url == url:
                return True
            else:
                raise ValueError
    wait_for(link_has_gone_stale)


def xpath_finduniq(driver, xpath_str):
    field = driver.find_elements(By.XPATH, xpath_str)
    if len(field) != 1:
        raise ValueError

    return field[0]
    
def pla_homepage_login(driver, basepath, user, passwd):
    driver.get(basepath + "")
    # <a class="dropdown-toggle" data-toggle="dropdown" href="#">Sign in</a>
    inputs = driver.find_elements(By.XPATH, "//a[text()='Sign in']")
    if len(inputs) != 1:
        return False
    inputs[0].click()

    #<input id="id_username" type="text" name="username">
    #<label for="id_password">Password:</label>
    #<input id="id_password" type="password" name="password">
    #<label class="checkbox">
    user_field = xpath_finduniq(driver, "//input[@id='id_username' and @type='text' and @name='username']")
    user_field.send_keys(user)

    passwd_field = xpath_finduniq(driver, "//input[@id='id_password' and @type='password' and @name='password']")
    passwd_field.send_keys(passwd)

    #<button class="btn pull-right" type="submit">Sign in</button>
    submit_button = xpath_finduniq(driver, "//button[@type='submit' and text()='Sign in']")
    submit_button.click()

def pla_logout(driver, basepath, user):
    #<a class="dropdown-toggle" data-toggle="dropdown" href="#">
    #nastasi
    #<b class="caret"></b>
    #</a>
    user_button = xpath_finduniq(driver, "//a[@href='#' and b[@class='caret']]")
    user_button.click()

    #<a href="/account/logout/">
    #<i class="icon-off"></i>
    #Log out
    #</a>
    logout_button = xpath_finduniq(driver, "//a[@href='/account/logout/' and normalize-space(text()) = 'Log out']")
    logout_button.click()

    #check new url
    wait_new_page(driver, logout_button, basepath + '/account/logout/')

    #<button class="btn btn-primary" type="submit">Log out</button>
    logout_button = xpath_finduniq(driver, "//button[@type='submit' and normalize-space(text()) = 'Log out']")
    logout_button.click()

def pla_navigate(driver, basepath, dest):
    if dest != "calc" and dest != "explore" and dest != "share":
        raise ValueError
    
    dest_button = xpath_finduniq(driver, "//a[@href='/%s/']" % dest)

    dest_button.click()
    wait_new_page(driver, dest_button, basepath + '/%s/' % dest)

def pla_add_click_event(driver):
    driver.execute_script('''

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

def pla_click_at(driver, x, y):
    driver.execute_script('pla_click(%d, %d);' % (x, y))

def pla_isc_test(driver, basepath):
    #<li>
    #<a href="/maps/23">
    enter_button = xpath_finduniq(driver, "//li/a[@href='/maps/23' and normalize-space(text()) = 'Global Instrumental Earthquake Catalogue (1900 - 2009)']")
    enter_button.click()
    wait_new_page(driver, enter_button, basepath + '/maps/23')

    enter_button = xpath_finduniq(driver, "//a[@href='/maps/23/view' and normalize-space(text()) = 'View Map']")
    enter_button.click()
    wait_new_page(driver, enter_button, basepath + '/maps/23/view')

    time.sleep(2)

    # <button id="ext-gen159" class=" x-btn-text gxp-icon-getfeatureinfo" type="button">Identify
    enter_button = xpath_finduniq(driver, "//button[@type='button' and normalize-space(text()) = 'Identify']")
    enter_button.click()

    time.sleep(2)

    tail_ptr = xpath_finduniq(driver, "//img[contains(@src, 'wms?LAYERS=oqplatform%3Aisc_viewer_measure&FORMAT=image%2Fpng&TRANSPARENT=TRUE&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&STYLES=&TILED=true&SRS=EPSG%3A900913&BBOX=-10018754.17,0,-5009377.085,5009377.085&WIDTH=256&HEIGHT=256')]")

    pla_add_click_event(driver)
    pla_click_at(driver, 107 + tail_ptr.location['x'], 115 + tail_ptr.location['y'])
    # raise ValueError

    time.sleep(3);

    popup_ctx = xpath_finduniq(driver, "//div[text() = '1951-03-19T04:23:00']")

    return True

#!/usr/bin/env python

import sys
from time import sleep
from selenium import webdriver
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.alert import Alert
from selenium.common.exceptions import NoAlertPresentException

import csv

from config import basepath

if basepath == "":
    print "configuration 'basepath' variable is empty."
    print "Please edit config.py file following the included instructions."
    sys.exit(1)

newarr = []
# Create a new instance of the Firefox driver
driver = webdriver.Firefox()
with open('taxonomies.csv', 'rb') as csvfile:
    csv_content = csv.reader(csvfile, delimiter='|')
    for row in csv_content:
        newrow = row[:]
        line = row[2]
        if line.startswith("C/"):
            line = "CR/" + line[2:]

        while line.endswith("/"):
            line = line[:-1]

        while line.startswith(" "):
            line = line[1:]

        while line.endswith(" "):
            line = line[:-1]

        while line.find("//") > -1:
            line = line.replace("//", "/")
        newrow.append(line)

        line = line.replace("/DUC", "+DUC")
        line = line.replace("/DNO", "+DNO")
        line = line.replace("/DU99", "+DU99")

        line = line.replace("CR/PC", "CR+PC")

        line = line.replace("/H:", "/HEX:")

        line = line.replace("/HBT:", "/HBET:")
        
        line = line.replace("MUR/ST99", "MUR+ST99")

        print "LINE: " + line
        driver.get(basepath + line)

        alert = True
        alert_count = 0
        alert_str = ""
        error = False
        while alert:
            try:
                alert = driver.switch_to_alert()
                alert_str = alert_str + alert.text.replace("\n", " ")
                print "ERROR: [%s]" % alert.text
                alert.accept()
                alert_count += 1
            except NoAlertPresentException:
                break

        if alert_count != 0:
            newrow.append("ERROR")
            newrow.append(alert_str)
            newrow.append("")
            newarr.append(newrow)
            continue

        # TODO: extract value and compare it
        result = driver.find_element_by_id("resultE")
        computed_short = result.get_attribute("value")

        if computed_short != line:
            newrow.append("WARNING")
            newrow.append("")
            newrow.append(computed_short)
            newarr.append(newrow)
            continue

        newrow.append("OK")
        newrow.append("")
        newrow.append("")

        newarr.append(newrow)

with open('out.csv', 'wb') as csvfile:
    csv_writer = csv.writer(csvfile, delimiter='|')
    for newrow in newarr:
        csv_writer.writerow(newrow)

# waiting an event
#try:
#    WebDriverWait(driver, 10).until(lambda x: x.execute_script('return window.fired;'))
#
#finally:
driver.quit()

print "WIN"


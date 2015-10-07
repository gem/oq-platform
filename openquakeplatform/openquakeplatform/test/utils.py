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


class TimeoutError(Exception):
    pass


class NotUniqError(Exception):
    pass


def wait_for(condition_function, timeout=3):
    start_time = time.time()
    while time.time() < start_time + timeout:
        if condition_function():
            return True
        else:
            time.sleep(0.1)
    raise TimeoutException(
        'Timeout waiting for {}'.format(condition_function.__name__)
    )

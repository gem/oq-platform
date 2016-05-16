#!/bin/bash

export DJANGO_SETTINGS_MODULE="openquakeplatform.test_settings"
python `which nosetests` "$@" openquakeplatform/exposure/tests.py openquakeplatform/faulted_earth/tests.py openquakeplatform/updatures/test/test.py

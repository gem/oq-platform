#!/bin/bash
python $(which nosetests) "$@" geonode/exposure/tests.py

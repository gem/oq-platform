# -*- coding: utf-8 -*-
# vim: tabstop=4 shiftwidth=4 softtabstop=4

# Copyright (c) 2010-2012, GEM Foundation.
#
#    This program is free software: you can redistribute it and/or modify
#    it under the terms of the GNU Affero General Public License as
#    published by the Free Software Foundation, either version 3 of the
#    License, or (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU Affero General Public License for more details.
#
#    You should have received a copy of the GNU Affero General Public License
#    along with this program.  If not, see <https://www.gnu.org/licenses/agpl.html>.

#    A router to control all database operations on models in
#    the exposure export application

class GedRouter(object):
    def db_for_read(self, model, **hints):
        "Point all operations on ged models to 'geddb'"
        if model._meta.app_label == 'exposure':
            return 'geddb'
        return 'default'

    def allow_syncdb(self, db, model):
        if db == 'geddb' or model._meta.app_label == "ged":
            return False # we're not using syncdb on our legacy database
        else: # but all other models/databases are fine
            return True


To test taxtweb install latest python-selenium package with pip and
a compatible version of firefox on your host machine.

There is a sample named taxonomies.cvs as example of fields required.

Edit config.py to point to the right web address.

Run taxtweb-test.py

---
To create a new csv file you can use the following command for
'postgres' user:
echo "SELECT id,name,taxonomy_gem from vulnerability_generalinformation;" | psql -A -t oqplatform > taxonomies.csv

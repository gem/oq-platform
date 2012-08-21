SITE_HOST=$(shell grep -w '^SITEURL' /etc/geonode/local_settings.py | sed 's@.*http://@@g;s@/.*@@g')
GEM_BASEDIR?=/var/lib/openquake/
GEM_TMPDIR=/tmp
BASE_INST_DIR=$(GEM_BASEDIR)oq-ui-geoserver/

BASE_SRC_DIR=

deploy: install postinst

debugvars:
	@echo "SITE_HOST=[$(SITE_HOST)] GEM_BASEDIR=[$(GEM_BASEDIR)] GEM_TMPDIR=[$(GEM_TMPDIR)] BASE_INST_DIR=[$(BASE_INST_DIR)]"

install:
	test -d $(BASE_INST_DIR) || mkdir -p $(BASE_INST_DIR)
	rm -rf "$(BASE_INST_DIR)geoserver"
	cp -a geoserver "$(BASE_INST_DIR)"
	chown -R tomcat6.tomcat6 $(BASE_INST_DIR)geoserver

postinst:
	./bin/geoserver-xml-mangler.py install $$(find "$(BASE_INST_DIR)geoserver/data/workspaces/" -type f -name datastore.xml | grep -v "$(BASE_INST_DIR)geoserver/data/workspaces/temp")
	./bin/config_mangle.sh $(GEM_BASEDIR) $(GEM_TMPDIR) $(SITE_HOST)

template:
	./bin/geoserver-xml-mangler.py template $$(find "$(BASE_SRC_DIR)geoserver/data/workspaces/" -type f -name datastore.xml | grep -v "$(BASE_SRC_DIR)geoserver/data/workspaces/temp")

populate:
	curl --header "Content-Type: text/xml" -v -d @data/styles/geodetic.xml -u $(GEM_DJANGO_SUSER):$(GEM_DJANGO_SPASS) -X POST http://$(SITE_HOST):8080/geoserver/rest/styles

	curl --header "Content-Type: application/vnd.ogc.sld+xml" -v -d @data/styles/geodetic.sld -u $(GEM_DJANGO_SUSER):$(GEM_DJANGO_SPASS) -X PUT http://$(SITE_HOST):8080/geoserver/rest/styles/geodetic.sld

	curl -u $(GEM_DJANGO_SUSER):$(GEM_DJANGO_SPASS) -XPUT -H 'Content-type: text/xml' -d '<layer><defaultStyle><name>geodetic</name></defaultStyle><enabled>true</enabled></layer>' http://$(SITE_HOST):8080/geoserver/rest/layers/geodetic_geodetic

.PHONY: deploy install postinst template debugvars populate


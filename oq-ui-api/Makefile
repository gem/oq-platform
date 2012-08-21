ALL: deploy

deploy:
	./bin/makefile.sh $@

fix:
	./bin/collectstatic_fix.sh
	./bin/default_maps_permissions_fix.sh
	./bin/proxy_views_fix.sh

.PHONY: ALL deploy fix

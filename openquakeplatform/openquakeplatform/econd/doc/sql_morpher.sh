#!/bin/bash
cat $1 | sed 's/SET search_path = econd, pg_catalog;/SET search_path = public, pg_catalog;/g
s/Schema: econd;/Schema: public;/g;s/Owner: econduser;/Owner: oqplatform;/g;
s/ALTER TABLE econd\./ALTER TABLE public./g;s/OWNER TO econduser;/OWNER TO oqplatform;/g'

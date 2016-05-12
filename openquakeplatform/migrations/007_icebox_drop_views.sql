-- On the GeoNode side:
-- from geonode.maps.models import Map
-- from geonode.maps.models import MapLayer
-- from geonode.layers.models import Layer
-- 
-- map_layers = MapLayer.objects.filter(name__contains="icebox")
-- maps = map_layers.order_by('map').distinct('map')
-- 
-- for map in maps:
--     map_obj = Map.objects.filter(id=map.map_id)
--     map_obj.delete()
-- 
-- Layer.objects.filter(name__contains="icebox").delete()
-- 
-- map_layers.delete()

DO
$do$
DECLARE
   _tbl text;
BEGIN
FOR _tbl  IN
    SELECT quote_ident(table_schema) || '.'
        || quote_ident(table_name)
    FROM   information_schema.tables
    WHERE  table_name LIKE 'icebox_output\_%'
    AND    table_schema NOT LIKE 'pg_%'
LOOP
   EXECUTE
   'DROP VIEW ' || _tbl;
END LOOP;
END
$do$;

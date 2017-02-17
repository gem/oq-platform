-- This scripts removes MapQuest baselayers from maps and sets OSM as new default

DELETE FROM maps_maplayer WHERE name = 'osm' OR name = 'naip';
UPDATE maps_maplayer SET visibility = 't' WHERE name = 'mapnik';

-- This scripts removes any trace of the bluemarble baselayer from maps

DELETE FROM maps_maplayer WHERE name = 'bluemarble';

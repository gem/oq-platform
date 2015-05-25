-- This scripts removes any trace of the bluemarble baselayer from maps

SELECT * FROM maps_maplayer WHERE name = 'bluemarble';

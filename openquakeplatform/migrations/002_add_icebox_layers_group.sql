/* This migrations adds all the layers produced i
   by an icebox calculation in the 'icebox' group */

UPDATE "maps_maplayer" SET "group"='icebox' WHERE "name" LIKE '%icebox%'

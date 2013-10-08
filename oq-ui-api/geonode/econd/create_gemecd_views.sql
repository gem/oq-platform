
   
CREATE OR REPLACE VIEW geoarchivemasteroverview AS 
 SELECT event.name AS event, event.id AS eventid, event.country, event.yearint, event.the_geom AS event_geom, study.name AS study, 
 study.id AS studyid, location.id AS locationid, location.name AS locationname, location.the_geom AS location_geom, 
 location.isaggregated AS locationaggregateflag, photologue_photo.id AS photoid, photologue_photo.qualitycode, 
 photologue_photo.name AS photofilename, photologue_photo.photographername, inventoryclass.id AS inventoryclassid, inventoryclass.name AS inventoryclassname, 
 unifieddamagelevel.name AS unifieddamagelevelname, unifieddamagelevel.id AS unifieddamagelevelid, lookupassetclass.name AS assetclass, 
 lookupassetclass.id AS assetclassid, count(surveyvalue.id) AS aggregationtest, study.copyrightmessage
   FROM location
   JOIN photologue_photo ON location.id = photologue_photo.parentid
   JOIN study ON study.id = location.parentid
   JOIN event ON event.id = study.parentid
   JOIN surveyvalue ON location.id = surveyvalue.parentid
   JOIN inventoryclass ON surveyvalue.inventoryclassid = inventoryclass.id
   JOIN damagelevel ON surveyvalue.damagelevelid = damagelevel.id
   JOIN unifieddamagelevel ON damagelevel.mappingid = unifieddamagelevel.id
   JOIN lookupassetclass ON surveyvalue.assetclasscode::text = lookupassetclass.id::text
   JOIN lookupassettype ON surveyvalue.assettypecode::text = lookupassettype.id::text
  WHERE location.parenttype::text = 'study'::text AND location.isaggregated = 0
  GROUP BY event.name, event.id, event.country, event.yearint, event.the_geom, study.name, study.id, location.id, 
  location.name, location.the_geom, location.isaggregated, photologue_photo.id, photologue_photo.name, photologue_photo.photographername, photologue_photo.qualitycode, 
  inventoryclass.name, inventoryclass.id, unifieddamagelevel.name, unifieddamagelevel.id, lookupassetclass.name, lookupassetclass.id,  study.copyrightmessage;
ALTER TABLE geoarchivemasteroverview
 OWNER TO econduser;

  
  
CREATE OR REPLACE VIEW geoarchivelocations AS 

 SELECT geoarchivemasteroverview.event, geoarchivemasteroverview.eventid, geoarchivemasteroverview.country, 
 geoarchivemasteroverview.yearint, geoarchivemasteroverview.study, geoarchivemasteroverview.studyid, 
 geoarchivemasteroverview.locationid, geoarchivemasteroverview.locationname, geoarchivemasteroverview.location_geom, 
 min(photoid) AS samplephotoid, count(geoarchivemasteroverview.photoid) AS photocount, 
 geoarchivemasteroverview.inventoryclassid, geoarchivemasteroverview.inventoryclassname, 
 geoarchivemasteroverview.unifieddamagelevelid, geoarchivemasteroverview.unifieddamagelevelname,
 geoarchivemasteroverview.assetclass, geoarchivemasteroverview.assetclassid
   FROM geoarchivemasteroverview
  WHERE geoarchivemasteroverview.aggregationtest = 1
  GROUP BY geoarchivemasteroverview.event, geoarchivemasteroverview.eventid, geoarchivemasteroverview.country, 
  geoarchivemasteroverview.yearint, geoarchivemasteroverview.study, geoarchivemasteroverview.studyid, geoarchivemasteroverview.locationid, 
  geoarchivemasteroverview.locationname, geoarchivemasteroverview.location_geom, geoarchivemasteroverview.inventoryclassid, 
  geoarchivemasteroverview.inventoryclassname, geoarchivemasteroverview.unifieddamagelevelid, geoarchivemasteroverview.unifieddamagelevelname,
  geoarchivemasteroverview.assetclass, geoarchivemasteroverview.assetclassid;

ALTER TABLE geoarchivelocations
  OWNER TO econduser;

  
CREATE OR REPLACE VIEW geoarchivedamagelevels AS 
 SELECT geoarchivemasteroverview.unifieddamagelevelname AS damagelevelname, geoarchivemasteroverview.unifieddamagelevelid AS damagelevelid
   FROM geoarchivemasteroverview
  GROUP BY geoarchivemasteroverview.unifieddamagelevelname, geoarchivemasteroverview.unifieddamagelevelid;

ALTER TABLE geoarchivedamagelevels
  OWNER TO econduser;
  
CREATE OR REPLACE VIEW geoarchivedamagelevels_quick AS 
 SELECT unifieddamagelevel.name AS damagelevelname, unifieddamagelevel.id AS damagelevelid
   FROM unifieddamagelevel
  ORDER BY unifieddamagelevel.weight;

ALTER TABLE geoarchivedamagelevels_quick
  OWNER TO econduser;

  
  
  
  CREATE OR REPLACE VIEW geoarchiveassetclasses AS 
 SELECT geoarchivemasteroverview.assetclass, geoarchivemasteroverview.assetclassid 
   FROM geoarchivemasteroverview
  GROUP BY geoarchivemasteroverview.assetclass, geoarchivemasteroverview.assetclassid ;

ALTER TABLE geoarchiveassetclasses
  OWNER TO econduser;
  
 CREATE OR REPLACE VIEW geoarchiveassetclasses_quick AS 
 SELECT lookupassetclass.name AS assetclass, lookupassetclass.id AS assetclassid
   FROM lookupassetclass
  ORDER BY lookupassetclass.weight;

ALTER TABLE geoarchiveassetclasses_quick
  OWNER TO econduser;

 
  
  
  
  
CREATE OR REPLACE VIEW geoarchiveinventoryclasses AS 
 SELECT geoarchivemasteroverview.inventoryclassname, geoarchivemasteroverview.inventoryclassid
   FROM geoarchivemasteroverview
  GROUP BY geoarchivemasteroverview.inventoryclassname, geoarchivemasteroverview.inventoryclassid;

ALTER TABLE geoarchiveinventoryclasses
  OWNER TO econduser;
  
  
CREATE OR REPLACE VIEW geoarchivelocationdata AS 
 SELECT geoarchivelocations.eventid, geoarchivelocations.locationname, st_x(geoarchivelocations.location_geom) AS long, st_y(geoarchivelocations.location_geom) AS lat, geoarchivelocations.unifieddamagelevelname, surveyvalue.assetclasscode, surveyvalue.assettypecode, surveyvalue.assetsubtypecode, surveyvalue.assetconstructioncode, surveyvalue.typeofdamagecode, geoarchivelocations.photocount, inventoryclass.name AS inventoryclass, inventoryclass.inventoryclass_c AS inventoryclassdescription, inventoryclass.mat_type_l, inventoryclass.mat_tech_l, inventoryclass.mas_mort_l, inventoryclass.mas_rein_l, inventoryclass.steel_conn_l, inventoryclass.llrs_l, inventoryclass.llrs_duct_l, inventoryclass.roofsysmat, inventoryclass.roofsystyp, inventoryclass.floor_mat, inventoryclass.floor_type, inventoryclass.story_ag_q, inventoryclass.story_ag_1, inventoryclass.story_ag_2, inventoryclass.yr_built_q, inventoryclass.yr_built_1, inventoryclass.yr_built_2, inventoryclass.str_irreg, inventoryclass.str_hzir_p, inventoryclass.str_veir_p, inventoryclass.occupcy, inventoryclass.occpcy_dt
   FROM geoarchivelocations
   JOIN inventoryclass ON geoarchivelocations.inventoryclassid = inventoryclass.id
   JOIN surveyvalue ON surveyvalue.parentid = geoarchivelocations.locationid
  ORDER BY geoarchivelocations.locationname;

ALTER TABLE geoarchivelocationdata
  OWNER TO econduser;

  

  
  CREATE OR REPLACE VIEW geoarchiveevents AS 
 SELECT geoarchivemasteroverview.event, geoarchivemasteroverview.eventid, geoarchivemasteroverview.country, geoarchivemasteroverview.yearint, geoarchivemasteroverview.event_geom, count(geoarchivemasteroverview.photoid) AS photocount, geoarchivemasteroverview.inventoryclassid, geoarchivemasteroverview.unifieddamagelevelid, geoarchivemasteroverview.assetclassid
   FROM geoarchivemasteroverview
  WHERE geoarchivemasteroverview.aggregationtest = 1
  GROUP BY geoarchivemasteroverview.event, geoarchivemasteroverview.eventid, geoarchivemasteroverview.country, geoarchivemasteroverview.yearint, geoarchivemasteroverview.event_geom, geoarchivemasteroverview.inventoryclassid, geoarchivemasteroverview.unifieddamagelevelid, geoarchivemasteroverview.assetclassid;

ALTER TABLE geoarchiveevents
  OWNER TO postgres;
  
 CREATE OR REPLACE VIEW geoarchiveevents_quick AS 
 SELECT DISTINCT event.name AS event, event.id AS eventid, event.country, event.yearint
   FROM event
   JOIN study ON study.parentid = event.id
  WHERE study.studytypecode::text = 'PHOTO'::text OR study.studytypecode::text = 'CRI'::text;

ALTER TABLE geoarchiveevents_quick
  OWNER TO postgres;


CREATE OR REPLACE VIEW geoarchivelocationsforjson AS  
SELECT event.name AS event, event.country, event.yearint, study.name AS study, location.id AS locationid, location.name AS locationname, 
 count(photologue_photo.id) AS photocount, min(photologue_photo.id) AS samplephotoid, 
 inventoryclass.name AS inventoryclassname, inventoryclass.mat_type_l, inventoryclass.mat_tech_l, inventoryclass.mas_mort_l, inventoryclass.mas_rein_l, inventoryclass.steel_conn_l, inventoryclass.llrs_l, inventoryclass.llrs_duct_l, inventoryclass.roofsysmat, 
 inventoryclass.roofsystyp, inventoryclass.floor_mat, inventoryclass.floor_type, inventoryclass.story_ag_q, inventoryclass.story_ag_1, inventoryclass.story_ag_2, 
 inventoryclass.yr_built_q, inventoryclass.yr_built_1, inventoryclass.yr_built_2, inventoryclass.str_irreg, inventoryclass.str_hzir_p, inventoryclass.str_veir_p, 
 inventoryclass.occupcy, inventoryclass.occpcy_dt, inventoryclass.designcode, inventoryclass.retrofit, inventoryclass.description, inventoryclass.inventoryclass_c, 
 lookupassetclass.name AS assetclass, lookupassettype.name AS assettype, lookupassetsubtype.name AS assetsubtype, unifieddamagelevel.name AS unifieddamagelevelname
   FROM location
   JOIN photologue_photo ON location.id = photologue_photo.parentid
   JOIN study ON study.id = location.parentid
   JOIN event ON event.id = study.parentid
   JOIN surveyvalue ON location.id = surveyvalue.parentid
   JOIN inventoryclass ON surveyvalue.inventoryclassid = inventoryclass.id
   JOIN damagelevel ON surveyvalue.damagelevelid = damagelevel.id
   JOIN unifieddamagelevel ON damagelevel.mappingid = unifieddamagelevel.id
   JOIN lookupassetclass ON surveyvalue.assetclasscode = lookupassetclass.id
   JOIN lookupassettype ON surveyvalue.assettypecode = lookupassettype.id
   JOIN lookupassetsubtype ON surveyvalue.assetsubtypecode = lookupassetsubtype.id
  WHERE location.parenttype::text = 'study'::text AND location.isaggregated = 0
  GROUP BY event.name, event.id, event.country, event.yearint, study.name, study.id, location.id, location.name, location.isaggregated, 
  inventoryclass.name, inventoryclass.id, unifieddamagelevel.name, unifieddamagelevel.id, 
  surveyvalue.assetclasscode, surveyvalue.assettypecode, surveyvalue.assetsubtypecode, lookupassetclass.name,lookupassettype.name,lookupassetsubtype.name;

ALTER TABLE geoarchivelocationsforjson
  OWNER TO econduser;

  
 CREATE OR REPLACE VIEW econd.geoarchivemasterfull AS 
 SELECT event.name AS event, event.id AS eventid, event.country, event.yearint, event.the_geom AS event_geom, study.name AS study, study.id AS studyid, 
 location.id AS locationid, location.name AS locationname, location.the_geom AS location_geom, location.isaggregated AS locationaggregateflag, 
 photologue_photo.id AS photoid, photologue_photo.qualitycode, photologue_photo.name AS photofilename, photologue_photo.subjectcode, 
 photologue_photo.detailcode, photologue_photo.daysafterevent, photologue_photo.timeofdaycode, photologue_photo.orientationcode, 
 photologue_photo.photographerprofessioncode, surveyvalue.structuretypecode, surveyvalue.vulnerabilityclasscode,
 inventoryclass.id, inventoryclass.name, inventoryclass.parentid, inventoryclass.parenttype, 
 inventoryclass.mat_type_l, inventoryclass.mat_tech_l, inventoryclass.mas_mort_l, inventoryclass.mas_rein_l, inventoryclass.steel_conn_l, 
 inventoryclass.llrs_l, inventoryclass.llrs_duct_l, inventoryclass.roofsysmat, inventoryclass.roofsystyp, inventoryclass.floor_mat, 
 inventoryclass.floor_type, inventoryclass.story_ag_q, inventoryclass.story_ag_1, inventoryclass.story_ag_2, inventoryclass.yr_built_q, 
 inventoryclass.yr_built_1, inventoryclass.yr_built_2, inventoryclass.str_irreg, inventoryclass.str_hzir_p, inventoryclass.str_veir_p, 
 inventoryclass.occupcy, inventoryclass.occpcy_dt, inventoryclass.designcode, inventoryclass.retrofit, inventoryclass.description, 
 inventoryclass.inventoryclass_c, inventoryclass.ownerid, inventoryclass.lastupdatebyid, inventoryclass.lastupdate, inventoryclass.levelorder, 
 inventoryclass.llrs_qual, inventoryclass.plan_shape, inventoryclass."position", inventoryclass.nonstrcexw, inventoryclass.roof_conn, 
 inventoryclass.roofcovmat, inventoryclass.roof_shape, inventoryclass.floor_conn, inventoryclass.foundn_sys, inventoryclass.story_bg_q, 
 inventoryclass.story_bg_1, inventoryclass.story_bg_2, inventoryclass.ht_gr_gf_q, inventoryclass.ht_gr_gf_1, inventoryclass.ht_gr_gf_2, 
 inventoryclass.slope, inventoryclass.irreg_q, unifieddamagelevel.name AS unifieddamagelevelname, unifieddamagelevel.id AS unifieddamagelevelid, 
 lookupassetclass.name AS assetclass, lookupassetclass.id AS assetclassid, count(surveyvalue.id) AS aggregationtest
   FROM location
   JOIN photologue_photo ON location.id = photologue_photo.parentid
   JOIN study ON study.id = location.parentid
   JOIN event ON event.id = study.parentid
   JOIN surveyvalue ON location.id = surveyvalue.parentid
   JOIN inventoryclass ON surveyvalue.inventoryclassid = inventoryclass.id
   JOIN damagelevel ON surveyvalue.damagelevelid = damagelevel.id
   JOIN unifieddamagelevel ON damagelevel.mappingid = unifieddamagelevel.id
   JOIN lookupassetclass ON surveyvalue.assetclasscode::text = lookupassetclass.id::text
   JOIN lookupassettype ON surveyvalue.assettypecode::text = lookupassettype.id::text
  WHERE location.parenttype::text = 'study'::text AND location.isaggregated = 0
  GROUP BY event.name, event.id, event.country, event.yearint, event.the_geom, study.name, study.id, location.id, location.name, 
  location.the_geom, location.isaggregated, photologue_photo.id, photologue_photo.name, photologue_photo.qualitycode, surveyvalue.structuretypecode, surveyvalue.vulnerabilityclasscode,inventoryclass.name, 
  inventoryclass.id, unifieddamagelevel.name, unifieddamagelevel.id, lookupassetclass.name, lookupassetclass.id;

ALTER TABLE geoarchivemasterfull
  OWNER TO econduser;


 



CREATE OR REPLACE VIEW gemecdallevents AS 
 SELECT event.name AS n, event.id AS i, event.country AS c, event.yearint AS y, event.the_geom AS event_geom, count(study.id) AS s
   FROM event
   LEFT JOIN study ON study.parentid = event.id
   WHERE event.yearint > 1920
  GROUP BY event.name, event.id, event.country, event.yearint, event.the_geom;

ALTER TABLE gemecdallevents
  OWNER TO econduser;

  

CREATE OR REPLACE VIEW gemecdfilter AS 
 SELECT event.name AS n, event.id AS i, event.country AS c, event.yearint AS y, event.the_geom AS event_geom, count(study.id) AS s, study.studytypecode
   FROM event
   JOIN study ON study.parentid = event.id
  GROUP BY event.name, event.id, event.country, event.yearint, event.the_geom, study.studytypecode;

ALTER TABLE gemecdfilter
  OWNER TO econduser;


CREATE OR REPLACE VIEW gemecdfilterwithsocioeconomic AS 
 SELECT event.name AS n, event.id AS i, event.country AS c, event.yearint AS y, event.the_geom AS event_geom, count(socioeconomicstudy.id) AS s
   FROM event
   JOIN socioeconomicstudy ON socioeconomicstudy.parentid = event.id
  GROUP BY event.name, event.id, event.country, event.yearint, event.the_geom;

ALTER TABLE gemecdfilterwithsocioeconomic
  OWNER TO econduser;
  

CREATE OR REPLACE VIEW gemecdevents_quick AS 
 SELECT event.name AS eventname, event.id AS eventid, event.country, event.yearint, event.partner, study.name AS studyname, study.studytypecode
   FROM event
   LEFT JOIN study ON study.parentid = event.id
  WHERE event.yearint > 1920;

ALTER TABLE gemecdevents_quick
  OWNER TO econduser;

  
CREATE OR REPLACE VIEW gemecdlocations AS 
 SELECT event.name AS event, event.id AS eventid, event.country, event.yearint, study.name AS study, study.id AS studyid, study.studytypecode, location.id AS locationid, location.name AS locationname, location.isaggregated AS locationaggregateflag, location.the_geom AS location_geom, count(photologue_photo.id) AS photocount, count(surveyvalue.id) AS numberofsurveyvalues
   FROM location
   JOIN study ON study.id = location.parentid
   JOIN event ON event.id = study.parentid
   LEFT JOIN surveyvalue ON location.id = surveyvalue.parentid
   LEFT JOIN photologue_photo ON location.id = photologue_photo.parentid
  WHERE location.parenttype::text = 'study'::text
  GROUP BY event.name, event.id, event.country, event.yearint, study.name, study.id, location.id, location.name, location.isaggregated;

ALTER TABLE gemecdlocations
  OWNER TO econduser;


CREATE OR REPLACE VIEW gemecdlocationsforjson AS 
 SELECT event.name AS event, event.country, event.yearint, study.name AS study, location.id AS locationid, location.name AS locationname, count(photologue_photo.id) AS photocount, min(photologue_photo.id) AS samplephotoid, inventoryclass.name AS inventoryclassname, inventoryclass.mat_type_l, inventoryclass.mat_tech_l, inventoryclass.mas_mort_l, inventoryclass.mas_rein_l, inventoryclass.steel_conn_l, inventoryclass.llrs_l, inventoryclass.llrs_duct_l, inventoryclass.roofsysmat, inventoryclass.roofsystyp, inventoryclass.floor_mat, inventoryclass.floor_type, inventoryclass.story_ag_q, inventoryclass.story_ag_1, inventoryclass.story_ag_2, inventoryclass.yr_built_q, inventoryclass.yr_built_1, inventoryclass.yr_built_2, inventoryclass.str_irreg, inventoryclass.str_hzir_p, inventoryclass.str_veir_p, inventoryclass.occupcy, inventoryclass.occpcy_dt, inventoryclass.designcode, inventoryclass.retrofit, inventoryclass.description, inventoryclass.inventoryclass_c, lookupassetclass.name AS assetclass, lookupassettype.name AS assettype, lookupassetsubtype.name AS assetsubtype, unifieddamagelevel.name AS unifieddamagelevelname
   FROM location
   LEFT JOIN photologue_photo ON location.id = photologue_photo.parentid
   JOIN study ON study.id = location.parentid
   JOIN event ON event.id = study.parentid
   JOIN surveyvalue ON location.id = surveyvalue.parentid
   JOIN inventoryclass ON surveyvalue.inventoryclassid = inventoryclass.id
   JOIN damagelevel ON surveyvalue.damagelevelid = damagelevel.id
   JOIN unifieddamagelevel ON damagelevel.mappingid = unifieddamagelevel.id
   JOIN lookupassetclass ON surveyvalue.assetclasscode::text = lookupassetclass.id::text
   JOIN lookupassettype ON surveyvalue.assettypecode::text = lookupassettype.id::text
   JOIN lookupassetsubtype ON surveyvalue.assetsubtypecode::text = lookupassetsubtype.id::text
  WHERE location.parenttype::text = 'study'::text AND location.isaggregated = 0
  GROUP BY event.name, event.id, event.country, event.yearint, study.name, study.id, location.id, location.name, location.isaggregated, inventoryclass.name, inventoryclass.id, unifieddamagelevel.name, unifieddamagelevel.id, surveyvalue.assetclasscode, surveyvalue.assettypecode, surveyvalue.assetsubtypecode, lookupassetclass.name, lookupassettype.name, lookupassetsubtype.name;

ALTER TABLE gemecdlocationsforjson
  OWNER TO econduser;



 CREATE OR REPLACE VIEW gemecdlocationsforjsonaggregated AS 
 SELECT event.name AS event, event.country, event.yearint, study.name AS study, location.id AS locationid, location.name AS locationname, count(photologue_photo.id) AS photocount, min(photologue_photo.id) AS samplephotoid, count(surveyvalue.id) AS surveyvaluecount
   FROM location
   LEFT JOIN photologue_photo ON location.id = photologue_photo.parentid
   JOIN study ON study.id = location.parentid
   JOIN event ON event.id = study.parentid
   JOIN surveyvalue ON location.id = surveyvalue.parentid
  WHERE location.parenttype::text = 'study'::text AND location.isaggregated = 1
  GROUP BY event.name, event.id, event.country, event.yearint, study.name, study.id, location.id, location.name, location.isaggregated;

ALTER TABLE gemecdlocationsforjsonaggregated
  OWNER TO econduser;

 CREATE OR REPLACE VIEW gemecdphotos AS 
 SELECT location.id AS locationid, location.name AS locationname, location.isaggregated AS locationaggregateflag, photologue_photo.id AS photoid, photologue_photo.qualitycode, photologue_photo.name AS photofilename
   FROM location
   JOIN photologue_photo ON location.id = photologue_photo.parentid
  GROUP BY location.id, location.name, location.the_geom, location.isaggregated, photologue_photo.id, photologue_photo.name, photologue_photo.qualitycode;

ALTER TABLE gemecdphotos
  OWNER TO econduser;


#!/bin/bash
psql -q -A -c 'SELECT
        fs.fault_source_id AS fault_source_id,
        fs.fault_summary_id AS fault_summary_id,
        fs.aseismic_slip_factor AS aseismic_slip_factor,
        fs.compiler_id AS compiler_id,
        fs.completion_id AS completion_id,
        fs.contributor_id AS contributor_id,
        fs.dip AS dip,
        fs.dip_dir AS dip_dir,
        fs.last_movement AS last_movement,
        fs.length AS length,
        fs.lower_sm_depth AS lower_sm_depth,
        fs.magnitude AS magnitude,
        fs.name AS name,
        fs.recurrence_interval AS recurrence_interval,
        fs.slip_rate AS slip_rate,
        fs.slip_type_id AS slip_type_id,
        fs.upper_sm_depth AS upper_sm_depth,
        fs.created_date AS created_date,
        fs.modified_date AS modified_date,
        fs.tectonic_region AS tectonic_region,
        fs.area AS area,
        fs.width AS width,
        ST_AsText(fs.polygon) AS geom,

        compiler.name AS compiler_name,
        contributor.name AS contributor_name,

        (fs.magnitude).preferred AS pref_magnitude,
        (fs.dip).preferred AS pref_dip,
        (fs.slip_rate).preferred AS pref_slip_rate,
        (fs.length).preferred AS pref_length,
        (fs.width).preferred AS pref_width,
        (fs.area).preferred AS pref_area,
        (fs.lower_sm_depth).preferred AS pref_lsd,
        (fs.upper_sm_depth).preferred AS pref_usd,
        (fs.recurrence_interval).preferred AS pref_recint,
        st.value AS slip_type
  FROM gem.fearth_fault_source fs
  JOIN gem.fearth_gem_user compiler
    ON compiler.user_id=fs.compiler_id
  JOIN gem.fearth_gem_user contributor
    ON contributor.user_id=fs.contributor_id
  LEFT OUTER JOIN gem.fearth_lookup st
    ON st.lookup_id=fs.slip_type_id;' -W -p 5432 -h hope -d fe300 mnastasi

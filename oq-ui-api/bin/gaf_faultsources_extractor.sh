#!/bin/bash
psql -q -A -c 'SELECT 	fsource.*,
	compiler.name AS compiler_name,
	contributor.name AS contributor_name,
       (magnitude).preferred AS pref_magnitude,
       (dip).preferred AS pref_dip,
       (slip_rate).preferred AS pref_slip_rate,
       (length).preferred AS pref_length,
       (width).preferred AS pref_width,
       (area).preferred AS pref_area,
       (lower_sm_depth).preferred AS pref_lsd,
       (upper_sm_depth).preferred AS pref_usd,
       (recurrence_interval).preferred AS pref_recint,
       	st.value AS slip_type
  FROM gem.fearth_fault_source fsource
  JOIN gem.fearth_gem_user compiler
    ON compiler.user_id=fsource.compiler_id
  JOIN gem.fearth_gem_user contributor
    ON contributor.user_id=fsource.contributor_id
  LEFT OUTER JOIN gem.fearth_lookup st
    ON st.lookup_id=fsource.slip_type_id;' -W -p 5432 -h hope -d fe215 mnastasi

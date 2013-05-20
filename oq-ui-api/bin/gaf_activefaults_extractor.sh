#!/bin/bash
outfile=$1
psql -q -A -c 'SELECT
	st.section_trace_id AS id,
	ST_AsText(st.geom) as geom, st.accuracy,
	ns.*,
	fs.*,
	slip_type.value AS slip_type
  FROM gem.fearth_section_trace st
  JOIN gem.fearth_neotectonic_section ns
    ON ns.neotectonic_section_id = st.neotectonic_section_id
  JOIN gem.fearth_fault_summary fs
  ON ns.fault_summary_id = fs.fault_summary_id
  LEFT OUTER JOIN gem.fearth_lookup slip_type
    ON slip_type.lookup_id=ns.slip_type_id;' -W -p 5432 -h hope -d fe215 mnastasi >/tmp/gaf_fs.$$
#    ON slip_type.lookup_id=ns.slip_type_id;' -W -p 5432 -h hope -d fe215 mnastasi >/tmp/gaf_fs.$$
# limit 100
#    ON slip_type.lookup_id=ns.slip_type_id LIMIT 100;' -W -p 5432 -h hope -d fe215 mnastasi >/tmp/gaf_fs.$$
# limit 100 and from Nicola
#    ON slip_type.lookup_id=ns.slip_type_id WHERE ns.compiler_id=576 LIMIT 100;' -W -p 5432 -h hope -d fe215 mnastasi >/tmp/gaf_fs.$$
head -n 1 /tmp/gaf_fs.$$ | tr '|' '\n' | sed '4,29s/\(.*\)/ns_\1/g;30,54s/\(.*\)/fs_\1/g;' | tr '\n' '|' >$outfile
echo >>$outfile
tail -n +2 /tmp/gaf_fs.$$ >>$outfile
rm /tmp/gaf_fs.$$ 





var material = [
                 { id: 'MAT99', desc: 'Unknown Material' },
                 { id: 'C99', desc: 'Concrete, unknown reinforcement' },
                 { id: 'CU', desc: 'Concrete, unreinforced' },
                 { id: 'CR', desc: 'Concrete, reinforced' },
                 { id: 'SRC', desc: 'Concrete, composite with steel section' },
                 { id: 'S', desc: 'Steel' },
                 { id: 'ME', desc: 'Metal (except steel)' },
                 { id: 'M99', desc: 'Masonry, unknown reinforcement' },
                 { id: 'MUR', desc: 'Masonry, unreinforced' },
                 { id: 'MCF', desc: 'Masonry, confined' },
                 { id: 'MR', desc: 'Masonry, reinforced' },
                 { id: 'E99', desc: 'Earth, unknown reinforcement' },
                 { id: 'EU', desc: 'Earth, unreinforced' },
                 { id: 'ER', desc: 'Earth, reinforced' },
                 { id: 'W', desc: 'Wood' },
                 { id: 'MATO', desc: 'Other material' }
               ];

var mat_tech_grp = [];
mat_tech_grp[0] = [
                    { id: 'CT99', desc: 'Unknown concrete technology' },
                    { id: 'CIP', desc: 'Cast-in-place concrete' },
                    { id: 'PC', desc: 'Precast concrete' }
                  ];
mat_tech_grp[1] = [
                    { id: 'CT99', desc: 'Unknown concrete technology' },
                    { id: 'CIP', desc: 'Cast-in-place concrete' },
                    { id: 'PC', desc: 'Precast concrete' },
                    { id: 'CIPPS', desc: 'Cast-in-place prestressed concrete' },
                    { id: 'PCPS', desc: 'Precast prestressed concrete' }
                  ];
mat_tech_grp[2] = [
                    { id: 'S99', desc: 'Steel, unknown ' },
                    { id: 'SL', desc: 'Cold-formed steel members' },
                    { id: 'SR', desc: 'Hot-rolled steel members' },
                    { id: 'SO', desc: 'Steel, other ' }
                  ];
mat_tech_grp[3] = [
                    { id: 'ME99', desc: 'Metal, unknown ' },
                    { id: 'MEIR', desc: 'Iron' },
                    { id: 'MEO', desc: 'Metal, other ' }
                  ];
mat_tech_grp[4] = [
                    { id: 'MUN99', desc: 'Masonry unit, unknown' },
                    { id: 'ADO', desc: 'Adobe blocks' },
                    { id: 'ST99', desc: 'Stone, unknown technology' },
                    { id: 'STRUB', desc: 'Rubble (field stone) or semi-dressed stone' },
                    { id: 'STDRE', desc: 'Dressed stone' },
                    { id: 'CL99', desc: 'Fired clay unit, unknown type' },
                    { id: 'CLBRS', desc: 'Fired clay solid bricks' },
                    { id: 'CLBRH', desc: 'Fired clay hollow bricks' },
                    { id: 'CLBLH', desc: 'Fired clay hollow blocks or tiles' },
                    { id: 'CB99', desc: 'Concrete blocks, unknown type' },
                    { id: 'CBS', desc: 'Concrete blocks, solid' },
                    { id: 'CBH', desc: 'Concrete blocks, hollow' },
                    { id: 'MO', desc: 'Masonry unit, other' }
                  ];
mat_tech_grp[5] = [
                    { id: 'ET99', desc: 'Unknown earth technology' },
                    { id: 'ETR', desc: 'Rammed earth' },
                    { id: 'ETC', desc: 'Cob or wet construction' },
                    { id: 'ETO', desc: 'Earth technology, other' }
                  ];
mat_tech_grp[6] = [
                    { id: 'W99', desc: 'Wood, unknown' },
                    { id: 'WHE', desc: 'Heavy wood' },
                    { id: 'WLI', desc: 'Light wood members' },
                    { id: 'WS', desc: 'Solid wood' },
                    { id: 'WWD', desc: 'Wattle and daub' },
                    { id: 'WBB', desc: 'Bamboo' },
                    { id: 'WO', desc: 'Wood, other' }
                  ];

var mat_prop_grp = [];
mat_prop_grp[0] = [
                    { id: 'SC99', desc: 'Unknown connection' },
                    { id: 'WEL', desc: 'Welded connections' },
                    { id: 'RIV', desc: 'Riveted connections' },
                    { id: 'BOL', desc: 'Bolted connections' }
                  ];
mat_prop_grp[1] = [
                    { id: 'MO99', desc: 'Mortar type, unknown' },
                    { id: 'MON', desc: 'No mortar' },
                    { id: 'MOM', desc: 'Mud mortar' },
                    { id: 'MOL', desc: 'Lime mortar' },
                    { id: 'MOC', desc: 'Cement mortar' },
                    { id: 'MOCL', desc: 'Cement:lime mortar' },
                    { id: 'SP99', desc: 'Stone, unknown type' },
                    { id: 'SPLI', desc: 'Limestone' },
                    { id: 'SPSA', desc: 'Sandstone' },
                    { id: 'SPTU', desc: 'Tuff' },
                    { id: 'SPSL', desc: 'Slate' },
                    { id: 'SPGR', desc: 'Granite' },
                    { id: 'SPBA', desc: 'Basalt' },
                    { id: 'SPO', desc: 'Stone, other type' }
                  ];

var mat_tead_grp = [];
mat_tead_grp[0] = [
                    { id: 'MR99', desc: 'Unknown reinforcement' },
                    { id: 'RS', desc: 'Steel-reinforced' },
                    { id: 'RW', desc: 'Wood-reinforced' },
                    { id: 'RB', desc: 'Bamboo-, cane- or rope-reinforced' },
                    { id: 'RCM', desc: 'Fibre reinforcing mesh' },
                    { id: 'RCB', desc: 'Reinforced concrete bands' }
                  ];

var llrs_type_grp = [];
llrs_type_grp[0] = [
                    { id: 'L99', desc: 'Unknown lateral load-resisting system' },
                    { id: 'LN', desc: 'No lateral load-resisting system' },
                    { id: 'LWAL', desc: 'Wall' },
                    { id: 'LH', desc: 'Hybrid lateral load-resisting system' },
                    { id: 'LO', desc: 'Other lateral load-resisting system' }
                  ];
llrs_type_grp[1] = [
                    { id: 'L99', desc: 'Unknown lateral load-resisting system' },
                    { id: 'LN', desc: 'No lateral load-resisting system' },
                    { id: 'LFM', desc: 'Moment frame' },
                    { id: 'LPB', desc: 'Post and beam' },
                    { id: 'LWAL', desc: 'Wall' },
                    { id: 'LH', desc: 'Hybrid lateral load-resisting system' },
                    { id: 'LO', desc: 'Other lateral load-resisting system' }
                  ];
llrs_type_grp[2] = [
                    { id: 'L99', desc: 'Unknown lateral load-resisting system' },
                    { id: 'LN', desc: 'No lateral load-resisting system' },
                    { id: 'LFM', desc: 'Moment frame' },
                    { id: 'LINF', desc: 'Infilled frame' },
                    { id: 'LFBR', desc: 'Braced frame' },
                    { id: 'LPB', desc: 'Post and beam' },
                    { id: 'LWAL', desc: 'Wall' },
                    { id: 'LDUAL', desc: 'Dual frame-wall system' },
                    { id: 'LFLS', desc: 'Flat slab/plate or waffle slab' },
                    { id: 'LFLSINF', desc: 'Infilled flat slab/plate or infilled waffle slab' },
                    { id: 'LH', desc: 'Hybrid lateral load-resisting system' },
                    { id: 'LO', desc: 'Other lateral load-resisting system' }
                  ];

var llrs_duct_grp = [];
llrs_duct_grp[0] = [
                    { id: 'DU99', desc: 'Ductility unknown' },
                    { id: 'DUC', desc: 'Ductile' },
                    { id: 'DNO', desc: 'Non-ductile' },
                    { id: 'DBD', desc: 'Base isolation and/or energy dissipation devices' }
                  ];

var h_aboveground = [
                    { id: 'H99', desc: 'Unknown number of storeys' },
                    { id: 'HBET', desc: 'Range of the number of storeys' },
                    { id: 'HEX', desc: 'Exact number of storeys' },
                    { id: 'HAPP', desc: 'Approximate number of storeys' }
                  ];

var h_belowground = [
                    { id: 'HB99', desc: 'Unknown number of storeys' },
                    { id: 'HBBET', desc: 'Range of the number of storeys' },
                    { id: 'HBEX', desc: 'Exact number of storeys' },
                    { id: 'HBAPP', desc: 'Approximate number of storeys' }
                  ];

var h_abovegrade = [
                    { id: 'HF99', desc: 'Height above grade unknown' },
                    { id: 'HFBET', desc: 'Range of height above grade' },
                    { id: 'HFEX', desc: 'Exact height above grade' },
                    { id: 'HFAPP', desc: 'Approximate height above grade' }
                  ];

var h_slope = [
                    { id: 'HD99', desc: 'Unknown slope' },
                    { id: 'HD', desc: 'Slope of the ground' }
                  ];

var date_type = [
                 { id: 'Y99', desc: 'Year unknown' },
                 { id: 'YEX', desc: 'Exact date of construction or retrofit' },
                 { id: 'YBET', desc: 'Bounds for the date of construction or retrofit' },
                 { id: 'YPRE', desc: 'Latest possible date of construction or retrofit' },
                 { id: 'YAPP', desc: 'Approximate date of construction or retrofit' }
               ];

var occupancy = [
                 { id: 'OC99', desc: 'Unknown occupancy type' },
                 { id: 'RES', desc: 'Residential' },
                 { id: 'COM', desc: 'Commercial and public' },
                 { id: 'MIX', desc: 'Mixed use' },
                 { id: 'IND', desc: 'Industrial' },
                 { id: 'AGR', desc: 'Agriculture' },
                 { id: 'ASS', desc: 'Assembly' },
                 { id: 'GOV', desc: 'Government' },
                 { id: 'EDU', desc: 'Education' },
                 { id: 'OCO', desc: 'Other occupancy type' }
               ];

var occupancy_spec_grp = [];
occupancy_spec_grp[0] = [
                    { id: 'RES99', desc: 'Residential, unknown type' },
                    { id: 'RES1', desc: 'Single dwelling' },
                    { id: 'RES2', desc: 'Multi-unit, unknown type' },
                    { id: 'RES2A', desc: '2 Units (Duplex)' },
                    { id: 'RES2B', desc: '3-4 Units' },
                    { id: 'RES2C', desc: '5-9 Units' },
                    { id: 'RES2D', desc: '10-19 Units' },
                    { id: 'RES2E', desc: '20-49 Units' },
                    { id: 'RES2F', desc: '50+ Units' },
                    { id: 'RES3', desc: 'Temporary lodging' },
                    { id: 'RES4', desc: 'Institutional housing' },
                    { id: 'RES5', desc: 'Mobile home' },
                    { id: 'RES6', desc: 'Informal housing' }
                  ];
occupancy_spec_grp[1] = [
                    { id: 'COM99', desc: 'Commercial and public, unknown type' },
                    { id: 'COM1', desc: 'Retail trade' },
                    { id: 'COM2', desc: 'Wholesale trade and storage (warehouse)' },
                    { id: 'COM3', desc: 'Offices, professional/technical services' },
                    { id: 'COM4', desc: 'Hospital/medical clinic' },
                    { id: 'COM5', desc: 'Entertainment' },
                    { id: 'COM6', desc: 'Public building' },
                    { id: 'COM7', desc: 'Covered parking garage' },
                    { id: 'COM8', desc: 'Bus station' },
                    { id: 'COM9', desc: 'Railway station' },
                    { id: 'COM10', desc: 'Airport' },
                    { id: 'COM11', desc: 'Recreation and leisure' }
                  ];
occupancy_spec_grp[2] = [
                    { id: 'MIX99', desc: 'Mixed, unknown type' },
                    { id: 'MIX1', desc: 'Mostly residential and commercial' },
                    { id: 'MIX2', desc: 'Mostly commercial and residential' },
                    { id: 'MIX3', desc: 'Mostly commercial and industrial' },
                    { id: 'MIX4', desc: 'Mostly residential and industrial' },
                    { id: 'MIX5', desc: 'Mostly industrial and commercial' },
                    { id: 'MIX6', desc: 'Mostly industrial and residential' }
                  ];
occupancy_spec_grp[3] = [
                    { id: 'IND99', desc: 'Industrial, unknown type' },
                    { id: 'IND1', desc: 'Heavy industrial' },
                    { id: 'IND2', desc: 'Light industrial' }
                  ];
occupancy_spec_grp[4] = [
                    { id: 'AGR99', desc: 'Agriculture, unknown type' },
                    { id: 'AGR1', desc: 'Produce storage' },
                    { id: 'AGR2', desc: 'Animal shelter' },
                    { id: 'AGR3', desc: 'Agricultural processing' }
                  ];
occupancy_spec_grp[5] = [
                    { id: 'ASS99', desc: 'Assembly, unknown type' },
                    { id: 'ASS1', desc: 'Religious gathering' },
                    { id: 'ASS2', desc: 'Arena' },
                    { id: 'ASS3', desc: 'Cinema or concert hall' },
                    { id: 'ASS4', desc: 'Other gatherings' }
                  ];
occupancy_spec_grp[6] = [
                    { id: 'GOV99', desc: 'Government, unknown type' },
                    { id: 'GOV1', desc: 'Government, general services' },
                    { id: 'GOV2', desc: 'Government, emergency response' }
                  ];
occupancy_spec_grp[7] = [
                    { id: 'EDU99', desc: 'Education, unknown type' },
                    { id: 'EDU1', desc: 'Pre-school facility' },
                    { id: 'EDU2', desc: 'School' },
                    { id: 'EDU3', desc: 'College/university, offices and/or classrooms' },
                    { id: 'EDU4', desc: 'College/university, research facilities and/or labs' }
                  ];

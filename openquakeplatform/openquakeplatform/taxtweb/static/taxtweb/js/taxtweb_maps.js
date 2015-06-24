
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
                    { id: 'LFINF', desc: 'Infilled frame' },
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

var occu_type = [
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

var occu_spec_grp = [];
occu_spec_grp[0] = [
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
occu_spec_grp[1] = [
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
occu_spec_grp[2] = [
                    { id: 'MIX99', desc: 'Mixed, unknown type' },
                    { id: 'MIX1', desc: 'Mostly residential and commercial' },
                    { id: 'MIX2', desc: 'Mostly commercial and residential' },
                    { id: 'MIX3', desc: 'Mostly commercial and industrial' },
                    { id: 'MIX4', desc: 'Mostly residential and industrial' },
                    { id: 'MIX5', desc: 'Mostly industrial and commercial' },
                    { id: 'MIX6', desc: 'Mostly industrial and residential' }
                  ];
occu_spec_grp[3] = [
                    { id: 'IND99', desc: 'Industrial, unknown type' },
                    { id: 'IND1', desc: 'Heavy industrial' },
                    { id: 'IND2', desc: 'Light industrial' }
                  ];
occu_spec_grp[4] = [
                    { id: 'AGR99', desc: 'Agriculture, unknown type' },
                    { id: 'AGR1', desc: 'Produce storage' },
                    { id: 'AGR2', desc: 'Animal shelter' },
                    { id: 'AGR3', desc: 'Agricultural processing' }
                  ];
occu_spec_grp[5] = [
                    { id: 'ASS99', desc: 'Assembly, unknown type' },
                    { id: 'ASS1', desc: 'Religious gathering' },
                    { id: 'ASS2', desc: 'Arena' },
                    { id: 'ASS3', desc: 'Cinema or concert hall' },
                    { id: 'ASS4', desc: 'Other gatherings' }
                  ];
occu_spec_grp[6] = [
                    { id: 'GOV99', desc: 'Government, unknown type' },
                    { id: 'GOV1', desc: 'Government, general services' },
                    { id: 'GOV2', desc: 'Government, emergency response' }
                  ];
occu_spec_grp[7] = [
                    { id: 'EDU99', desc: 'Education, unknown type' },
                    { id: 'EDU1', desc: 'Pre-school facility' },
                    { id: 'EDU2', desc: 'School' },
                    { id: 'EDU3', desc: 'College/university, offices and/or classrooms' },
                    { id: 'EDU4', desc: 'College/university, research facilities and/or labs' }
                  ];

var bupo_type = [
                 { id: 'BP99', desc: 'Unknown building position' },
                 { id: 'BPD', desc: 'Detached building' },
                 { id: 'BP1', desc: 'Adjoining building(s) on one side' },
                 { id: 'BP2', desc: 'Adjoining building(s) on two sides' },
                 { id: 'BP3', desc: 'Adjoining building(s) on three sides' }
               ];

var plsh_type = [
                 { id: 'PLF99', desc: 'Unknown plan shape' },
                 { id: 'PLFSQ', desc: 'Square, solid' },
                 { id: 'PLFSQO', desc: 'Square, with an opening in plan' },
                 { id: 'PLFR', desc: 'Rectangular, solid' },
                 { id: 'PLFRO', desc: 'Rectangular, with an opening in plan' },
                 { id: 'PLFL', desc: 'L-shape' },
                 { id: 'PLFC', desc: 'Curved, solid (e.g. circular, eliptical, ovoid)' },
                 { id: 'PLFCO', desc: 'Curved, with an opening in plan' },
                 { id: 'PLFD', desc: 'Triangular, solid' },
                 { id: 'PLFDO', desc: 'Triangular, with an opening in plan' },
                 { id: 'PLFE', desc: 'E-shape' },
                 { id: 'PLFH', desc: 'H-shape' },
                 { id: 'PLFS', desc: 'S-shape' },
                 { id: 'PLFT', desc: 'T-shape' },
                 { id: 'PLFU', desc: 'U- or C-shape' },
                 { id: 'PLFX', desc: 'X-shape' },
                 { id: 'PLFY', desc: 'Y-shape' },
                 { id: 'PLFP', desc: 'Polygonal, solid' },
                 { id: 'PLFPO', desc: 'Polygonal, with an opening in plan' },
                 { id: 'PLFI', desc: 'Irregular plan shape' }
               ];

var stir_type = [
                 { id: 'IR99', desc: 'Unknown structural irregularity' },
                 { id: 'IRRE', desc: 'Regular structure' },
                 { id: 'IRIR', desc: 'Irregular structure' }
               ];

var plan_irre = [
                 { id: 'IRPP:IRN', desc: 'No irregularity' },
                 { id: 'IRPP:TOR', desc: 'Torsion eccentricity' },
                 { id: 'IRPP:REC', desc: 'Re-entrant corner' },
                 { id: 'IRPP:IRHO', desc: 'Other plan irregularity' }
               ];

var plan_seco = [
                 { id: 'IRPS:IRN', desc: 'No irregularity' },
                 { id: 'IRPS:TOR', desc: 'Torsion eccentricity' },
                 { id: 'IRPS:REC', desc: 'Re-entrant corner' },
                 { id: 'IRPS:IRHO', desc: 'Other plan irregularity' }
               ];

var vert_irre = [
                 { id: 'IRVP:IRN', desc: 'No irregularity' },
                 { id: 'IRVP:SOS', desc: 'Soft storey' },
                 { id: 'IRVP:CRW', desc: 'Cripple wall' },
                 { id: 'IRVP:SHC', desc: 'Short column' },
                 { id: 'IRVP:POP', desc: 'Pounding potential' },
                 { id: 'IRVP:SET', desc: 'Setback' },
                 { id: 'IRVP:CHV', desc: 'Change in vertical structure' },
                 { id: 'IRVP:IRVO', desc: 'Other vertical irregularity' }
               ];

var vert_seco = [
                 { id: 'IRVS:IRN', desc: 'No irregularity' },
                 { id: 'IRVS:SOS', desc: 'Soft storey' },
                 { id: 'IRVS:CRW', desc: 'Cripple wall' },
                 { id: 'IRVS:SHC', desc: 'Short column' },
                 { id: 'IRVS:POP', desc: 'Pounding potential' },
                 { id: 'IRVS:SET', desc: 'Setback' },
                 { id: 'IRVS:CHV', desc: 'Change in vertical structure' },
                 { id: 'IRVS:IRVO', desc: 'Other vertical irregularity' }
               ];

var wall_type = [
                 { id: 'EW99', desc: 'Unknown material of exterior walls' },
                 { id: 'EWC', desc: 'Concrete exterior walls' },
                 { id: 'EWG', desc: 'Glass exterior walls' },
                 { id: 'EWE', desc: 'Earthen exterior walls' },
                 { id: 'EWMA', desc: 'Masonry exterior walls' },
                 { id: 'EWME', desc: 'Metal exterior walls' },
                 { id: 'EWV', desc: 'Vegetative exterior walls' },
                 { id: 'EWW',  desc: 'Wooden exterior walls' },
                 { id: 'EWSL', desc: 'Stucco finish on light framing for exterior walls' },
                 { id: 'EWPL', desc: 'Plastic/vinyl exterior walls, various' },
                 { id: 'EWCB', desc: 'Cement-based boards for exterior walls' },
                 { id: 'EWO', desc: 'Material of exterior walls, other' }
               ];

var roof_shap = [
                 { id: 'RSH99', desc: 'Unknown roof shape' },
                 { id: 'RSH1', desc: 'Flat' },
                 { id: 'RSH2', desc: 'Pitched with gable ends' },
                 { id: 'RSH3', desc: 'Pitched and hipped' },
                 { id: 'RSH4', desc: 'Pitched with dormers' },
                 { id: 'RSH5', desc: 'Monopitch' },
                 { id: 'RSH6', desc: 'Sawtooth' },
                 { id: 'RSH7', desc: 'Curved' },
                 { id: 'RSH8', desc: 'Complex regular' },
                 { id: 'RSH9', desc: 'Complex irregular' },
                 { id: 'RSHO', desc: 'Roof shape, other' }
               ];

var roof_cove = [
                 { id: 'RMT99', desc: 'Unknown roof covering' },
                 { id: 'RMN', desc: 'Concrete roof, no covering' },
                 { id: 'RMT1', desc: 'Clay or concrete tile roof covering' },
                 { id: 'RMT2', desc: 'Fibre cement or metal tile covering' },
                 { id: 'RMT3', desc: 'Membrane roof covering' },
                 { id: 'RMT4', desc: 'Slate roof covering' },
                 { id: 'RMT5', desc: 'Stone slab roof covering' },
                 { id: 'RMT6', desc: 'Metal or asbestos sheet covering' },
                 { id: 'RMT7', desc: 'Wooden or asphalt shingle covering' },
                 { id: 'RMT8', desc: 'Vegetative roof covering' },
                 { id: 'RMT9', desc: 'Earthen roof covering' },
                 { id: 'RMT10', desc: 'Solar panelled roofs' },
                 { id: 'RMT11', desc: 'Tensile membrane or fabric roof' },
                 { id: 'RMTO', desc: 'Roof covering, other' }
               ];

var roof_mate = [
                 { id: 'R99', desc: 'Roof material, unknown' },
                 { id: 'RM', desc: 'Masonry roof' },
                 { id: 'RE', desc: 'Earthen roof' },
                 { id: 'RC', desc: 'Concrete roof' },
                 { id: 'RME', desc: 'Metal roof' },
                 { id: 'RWO', desc: 'Wooden roof' },
                 { id: 'RFA', desc: 'Fabric roof' },
                 { id: 'RO', desc: 'Roof material,other' }
               ];

var roof_sys_grp = [];
roof_sys_grp[0] = [
                    { id: 'RM99', desc: 'Masonry roof, unknown' },
                    { id: 'RM1', desc: 'Vaulted masonry roof' },
                    { id: 'RM2', desc: 'Shallow-arched masonry roof' },
                    { id: 'RM3', desc: 'Composite masonry and concrete roof system' }
                  ];
roof_sys_grp[1] = [
                    { id: 'RE99', desc: 'Earthen roof, unknown' },
                    { id: 'RE1', desc: 'Vaulted earthen roofs' }
                  ];
roof_sys_grp[2] = [
                    { id: 'RC99', desc: 'Concrete roof, unknown' },
                    { id: 'RC1', desc: 'Cast-in-place beamless RC roof' },
                    { id: 'RC2', desc: 'Cast-in-place beam-supported RC roof' },
                    { id: 'RC3', desc: 'Precast concrete roof with RC topping' },
                    { id: 'RC4', desc: 'Precast concrete roof without RC topping' }
                  ];
roof_sys_grp[3] = [
                    { id: 'RME99', desc: 'Metal roof, unknown' },
                    { id: 'RME1', desc: 'Metal beams or trusses supporting light roofing' },
                    { id: 'RME2', desc: 'Metal roof beams supporting precast concrete slabs' },
                    { id: 'RME3', desc: 'Composite steel roof deck and concrete slab' }
                  ];
roof_sys_grp[4] = [
                    { id: 'RWO99', desc: 'Wooden roof, unknown' },
                    { id: 'RWO1', desc: 'Wooden structure with light roof covering' },
                    { id: 'RWO2', desc: 'Wooden beams or trusses with heavy roof covering' },
                    { id: 'RWO3', desc: 'Wood-based sheets on rafters or purlins' },
                    { id: 'RWO4', desc: 'Plywood panels or other light-weigth panels for roof' },
                    { id: 'RWO5', desc: 'Bamboo, straw or thatch roof' }
                  ];
roof_sys_grp[5] = [
                    { id: 'RFA1', desc: 'Inflatable or tensile membrane roof' },
                    { id: 'RFAO', desc: 'Fabric roof, other' }
                  ];

var roof_conn = [
                 { id: 'RWC99', desc: 'Roof-wall diaphragm connection unknown' },
                 { id: 'RWCN', desc: 'Roof-wall diaphragm connection not provided' },
                 { id: 'RWCP', desc: 'Roof-wall diaphragm connection present' },
                 { id: 'RTD99', desc: 'Roof tie-down unknown' },
                 { id: 'RTDN', desc: 'Roof tie-down not provided' },
                 { id: 'RTDP', desc: 'Roof tie-down present' }
               ];

var floo_syma = [
                 { id: 'F99', desc: 'Floor material, unknown' },
                 { id: 'FN', desc: 'No elevated or suspended floor material (single-storey)' },
                 { id: 'FM', desc: 'Masonry floor' },
                 { id: 'FE', desc: 'Earthen floor' },
                 { id: 'FC', desc: 'Concrete floor' },
                 { id: 'FME', desc: 'Metal floor' },
                 { id: 'FW', desc: 'Wooden floor' },
                 { id: 'FO', desc: 'Floor material, other' }
               ];

var floo_conn_grp = [];
floo_conn_grp[0] = [
                    { id: 'FM99', desc: 'Masonry floor, unknown' },
                    { id: 'FM1', desc: 'Vaulted masonry floor' },
                    { id: 'FM2', desc: 'Shallow-arched masonry floor' },
                    { id: 'FM3', desc: 'Composite cast-in place RC and masonry floor' }
                  ];
floo_conn_grp[1] = [
                    { id: 'FE99', desc: 'Earthen floor, unknown' }
                  ];
floo_conn_grp[2] = [
                    { id: 'FC99', desc: 'Concrete floor, unknown' },
                    { id: 'FC1', desc: 'Cast-in-place beamless RC floor' },
                    { id: 'FC2', desc: 'Cast-in-place beam-supported RC floor' },
                    { id: 'FC3', desc: 'Precast concrete floor with RC topping' },
                    { id: 'FC4', desc: 'Precast concrete floor without RC topping' }
                  ];
floo_conn_grp[3] = [
                    { id: 'FME99', desc: 'Metal floor, unknown' },
                    { id: 'FME1', desc: 'Metal beams, trusses or joists supporting light flooring' },
                    { id: 'FME2', desc: 'Metal floor beams supporting precast concrete slabs' },
                    { id: 'FME3', desc: 'Composite steel deck and concrete slab' }
                  ];
floo_conn_grp[4] = [
                    { id: 'FW99', desc: 'Wooden floor, unknown' },
                    { id: 'FW1', desc: 'Wood beams/trusses & joists supporting light flooring' },
                    { id: 'FW2', desc: 'Wood beams/trusses & joists supporting heavy flooring' },
                    { id: 'FW3', desc: 'Wood-based sheets on joists or beams' },
                    { id: 'FW4', desc: 'Plywood panels or other light-weigth panels for floor' }
                  ];

var floo_syty = [
                 { id: 'FWC99', desc: 'Floor-wall diaphragm connection, unknown' },
                 { id: 'FWCN', desc: 'Floor-wall diaphragm connection not provided' },
                 { id: 'FWCP', desc: 'Floor-wall diaphragm connection present' }
               ];

var foun_type = [
                 { id: 'FOS99', desc: 'Unknown foundation system' },
                 { id: 'FOSSL', desc: 'Shallow foundation, with lateral capacity' },
                 { id: 'FOSN', desc: 'Shallow foundation, with no lateral capacity' },
                 { id: 'FOSDL', desc: 'Deep foundation, with lateral capacity' },
                 { id: 'FOSDN', desc: 'Deep foundation, with no lateral capacity' },
                 { id: 'FOSO', desc: 'Foundation, other' }
               ];

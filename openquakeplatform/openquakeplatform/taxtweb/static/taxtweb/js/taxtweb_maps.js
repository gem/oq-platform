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

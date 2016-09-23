#              direction1 +
#        '/' + Taxonomy[0] + Taxonomy[1] + Taxonomy[34] + Taxonomy[2] +
#        '/' + Taxonomy[3] + Taxonomy[4] +
#        '/' + direction2 +
#        '/' + Taxonomy[5] + Taxonomy[6] + Taxonomy[35] + Taxonomy[7] +
#        '/' + Taxonomy[8] + Taxonomy[9] +
#        '/' + Taxonomy[11] + Taxonomy[12] + Taxonomy[13] + Taxonomy[14] +
#        '/' + Taxonomy[10] +
#        '/' + Taxonomy[15] + Taxonomy[16] +
#        '/' + Taxonomy[17] +
#        '/' + Taxonomy[18] +
#        '/' + Taxonomy[19] + Taxonomy[20] + Taxonomy[22] + Taxonomy[21] + Taxonomy[23] +
#        '/' + Taxonomy[24] +
#        '/' + Taxonomy[25] + Taxonomy[26] + Taxonomy[27] + Taxonomy[28] + Taxonomy[29] +
#        '/' + Taxonomy[30] + Taxonomy[31] + Taxonomy[32] +
#        '/' + Taxonomy[33];


hide_atoms = [[],
              ['CT99', 'ET99', 'MAT99', 'ME99', 'MO99', 'MR99', 'MUN99', 'S99', 'SC99', 'W99'],
              ['DU99', 'L99'],
              [],
              ['CT99', 'ET99', 'MAT99', 'ME99', 'MO99', 'MR99', 'MUN99', 'S99', 'SC99', 'W99'],
              ['DU99', 'L99'],
              ['H99', 'HB99', 'HD99', 'HF99'],
              ['Y99'],
              ['AGR99', 'ASS99', 'COM99', 'EDU99', 'GOV99', 'IND99', 'MIX99', 'OC99', 'RES99'],
              ['BP99'],
              ['PLF99'],
              ['IR99', 'IRPP:IRN', 'IRVP:IRN'],
              ['EW99'],
              ['R99', 'RC99', 'RE99', 'RM99', 'RME99', 'RMT99', 'RSH99', 'RWC99', 'RWO99'],
              ['F99', 'FC99', 'FE99', 'FM99', 'FME99', 'FW99', 'FWC99'],
              ['FOS99']]
              
def taxonomy_full2short(taxt_full):
                  
    try:
        res_atoms = taxt_full.split('/')
        if len(res_atoms) != 16:
            return taxt_full

        if res_atoms[1] == res_atoms[4] and res_atoms[2] == res_atoms[5]:
            # same params case
            res_atoms[3] = res_atoms[4] = res_atoms[5] = ''

            if res_atoms[0] == 'DX+D99':
                res_atoms[0] = ''
            else:
                res_atoms[0] = 'PF'
        else:
            if res_atoms[0] == 'DX+D99':
                res_atoms[0] = 'DX'
                res_atoms[3] = 'DY'

        res_tax = "";
        is_first = True
        for i, res_atom in enumerate(res_atoms):
            if res_atom == "":
                continue

            sub_atoms = res_atom.split('+')
            sub_is_first = True
            for sub_atom in sub_atoms:
                if sub_atom in hide_atoms[i]:
                    continue
                if sub_is_first is False:
                    res_tax += "+"
                else:
                    if is_first:
                        is_first = False
                    else:
                        res_tax += "/"
                
                    sub_is_first = False;
                res_tax += sub_atom
            is_first = False
                
    except Exception:
        return "ERR" + taxt_full

    return res_tax

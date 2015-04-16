from openquakeplatform.taxtweb.taxonomy_map import taxonomy_map

# DX+D99/MAT99/L99/DY+D99/MAT99/L99/H99/Y99/OC99/BP99/PLF99/IR99/EW99/RSH99+RMT99+R99+RWC99/F99+FWC99/FOS99


def taxonomy_short2full(t_short):
    max_pos = 0

    tfull_arr = ['DX+D99', 'MAT99', 'L99', 'DY+D99', 'MAT99', 'L99', 'H99', 'Y99', 'OC99', 'BP99',
                 'PLF99', 'IR99', 'EW99', 'RSH99+RMT99+R99+RWC99', 'F99+FWC99', 'FOS99']

    tfull_arr_orig = tfull_arr[:];

    # split the incoming taxonomy
    t_arr = t_short.split('/')
    for t_el in t_arr:
        # revert from hided DX and DY to explicit unknown values
        if t_el == 'DX':
            t_el = 'DX+D99'

        if t_el == 'DY':
            t_el = 'DY+D99'

        # find the prefix (all what is before '+' or ':' or ',' character
        prefix = t_el.replace('+', ',').replace(':', ',').split(',')[0];
        if prefix == '':
            if (t_arr[0].startswith('DX') and (not t_arr[3].startswith('DY')) and
                max_pos >= 4 and max_pos <= 5):
                tfull_arr[max_pos] = tfull_arr_orig[max_pos]
            max_pos += 1
            continue

        # if prefix is identified
        if prefix in taxonomy_map:
            cur_pos = taxonomy_map[prefix]
            if cur_pos == 1 and max_pos >= 1:
                cur_pos = 4
            elif cur_pos == 2 and max_pos >= 2:
                cur_pos = 5            
            
            if cur_pos == 0:
                # manage special case for coupled DX,DY cell
                if t_el == 'DX+D99':
                    tfull_arr[0] = t_el
                    tfull_arr[3] = 'DY+D99'
                elif t_el == 'DX+PF':
                    tfull_arr[0] = t_el
                    tfull_arr[3] = 'DY+OF'
                else:
                    return None
            elif cur_pos == 3:
                # manage special case for coupled DX,DY cell
                tfull_arr[4] = tfull_arr_orig[4]
                tfull_arr[5] = tfull_arr_orig[5]
                if t_el == 'DY+D99':
                    tfull_arr[0] = 'DX+D99'
                    tfull_arr[3] = t_el
                elif t_el == 'DY+OF':
                    tfull_arr[0] = 'DX+PF'
                    tfull_arr[3] = t_el
                else:
                    return None
            else:
                tfull_arr[cur_pos] = t_el
                # manage special case paired direction Y cells for
                # 'Material' or 'Lateral load-resisting system'
                if cur_pos == 1 or cur_pos == 2:
                    tfull_arr[cur_pos+3] = t_el


            if max_pos < cur_pos:
                max_pos = cur_pos
        else:
            print "t_el: %s not found" % t_el
    
    return ('/'.join(tfull_arr))

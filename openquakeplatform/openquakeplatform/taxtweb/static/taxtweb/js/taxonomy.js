String.prototype.startswith = function(needle)
{
    return(this.indexOf(needle) == 0);
};


function taxonomy_short2full(t_short)
{
    max_pos = 0

    tfull_arr = ['DX+D99', 'MAT99', 'L99', 'DY+D99', 'MAT99', 'L99', 'H99', 'Y99', 'OC99', 'BP99',
                 'PLF99', 'IR99', 'EW99', 'RSH99+RMT99+R99+RWC99', 'F99+FWC99', 'FOS99'];

    tfull_arr_orig = tfull_arr.slice();

    // split the incoming taxonomy
    t_arr = t_short.split('/');
    for (var i = 0 ; i < t_arr.length ; i++) {
        t_el = t_arr[i];
        // revert from hided DX and DY to explicit unknown values
        if (t_el == 'DX') {
            t_el = 'DX+D99';
        }
        else if (t_el == 'PF') {
            t_el = 'DX+PF';
        }

        if (t_el == 'DY') {
            t_el = 'DY+D99';
        }

        // find the prefix (all what is before '+' or ':' or ',' character
        prefix = t_el.replace('+', ',').replace(':', ',').split(',')[0];
        if (prefix == '') {
            if ((t_arr[0].startswith('DX') && (! t_arr[3].startswith('DY')) &&
                 max_pos >= 4 && max_pos <= 5)) {
                tfull_arr[max_pos] = tfull_arr_orig[max_pos];
            }
            max_pos += 1;
            continue;
        }

        // if prefix is identified
        if (prefix in taxonomy_map) {
            cur_pos = taxonomy_map[prefix];
            if (cur_pos == 1 && max_pos >= 1) {
                cur_pos = 4;
            }
            else if (cur_pos == 2 && max_pos >= 2) {
                cur_pos = 5;
            }
            
            if (cur_pos == 0) {
                // manage special case for coupled DX,DY cell
                if (t_el == 'DX+D99') {
                    tfull_arr[0] = t_el;
                    tfull_arr[3] = 'DY+D99';
                }
                else if (t_el == 'DX+PF') {
                    tfull_arr[0] = t_el;
                    tfull_arr[3] = 'DY+OF';
                }
            }
            else if (cur_pos == 3) {
                // manage special case for coupled DX,DY cell
                tfull_arr[4] = tfull_arr_orig[4];
                tfull_arr[5] = tfull_arr_orig[5];
                if (t_el == 'DY+D99') {
                    tfull_arr[0] = 'DX+D99';
                    tfull_arr[3] = t_el;
                }
                else if (t_el == 'DY+OF') {
                    tfull_arr[0] = 'DX+PF';
                    tfull_arr[3] = t_el;
                }
            }
            else {
                tfull_arr[cur_pos] = t_el;
                // manage special case paired direction Y cells for
                // 'Material' or 'Lateral load-resisting system'
                if (cur_pos == 1 || cur_pos == 2) {
                    tfull_arr[cur_pos+3] = t_el;
                }
            }


            if (max_pos < cur_pos) {
                max_pos = cur_pos;
            }
        }
        else {
            return ({ result: null, err_s: "Unknown item '" + t_el + "'" });
        }
    }
    return ({result: tfull_arr.join('/'), err_s: null});
}

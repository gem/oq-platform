var mat_tech =
    { 'MAT99': [],
      'C99': mat_tech_grp[1],

      'CU':  mat_tech_grp[0],

      'CR':  mat_tech_grp[1],
      'SRC': mat_tech_grp[1],

      'S':   mat_tech_grp[2],

      'ME':  mat_tech_grp[3],

      'M99': mat_tech_grp[4],
      'MUR': mat_tech_grp[4],
      'MCF': mat_tech_grp[4],
      'MR':  mat_tech_grp[4],

      'E99': mat_tech_grp[5],
      'EU':  mat_tech_grp[5],
      'ER':  mat_tech_grp[5],

      'W':   mat_tech_grp[6],

      'MATO': []
    };

var mat_tead =
    { 'MAT99': [],
      'C99':   [],
      'CU':    [],
      'CR':    [],
      'SRC':   [],
      'S':     [],
      'ME':    [],
      'M99':   [],
      'MUR':   [],
      'MCF':   [],
      'MR':    mat_tead_grp[0],
      'E99':   [],
      'EU':    [],
      'ER':    [],
      'W':     [],
      'MATO':  []
    };

var mat_prop =
    { 'MAT99': [],
      'C99':   [],

      'CU':    [],

      'CR':    [],
      'SRC':   [],

      'S':   mat_prop_grp[0],

      'ME':    [],

      'M99': mat_prop_grp[1],
      'MUR': mat_prop_grp[1],
      'MCF': mat_prop_grp[1],
      'MR':  mat_prop_grp[1],

      'E99':  [],
      'EU':   [],
      'ER':   [],

      'W':    [],

      'MATO': []
    };

var llrs_type =
    { 'MAT99':llrs_type_grp[2],
      'C99':  llrs_type_grp[2],
      'CU':   llrs_type_grp[2],
      'CR':   llrs_type_grp[2],
      'SRC':  llrs_type_grp[2],
      'S':    llrs_type_grp[2],
      'ME':   llrs_type_grp[2],

      'M99':  llrs_type_grp[1],
      'MUR':  llrs_type_grp[1],
      'MCF':  llrs_type_grp[1],
      'MR':   llrs_type_grp[1],

      'E99':  llrs_type_grp[0],
      'EU':   llrs_type_grp[0],
      'ER':   llrs_type_grp[0],

      'W':    llrs_type_grp[1],

      'MATO': llrs_type_grp[2]
    };

var llrs_duct =
    { 'L99': [],
      'LN': [],
      'LFM': llrs_duct_grp[0],
      'LFINF': llrs_duct_grp[0],
      'LFBR': llrs_duct_grp[0],
      'LPB': llrs_duct_grp[0],
      'LWAL': llrs_duct_grp[0],
      'LDUAL': llrs_duct_grp[0],
      'LFLS': llrs_duct_grp[0],
      'LFLSINF': llrs_duct_grp[0],
      'LH': llrs_duct_grp[0],
      'LO': llrs_duct_grp[0]
    };

var occu_spec =
    { 'OC99': [],
      'RES': occu_spec_grp[0],
      'COM': occu_spec_grp[1],
      'MIX': occu_spec_grp[2],
      'IND': occu_spec_grp[3],
      'AGR': occu_spec_grp[4],
      'ASS': occu_spec_grp[5],
      'GOV': occu_spec_grp[6],
      'EDU': occu_spec_grp[7],
      'OCO': []
    };


var roof_sys =
    { 'R99': [],
      'RM':  roof_sys_grp[0],
      'RE':  roof_sys_grp[1],
      'RC':  roof_sys_grp[2],
      'RME': roof_sys_grp[3],
      'RWO': roof_sys_grp[4],
      'RFA': roof_sys_grp[5],
      'RO':  []
    };

var floo_conn =
    { 'F99': [],
      'FN':  [],
      'FM':  floo_conn_grp[0],
      'FE':  floo_conn_grp[1],
      'FC':  floo_conn_grp[2],
      'FME': floo_conn_grp[3],
      'FW':  floo_conn_grp[4],
      'FO':  []
    };

var gem_taxonomy_form = "";
var gem_taxonomy_form_full = "";

function is_not_negative_float(s)
{
    if (isNaN(s) || parseFloat(s) < 0.0)
        return false;
    return true;
}

function is_in_rect_angle_float(s)
{
    if (!is_not_negative_float(s))
        return false;
    if (parseFloat(s) > 90.0)
        return false;
    return true;
}

function is_not_negative_int(s)
{
    if (isNaN(s) || parseInt(s) < 0.0 || parseInt(s) != parseFloat(s))
        return false;
    return true;
}

function ends_with(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function is_or_are_given(n)
{
    return n + (n <= 1 ? " is" : " are") + " given.";
}

function populate_form()
{
    try {
        var el = window.opener.document.getElementById("id_taxonomy_text_1");
        el.value = gem_taxonomy_form;
        el.onchange();
    }
    catch(e) {
    }
}

function select_populate(id, items)
{
    var preitem, item, text = null, attrs;

    for (var i = 0 ; i < items.length ; i++) {
        attrs = "";
        preitem = items[i];

        if (typeof(preitem) == 'string') {
            item = { '_text': preitem };
        }
        else {
            item = preitem;
        }

        for (var k in item) {
            if (k == '_text')
                text = item[k];
            else {
                if (attrs != "")
                    attrs += ' ';
                attrs += k.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase() + '="' + item[k] + '"';
            }
        }

        gem$('#' + id).append('<option value="' + i + '"' + attrs + '>' + text + '</option>');
    }
    if (items.length > 0) {
        gem$('#' + id).val(0);
    }
}


function taxt_ValidateSystem1() // Ok
{
    gem$('#SystemCB21').empty();

    if (gem$('#SystemCB11').val() == 0 || gem$('#SystemCB11').val() == 1) {
        gem$('#SystemCB21').prop("disabled", true);
    }
    else {
        var SystemCB21 = [];
        /* DU99  */ SystemCB21.push('Ductility unknown');
        /* DUC   */ SystemCB21.push('Ductile');
        /* DNO   */ SystemCB21.push('Non-ductile');
        /* DBD   */ SystemCB21.push('Base isolation and/or energy dissipation devices');
        select_populate('SystemCB21', SystemCB21);
        gem$('#SystemCB21').prop("disabled", false);
    }
}

function taxt_ValidateSystem2() // Ok
{
    gem$('#SystemCB22').empty();

    if (gem$('#SystemCB12').val() == 0 || gem$('#SystemCB12').val() == 1) {
        gem$('#SystemCB22').prop("disabled", true);
    }
    else {
        var SystemCB22 = [];
        /* same */ SystemCB22.push('Ductility unknown');
        /* same */ SystemCB22.push('Ductile');
        /* same */ SystemCB22.push('Non-ductile');
        /* same */ SystemCB22.push('Base isolation and/or energy dissipation devices');
        select_populate('SystemCB22', SystemCB22);
        gem$('#SystemCB22').prop("disabled", false);
    }
}

function taxt_ValidateMaterial1() // Ok
{
    gem$('#MaterialCB21').empty();
    gem$('#MaterialCB31').empty();
    gem$('#MaterialCB41').empty();
    gem$('#SystemCB11').empty();

    if (gem$('#MaterialCB11').val() == 0) {
        gem$('#MaterialCB21').prop("disabled", true);
        gem$('#MaterialCB31').prop("disabled", true);
        gem$('#MaterialCB41').prop("disabled", true);
    }
    else if (gem$('#MaterialCB11').val() == 2) {
        var MaterialCB21 = [];
        /* CT99 */ MaterialCB21.push('Unknown concrete technology');
        /* CIP  */ MaterialCB21.push('Cast-in-place concrete');
        /* PC   */ MaterialCB21.push('Precast concrete');
        select_populate('MaterialCB21', MaterialCB21);
        gem$('#MaterialCB21').prop("disabled", false);
    }
    else if (gem$('#MaterialCB11').val() == 1 ||  gem$('#MaterialCB11').val() == 3 || gem$('#MaterialCB11').val() == 4) {
        var MaterialCB21 = [];
        /* CT99 */ MaterialCB21.push('Unknown concrete technology');
        /* CIP  */ MaterialCB21.push('Cast-in-place concrete');
        /* PC   */ MaterialCB21.push('Precast concrete');
        /* CIPPS*/ MaterialCB21.push('Cast-in-place prestressed concrete');
        /* PCPS */ MaterialCB21.push('Precast prestressed concrete');
        select_populate('MaterialCB21', MaterialCB21);
        gem$('#MaterialCB21').prop("disabled", false);
    }
    else if (gem$('#MaterialCB11').val() == 5) {
        var MaterialCB21 = [];
        /*  S99 */ MaterialCB21.push('Steel, unknown ');
        /*  SL  */ MaterialCB21.push('Cold-formed steel members');
        /*  SR  */ MaterialCB21.push('Hot-rolled steel members');
        /*  SO  */ MaterialCB21.push('Steel, other ');
        select_populate('MaterialCB21', MaterialCB21);
        gem$('#MaterialCB21').prop("disabled", false);
    }
    else if (gem$('#MaterialCB11').val() == 6) {
        var MaterialCB21 = [];
        /* ME99 */ MaterialCB21.push('Metal, unknown ');
        /* MEIR */ MaterialCB21.push('Iron');
        /* MEO  */ MaterialCB21.push('Metal, other ');
        select_populate('MaterialCB21', MaterialCB21);
        gem$('#MaterialCB21').prop("disabled", false);
    }
    else if (gem$('#MaterialCB11').val() > 6 &&
             gem$('#MaterialCB11').val() < 11) {
        var MaterialCB21 = [];
        /* MUN99*/ MaterialCB21.push('Masonry unit, unknown');
        /* ADO  */ MaterialCB21.push('Adobe blocks');
        /* ST99 */ MaterialCB21.push('Stone, unknown technology');
        /* STRUB*/ MaterialCB21.push('Rubble (field stone) or semi-dressed stone');
        /* STDRE*/ MaterialCB21.push('Dressed stone');
        /* CL99 */ MaterialCB21.push('Fired clay unit, unknown type');
        /* CLBRS*/ MaterialCB21.push('Fired clay solid bricks');
        /* CLBRH*/ MaterialCB21.push('Fired clay hollow bricks');
        /* CLBLH*/ MaterialCB21.push('Fired clay hollow blocks or tiles');
        /* CB99 */ MaterialCB21.push('Concrete blocks, unknown type');
        /* CBS  */ MaterialCB21.push('Concrete blocks, solid');
        /* CBH  */ MaterialCB21.push('Concrete blocks, hollow');
        /* MO   */ MaterialCB21.push('Masonry unit, other');
        select_populate('MaterialCB21', MaterialCB21);
        gem$('#MaterialCB21').prop("disabled", false);

        if (gem$('#MaterialCB11').val() == 10) {
            var MaterialCB41 = [];
            /* MR99  */  MaterialCB41.push('Unknown reinforcement');
            /* RS    */  MaterialCB41.push('Steel-reinforced');
            /* RW    */  MaterialCB41.push('Wood-reinforced');
            /* RB    */  MaterialCB41.push('Bamboo-, cane- or rope-reinforced');
            /* RCM   */  MaterialCB41.push('Fibre reinforcing mesh');
            /* RCB   */  MaterialCB41.push('Reinforced concrete bands');
            select_populate('MaterialCB41', MaterialCB41);
            gem$('#MaterialCB41').prop("disabled", false);
        }
    }
    else if (gem$('#MaterialCB11').val() > 10 && gem$('#MaterialCB11').val() < 14) {
        var MaterialCB21 = [];
        /* ET99 */ MaterialCB21.push('Unknown earth technology');
        /* ETR  */ MaterialCB21.push('Rammed earth');
        /* ETC  */ MaterialCB21.push('Cob or wet construction');
        /* ETO  */ MaterialCB21.push('Earth technology, other');
        select_populate('MaterialCB21', MaterialCB21);
        gem$('#MaterialCB21').prop("disabled", false);
    }
    else if (gem$('#MaterialCB11').val() == 14) {
        var MaterialCB21 = [];
        /* W99  */ MaterialCB21.push('Wood, unknown');
        /* WHE  */ MaterialCB21.push('Heavy wood');
        /* WLI  */ MaterialCB21.push('Light wood members');
        /* WS   */ MaterialCB21.push('Solid wood');
        /* WWD  */ MaterialCB21.push('Wattle and daub');
        /* WBB  */ MaterialCB21.push('Bamboo');
        /* WO   */ MaterialCB21.push('Wood, other');
        select_populate('MaterialCB21', MaterialCB21);
        gem$('#MaterialCB21').prop("disabled", false);
    }
    else {
        gem$('#MaterialCB21').prop("disabled", true);
        gem$('#MaterialCB31').prop("disabled", true);
        gem$('#MaterialCB41').prop("disabled", true);
    }

    if (gem$('#MaterialCB11').val() == 5) {
        var MaterialCB31 = [];
        /* SC99  */ MaterialCB31.push('Unknown connection');
        /* WEL   */ MaterialCB31.push('Welded connections');
        /* RIV   */ MaterialCB31.push('Riveted connections');
        /* BOL   */ MaterialCB31.push('Bolted connections');
        select_populate('MaterialCB31', MaterialCB31);
        gem$('#MaterialCB31').prop("disabled", false);
    }
    else if (gem$('#MaterialCB11').val() > 6 &&
             gem$('#MaterialCB11').val() < 11) {
        var MaterialCB31 = [];
        /* MO99  */ MaterialCB31.push('Mortar type, unknown');
        /* MON   */ MaterialCB31.push('No mortar');
        /* MOM   */ MaterialCB31.push('Mud mortar');
        /* MOL   */ MaterialCB31.push('Lime mortar');
        /* MOC   */ MaterialCB31.push('Cement mortar');
        /* MOCL  */ MaterialCB31.push('Cement:lime mortar');
        /* SP99  */ MaterialCB31.push('Stone, unknown type');
        /* SPLI  */ MaterialCB31.push('Limestone');
        /* SPSA  */ MaterialCB31.push('Sandstone');
        /* SPTU  */ MaterialCB31.push('Tuff');
        /* SPSL  */ MaterialCB31.push('Slate');
        /* SPGR  */ MaterialCB31.push('Granite');
        /* SPBA  */ MaterialCB31.push('Basalt');
        /* SPO   */ MaterialCB31.push('Stone, other type');
        select_populate('MaterialCB31', MaterialCB31);
        gem$('#MaterialCB31').prop("disabled", false);
    }
    else {
        gem$('#MaterialCB31').prop("disabled", true);
    }

    if (gem$('#MaterialCB11').val() > 10 && gem$('#MaterialCB11').val() < 14) {
        var SystemCB11 = [];
        /* L99  */ SystemCB11.push('Unknown lateral load-resisting system');
        /* LN   */ SystemCB11.push('No lateral load-resisting system');
        /* LWAL */ SystemCB11.push('Wall');
        /* LH   */ SystemCB11.push('Hybrid lateral load-resisting system');
        /* LO   */ SystemCB11.push('Other lateral load-resisting system');
        select_populate('SystemCB11', SystemCB11);
    }
    else if ((gem$('#MaterialCB11').val() > 6 && gem$('#MaterialCB11').val() < 11) ||
             gem$('#MaterialCB11').val() == 14) {
        var SystemCB11 = [];
        /* L99  */ SystemCB11.push('Unknown lateral load-resisting system');
        /* LN   */ SystemCB11.push('No lateral load-resisting system');
        /* LFM  */ SystemCB11.push('Moment frame');
        /* LPB  */ SystemCB11.push('Post and beam');
        /* LWAL */ SystemCB11.push('Wall');
        /* LH   */ SystemCB11.push('Hybrid lateral load-resisting system');
        /* LO   */ SystemCB11.push('Other lateral load-resisting system');
        select_populate('SystemCB11', SystemCB11);
    }
    else {
        var SystemCB11 = [];
        /* L99  */ SystemCB11.push('Unknown lateral load-resisting system');
        /* LN   */ SystemCB11.push('No lateral load-resisting system');
        /* LFM  */ SystemCB11.push('Moment frame');
        /* LFINF */ SystemCB11.push('Infilled frame');
        /* LFBR */ SystemCB11.push('Braced frame');
        /* LPB  */ SystemCB11.push('Post and beam');
        /* LWAL */ SystemCB11.push('Wall');
        /* LDUAL */ SystemCB11.push('Dual frame-wall system');
        /* LFLS */ SystemCB11.push('Flat slab/plate or waffle slab');
        /* LFLSINF */ SystemCB11.push('Infilled flat slab/plate or infilled waffle slab');
        /* LH   */ SystemCB11.push('Hybrid lateral load-resisting system');
        /* LO   */ SystemCB11.push('Other lateral load-resisting system');
        select_populate('SystemCB11', SystemCB11);
    }

    gem$('#SystemCB11').val(0);
    taxt_ValidateSystem1();
}

function taxt_ValidateMaterial2() // Ok
{
    gem$('#MaterialCB22').empty();
    gem$('#MaterialCB32').empty();
    gem$('#MaterialCB42').empty();
    gem$('#SystemCB12').empty();


    if (gem$('#MaterialCB12').val() == 0) {
        gem$('#MaterialCB22').prop("disabled", true);
        gem$('#MaterialCB32').prop("disabled", true);
        gem$('#MaterialCB42').prop("disabled", true);
    }
    else if (gem$('#MaterialCB12').val() == 2) {
        var MaterialCB22 = [];
        /* same */ MaterialCB22.push('Unknown concrete technology');
        /* same */ MaterialCB22.push('Cast-in-place concrete');
        /* same */ MaterialCB22.push('Precast concrete');
        select_populate('MaterialCB22', MaterialCB22);
        gem$('#MaterialCB22').prop("disabled", false);
    }
    else if (gem$('#MaterialCB12').val() == 1 ||  gem$('#MaterialCB12').val() == 3 || gem$('#MaterialCB12').val() == 4) {
        var MaterialCB22 = [];
        /* same */ MaterialCB22.push('Unknown concrete technology');
        /* same */ MaterialCB22.push('Cast-in-place concrete');
        /* same */ MaterialCB22.push('Precast concrete');
        /* same */ MaterialCB22.push('Cast-in-place prestressed concrete');
        /* same */ MaterialCB22.push('Precast prestressed concrete');
        select_populate('MaterialCB22', MaterialCB22);
        gem$('#MaterialCB22').prop("disabled", false);
    }
    else if (gem$('#MaterialCB12').val() == 5) {
        var MaterialCB22 = [];
        /* same */ MaterialCB22.push('Steel, unknown ');
        /* same */ MaterialCB22.push('Cold-formed steel members');
        /* same */ MaterialCB22.push('Hot-rolled steel members');
        /* same */ MaterialCB22.push('Steel, other ');
        select_populate('MaterialCB22', MaterialCB22);
        gem$('#MaterialCB22').prop("disabled", false);
    }
    else if (gem$('#MaterialCB12').val() == 6) {
        var MaterialCB22 = [];
        /* same */ MaterialCB22.push('Metal, unknown ');
        /* same */ MaterialCB22.push('Iron');
        /* same */ MaterialCB22.push('Metal, other ');
        select_populate('MaterialCB22', MaterialCB22);
        gem$('#MaterialCB22').prop("disabled", false);
    }
    else if (gem$('#MaterialCB12').val() > 6 &&
             gem$('#MaterialCB12').val() < 11) {
        var MaterialCB22 = [];
        /* same */ MaterialCB22.push('Masonry unit, unknown');
        /* same */ MaterialCB22.push('Adobe blocks');
        /* same */ MaterialCB22.push('Stone, unknown technology');
        /* same */ MaterialCB22.push('Rubble (field stone) or semi-dressed stone');
        /* same */ MaterialCB22.push('Dressed stone');
        /* same */ MaterialCB22.push('Fired clay unit, unknown type');
        /* same */ MaterialCB22.push('Fired clay solid bricks');
        /* same */ MaterialCB22.push('Fired clay hollow bricks');
        /* same */ MaterialCB22.push('Fired clay hollow blocks or tiles');
        /* same */ MaterialCB22.push('Concrete blocks, unknown type');
        /* same */ MaterialCB22.push('Concrete blocks, solid');
        /* same */ MaterialCB22.push('Concrete blocks, hollow');
        /* same */ MaterialCB22.push('Masonry unit, other');
        select_populate('MaterialCB22', MaterialCB22);
        gem$('#MaterialCB22').prop("disabled", false);

        if (gem$('#MaterialCB12').val() == 10) {
            var MaterialCB42 = [];
            /* same */ MaterialCB42.push('Unknown reinforcement');
            /* same */ MaterialCB42.push('Steel-reinforced');
            /* same */ MaterialCB42.push('Wood-reinforced');
            /* same */ MaterialCB42.push('Bamboo-, cane- or rope-reinforced');
            /* same */ MaterialCB42.push('Fibre reinforcing mesh');
            /* same */ MaterialCB42.push('Reinforced concrete bands');
            select_populate('MaterialCB42', MaterialCB42);
            gem$('#MaterialCB42').prop("disabled", false);
        }
    }
    else if (gem$('#MaterialCB12').val() > 10 && gem$('#MaterialCB12').val() < 14) {
        var MaterialCB22 = [];
        /* same */ MaterialCB22.push('Unknown earth technology');
        /* same */ MaterialCB22.push('Rammed earth');
        /* same */ MaterialCB22.push('Cob or wet construction');
        /* same */ MaterialCB22.push('Earth technology, other');
        select_populate('MaterialCB22', MaterialCB22);
        gem$('#MaterialCB22').prop("disabled", false);
    }
    else if (gem$('#MaterialCB12').val() == 14) {
        var MaterialCB22 = [];
        /* same */ MaterialCB22.push('Wood, unknown');
        /* same */ MaterialCB22.push('Heavy wood');
        /* same */ MaterialCB22.push('Light wood members');
        /* same */ MaterialCB22.push('Solid wood');
        /* same */ MaterialCB22.push('Wattle and daub');
        /* same */ MaterialCB22.push('Bamboo');
        /* same */ MaterialCB22.push('Wood, other');
        select_populate('MaterialCB22', MaterialCB22);
        gem$('#MaterialCB22').prop("disabled", false);
    }
    else {
        gem$('#MaterialCB22').prop("disabled", true);
        gem$('#MaterialCB32').prop("disabled", true);
        gem$('#MaterialCB42').prop("disabled", true);
    }

    if (gem$('#MaterialCB12').val() == 5) {
        var MaterialCB32 = [];
        /* same */ MaterialCB32.push('Unknown connection');
        /* same */ MaterialCB32.push('Welded connections');
        /* same */ MaterialCB32.push('Riveted connections');
        /* same */ MaterialCB32.push('Bolted connections');
        select_populate('MaterialCB32', MaterialCB32);
        gem$('#MaterialCB32').prop("disabled", false);
    }
    else if (gem$('#MaterialCB12').val() > 6 &&
             gem$('#MaterialCB12').val() < 11) {
        var MaterialCB32 = [];
        /* same */ MaterialCB32.push('Mortar type, unknown');
        /* same */ MaterialCB32.push('No mortar');
        /* same */ MaterialCB32.push('Mud mortar');
        /* same */ MaterialCB32.push('Lime mortar');
        /* same */ MaterialCB32.push('Cement mortar');
        /* same */ MaterialCB32.push('Cement:lime mortar');
        /* same */ MaterialCB32.push('Stone, unknown type');
        /* same */ MaterialCB32.push('Limestone');
        /* same */ MaterialCB32.push('Sandstone');
        /* same */ MaterialCB32.push('Tuff');
        /* same */ MaterialCB32.push('Slate');
        /* same */ MaterialCB32.push('Granite');
        /* same */ MaterialCB32.push('Basalt');
        /* same */ MaterialCB32.push('Stone, other type');
        select_populate('MaterialCB32', MaterialCB32);
        gem$('#MaterialCB32').prop("disabled", false);
    }
    else {
        gem$('#MaterialCB32').prop("disabled", true);
    }

    if (gem$('#MaterialCB12').val() > 10 && gem$('#MaterialCB12').val() < 14) {
        var SystemCB12 = [];
        /* same */ SystemCB12.push('Unknown lateral load-resisting system');
        /* same */ SystemCB12.push('No lateral load-resisting system');
        /* same */ SystemCB12.push('Wall');
        /* same */ SystemCB12.push('Hybrid lateral load-resisting system');
        /* same */ SystemCB12.push('Other lateral load-resisting system');
        select_populate('SystemCB12', SystemCB12);
    }
    else if ((gem$('#MaterialCB12').val() > 6 && gem$('#MaterialCB12').val() < 11) ||
             gem$('#MaterialCB12').val() == 14) {
        var SystemCB12 = [];
        /* same */ SystemCB12.push('Unknown lateral load-resisting system');
        /* same */ SystemCB12.push('No lateral load-resisting system');
        /* same */ SystemCB12.push('Moment frame');
        /* same */ SystemCB12.push('Post and beam');
        /* same */ SystemCB12.push('Wall');
        /* same */ SystemCB12.push('Hybrid lateral load-resisting system');
        /* same */ SystemCB12.push('Other lateral load-resisting system');
        select_populate('SystemCB12', SystemCB12);
    }
    else {
        var SystemCB12 = [];
        /* same */ SystemCB12.push('Unknown lateral load-resisting system');
        /* same */ SystemCB12.push('No lateral load-resisting system');
        /* same */ SystemCB12.push('Moment frame');
        /* same */ SystemCB12.push('Infilled frame');
        /* same */ SystemCB12.push('Braced frame');
        /* same */ SystemCB12.push('Post and beam');
        /* same */ SystemCB12.push('Wall');
        /* same */ SystemCB12.push('Dual frame-wall system');
        /* same */ SystemCB12.push('Flat slab/plate or waffle slab');
        /* same */ SystemCB12.push('Infilled flat slab/plate or infilled waffle slab');
        /* same */ SystemCB12.push('Hybrid lateral load-resisting system');
        /* same */ SystemCB12.push('Other lateral load-resisting system');
        select_populate('SystemCB12', SystemCB12);
    }

    gem$('#SystemCB12').val(0);
    taxt_ValidateSystem2();
}

function taxt_ValidateHeight() // Ok
{
    gem$('#HeightCB2').prop("disabled", true);
    gem$('#HeightCB3').prop("disabled", true);
    gem$('#HeightCB4').prop("disabled", true);
    gem$('#noStoreysE11').prop("disabled", true);
    gem$('#noStoreysE11').removeClass('gem_field_alert');
    gem$('#noStoreysE12').prop("disabled", true);
    gem$('#noStoreysE12').removeClass('gem_field_alert');

    gem$('#noStoreysE21').prop("disabled", true);
    gem$('#noStoreysE21').removeClass('gem_field_alert');
    gem$('#noStoreysE22').prop("disabled", true);
    gem$('#noStoreysE22').removeClass('gem_field_alert');

    gem$('#noStoreysE31').prop("disabled", true);
    gem$('#noStoreysE31').removeClass('gem_field_alert');
    gem$('#noStoreysE32').prop("disabled", true);
    gem$('#noStoreysE32').removeClass('gem_field_alert');
    gem$('#noStoreysE41').prop("disabled", true);
    gem$('#noStoreysE41').removeClass('gem_field_alert');

    if (gem$('#HeightCB1').val() > 0) {
        gem$('#HeightCB2').prop("disabled", false);
        gem$('#HeightCB3').prop("disabled", false);
        gem$('#HeightCB4').prop("disabled", false);
        gem$('#noStoreysE11').prop("disabled", false);
        gem$('#noStoreysE12').prop("disabled", false);

        if (gem$('#HeightCB1').val() == 1) {
            gem$('#noStoreysE11').css('width', '45%');
            gem$('#noStoreysE11').prop("disabled", false);
            gem$('#noStoreysE12').css('display', 'inline');
            gem$('#noStoreysE12').prop("disabled", false);
        }
        else {
            gem$('#noStoreysE11').css('width', '90%');
            gem$('#noStoreysE11').prop("disabled", false);
            gem$('#noStoreysE12').css('display', 'none');
            gem$('#noStoreysE12').prop("disabled", true);
        }

        if (gem$('#HeightCB2').val() == 0) {
            gem$('#noStoreysE21').css('width', '90%');
            gem$('#noStoreysE21').prop("disabled", true);
            gem$('#noStoreysE22').css('display', 'none');
            gem$('#noStoreysE22').prop("disabled", true);
        }
        else if (gem$('#HeightCB2').val() == 1) {
            gem$('#noStoreysE21').css('width', '45%');
            gem$('#noStoreysE21').prop("disabled", false);
            gem$('#noStoreysE22').css('display', 'inline');
            gem$('#noStoreysE22').prop("disabled", false);
        }
        else {
            gem$('#noStoreysE21').css('width', '90%');
            gem$('#noStoreysE21').prop("disabled", false);
            gem$('#noStoreysE22').css('display', 'none');
            gem$('#noStoreysE22').prop("disabled", true);
        }

        if (gem$('#HeightCB3').val() == 0) {
            gem$('#noStoreysE31').css('width', '90%');
            gem$('#noStoreysE31').prop("disabled", true);
            gem$('#noStoreysE32').css('display', 'none');
            gem$('#noStoreysE32').prop("disabled", true);
        }
        else if (gem$('#HeightCB3').val() == 1) {
            gem$('#noStoreysE31').css('width', '45%');
            gem$('#noStoreysE31').prop("disabled", false);
            gem$('#noStoreysE32').css('display', 'inline');
            gem$('#noStoreysE32').prop("disabled", false);
        }
        else {
            gem$('#noStoreysE31').css('width', '90%');
            gem$('#noStoreysE31').prop("disabled", false);
            gem$('#noStoreysE32').css('display', 'none');
            gem$('#noStoreysE32').prop("disabled", true);
        }

        if (gem$('#HeightCB4').val() == 0) {
            gem$('#noStoreysE41').prop("disabled", true);
        }
        else {
            gem$('#noStoreysE41').prop("disabled", false);
        }
    }
    else {
        gem$('#noStoreysE11').css('width', '90%');
        gem$('#noStoreysE11').prop("disabled", true);
        gem$('#noStoreysE12').css('display', 'none');
        gem$('#noStoreysE12').prop("disabled", true);
    }
}

function taxt_ValidateDate() // Ok
{
    gem$('#DateE1').removeClass('gem_field_alert');
    gem$('#DateE2').removeClass('gem_field_alert');

    if (gem$('#DateCB1').val() == 0) {
        gem$('#DateE1').css('width', '90%');
        gem$('#DateE1').prop("disabled", true);
        gem$('#DateE2').prop("disabled", true);
    }
    else if (gem$('#DateCB1').val() == 2) {
        gem$('#DateE1').css('width', '45%');
        gem$('#DateE1').prop("disabled", false);
        gem$('#DateE2').css('display', 'inline');
        gem$('#DateE2').prop("disabled", false);
    }
    else {
        gem$('#DateE1').css('width', '90%');
        gem$('#DateE1').prop("disabled", false);
        gem$('#DateE2').css('display', 'none');
        gem$('#DateE2').prop("disabled", true);
    }
}

function taxt_ValidateOccupancy() // Ok
{

    gem$('#OccupancyCB2').empty();

    if (gem$('#OccupancyCB1').val() == 0) {
        gem$('#OccupancyCB2').prop("disabled", true);
    }
    else if (gem$('#OccupancyCB1').val() == 1) {
        var OccupancyCB2 = [];
        /* RES99  */ OccupancyCB2.push('Residential, unknown type');
        /* RES1   */ OccupancyCB2.push('Single dwelling');
        /* RES2   */ OccupancyCB2.push('Multi-unit, unknown type');
        /* RES2A  */ OccupancyCB2.push('2 Units (Duplex)');
        /* RES2B  */ OccupancyCB2.push('3-4 Units');
        /* RES2C  */ OccupancyCB2.push('5-9 Units');
        /* RES2D  */ OccupancyCB2.push('10-19 Units');
        /* RES2E  */ OccupancyCB2.push('20-49 Units');
        /* RES2F  */ OccupancyCB2.push('50+ Units');
        /* RES3   */ OccupancyCB2.push('Temporary lodging');
        /* RES4   */ OccupancyCB2.push('Institutional housing');
        /* RES5   */ OccupancyCB2.push('Mobile home');
        /* RES6   */ OccupancyCB2.push('Informal housing');
        select_populate('OccupancyCB2', OccupancyCB2);
        gem$('#OccupancyCB2').prop("disabled", false);
    }
    else if (gem$('#OccupancyCB1').val() == 2) {
        var OccupancyCB2 = [];
        /* COM99  */ OccupancyCB2.push('Commercial and public, unknown type');
        /* COM1   */ OccupancyCB2.push('Retail trade');
        /* COM2   */ OccupancyCB2.push('Wholesale trade and storage (warehouse)');
        /* COM3   */ OccupancyCB2.push('Offices, professional/technical services');
        /* COM4   */ OccupancyCB2.push('Hospital/medical clinic');
        /* COM5   */ OccupancyCB2.push('Entertainment');
        /* COM6   */ OccupancyCB2.push('Public building');
        /* COM7   */ OccupancyCB2.push('Covered parking garage');
        /* COM8   */ OccupancyCB2.push('Bus station');
        /* COM9   */ OccupancyCB2.push('Railway station');
        /* COM10  */ OccupancyCB2.push('Airport');
        /* COM11  */ OccupancyCB2.push('Recreation and leisure');
        select_populate('OccupancyCB2', OccupancyCB2);
        gem$('#OccupancyCB2').prop("disabled", false);
    }
    else if (gem$('#OccupancyCB1').val() == 3) {
        var OccupancyCB2 = [];
        /* MIX99  */ OccupancyCB2.push('Mixed, unknown type');
        /* MIX1   */ OccupancyCB2.push('Mostly residential and commercial');
        /* MIX2   */ OccupancyCB2.push('Mostly commercial and residential');
        /* MIX3   */ OccupancyCB2.push('Mostly commercial and industrial');
        /* MIX4   */ OccupancyCB2.push('Mostly residential and industrial');
        /* MIX5   */ OccupancyCB2.push('Mostly industrial and commercial');
        /* MIX6   */ OccupancyCB2.push('Mostly industrial and residential');
        select_populate('OccupancyCB2', OccupancyCB2);
        gem$('#OccupancyCB2').prop("disabled", false);
    }
    else if (gem$('#OccupancyCB1').val() == 4) {
        var OccupancyCB2 = [];
        /* IND99  */ OccupancyCB2.push('Industrial, unknown type');
        /* IND1   */ OccupancyCB2.push('Heavy industrial');
        /* IND2   */ OccupancyCB2.push('Light industrial');
        select_populate('OccupancyCB2', OccupancyCB2);
        gem$('#OccupancyCB2').prop("disabled", false);
    }
    else if (gem$('#OccupancyCB1').val() == 5) {
        var OccupancyCB2 = [];
        /* AGR99  */ OccupancyCB2.push('Agriculture, unknown type');
        /* AGR1   */ OccupancyCB2.push('Produce storage');
        /* AGR2   */ OccupancyCB2.push('Animal shelter');
        /* AGR3   */ OccupancyCB2.push('Agricultural processing');
        select_populate('OccupancyCB2', OccupancyCB2);
        gem$('#OccupancyCB2').prop("disabled", false);
    }
    else if (gem$('#OccupancyCB1').val() == 6) {
        var OccupancyCB2 = [];
        /* ASS99  */ OccupancyCB2.push('Assembly, unknown type');
        /* ASS1   */ OccupancyCB2.push('Religious gathering');
        /* ASS2   */ OccupancyCB2.push('Arena');
        /* ASS3   */ OccupancyCB2.push('Cinema or concert hall');
        /* ASS4   */ OccupancyCB2.push('Other gatherings');
        select_populate('OccupancyCB2', OccupancyCB2);
        gem$('#OccupancyCB2').prop("disabled", false);
    }
    else if (gem$('#OccupancyCB1').val() == 7) {
        var OccupancyCB2 = [];
        /* GOV99  */ OccupancyCB2.push('Government, unknown type');
        /* GOV1   */ OccupancyCB2.push('Government, general services');
        /* GOV2   */ OccupancyCB2.push('Government, emergency response');
        select_populate('OccupancyCB2', OccupancyCB2);
        gem$('#OccupancyCB2').prop("disabled", false);
    }
    else if (gem$('#OccupancyCB1').val() == 8) {
        var OccupancyCB2 = [];
        /* EDU99  */ OccupancyCB2.push('Education, unknown type');
        /* EDU1   */ OccupancyCB2.push('Pre-school facility');
        /* EDU2   */ OccupancyCB2.push('School');
        /* EDU3   */ OccupancyCB2.push('College/university, offices and/or classrooms');
        /* EDU4   */ OccupancyCB2.push('College/university, research facilities and/or labs');
        select_populate('OccupancyCB2', OccupancyCB2);
        gem$('#OccupancyCB2').prop("disabled", false);
    }
    else {
        gem$('#OccupancyCB2').prop("disabled", true);
    }

}

function taxt_ValidateRegularity()
{
    gem$('#RegularityCB2').empty();
    gem$('#RegularityCB3').empty();
    gem$('#RegularityCB4').empty();
    gem$('#RegularityCB5').empty();

    var disabled_cb2 = [], default_cb2 = 0;
    var disabled_cb3 = [], default_cb3 = 0;

    if (gem$('#RegularityCB1').val() == 0 ||
        gem$('#RegularityCB1').val() == 1) {
        gem$('#RegularityCB2').prop("disabled", true);
        gem$('#RegularityCB3').prop("disabled", true);
        gem$('#RegularityCB4').prop("disabled", true);
        gem$('#RegularityCB5').prop("disabled", true);
    }
    else if (gem$('#RegularityCB1').val() == 2) {
        var RegularityCB3 = [];
        if (gem$('#RegularityCB2').val() == 0) {
            RegularityCB3.push({ _name: 'No irregularity', disabled: '' });
            default_cb3 = 1;
        }
        else {
            /* IRVP:IRN  */ RegularityCB3.push('No irregularity');
        }
        /* IRVP:SOS  */ RegularityCB3.push('Soft storey');
        /* IRVP:CRW  */ RegularityCB3.push('Cripple wall');
        /* IRVP:SHC  */ RegularityCB3.push('Short column');
        /* IRVP:POP  */ RegularityCB3.push('Pounding potential');
        /* IRVP:SET  */ RegularityCB3.push('Setback');
        /* IRVP:CHV  */ RegularityCB3.push('Change in vertical structure');
        /* IRVP:IRVO */ RegularityCB3.push('Other vertical irregularity');
        gem$('#RegularityCB3').prop("disabled", false);
        select_populate('RegularityCB3', RegularityCB3);
        gem$('#RegularityCB3').val(default_cb3);

        var RegularityCB2 = [];
        if (gem$('#RegularityCB3').val() == 0) {
            RegularityCB2.push({ _text: 'No irregularity', disabled: '' });
            default_cb2 = 1;
        }
        else {
            /* IRPP:IRN */ RegularityCB2.push('No irregularity');
        }
        /* IRPP:TOR */ RegularityCB2.push('Torsion eccentricity');
        /* IRPP:REC */ RegularityCB2.push('Re-entrant corner');
        /* IRPP:IRHO */ RegularityCB2.push('Other plan irregularity');
        gem$('#RegularityCB2').prop("disabled", false);
        select_populate('RegularityCB2', RegularityCB2);
        gem$('#RegularityCB2').val(default_cb2);
    }
    taxt_RegularityCB2Select(null);
    taxt_RegularityCB3Select(null);
}

function taxt_ValidateRegularityCross23(who)
{
    if (who == "2") {
        if (gem$('#RegularityCB2').val() != 0) {
            gem$('#RegularityCB3 option:eq(0)').prop("disabled", false);
        }
        else {
            gem$('#RegularityCB3 option:eq(0)').prop("disabled", true);
        }
    }
    if (who == "3") {
        if (gem$('#RegularityCB3').val() != 0) {
            gem$('#RegularityCB2 option:eq(0)').prop("disabled", false);
        }
        else {
            gem$('#RegularityCB2 option:eq(0)').prop("disabled", true);
        }
    }
}

function taxt_ValidateRegularity2()
{
    gem$('#RegularityCB4').empty();

    if (gem$('#RegularityCB1').val() < 2 || gem$('#RegularityCB2').val() == 0 || gem$('#RegularityCB2').val() == null) {
        gem$('#RegularityCB4').prop("disabled", true);
    }
    else {
        var RegularityCB4 = [];
        /* IRPS:IRN  */ RegularityCB4.push('No irregularity');
        /* IRPS:TOR  */ RegularityCB4.push('Torsion eccentricity');
        /* IRPS:REC  */ RegularityCB4.push('Re-entrant corner');
        /* IRPS:IRHO */ RegularityCB4.push('Other plan irregularity');
        select_populate('RegularityCB4', RegularityCB4);
        gem$('#RegularityCB4').prop("disabled", false);
    }
    taxt_ValidateRegularityCross23("2");
}


function taxt_ValidateRegularity3()
{
    gem$('#RegularityCB5').empty();

    if (gem$('#RegularityCB1').val() < 2 || gem$('#RegularityCB3').val() == 0 || gem$('#RegularityCB3').val() == null) {
        gem$('#RegularityCB5').prop("disabled", true);
    }
    else {
        var RegularityCB5 = [];

        /* IRVS:IRN  */ RegularityCB5.push('No irregularity');
        /* IRVS:SOS  */ RegularityCB5.push('Soft storey');
        /* IRVS:CRW  */ RegularityCB5.push('Cripple wall');
        /* IRVS:SHC  */ RegularityCB5.push('Short column');
        /* IRVS:POP  */ RegularityCB5.push('Pounding potential');
        /* IRVS:SET  */ RegularityCB5.push('Setback');
        /* IRVS:CHV  */ RegularityCB5.push('Change in vertical structure');
        /* IRVS:IRVO */ RegularityCB5.push('Other vertical irregularity');
        select_populate('RegularityCB5', RegularityCB5);
        gem$('#RegularityCB5').prop("disabled", false);
    }
    taxt_ValidateRegularityCross23("3");
}

function taxt_ValidateRoof()
{

    gem$('#RoofCB4').empty();
    if (gem$('#RoofCB3').val() == 0 || gem$('#RoofCB3').val() == 7) {
        gem$('#RoofCB4').prop("disabled", true);
    }
    else if (gem$('#RoofCB3').val() == 1) {
        var RoofCB4 = [];
        /* RM99 */ RoofCB4.push('Masonry roof, unknown');
        /* RM1  */ RoofCB4.push('Vaulted masonry roof');
        /* RM2  */ RoofCB4.push('Shallow-arched masonry roof');
        /* RM3  */ RoofCB4.push('Composite masonry and concrete roof system');
        select_populate('RoofCB4', RoofCB4);
        gem$('#RoofCB4').prop("disabled", false);
    }
    else if (gem$('#RoofCB3').val() == 2) {
        var RoofCB4 = [];
        /* RE99 */ RoofCB4.push('Earthen roof, unknown');
        /* RE1  */ RoofCB4.push('Vaulted earthen roofs');
        select_populate('RoofCB4', RoofCB4);
        gem$('#RoofCB4').prop("disabled", false);
    }
    else if (gem$('#RoofCB3').val() == 3) {
        var RoofCB4 = [];
        /* RC99 */ RoofCB4.push('Concrete roof, unknown');
        /* RC1  */ RoofCB4.push('Cast-in-place beamless RC roof');
        /* RC2  */ RoofCB4.push('Cast-in-place beam-supported RC roof');
        /* RC3  */ RoofCB4.push('Precast concrete roof with RC topping');
        /* RC4  */ RoofCB4.push('Precast concrete roof without RC topping');
        select_populate('RoofCB4', RoofCB4);
        gem$('#RoofCB4').prop("disabled", false);
    }
    else if (gem$('#RoofCB3').val() == 4) {
        var RoofCB4 = [];
        /* RME99 */ RoofCB4.push('Metal roof, unknown');
        /* RME1  */ RoofCB4.push('Metal beams or trusses supporting light roofing');
        /* RME2  */ RoofCB4.push('Metal roof beams supporting precast concrete slabs');
        /* RME3  */ RoofCB4.push('Composite steel roof deck and concrete slab');
        select_populate('RoofCB4', RoofCB4);
        gem$('#RoofCB4').prop("disabled", false);
    }
    else if (gem$('#RoofCB3').val() == 5) {
        var RoofCB4 = [];
        /* RWO99 */ RoofCB4.push('Wooden roof, unknown');
        /* RWO1  */ RoofCB4.push('Wooden structure with light roof covering');
        /* RWO2  */ RoofCB4.push('Wooden beams or trusses with heavy roof covering');
        /* RWO3  */ RoofCB4.push('Wood-based sheets on rafters or purlins');
        /* RWO4  */ RoofCB4.push('Plywood panels or other light-weigth panels for roof');
        /* RWO5  */ RoofCB4.push('Bamboo, straw or thatch roof');
        select_populate('RoofCB4', RoofCB4);
        gem$('#RoofCB4').prop("disabled", false);
    }
    else if (gem$('#RoofCB3').val() == 6) {
        var RoofCB4 = [];
        /* RFA1 */ RoofCB4.push('Inflatable or tensile membrane roof');
        /* RFAO */ RoofCB4.push('Fabric roof, other');
        select_populate('RoofCB4', RoofCB4);
        gem$('#RoofCB4').prop("disabled", false);
    }
}

function taxt_ValidateFloor()
{
    gem$('#FloorCB2').empty();

    if (gem$('#FloorCB1').val() == 0 || gem$('#FloorCB1').val() == 1 || gem$('#FloorCB1').val() == 7)
        gem$('#FloorCB2').prop("disabled", true);
    else if (gem$('#FloorCB1').val() == 2) {
        var FloorCB2 = [];
        /* FM99 */ FloorCB2.push('Masonry floor, unknown');
        /* FM1  */ FloorCB2.push('Vaulted masonry floor');
        /* FM2  */ FloorCB2.push('Shallow-arched masonry floor');
        /* FM3  */ FloorCB2.push('Composite cast-in place RC and masonry floor');
        select_populate('FloorCB2', FloorCB2);
        gem$('#FloorCB2').prop("disabled", false);
    }
    else if (gem$('#FloorCB1').val() == 3) {
        var FloorCB2 = [];
        /* FE99 */ FloorCB2.push('Earthen floor, unknown');
        select_populate('FloorCB2', FloorCB2);
        gem$('#FloorCB2').prop("disabled", false);
    }
    else if (gem$('#FloorCB1').val() == 4)  {
        var FloorCB2 = [];
        /* FC99 */ FloorCB2.push('Concrete floor, unknown');
        /* FC1  */ FloorCB2.push('Cast-in-place beamless RC floor');
        /* FC2  */ FloorCB2.push('Cast-in-place beam-supported RC floor');
        /* FC3  */ FloorCB2.push('Precast concrete floor with RC topping');
        /* FC4  */ FloorCB2.push('Precast concrete floor without RC topping');
        select_populate('FloorCB2', FloorCB2);
        gem$('#FloorCB2').prop("disabled", false);
    }
    else if (gem$('#FloorCB1').val() == 5) {
        var FloorCB2 = [];
        /* FME99 */ FloorCB2.push('Metal floor, unknown');
        /* FME1  */ FloorCB2.push('Metal beams, trusses or joists supporting light flooring');
        /* FME2  */ FloorCB2.push('Metal floor beams supporting precast concrete slabs');
        /* FME3  */ FloorCB2.push('Composite steel deck and concrete slab');
        select_populate('FloorCB2', FloorCB2);
        gem$('#FloorCB2').prop("disabled", false);
    }
    else if (gem$('#FloorCB1').val() == 6) {
        var FloorCB2 = [];
        /* FW99 */ FloorCB2.push('Wooden floor, unknown');
        /* FW1  */ FloorCB2.push('Wood beams/trusses & joists supporting light flooring');
        /* FW2  */ FloorCB2.push('Wood beams/trusses & joists supporting heavy flooring');
        /* FW3  */ FloorCB2.push('Wood-based sheets on joists or beams');
        /* FW4  */ FloorCB2.push('Plywood panels or other light-weigth panels for floor');
        select_populate('FloorCB2', FloorCB2);
        gem$('#FloorCB2').prop("disabled", false);
    }
}

function taxt_BreakDirection2(obj) // Ok
{
    /* the check is performed just when called with parameter (triggered indirectly
       from an event or if forced by another function */
    if (typeof(obj) == 'undefined') {
        return;
    }
    if (gem$('#DirectionCB').prop('checked')) {
        if (gem$('#MaterialCB12').val() != gem$('#MaterialCB11').val() ||
            gem$('#MaterialCB22').val() != gem$('#MaterialCB21').val() ||
            gem$('#MaterialCB32').val() != gem$('#MaterialCB31').val() ||
            gem$('#MaterialCB42').val() != gem$('#MaterialCB41').val() ||
            gem$('#SystemCB12').val() != gem$('#SystemCB11').val() ||
            gem$('#SystemCB22').val() != gem$('#SystemCB21').val()) {
            gem$('#DirectionCB').prop('checked', false);
        }
    }
}

function taxt_SetDirection2(obj) // Ok
{
    if (gem$('#DirectionCB').prop('checked')) {
        gem$('#MaterialCB12').val(gem$('#MaterialCB11').val());
        taxt_MaterialCB12Select();
        gem$('#MaterialCB22').val(gem$('#MaterialCB21').val());
        taxt_MaterialCB22Select();
        gem$('#MaterialCB32').val(gem$('#MaterialCB31').val());
        taxt_MaterialCB32Select();
        gem$('#MaterialCB42').val(gem$('#MaterialCB41').val());
        taxt_MaterialCB42Select();
        gem$('#SystemCB12').val(gem$('#SystemCB11').val());
        taxt_SystemCB12Select();
        gem$('#SystemCB22').val(gem$('#SystemCB21').val());
        taxt_SystemCB22Select();
    }
}

function taxt_MaterialCB11Select(obj) // Ok
{
    taxt_ValidateMaterial1();
    taxt_SetDirection2();
    if (gem$('#DirectionCB').prop('checked')) {
        taxt_ValidateMaterial2();
    }
    taxt_BuildTaxonomy();
}

function taxt_MaterialCB12Select(obj) // Ok
{
    taxt_ValidateMaterial2();
    taxt_BreakDirection2(obj);
    taxt_ValidateSystem2();
    taxt_BuildTaxonomy();
}

function taxt_MaterialCB21Select(obj) // Ok
{
    taxt_SetDirection2();
    taxt_BuildTaxonomy();
}

function taxt_MaterialCB22Select(obj) // Ok
{
    taxt_BreakDirection2(obj);
    taxt_BuildTaxonomy();
}

function taxt_MaterialCB31Select(obj) // Ok
{
    taxt_SetDirection2();
    taxt_BuildTaxonomy();
}

function taxt_MaterialCB32Select(obj) // Ok
{
    taxt_BreakDirection2(obj);
    taxt_BuildTaxonomy();
}

function taxt_MaterialCB41Select(obj) // Ok
{
    taxt_SetDirection2();
    taxt_BuildTaxonomy();
}

function taxt_MaterialCB42Select(obj) // Ok
{
    taxt_BreakDirection2(obj);
    taxt_BuildTaxonomy();
}

function taxt_SystemCB11Select(obj) // Ok
{
    taxt_SetDirection2();
    taxt_ValidateSystem1();
    if (gem$('#DirectionCB').prop('checked')) {
        taxt_ValidateSystem2();
    }
    taxt_BuildTaxonomy();
}

function taxt_SystemCB12Select(obj) // Ok
{
    taxt_ValidateSystem2();
    taxt_BreakDirection2(obj);
    taxt_BuildTaxonomy();
}

function taxt_SystemCB21Select(obj) // Ok
{
    taxt_SetDirection2();
    taxt_BuildTaxonomy();
}

function taxt_SystemCB22Select(obj) // Ok
{
    taxt_BreakDirection2(obj);
    taxt_BuildTaxonomy();
    /* FIXME ask probably question
    if SystemCB22.ItemIndex>0 then begin
                      reportForm.SystemCB22.Checked:= true;
    end
    else begin
             reportForm.MaterialCB22.Checked:= false;
    end;
    */
}

function taxt_HeightCB1Select(obj) // Ok
{
    taxt_ValidateHeight();
    taxt_BuildTaxonomy();
}

function taxt_HeightCB2Select(obj) // Ok
{
    taxt_ValidateHeight();
    taxt_BuildTaxonomy();
}

function taxt_HeightCB3Select(obj) // Ok
{
    taxt_ValidateHeight();
    taxt_BuildTaxonomy();
}

function taxt_HeightCB4Select(obj) // Ok
{
    taxt_ValidateHeight();
    taxt_BuildTaxonomy();
}

function taxt_DateCB1Select(obj) // Ok
{
    taxt_ValidateDate();
    taxt_BuildTaxonomy();
}

function taxt_DateE1Change(obj) // Ok
{
    taxt_BuildTaxonomy();
}

function taxt_DateE2Change(obj) // Ok
{
    taxt_BuildTaxonomy();
}

function taxt_OccupancyCB1Select(obj) // Ok
{
    taxt_ValidateOccupancy();
    taxt_BuildTaxonomy();
}

function taxt_OccupancyCB2Select(obj) // Ok
{
    taxt_BuildTaxonomy();
    /*
      MOP: FIXME WHY THIS IN THE REPORT ?
      if OccupancyCB2.ItemIndex>0 then begin
          reportForm.OccupancyCB2.Checked:= true;
      end
      else begin
          reportForm.OccupancyCB2.Checked:= false;
      end;
    */
}


function taxt_PlanShapeCBSelect(obj)
{
    taxt_BuildTaxonomy();
}

function taxt_PositionCBSelect(obj)
{
    taxt_BuildTaxonomy();
}

function taxt_RegularityCB1Select(obj)
{
    taxt_ValidateRegularity();
    taxt_BuildTaxonomy();
}

function taxt_RegularityCB2Select(obj)
{
    taxt_ValidateRegularity2();
    taxt_BuildTaxonomy();
}

function taxt_RegularityCB3Select(obj)
{
    taxt_ValidateRegularity3();
    taxt_BuildTaxonomy();
}

function taxt_RegularityCB4Select(obj)
{
    taxt_BuildTaxonomy();
}

function taxt_RegularityCB5Select(obj)
{
    taxt_BuildTaxonomy();
}

function taxt_WallsCBSelect(obj)
{
    taxt_BuildTaxonomy();
}

function taxt_RoofCB1Select(obj)
{
    taxt_ValidateRoof();
    taxt_BuildTaxonomy();
}

function taxt_RoofCB2Select(obj)
{
    taxt_BuildTaxonomy();
}

function taxt_RoofCB3Select(obj)
{
    taxt_ValidateRoof();
    taxt_BuildTaxonomy();
}

function taxt_RoofCB4Select(obj)
{
    taxt_BuildTaxonomy();
}

function taxt_RoofCB5Select(obj)
{
    taxt_BuildTaxonomy();
}

function taxt_FoundationsCBSelect(obj)
{
    taxt_BuildTaxonomy();
}


function taxt_FloorCB1Select(obj)
{
    taxt_ValidateFloor();
    taxt_BuildTaxonomy();
}

function taxt_FloorCB2Select(obj)
{
    taxt_BuildTaxonomy();
    /*
  if FloorCB2.ItemIndex>0 then begin
    reportForm.FloorCB2.Checked:= true;
  end
  else begin
    reportForm.FloorCB2.Checked:= false;
  end;
    */
}

function taxt_FloorCB3Select(obj)
{
    taxt_BuildTaxonomy();
}

function taxt_Direction1RB1Click(obj) // Ok
{
    gem$("#Direction2RB1").prop("checked", true);
    taxt_BuildTaxonomy();
}
function taxt_Direction1RB2Click(obj) // Ok
{
    gem$("#Direction2RB3").prop("checked", true);
    taxt_BuildTaxonomy();
}
function taxt_Direction2RB1Click(obj) // Ok
{
    gem$("#Direction1RB1").prop("checked", true);
    taxt_BuildTaxonomy();
}
function taxt_Direction2RB3Click(obj) // Ok
{
    gem$("#Direction1RB2").prop("checked", true);
    taxt_BuildTaxonomy();
}

function taxt_OmitCBClick(obj) // Ok
{
    taxt_BuildTaxonomy();
}



function BuildTaxonomyString(out_type)
{
    var Taxonomy = [], ResTax, direction1, direction2;

    for (var i = 0 ; i < 50 ; i++)
        Taxonomy[i] = "";
    /* Structural System: Direction X */

    if ( gem$('#MaterialCB11').val() == 0 && (out_type == 0) )
        Taxonomy[0] = 'MAT99';
    if (gem$('#MaterialCB11').val() == 1)
        Taxonomy[0] = 'C99';
    if (gem$('#MaterialCB11').val() == 2)
        Taxonomy[0] = 'CU';
    if (gem$('#MaterialCB11').val() == 3)
        Taxonomy[0] = 'CR';
    if (gem$('#MaterialCB11').val() == 4)
        Taxonomy[0] = 'SRC';

    if ( (gem$('#MaterialCB11').val() > 0) && (gem$('#MaterialCB11').val() < 5) ) {
        if ( (gem$('#MaterialCB21').val() == 0) && (out_type == 0) )
            Taxonomy[1] = '+CT99';
        if (gem$('#MaterialCB21').val() == 1)
            Taxonomy[1] = '+CIP';
        if (gem$('#MaterialCB21').val() == 2)
            Taxonomy[1] = '+PC';
        if (gem$('#MaterialCB21').val() == 3)
            Taxonomy[1] = '+CIPPS';
        if (gem$('#MaterialCB21').val() == 4)
            Taxonomy[1] = '+PCPS';
    }
    if (gem$('#MaterialCB11').val() == 5) {
        Taxonomy[0] = 'S';
        if ( gem$('#MaterialCB21').val() == 0 && (out_type == 0) )
            Taxonomy[1] = '+S99';
        if ( gem$('#MaterialCB21').val() == 1 )
            Taxonomy[1] = '+SL';
        if ( gem$('#MaterialCB21').val() == 2 )
            Taxonomy[1] = '+SR';
        if ( gem$('#MaterialCB21').val() == 3 )
            Taxonomy[1] = '+SO';
    }

    if (gem$('#MaterialCB11').val() == 6) {
        Taxonomy[0] = 'ME';
        if ( gem$('#MaterialCB21').val() == 0 && (out_type == 0) )
            Taxonomy[1] = '+ME99';
        if (gem$('#MaterialCB21').val() == 1)
            Taxonomy[1] = '+MEIR';
        if (gem$('#MaterialCB21').val() == 2)
            Taxonomy[1] = '+MEO';
    }

    if (gem$('#MaterialCB11').val() == 5) {
        if ( gem$('#MaterialCB31').val() == 0 && (out_type == 0) )
            Taxonomy[2] = '+SC99';
        if (gem$('#MaterialCB31').val() == 1)
            Taxonomy[2] = '+WEL';
        if (gem$('#MaterialCB31').val() == 2)
            Taxonomy[2] = '+RIV';
        if (gem$('#MaterialCB31').val() == 3)
            Taxonomy[2] = '+BOL';
    }

    if (gem$('#MaterialCB11').val() > 6 && gem$('#MaterialCB11').val() < 11) {
        if (gem$('#MaterialCB11').val() == 7)
            Taxonomy[0] = 'M99';
        if (gem$('#MaterialCB11').val() == 8)
            Taxonomy[0] = 'MUR';
        if (gem$('#MaterialCB11').val() == 9)
            Taxonomy[0] = 'MCF';

        if ( gem$('#MaterialCB21').val() == 0 && (out_type == 0) )
            Taxonomy[1] = '+MUN99';
        if (gem$('#MaterialCB21').val() == 1)
            Taxonomy[1] = '+ADO';
        if (gem$('#MaterialCB21').val() == 2)
            Taxonomy[1] = '+ST99';
        if (gem$('#MaterialCB21').val() == 3)
            Taxonomy[1] = '+STRUB';
        if (gem$('#MaterialCB21').val() == 4)
            Taxonomy[1] = '+STDRE';
        if (gem$('#MaterialCB21').val() == 5)
            Taxonomy[1] = '+CL99';
        if (gem$('#MaterialCB21').val() == 6)
            Taxonomy[1] = '+CLBRS';
        if (gem$('#MaterialCB21').val() == 7)
            Taxonomy[1] = '+CLBRH';
        if (gem$('#MaterialCB21').val() == 8)
            Taxonomy[1] = '+CLBLH';
        if (gem$('#MaterialCB21').val() == 9)
            Taxonomy[1] = '+CB99';
        if (gem$('#MaterialCB21').val() == 10)
            Taxonomy[1] = '+CBS';
        if (gem$('#MaterialCB21').val() == 11)
            Taxonomy[1] = '+CBH';
        if (gem$('#MaterialCB21').val() == 12)
            Taxonomy[1] = '+MO';

        if (gem$('#MaterialCB11').val() == 10) {
            Taxonomy[0] = 'MR';
            if ( (gem$('#MaterialCB41').val() == 0) && (out_type == 0) )
                Taxonomy[34] = '+MR99';
            if (gem$('#MaterialCB41').val() == 1)
                Taxonomy[34] = '+RS';
            if (gem$('#MaterialCB41').val() == 2)
                Taxonomy[34] = '+RW';
            if (gem$('#MaterialCB41').val() == 3)
                Taxonomy[34] = '+RB';
            if (gem$('#MaterialCB41').val() == 4)
                Taxonomy[34] = '+RCM';
            if (gem$('#MaterialCB41').val() == 5)
                Taxonomy[34] = '+RCB';
        }

        if ((gem$('#MaterialCB31').val() == 0) && (out_type == 0) )
            Taxonomy[2] = '+MO99';
        if (gem$('#MaterialCB31').val() == 1)
            Taxonomy[2] = '+MON';
        if (gem$('#MaterialCB31').val() == 2)
            Taxonomy[2] = '+MOM';
        if (gem$('#MaterialCB31').val() == 3)
            Taxonomy[2] = '+MOL';
        if (gem$('#MaterialCB31').val() == 4)
            Taxonomy[2] = '+MOC';
        if (gem$('#MaterialCB31').val() == 5)
            Taxonomy[2] = '+MOCL';
        if (gem$('#MaterialCB31').val() == 6)
            Taxonomy[2] = '+SP99';
        if (gem$('#MaterialCB31').val() == 7)
            Taxonomy[2] = '+SPLI';
        if (gem$('#MaterialCB31').val() == 8)
            Taxonomy[2] = '+SPSA';
        if (gem$('#MaterialCB31').val() == 9)
            Taxonomy[2] = '+SPTU';
        if (gem$('#MaterialCB31').val() == 10)
            Taxonomy[2] = '+SPSL';
        if (gem$('#MaterialCB31').val() == 11)
            Taxonomy[2] = '+SPGR';
        if (gem$('#MaterialCB31').val() == 12)
            Taxonomy[2] = '+SPBA';
        if (gem$('#MaterialCB31').val() == 13)
            Taxonomy[2] = '+SPO';
    }

    if ( (gem$('#MaterialCB11').val()>10) && (gem$('#MaterialCB11').val()<14) ) {
        if (gem$('#MaterialCB11').val() == 11)
            Taxonomy[0] = 'E99';
        if (gem$('#MaterialCB11').val() == 12)
            Taxonomy[0] = 'EU';
        if (gem$('#MaterialCB11').val() == 13)
            Taxonomy[0] = 'ER';

        if ( (gem$('#MaterialCB21').val() == 0) && (out_type == 0) )
            Taxonomy[1] = '+ET99';
        if (gem$('#MaterialCB21').val() == 1)
            Taxonomy[1] = '+ETR';
        if (gem$('#MaterialCB21').val() == 2)
            Taxonomy[1] = '+ETC';
        if (gem$('#MaterialCB21').val() == 3)
            Taxonomy[1] = '+ETO';
    }

    if (gem$('#MaterialCB11').val() == 14) {
        Taxonomy[0] = 'W';
        if ((gem$('#MaterialCB21').val() == 0) && (out_type == 0))
            Taxonomy[1] = '+W99';
        if (gem$('#MaterialCB21').val() == 1)
            Taxonomy[1] = '+WHE';
        if (gem$('#MaterialCB21').val() == 2)
            Taxonomy[1] = '+WLI';
        if (gem$('#MaterialCB21').val() == 3)
            Taxonomy[1] = '+WS';
        if (gem$('#MaterialCB21').val() == 4)
            Taxonomy[1] = '+WWD';
        if (gem$('#MaterialCB21').val() == 5)
            Taxonomy[1] = '+WBB';
        if (gem$('#MaterialCB21').val() == 6)
            Taxonomy[1] = '+WO';
    }

    if (gem$('#MaterialCB11').val() == 15)
        Taxonomy[0] = 'MATO';

    if ((gem$('#SystemCB11').val() == 0) && (out_type == 0))
        Taxonomy[3] = 'L99';

    if ( (gem$('#MaterialCB11').val()>10) && (gem$('#MaterialCB11').val()<14) ) {
        if (gem$('#SystemCB11').val() == 1)
            Taxonomy[3] = 'LN';
        if (gem$('#SystemCB11').val() == 2)
            Taxonomy[3] = 'LWAL';
        if (gem$('#SystemCB11').val() == 3)
            Taxonomy[3] = 'LH';
        if (gem$('#SystemCB11').val() == 4)
            Taxonomy[3] = 'LO';
    }
    else if ( ((gem$('#MaterialCB11').val()>6) && (gem$('#MaterialCB11').val()<11)) || (gem$('#MaterialCB11').val() == 14)) {
        if (gem$('#SystemCB11').val() == 1)
            Taxonomy[3] = 'LN';
        if (gem$('#SystemCB11').val() == 2)
            Taxonomy[3] = 'LFM';;
        if (gem$('#SystemCB11').val() == 3)
            Taxonomy[3] = 'LPB';
        if (gem$('#SystemCB11').val() == 4)
            Taxonomy[3] = 'LWAL';
        if (gem$('#SystemCB11').val() == 5)
            Taxonomy[3] = 'LH';
        if (gem$('#SystemCB11').val() == 6)
            Taxonomy[3] = 'LO';
    }
    else {
        if (gem$('#SystemCB11').val() == 1)
            Taxonomy[3] = 'LN';
        if (gem$('#SystemCB11').val() == 2)
            Taxonomy[3] = 'LFM';
        if (gem$('#SystemCB11').val() == 3)
            Taxonomy[3] = 'LFINF';
        if (gem$('#SystemCB11').val() == 4)
            Taxonomy[3] = 'LFBR';
        if (gem$('#SystemCB11').val() == 5)
            Taxonomy[3] = 'LPB';
        if (gem$('#SystemCB11').val() == 6)
            Taxonomy[3] = 'LWAL';
        if (gem$('#SystemCB11').val() == 7)
            Taxonomy[3] = 'LDUAL';
        if (gem$('#SystemCB11').val() == 8)
            Taxonomy[3] = 'LFLS';
        if (gem$('#SystemCB11').val() == 9)
            Taxonomy[3] = 'LFLSINF';
        if (gem$('#SystemCB11').val() == 10)
            Taxonomy[3] = 'LH';
        if (gem$('#SystemCB11').val() == 11)
            Taxonomy[3] = 'LO';
    }

    if (gem$('#SystemCB11').val() > 0) {
        if ((gem$('#SystemCB21').val() == 0) && (out_type == 0))
            Taxonomy[4] = '+DU99';
        if (gem$('#SystemCB21').val() == 1)
            Taxonomy[4] = '+DUC';
        if (gem$('#SystemCB21').val() == 2)
            Taxonomy[4] = '+DNO';
        if (gem$('#SystemCB21').val() == 3)
            Taxonomy[4] = '+DBD';
    }




    /* Structural System: Direction Y */




    if ( gem$('#MaterialCB12').val() == 0 && (out_type == 0) )
        Taxonomy[5] = 'MAT99';
    if (gem$('#MaterialCB12').val() == 1)
        Taxonomy[5] = 'C99';
    if (gem$('#MaterialCB12').val() == 2)
        Taxonomy[5] = 'CU';
    if (gem$('#MaterialCB12').val() == 3)
        Taxonomy[5] = 'CR';
    if (gem$('#MaterialCB12').val() == 4)
        Taxonomy[5] = 'SRC';

    if ( (gem$('#MaterialCB12').val() > 0) && (gem$('#MaterialCB12').val() < 5) ) {
        if ( (gem$('#MaterialCB22').val() == 0) && (out_type == 0) )
            Taxonomy[6] = '+CT99';
        if (gem$('#MaterialCB22').val() == 1)
            Taxonomy[6] = '+CIP';
        if (gem$('#MaterialCB22').val() == 2)
            Taxonomy[6] = '+PC';
        if (gem$('#MaterialCB22').val() == 3)
            Taxonomy[6] = '+CIPPS';
        if (gem$('#MaterialCB22').val() == 4)
            Taxonomy[6] = '+PCPS';
    }
    if (gem$('#MaterialCB12').val() == 5) {
        Taxonomy[5] = 'S';
        if ( gem$('#MaterialCB22').val() == 0 && (out_type == 0) )
            Taxonomy[6] = '+S99';
        if ( gem$('#MaterialCB22').val() == 1 )
            Taxonomy[6] = '+SL';
        if ( gem$('#MaterialCB22').val() == 2 )
            Taxonomy[6] = '+SR';
        if ( gem$('#MaterialCB22').val() == 3 )
            Taxonomy[6] = '+SO';
    }

    if (gem$('#MaterialCB12').val() == 6) {
        Taxonomy[5] = 'ME';
        if ( gem$('#MaterialCB22').val() == 0 && (out_type == 0) )
            Taxonomy[6] = '+ME99';
        if (gem$('#MaterialCB22').val() == 1)
            Taxonomy[6] = '+MEIR';
        if (gem$('#MaterialCB22').val() == 2)
            Taxonomy[6] = '+MEO';
    }

    if (gem$('#MaterialCB12').val() == 5) {
        if ( gem$('#MaterialCB32').val() == 0 && (out_type == 0) )
            Taxonomy[7] = '+SC99';
        if (gem$('#MaterialCB32').val() == 1)
            Taxonomy[7] = '+WEL';
        if (gem$('#MaterialCB32').val() == 2)
            Taxonomy[7] = '+RIV';
        if (gem$('#MaterialCB32').val() == 3)
            Taxonomy[7] = '+BOL';
    }

    if (gem$('#MaterialCB12').val() > 6 && gem$('#MaterialCB12').val() < 11) {
        if (gem$('#MaterialCB12').val() == 7)
            Taxonomy[5] = 'M99';
        if (gem$('#MaterialCB12').val() == 8)
            Taxonomy[5] = 'MUR';
        if (gem$('#MaterialCB12').val() == 9)
            Taxonomy[5] = 'MCF';

        if ( gem$('#MaterialCB22').val() == 0 && (out_type == 0) )
            Taxonomy[6] = '+MUN99';
        if (gem$('#MaterialCB22').val() == 1)
            Taxonomy[6] = '+ADO';
        if (gem$('#MaterialCB22').val() == 2)
            Taxonomy[6] = '+ST99';
        if (gem$('#MaterialCB22').val() == 3)
            Taxonomy[6] = '+STRUB';
        if (gem$('#MaterialCB22').val() == 4)
            Taxonomy[6] = '+STDRE';
        if (gem$('#MaterialCB22').val() == 5)
            Taxonomy[6] = '+CL99';
        if (gem$('#MaterialCB22').val() == 6)
            Taxonomy[6] = '+CLBRS';
        if (gem$('#MaterialCB22').val() == 7)
            Taxonomy[6] = '+CLBRH';
        if (gem$('#MaterialCB22').val() == 8)
            Taxonomy[6] = '+CLBLH';
        if (gem$('#MaterialCB22').val() == 9)
            Taxonomy[6] = '+CB99';
        if (gem$('#MaterialCB22').val() == 10)
            Taxonomy[6] = '+CBS';
        if (gem$('#MaterialCB22').val() == 11)
            Taxonomy[6] = '+CBH';
        if (gem$('#MaterialCB22').val() == 12)
            Taxonomy[6] = '+MO';

        if (gem$('#MaterialCB12').val() == 10) {
            Taxonomy[5] = 'MR';
            if ( (gem$('#MaterialCB42').val() == 0) && (out_type == 0) )
                Taxonomy[35] = '+MR99';
            if (gem$('#MaterialCB42').val() == 1)
                Taxonomy[35] = '+RS';
            if (gem$('#MaterialCB42').val() == 2)
                Taxonomy[35] = '+RW';
            if (gem$('#MaterialCB42').val() == 3)
                Taxonomy[35] = '+RB';
            if (gem$('#MaterialCB42').val() == 4)
                Taxonomy[35] = '+RCM';
            if (gem$('#MaterialCB42').val() == 5)
                Taxonomy[35] = '+RCB';
        }

        if ((gem$('#MaterialCB32').val() == 0) && (out_type == 0) )
            Taxonomy[7] = '+MO99';
        if (gem$('#MaterialCB32').val() == 1)
            Taxonomy[7] = '+MON';
        if (gem$('#MaterialCB32').val() == 2)
            Taxonomy[7] = '+MOM';
        if (gem$('#MaterialCB32').val() == 3)
            Taxonomy[7] = '+MOL';
        if (gem$('#MaterialCB32').val() == 4)
            Taxonomy[7] = '+MOC';
        if (gem$('#MaterialCB32').val() == 5)
            Taxonomy[7] = '+MOCL';
        if (gem$('#MaterialCB32').val() == 6)
            Taxonomy[7] = '+SP99';
        if (gem$('#MaterialCB32').val() == 7)
            Taxonomy[7] = '+SPLI';
        if (gem$('#MaterialCB32').val() == 8)
            Taxonomy[7] = '+SPSA';
        if (gem$('#MaterialCB32').val() == 9)
            Taxonomy[7] = '+SPTU';
        if (gem$('#MaterialCB32').val() == 10)
            Taxonomy[7] = '+SPSL';
        if (gem$('#MaterialCB32').val() == 11)
            Taxonomy[7] = '+SPGR';
        if (gem$('#MaterialCB32').val() == 12)
            Taxonomy[7] = '+SPBA';
        if (gem$('#MaterialCB32').val() == 13)
            Taxonomy[7] = '+SPO';
    }

    if ( (gem$('#MaterialCB12').val()>10) && (gem$('#MaterialCB12').val()<14) ) {
        if (gem$('#MaterialCB12').val() == 11)
            Taxonomy[5] = 'E99';
        if (gem$('#MaterialCB12').val() == 12)
            Taxonomy[5] = 'EU';
        if (gem$('#MaterialCB12').val() == 13)
            Taxonomy[5] = 'ER';

        if ( (gem$('#MaterialCB22').val() == 0) && (out_type == 0) )
            Taxonomy[6] = '+ET99';
        if (gem$('#MaterialCB22').val() == 1)
            Taxonomy[6] = '+ETR';
        if (gem$('#MaterialCB22').val() == 2)
            Taxonomy[6] = '+ETC';
        if (gem$('#MaterialCB22').val() == 3)
            Taxonomy[6] = '+ETO';
    }

    if (gem$('#MaterialCB12').val() == 14) {
        Taxonomy[5] = 'W';
        if ((gem$('#MaterialCB22').val() == 0) && (out_type == 0))
            Taxonomy[6] = '+W99';
        if (gem$('#MaterialCB22').val() == 1)
            Taxonomy[6] = '+WHE';
        if (gem$('#MaterialCB22').val() == 2)
            Taxonomy[6] = '+WLI';
        if (gem$('#MaterialCB22').val() == 3)
            Taxonomy[6] = '+WS';
        if (gem$('#MaterialCB22').val() == 4)
            Taxonomy[6] = '+WWD';
        if (gem$('#MaterialCB22').val() == 5)
            Taxonomy[6] = '+WBB';
        if (gem$('#MaterialCB22').val() == 6)
            Taxonomy[6] = '+WO';
    }

    if (gem$('#MaterialCB12').val() == 15)
        Taxonomy[5] = 'MATO';

    if ((gem$('#SystemCB12').val() == 0) && (out_type == 0))
        Taxonomy[8] = 'L99';

    if ( (gem$('#MaterialCB12').val()>10) && (gem$('#MaterialCB12').val()<14) ) {
        if (gem$('#SystemCB12').val() == 1)
            Taxonomy[8] = 'LN';
        if (gem$('#SystemCB12').val() == 2)
            Taxonomy[8] = 'LWAL';
        if (gem$('#SystemCB12').val() == 3)
            Taxonomy[8] = 'LH';
        if (gem$('#SystemCB12').val() == 4)
            Taxonomy[8] = 'LO';
    }
    else if ( ((gem$('#MaterialCB12').val()>6) && (gem$('#MaterialCB12').val()<11)) || (gem$('#MaterialCB12').val() == 14)) {
        if (gem$('#SystemCB12').val() == 1)
            Taxonomy[8] = 'LN';
        if (gem$('#SystemCB12').val() == 2)
            Taxonomy[8] = 'LFM';;
        if (gem$('#SystemCB12').val() == 3)
            Taxonomy[8] = 'LPB';
        if (gem$('#SystemCB12').val() == 4)
            Taxonomy[8] = 'LWAL';
        if (gem$('#SystemCB12').val() == 5)
            Taxonomy[8] = 'LH';
        if (gem$('#SystemCB12').val() == 6)
            Taxonomy[8] = 'LO';
    }
    else {
        if (gem$('#SystemCB12').val() == 1)
            Taxonomy[8] = 'LN';
        if (gem$('#SystemCB12').val() == 2)
            Taxonomy[8] = 'LFM';
        if (gem$('#SystemCB12').val() == 3)
            Taxonomy[8] = 'LFINF';
        if (gem$('#SystemCB12').val() == 4)
            Taxonomy[8] = 'LFBR';
        if (gem$('#SystemCB12').val() == 5)
            Taxonomy[8] = 'LPB';
        if (gem$('#SystemCB12').val() == 6)
            Taxonomy[8] = 'LWAL';
        if (gem$('#SystemCB12').val() == 7)
            Taxonomy[8] = 'LDUAL';
        if (gem$('#SystemCB12').val() == 8)
            Taxonomy[8] = 'LFLS';
        if (gem$('#SystemCB12').val() == 9)
            Taxonomy[8] = 'LFLSINF';
        if (gem$('#SystemCB12').val() == 10)
            Taxonomy[8] = 'LH';
        if (gem$('#SystemCB12').val() == 11)
            Taxonomy[8] = 'LO';
    }

    if (gem$('#SystemCB12').val() > 0) {
        if ((gem$('#SystemCB22').val() == 0) && (out_type == 0))
            Taxonomy[9] = '+DU99';
        if (gem$('#SystemCB22').val() == 1)
            Taxonomy[9] = '+DUC';
        if (gem$('#SystemCB22').val() == 2)
            Taxonomy[9] = '+DNO';
        if (gem$('#SystemCB22').val() == 3)
            Taxonomy[9] = '+DBD';
    }

    if (gem$('#DateCB1').val() == 0  && (out_type == 0))
        Taxonomy[10] = 'Y99';
    if (gem$('#DateCB1').val() == 1)
        Taxonomy[10] = 'YEX:' + gem$('#DateE1').val();
    else if (gem$('#DateCB1').val() == 2)
        Taxonomy[10] = 'YBET:' + gem$('#DateE1').val() + "," + gem$('#DateE2').val();
    else if (gem$('#DateCB1').val() == 3)
        Taxonomy[10] = 'YPRE:' + gem$('#DateE1').val();
    else if (gem$('#DateCB1').val() == 4)
        Taxonomy[10] = 'YAPP:' + gem$('#DateE1').val();

    if (gem$('#HeightCB1').val() == 0) {
        if ((out_type == 0))
            Taxonomy[11] ='H99';
    }
    else {
        if (gem$('#HeightCB1').val() == 1)
            Taxonomy[11] = 'HBET:' + gem$('#noStoreysE11').val() + ',' + gem$('#noStoreysE12').val();
        if (gem$('#HeightCB1').val() == 2)
            Taxonomy[11] = 'HEX:' + gem$('#noStoreysE11').val();
        if (gem$('#HeightCB1').val() == 3)
            Taxonomy[11] = 'HAPP:' + gem$('#noStoreysE11').val();

        if (gem$('#HeightCB2').val() == 0 && (out_type == 0))
            Taxonomy[12] = '+HB99';
        if (gem$('#HeightCB2').val() == 1)
            Taxonomy[12] = '+HBBET:' + gem$('#noStoreysE21').val() + ',' + gem$('#noStoreysE22').val();
        if (gem$('#HeightCB2').val() == 2)
            Taxonomy[12] = '+HBEX:' + gem$('#noStoreysE21').val();
        if (gem$('#HeightCB2').val() == 3)
            Taxonomy[12] = '+HBAPP:' + gem$('#noStoreysE21').val();

        if (gem$('#HeightCB3').val() == 0 && (out_type == 0))
            Taxonomy[13] = '+HF99';
        if (gem$('#HeightCB3').val() == 1)
            Taxonomy[13] = '+HFBET:' + gem$('#noStoreysE31').val() + ',' + gem$('#noStoreysE32').val();
        if (gem$('#HeightCB3').val() == 2)
            Taxonomy[13] = '+HFEX:' + gem$('#noStoreysE31').val();
        if (gem$('#HeightCB3').val() == 3)
            Taxonomy[13] = '+HFAPP:' + gem$('#noStoreysE31').val();

        if (gem$('#HeightCB4').val() == 0 && (out_type == 0))
            Taxonomy[14] = '+HD99';
        if (gem$('#HeightCB4').val() == 1)
            Taxonomy[14] = '+HD:' + gem$('#noStoreysE41').val();
    }

    if (gem$('#OccupancyCB1').val() == 0) {
        if ((out_type == 0))
            Taxonomy[15] = 'OC99';
    }
    else if (gem$('#OccupancyCB1').val() == 1) {
        Taxonomy[15] = 'RES';
        if (gem$('#OccupancyCB2').val() == 0 && (out_type == 0))
            Taxonomy[16] = '+RES99';
        if (gem$('#OccupancyCB2').val() == 1)
            Taxonomy[16] = '+RES1';
        if (gem$('#OccupancyCB2').val() == 2)
            Taxonomy[16] = '+RES2';
        if (gem$('#OccupancyCB2').val() == 3)
            Taxonomy[16] = '+RES2A';
        if (gem$('#OccupancyCB2').val() == 4)
            Taxonomy[16] = '+RES2B';
        if (gem$('#OccupancyCB2').val() == 5)
            Taxonomy[16] = '+RES2C';
        if (gem$('#OccupancyCB2').val() == 6)
            Taxonomy[16] = '+RES2D';
        if (gem$('#OccupancyCB2').val() == 7)
            Taxonomy[16] = '+RES2E';
        if (gem$('#OccupancyCB2').val() == 8)
            Taxonomy[16] = '+RES2F';
        if (gem$('#OccupancyCB2').val() == 9)
            Taxonomy[16] = '+RES3';
        if (gem$('#OccupancyCB2').val() == 10)
            Taxonomy[16] = '+RES4';
        if (gem$('#OccupancyCB2').val() == 11)
            Taxonomy[16] = '+RES5';
        if (gem$('#OccupancyCB2').val() == 12)
            Taxonomy[16] = '+RES6';
    }
    else if (gem$('#OccupancyCB1').val() == 2) {
        Taxonomy[15] = 'COM';
        if (gem$('#OccupancyCB2').val() == 0 && (out_type == 0))
            Taxonomy[16] = '+COM99';
        if (gem$('#OccupancyCB2').val() == 1)
            Taxonomy[16] = '+COM1';
        if (gem$('#OccupancyCB2').val() == 2)
            Taxonomy[16] = '+COM2';
        if (gem$('#OccupancyCB2').val() == 3)
            Taxonomy[16] = '+COM3';
        if (gem$('#OccupancyCB2').val() == 4)
            Taxonomy[16] = '+COM4';
        if (gem$('#OccupancyCB2').val() == 5)
            Taxonomy[16] = '+COM5';
        if (gem$('#OccupancyCB2').val() == 6)
            Taxonomy[16] = '+COM6';
        if (gem$('#OccupancyCB2').val() == 7)
            Taxonomy[16] = '+COM7';
        if (gem$('#OccupancyCB2').val() == 8)
            Taxonomy[16] = '+COM8';
        if (gem$('#OccupancyCB2').val() == 9)
            Taxonomy[16] = '+COM9';
        if (gem$('#OccupancyCB2').val() == 10)
            Taxonomy[16] = '+COM10';
        if (gem$('#OccupancyCB2').val() == 11)
            Taxonomy[16] = '+COM11';
    }
    else if (gem$('#OccupancyCB1').val() == 3) {
        Taxonomy[15] = 'MIX';
        if (gem$('#OccupancyCB2').val() == 0 && (out_type == 0))
            Taxonomy[16] = '+MIX99';
        if (gem$('#OccupancyCB2').val() == 1)
            Taxonomy[16] = '+MIX1';
        if (gem$('#OccupancyCB2').val() == 2)
            Taxonomy[16] = '+MIX2';
        if (gem$('#OccupancyCB2').val() == 3)
            Taxonomy[16] = '+MIX3';
        if (gem$('#OccupancyCB2').val() == 4)
            Taxonomy[16] = '+MIX4';
        if (gem$('#OccupancyCB2').val() == 5)
            Taxonomy[16] = '+MIX5';
        if (gem$('#OccupancyCB2').val() == 6)
            Taxonomy[16] = '+MIX6';
    }
    else if (gem$('#OccupancyCB1').val() == 4) {
        Taxonomy[15] = 'IND';
        if (gem$('#OccupancyCB2').val() == 0 && (out_type == 0))
            Taxonomy[16] = '+IND99';
        if (gem$('#OccupancyCB2').val() == 1)
            Taxonomy[16] = '+IND1';
        if (gem$('#OccupancyCB2').val() == 2)
            Taxonomy[16] = '+IND2';
    }
    else if (gem$('#OccupancyCB1').val() == 5) {
        Taxonomy[15] = 'AGR';
        if (gem$('#OccupancyCB2').val() == 0 && (out_type == 0))
            Taxonomy[16] = '+AGR99';
        if (gem$('#OccupancyCB2').val() == 1)
            Taxonomy[16] = '+AGR1';
        if (gem$('#OccupancyCB2').val() == 2)
            Taxonomy[16] = '+AGR2';
        if (gem$('#OccupancyCB2').val() == 3)
            Taxonomy[16] = '+AGR3';
    }
    else if (gem$('#OccupancyCB1').val() == 6) {
        Taxonomy[15] = 'ASS';
        if (gem$('#OccupancyCB2').val() == 0 && (out_type == 0))
            Taxonomy[16] = '+ASS99';
        if (gem$('#OccupancyCB2').val() == 1)
            Taxonomy[16] = '+ASS1';
        if (gem$('#OccupancyCB2').val() == 2)
            Taxonomy[16] = '+ASS2';
        if (gem$('#OccupancyCB2').val() == 3)
            Taxonomy[16] = '+ASS3';
        if (gem$('#OccupancyCB2').val() == 4)
            Taxonomy[16] = '+ASS4';
    }
    else if (gem$('#OccupancyCB1').val() == 7) {
        Taxonomy[15] = 'GOV';
        if (gem$('#OccupancyCB2').val() == 0 && (out_type == 0))
            Taxonomy[16] = '+GOV99';
        if (gem$('#OccupancyCB2').val() == 1)
            Taxonomy[16] = '+GOV1';
        if (gem$('#OccupancyCB2').val() == 2)
            Taxonomy[16] = '+GOV2';
    }
    else if (gem$('#OccupancyCB1').val() == 8) {
        Taxonomy[15] = 'EDU';
        if (gem$('#OccupancyCB2').val() == 0 && (out_type == 0))
            Taxonomy[16] = '+EDU99';
        if (gem$('#OccupancyCB2').val() == 1)
            Taxonomy[16] = '+EDU1';
        if (gem$('#OccupancyCB2').val() == 2)
            Taxonomy[16] = '+EDU2';
        if (gem$('#OccupancyCB2').val() == 3)
            Taxonomy[16] = '+EDU3';
        if (gem$('#OccupancyCB2').val() == 4)
            Taxonomy[16] = '+EDU4';
    }
    else if (gem$('#OccupancyCB1').val() == 9) {
        Taxonomy[15] = 'OCO';
    }

    if (gem$('#PositionCB').val() == 0 && (out_type == 0))
        Taxonomy[17] = 'BP99';
    else if (gem$('#PositionCB').val() == 1)
        Taxonomy[17] = 'BPD';
    else if (gem$('#PositionCB').val() == 2)
        Taxonomy[17] = 'BP1';
    else if (gem$('#PositionCB').val() == 3)
        Taxonomy[17] = 'BP2';
    else if (gem$('#PositionCB').val() == 4)
        Taxonomy[17] = 'BP3';
    else if (gem$('#PositionCB').val() == 5)
        Taxonomy[17] = 'BPI';

    if (gem$('#PlanShapeCB').val() == 0 && (out_type == 0))
        Taxonomy[18] = 'PLF99';
    else if (gem$('#PlanShapeCB').val() == 1)
        Taxonomy[18] = 'PLFSQ';
    else if (gem$('#PlanShapeCB').val() == 2)
        Taxonomy[18] = 'PLFSQO';
    else if (gem$('#PlanShapeCB').val() == 3)
        Taxonomy[18] = 'PLFR';
    else if (gem$('#PlanShapeCB').val() == 4)
        Taxonomy[18] = 'PLFRO';
    else if (gem$('#PlanShapeCB').val() == 5)
        Taxonomy[18] = 'PLFL';
    else if (gem$('#PlanShapeCB').val() == 6)
        Taxonomy[18] = 'PLFC';
    else if (gem$('#PlanShapeCB').val() == 7)
        Taxonomy[18] = 'PLFCO';
    else if (gem$('#PlanShapeCB').val() == 8)
        Taxonomy[18] = 'PLFD';
    else if (gem$('#PlanShapeCB').val() == 9)
        Taxonomy[18] = 'PLFDO';
    else if (gem$('#PlanShapeCB').val() == 10)
        Taxonomy[18] = 'PLFE';
    else if (gem$('#PlanShapeCB').val() == 11)
        Taxonomy[18] = 'PLFH';
    else if (gem$('#PlanShapeCB').val() == 12)
        Taxonomy[18] = 'PLFS';
    else if (gem$('#PlanShapeCB').val() == 13)
        Taxonomy[18] = 'PLFT';
    else if (gem$('#PlanShapeCB').val() == 14)
        Taxonomy[18] = 'PLFU';
    else if (gem$('#PlanShapeCB').val() == 15)
        Taxonomy[18] = 'PLFX';
    else if (gem$('#PlanShapeCB').val() == 16)
        Taxonomy[18] = 'PLFY';
    else if (gem$('#PlanShapeCB').val() == 17)
        Taxonomy[18] = 'PLFP';
    else if (gem$('#PlanShapeCB').val() == 18)
        Taxonomy[18] = 'PLFPO';
    else if (gem$('#PlanShapeCB').val() == 19)
        Taxonomy[18] = 'PLFI';

    if (gem$('#RegularityCB1').val() == 0) {
        if ((out_type == 0))
            Taxonomy[19] = 'IR99';
    }
    else {
        if (gem$('#RegularityCB1').val() == 1)
            Taxonomy[19] = 'IRRE';
        if (gem$('#RegularityCB1').val() == 2) {
            Taxonomy[19] = 'IRIR';
            if (gem$('#RegularityCB2').val() == 0 && (out_type == 0))
                Taxonomy[20] = '+IRPP:IRN';
            if (gem$('#RegularityCB2').val() == 1)
                Taxonomy[20] = '+IRPP:TOR';
            if (gem$('#RegularityCB2').val() == 2)
                Taxonomy[20] = '+IRPP:REC';
            if (gem$('#RegularityCB2').val() == 3)
                Taxonomy[20] = '+IRPP:IRHO';

            if (gem$('#RegularityCB3').val() == 0 && (out_type == 0))
                Taxonomy[21] = '+IRVP:IRN';
            if (gem$('#RegularityCB3').val() == 1)
                Taxonomy[21] = '+IRVP:SOS';
            if (gem$('#RegularityCB3').val() == 2)
                Taxonomy[21] = '+IRVP:CRW';
            if (gem$('#RegularityCB3').val() == 3)
                Taxonomy[21] = '+IRVP:SHC';
            if (gem$('#RegularityCB3').val() == 4)
                Taxonomy[21] = '+IRVP:POP';
            if (gem$('#RegularityCB3').val() == 5)
                Taxonomy[21] = '+IRVP:SET';
            if (gem$('#RegularityCB3').val() == 6)
                Taxonomy[21] = '+IRVP:CHV';
            if (gem$('#RegularityCB3').val() == 7)
                Taxonomy[21] = '+IRVP:IRVO';

            if (gem$('#RegularityCB2').val() > 0) {
                if (gem$('#RegularityCB4').val() == 0)
                    Taxonomy[22] = '+IRPS:IRN';
                if (gem$('#RegularityCB4').val() == 1)
                    Taxonomy[22] = '+IRPS:TOR';
                if (gem$('#RegularityCB4').val() == 2)
                    Taxonomy[22] = '+IRPS:REC';
                if (gem$('#RegularityCB4').val() == 3)
                    Taxonomy[22] = '+IRPS:IRHO';
            }
            if (gem$('#RegularityCB3').val() > 0) {
                if (gem$('#RegularityCB5').val() == 0)
                    Taxonomy[23] = '+IRVS:IRN';
                if (gem$('#RegularityCB5').val() == 1)
                    Taxonomy[23] = '+IRVS:SOS';
                if (gem$('#RegularityCB5').val() == 2)
                    Taxonomy[23] = '+IRVS:CRW';
                if (gem$('#RegularityCB5').val() == 3)
                    Taxonomy[23] = '+IRVS:SHC';
                if (gem$('#RegularityCB5').val() == 4)
                    Taxonomy[23] = '+IRVS:POP';
                if (gem$('#RegularityCB5').val() == 5)
                    Taxonomy[23] = '+IRVS:SET';
                if (gem$('#RegularityCB5').val() == 6)
                    Taxonomy[23] = '+IRVS:CHV';
                if (gem$('#RegularityCB5').val() == 7)
                    Taxonomy[23] = '+IRVS:IRVO';
            }
        }
    }

    if (gem$('#WallsCB').val() == 0 && (out_type == 0))
        Taxonomy[24] = 'EW99';
    if (gem$('#WallsCB').val() == 1)
        Taxonomy[24] = 'EWC';
    if (gem$('#WallsCB').val() == 2)
        Taxonomy[24] = 'EWG';
    if (gem$('#WallsCB').val() == 3)
        Taxonomy[24] = 'EWE';
    if (gem$('#WallsCB').val() == 4)
        Taxonomy[24] = 'EWMA';
    if (gem$('#WallsCB').val() == 5)
        Taxonomy[24] = 'EWME';
    if (gem$('#WallsCB').val() == 6)
        Taxonomy[24] = 'EWV';
    if (gem$('#WallsCB').val() == 7)
        Taxonomy[24] = 'EWW';
    if (gem$('#WallsCB').val() == 8)
        Taxonomy[24] = 'EWSL';
    if (gem$('#WallsCB').val() == 9)
        Taxonomy[24] = 'EWPL';
    if (gem$('#WallsCB').val() == 10)
        Taxonomy[24] = 'EWCB';
    if (gem$('#WallsCB').val() == 11)
        Taxonomy[24] = 'EWO';

    if (gem$('#RoofCB1').val() == 0 && (out_type == 0))
        Taxonomy[25] = 'RSH99';
    if (gem$('#RoofCB1').val() == 1)
        Taxonomy[25] = 'RSH1';
    if (gem$('#RoofCB1').val() == 2)
        Taxonomy[25] = 'RSH2';
    if (gem$('#RoofCB1').val() == 3)
        Taxonomy[25] = 'RSH3';
    if (gem$('#RoofCB1').val() == 4)
        Taxonomy[25] = 'RSH4';
    if (gem$('#RoofCB1').val() == 5)
        Taxonomy[25] = 'RSH5';
    if (gem$('#RoofCB1').val() == 6)
        Taxonomy[25] = 'RSH6';
    if (gem$('#RoofCB1').val() == 7)
        Taxonomy[25] = 'RSH7';
    if (gem$('#RoofCB1').val() == 8)
        Taxonomy[25] = 'RSH8';
    if (gem$('#RoofCB1').val() == 9)
        Taxonomy[25] = 'RSH9';
    if (gem$('#RoofCB1').val() == 10)
        Taxonomy[25] = 'RSHO';

    if (gem$('#RoofCB2').val() == 0 && (out_type == 0))
        Taxonomy[26] = '+RMT99';
    if (gem$('#RoofCB2').val() == 1)
        Taxonomy[26] = '+RMN';
    if (gem$('#RoofCB2').val() == 2)
        Taxonomy[26] = '+RMT1';
    if (gem$('#RoofCB2').val() == 3)
        Taxonomy[26] = '+RMT2';
    if (gem$('#RoofCB2').val() == 4)
        Taxonomy[26] = '+RMT3';
    if (gem$('#RoofCB2').val() == 5)
        Taxonomy[26] = '+RMT4';
    if (gem$('#RoofCB2').val() == 6)
        Taxonomy[26] = '+RMT5';
    if (gem$('#RoofCB2').val() == 7)
        Taxonomy[26] = '+RMT6';
    if (gem$('#RoofCB2').val() == 8)
        Taxonomy[26] = '+RMT7';
    if (gem$('#RoofCB2').val() == 9)
        Taxonomy[26] = '+RMT8';
    if (gem$('#RoofCB2').val() == 10)
        Taxonomy[26] = '+RMT9';
    if (gem$('#RoofCB2').val() == 11)
        Taxonomy[26] = '+RMT10';
    if (gem$('#RoofCB2').val() == 12)
        Taxonomy[26] = '+RMT11';
    if (gem$('#RoofCB2').val() == 13)
        Taxonomy[26] = '+RMTO';

    if (gem$('#RoofCB3').val() == 0) {
        if ((out_type == 0))
            Taxonomy[27] = '+R99';
    }
    else {
        if (gem$('#RoofCB3').val() == 1) {
            Taxonomy[27] = '+RM';
            if (gem$('#RoofCB4').val() == 0 && (out_type == 0))
                Taxonomy[28] = '+RM99';
            if (gem$('#RoofCB4').val() == 1)
                Taxonomy[28] = '+RM1';
            if (gem$('#RoofCB4').val() == 2)
                Taxonomy[28] = '+RM2';
            if (gem$('#RoofCB4').val() == 3)
                Taxonomy[28] = '+RM3';
        }
        else if (gem$('#RoofCB3').val() == 2) {
            Taxonomy[27] = '+RE';
            if (gem$('#RoofCB4').val() == 0 && (out_type == 0))
                Taxonomy[28] = '+RE99';
            if (gem$('#RoofCB4').val() == 1)
                Taxonomy[28] = '+RE1';
        }
        else if (gem$('#RoofCB3').val() == 3) {
            Taxonomy[27] = '+RC';
            if (gem$('#RoofCB4').val() == 0 && (out_type == 0))
                Taxonomy[28] = '+RC99';
            if (gem$('#RoofCB4').val() == 1)
                Taxonomy[28] = '+RC1';
            if (gem$('#RoofCB4').val() == 2)
                Taxonomy[28] = '+RC2';
            if (gem$('#RoofCB4').val() == 3)
                Taxonomy[28] = '+RC3';
            if (gem$('#RoofCB4').val() == 4)
                Taxonomy[28] = '+RC4';
        }
        else if (gem$('#RoofCB3').val() == 4) {
            Taxonomy[27] = '+RME';
            if (gem$('#RoofCB4').val() == 0 && (out_type == 0))
                Taxonomy[28] = '+RME99';
            if (gem$('#RoofCB4').val() == 1)
                Taxonomy[28] = '+RME1';
            if (gem$('#RoofCB4').val() == 2)
                Taxonomy[28] = '+RME2';
            if (gem$('#RoofCB4').val() == 3)
                Taxonomy[28] = '+RME3';
        }
        else if (gem$('#RoofCB3').val() == 5) {
            Taxonomy[27] = '+RWO';
            if (gem$('#RoofCB4').val() == 0 && (out_type == 0))
                Taxonomy[28] = '+RWO99';
            if (gem$('#RoofCB4').val() == 1)
                Taxonomy[28] = '+RWO1';
            if (gem$('#RoofCB4').val() == 2)
                Taxonomy[28] = '+RWO2';
            if (gem$('#RoofCB4').val() == 3)
                Taxonomy[28] = '+RWO3';
            if (gem$('#RoofCB4').val() == 4)
                Taxonomy[28] = '+RWO4';
            if (gem$('#RoofCB4').val() == 5)
                Taxonomy[28] = '+RWO5';
        }
        else if (gem$('#RoofCB3').val() == 6) {
            Taxonomy[27] = '+RFA';
            if (gem$('#RoofCB4').val() == 0)
                Taxonomy[28] = '+RFA1';
            if (gem$('#RoofCB4').val() == 1)
                Taxonomy[28] = '+RFAO';
        }
        else if (gem$('#RoofCB3').val() == 7) {
            Taxonomy[27] = '+RO';
        }
    }

    if (gem$('#RoofCB5').val() == 0 && (out_type == 0))
        Taxonomy[29] = '+RWC99';
    if (gem$('#RoofCB5').val() == 1)
        Taxonomy[29] = '+RWCN';
    if (gem$('#RoofCB5').val() == 2)
        Taxonomy[29] = '+RWCP';
    if (gem$('#RoofCB5').val() == 3)
        Taxonomy[29] = '+RTD99';
    if (gem$('#RoofCB5').val() == 4)
        Taxonomy[29] = '+RTDN';
    if (gem$('#RoofCB5').val() == 5)
        Taxonomy[29] = '+RTDP';

    if (gem$('#FloorCB1').val() == 0) {
        if ((out_type == 0))
            Taxonomy[30] = 'F99';
    }
    else if (gem$('#FloorCB1').val() == 1) {
        Taxonomy[30] = 'FN';
    }
    else {
        if (gem$('#FloorCB1').val() == 2) {
            Taxonomy[30] = 'FM';
            if (gem$('#FloorCB2').val() == 0 && (out_type == 0))
                Taxonomy[31] = '+FM99';
            if (gem$('#FloorCB2').val() == 1)
                Taxonomy[31] = '+FM1';
            if (gem$('#FloorCB2').val() == 2)
                Taxonomy[31] = '+FM2';
            if (gem$('#FloorCB2').val() == 3)
                Taxonomy[31] = '+FM3';
        }
        else if (gem$('#FloorCB1').val() == 3) {
            Taxonomy[30] = 'FE';
            if (gem$('#FloorCB2').val() == 0 && (out_type == 0))
                Taxonomy[31] = '+FE99';
        }
        else if (gem$('#FloorCB1').val() == 4) {
            Taxonomy[30] = 'FC';
            if (gem$('#FloorCB2').val() == 0 && (out_type == 0))
                Taxonomy[31] = '+FC99';
            if (gem$('#FloorCB2').val() == 1)
                Taxonomy[31] = '+FC1';
            if (gem$('#FloorCB2').val() == 2)
                Taxonomy[31] = '+FC2';
            if (gem$('#FloorCB2').val() == 3)
                Taxonomy[31] = '+FC3';
            if (gem$('#FloorCB2').val() == 4)
                Taxonomy[31] = '+FC4';
        }
        else if (gem$('#FloorCB1').val() == 5) {
            Taxonomy[30] = 'FME';
            if (gem$('#FloorCB2').val() == 0 && (out_type == 0))
                Taxonomy[31] = '+FME99';
            if (gem$('#FloorCB2').val() == 1)
                Taxonomy[31] = '+FME1';
            if (gem$('#FloorCB2').val() == 2)
                Taxonomy[31] = '+FME2';
            if (gem$('#FloorCB2').val() == 3)
                Taxonomy[31] = '+FME3';
        }
        else if (gem$('#FloorCB1').val() == 6) {
            Taxonomy[30] = 'FW';
            if (gem$('#FloorCB2').val() == 0 && (out_type == 0))
                Taxonomy[31] = '+FW99';
            if (gem$('#FloorCB2').val() == 1)
                Taxonomy[31] = '+FW1';
            if (gem$('#FloorCB2').val() == 2)
                Taxonomy[31] = '+FW2';
            if (gem$('#FloorCB2').val() == 3)
                Taxonomy[31] = '+FW3';
            if (gem$('#FloorCB2').val() == 4)
                Taxonomy[31] = '+FW4';
        }
        else if (gem$('#FloorCB1').val() == 7) {
            Taxonomy[30] = 'FO';
        }
    }
    if (gem$('#FloorCB3').val() == 0 && (out_type == 0))
        Taxonomy[32] = '+FWC99';
    if (gem$('#FloorCB3').val() == 1)
        Taxonomy[32] = '+FWCN';
    if (gem$('#FloorCB3').val() == 2)
        Taxonomy[32] = '+FWCP';

    if (gem$('#FoundationsCB').val() == 0 && (out_type == 0))
        Taxonomy[33] = 'FOS99';
    if (gem$('#FoundationsCB').val() == 1)
        Taxonomy[33] = 'FOSSL';
    if (gem$('#FoundationsCB').val() == 2)
        Taxonomy[33] = 'FOSN';
    if (gem$('#FoundationsCB').val() == 3)
        Taxonomy[33] = 'FOSDL';
    if (gem$('#FoundationsCB').val() == 4)
        Taxonomy[33] = 'FOSDN';
    if (gem$('#FoundationsCB').val() == 5)
        Taxonomy[33] = 'FOSO';


    // TAIL
    direction1 = 'DX';
    direction2 = 'DY';

    if (gem$('#Direction1RB1').prop('checked')  && (out_type == 0)) {
        direction1 = direction1 + '+D99';
        direction2 = direction2 + '+D99';
        }
    else if (gem$('#Direction1RB2').prop('checked')) {
        direction1 = direction1 + '+PF';
        direction2 = direction2 + '+OF';
    }

    /*
       0) direction X

          0 - Material type
          1 - Material technology
          34- Material tech adds
          2 - Material properties

          3 - Type of lateral system
          4 - System ductility

          direction Y

          5 - Material type
          6 - Material technology
          35- Material tech adds
          7 - Material properties

       5) 8 - Type of lateral system
          9 - System ductility

          11 - Height above the ground
          12 - Height below the ground
          13 - Height of grade
          14 - Slope of the ground

          10 - Date of construction

          15 - Occupancy type
          16 - Occupancy description

          17 - Position
          18 - Plan

       10)19 - Type of irregularity
          20 - Plan irregularity(primary)
          22 - Vertical irregularity(primary)
          21 - Plan irregularity(secondary)
          23 - Vertical irregularity(secondary)

          24- Material of exterior walls

          25 - Roof shape
          26 - Roof covering
          27 - Roof system material
          28 - Roof system type
          29 - Roof connections

          30 - Floor system material
          31 - Floor system type
          32 - Floor connections

          33 - Foundation
          */

    ResTax = direction1 + '/' + Taxonomy[0] + Taxonomy[1] + Taxonomy[34] + Taxonomy[2] +
        '/' +Taxonomy[3] + Taxonomy[4] +
        '/' + direction2 + '/' + Taxonomy[5] + Taxonomy[6] + Taxonomy[35] + Taxonomy[7] +
        '/' + Taxonomy[8] + Taxonomy[9] +
        '/' + Taxonomy[11] + Taxonomy[12] + Taxonomy[13] + Taxonomy[14] + '/' + Taxonomy[10] +
        '/' + Taxonomy[15] + Taxonomy[16] + '/' + Taxonomy[17] + '/' + Taxonomy[18] +
        '/' + Taxonomy[19] + Taxonomy[20] + Taxonomy[22] + Taxonomy[21] + Taxonomy[23] +
        '/' + Taxonomy[24] + '/' + Taxonomy[25] + Taxonomy[26] + Taxonomy[27] + Taxonomy[28] + Taxonomy[29] +
        '/' + Taxonomy[30] + Taxonomy[31] + Taxonomy[32] + '/' + Taxonomy[33];

    if (out_type == 2) {
        var is_first = true, ResAtoms = ResTax.split('/');
        if (ResAtoms[1] == ResAtoms[4] && ResAtoms[2] == ResAtoms[5]) {
            // same params case
            ResAtoms[3] = ResAtoms[4] = ResAtoms[5] = "";
            if (gem$('#Direction1RB1').prop('checked')) {
                ResAtoms[0] = "";
            }
            else {
                ResAtoms[0] = "PF";
            }
        }
        else {
            if (gem$('#Direction1RB1').prop('checked')) {
                ResAtoms[0] = "DX";
                ResAtoms[3] = "DY";
            }
            else {
                ResAtoms[0] = "DX+PF";
                ResAtoms[3] = "DY+PO";
            }
        }

        ResTax = "";
        for (id in ResAtoms) {
            if (ResAtoms[id] == "") {
                continue;
            }
            if (!is_first)
                ResTax += "/";
            else
                is_first = false;
            ResTax += ResAtoms[id];
        }
    }
    return (ResTax);
}

function taxt_BuildTaxonomy()
{
    var ResTax, ResTaxFull = BuildTaxonomyString(0);
    var out_type = gem$('#OutTypeCB').val();

    /* validation part: '#HeightCBx' are dropdown menus with it's current selected item */

    var height1 = gem$('#HeightCB1').val();
    var height2 = gem$('#HeightCB2').val();
    var height3 = gem$('#HeightCB3').val();
    var height4 = gem$('#HeightCB4').val();
    var date1 = gem$('#DateCB1').val();
    var validated = false;
    var validate_msg = "";
    var h11 = true, h12 = true, h21 = true, h22 = true, h31 = true, h32 = true;
    var d1 = true, d2 = true;

    if (height1 > 0) {
        if (!is_not_negative_int(gem$('#noStoreysE11').val())) {
            if (height1 == 1) {
                validate_msg += "Number of storey above ground: lower limit not positive integer. ";
            }
            else {
                validate_msg += "Number of storey above ground: not positive integer. ";
            }
            gem$('#noStoreysE11').addClass('gem_field_alert');
            h11 = false;
        }
        else {
            gem$('#noStoreysE11').removeClass('gem_field_alert');
        }
    }
    if (height1 == 1) {
        if (!is_not_negative_int(gem$('#noStoreysE12').val())) {
            validate_msg += "Number of storey above ground: upper limit not positive integer. ";
            gem$('#noStoreysE12').addClass('gem_field_alert');
            h12 = false;
        }
        else if (parseInt(gem$('#noStoreysE11').val()) == parseInt(gem$('#noStoreysE12').val())) {
            validate_msg += "Number of storey above ground: invalid range.";
            gem$('#noStoreysE12').addClass('gem_field_alert');
            h12 = false;
        }
        else {
            gem$('#noStoreysE12').removeClass('gem_field_alert');
        }

        // swap items if wrong order
        if (h11 && h12) {
            if (parseInt(gem$('#noStoreysE11').val()) > parseInt(gem$('#noStoreysE12').val())) {
                var swap = gem$('#noStoreysE11').val();
                gem$('#noStoreysE11').val(gem$('#noStoreysE12').val());
                gem$('#noStoreysE12').val(swap);
            }
        }
    }

    if (height2 > 0) {
        if (!is_not_negative_int(gem$('#noStoreysE21').val())) {
            if (height2 == 1) {
                validate_msg += "Number of storey above ground: lower limit not positive integer. ";
            }
            else {
                validate_msg += "Number of storey above ground: not positive integer. ";
            }
            gem$('#noStoreysE21').addClass('gem_field_alert');
            h21 = false;
        }
        else {
            gem$('#noStoreysE21').removeClass('gem_field_alert');
        }
    }

    if (height2 == 1) {
        if (!is_not_negative_int(gem$('#noStoreysE22').val())) {
            validate_msg += "Number of storey above ground: upper limit not positive integer. ";
            gem$('#noStoreysE22').addClass('gem_field_alert');
            h22 = false;
        }
        else if (parseInt(gem$('#noStoreysE21').val()) == parseInt(gem$('#noStoreysE22').val())) {
            validate_msg += "Number of storey above ground: invalid range.";
            gem$('#noStoreysE22').addClass('gem_field_alert');
            h22 = false;
        }
        else {
            gem$('#noStoreysE22').removeClass('gem_field_alert');
        }

        // swap items if wrong order
        if (h21 && h22) {
            if (parseInt(gem$('#noStoreysE21').val()) > parseInt(gem$('#noStoreysE22').val())) {
                var swap = gem$('#noStoreysE21').val();
                gem$('#noStoreysE21').val(gem$('#noStoreysE22').val());
                gem$('#noStoreysE22').val(swap);
            }
        }
    }

    if (height3 > 0) {
        if (!is_not_negative_float(gem$('#noStoreysE31').val())) {
            if (height3 == 1) {
                validate_msg += "Height of ground floor level: lower limit not positive real";
            }
            else {
                validate_msg += "Height of ground floor level: not positive real. ";
            }
            gem$('#noStoreysE31').addClass('gem_field_alert');
            h31 = false;
        }
        else {
            gem$('#noStoreysE31').removeClass('gem_field_alert');
        }
    }
    if (height3 == 1) {
        if (!is_not_negative_float(gem$('#noStoreysE32').val())) {
            validate_msg += "Height of ground floor level: upper limit not positive real. ";
            gem$('#noStoreysE32').addClass('gem_field_alert');
            h32 = false;
        }
        else if (parseInt(gem$('#noStoreysE31').val()) == parseInt(gem$('#noStoreysE32').val())) {
            validate_msg += "Height of ground floor level: invalid range.";
            gem$('#noStoreysE32').addClass('gem_field_alert');
            h32 = false;
        }
        else {
            gem$('#noStoreysE32').removeClass('gem_field_alert');
        }

        // swap items if wrong order
        if (h31 && h32) {
            if (parseFloat(gem$('#noStoreysE31').val()) > parseFloat(gem$('#noStoreysE32').val())) {
                var swap = gem$('#noStoreysE31').val();
                gem$('#noStoreysE31').val(gem$('#noStoreysE32').val());
                gem$('#noStoreysE32').val(swap);
            }
        }
    }

    if (height4 > 0) {
        if (!is_in_rect_angle_float(gem$('#noStoreysE41').val())) {
            validate_msg += "Slope of the ground: it is not positive real between 0 and 90. ";
            gem$('#noStoreysE41').addClass('gem_field_alert');
        }
        else {
            gem$('#noStoreysE41').removeClass('gem_field_alert');
        }
    }

    if (date1 > 0) {
        if (!is_not_negative_int(gem$('#DateE1').val()) || gem$('#DateE1').val().length > 4) {
            if (date1 == 2) {
                validate_msg += "Date of construction or retrofit: lower limit is not a valid date. ";
            }
            else {
                validate_msg += "Date of construction or retrofit: it is not a valid date. ";
            }
            gem$('#DateE1').addClass('gem_field_alert');
            d1 = false;
        }
        else {
            gem$('#DateE1').removeClass('gem_field_alert');
        }
    }
    if (date1 == 2) {
        if (!is_not_negative_int(gem$('#DateE2').val()) || gem$('#DateE2').val().length > 4) {
            validate_msg += "Date of construction or retrofit: upper limit is not a valid date. ";
            gem$('#DateE2').addClass('gem_field_alert');
            d2 = false;
        }
        else if (parseInt(gem$('#DateE1').val()) == parseInt(gem$('#DateE2').val())) {
            ret_s.s = "Date of construction or retrofit: invalid range.";
            return (false);
        }
        else {
            gem$('#DateE2').removeClass('gem_field_alert');
        }

        // swap items if wrong order
        if (d1 && d2) {
            if (parseInt(gem$('#DateE1').val()) > parseInt(gem$('#DateE2').val())) {
                var swap = gem$('#DateE1').val();
                gem$('#DateE1').val(gem$('#DateE2').val());
                gem$('#DateE2').val(swap);
            }
        }
    }

    if (validate_msg == "")
        validated = true;

    if (validated) {
        if (out_type != 0) {
            ResTax = BuildTaxonomyString(out_type);
        }
        else {
            ResTax = ResTaxFull;
        }
        gem_taxonomy_form = ResTax;
        gem_taxonomy_form_full = ResTaxFull;

        gem$('#resultE').val(ResTax);
        gem$('#permalink').attr("href", taxt_prefix + "/" +  ResTaxFull);
    }
    else {
        gem_taxonomy_form = "";
        gem_taxonomy_form_full = "";
        gem$('#resultE').val(validate_msg);
        gem$('#permalink').attr("href", taxt_prefix);
    }
}


/*
procedure TmainForm.BuildTaxonomy;
var
  Taxonomy: array [0..33] of string;
  ResTax, direction1, direction2: string;
begin

  //0 - Material type D1
  //1 - Material technology D1
  //2 - Material properties D1
  //3 - Type of lateral system D1
  //4 - System ductility D1
  //5 - Material type D2
  //6 - Material technology D2
  //7 - Material properties D2
  //8 - Type of lateral system D2
  //9 - System ductility D2
  //10- Date of construction
  //11- Height above the ground
  //12- Height below the ground
  //13- Height of grade
  //14- Slope of the ground
  //15- Occupancy type
  //16- Occupancy description
  //17- Position
  //18- Plan
  //19- Type of irregularity
  //20- Plan irregularity(primary)
  //21- Plan irregularity(secondary)
  //22- Vertical irregularity(primary)
  //23- Vertical irregularity(secondary)
  //24- Material of exterior walls
  //25- Roof shape
  //26- Roof covering
  //27- Roof system material
  //28- Roof system type
  //29- Roof connections
  //30- Floor system material
  //31- Floor system type
  //32- Floor connections
  //33 - Foundation

  if (MaterialCB11.ItemIndex=0) and (OmitCB.checked = false) then Taxonomy[0]:='MAT99';
  if MaterialCB11.ItemIndex=1 then Taxonomy[0]:='C99';
  if MaterialCB11.ItemIndex=2 then Taxonomy[0]:='CU';
  if MaterialCB11.ItemIndex=3 then Taxonomy[0]:='CR';
  if MaterialCB11.ItemIndex=4 then Taxonomy[0]:='SRC';

  if (MaterialCB11.ItemIndex>0) and (MaterialCB11.ItemIndex<5)  then begin
    if (MaterialCB21.ItemIndex=0) and (OmitCB.checked = false) then Taxonomy[1]:='+CT99';
    if MaterialCB21.ItemIndex=1 then Taxonomy[1]:='+CIP';
    if MaterialCB21.ItemIndex=2 then Taxonomy[1]:='+PC';
    if MaterialCB21.ItemIndex=3 then Taxonomy[1]:='+CIPPS';
    if MaterialCB21.ItemIndex=4 then Taxonomy[1]:='+PCPS';
  end;

  if MaterialCB11.ItemIndex=5 then begin
    Taxonomy[0]:='S';
    if (MaterialCB21.ItemIndex=0) and (OmitCB.checked = false) then Taxonomy[1]:='+S99';
    if MaterialCB21.ItemIndex=1 then Taxonomy[1]:='+SL';
    if MaterialCB21.ItemIndex=2 then Taxonomy[1]:='+SR';
    if MaterialCB21.ItemIndex=3 then Taxonomy[1]:='+SO';
  end;

  if MaterialCB11.ItemIndex=6 then begin
    Taxonomy[0]:='ME';
    if (MaterialCB21.ItemIndex=0) and (OmitCB.checked = false) then Taxonomy[1]:='+ME99';
    if MaterialCB21.ItemIndex=1 then Taxonomy[1]:='+MEIR';
    if MaterialCB21.ItemIndex=2 then Taxonomy[1]:='+MEO';
  end;

  if MaterialCB11.ItemIndex=5 then begin
    if (MaterialCB31.ItemIndex=0) and (OmitCB.checked = false) then Taxonomy[2]:='+SC99';
    if MaterialCB31.ItemIndex=1 then Taxonomy[2]:='+WEL';
    if MaterialCB31.ItemIndex=2 then Taxonomy[2]:='+RIV';
    if MaterialCB31.ItemIndex=3 then Taxonomy[2]:='+BOL';
  end;

  if (MaterialCB11.ItemIndex>6) and (MaterialCB11.ItemIndex<11) then begin
    if MaterialCB11.ItemIndex=7 then Taxonomy[0]:='M99';
    if MaterialCB11.ItemIndex=8 then Taxonomy[0]:='MUR';
    if MaterialCB11.ItemIndex=9 then Taxonomy[0]:='MCF';

    if (MaterialCB21.ItemIndex=0) and (OmitCB.checked = false) then Taxonomy[1]:='+MUN99';
    if MaterialCB21.ItemIndex=1 then Taxonomy[1]:='+ADO';
    if MaterialCB21.ItemIndex=2 then Taxonomy[1]:='+ST99';
    if MaterialCB21.ItemIndex=3 then Taxonomy[1]:='+STRUB';
    if MaterialCB21.ItemIndex=4 then Taxonomy[1]:='+STDRE';
    if MaterialCB21.ItemIndex=5 then Taxonomy[1]:='+CL99';
    if MaterialCB21.ItemIndex=6 then Taxonomy[1]:='+CLBRS';
    if MaterialCB21.ItemIndex=7 then Taxonomy[1]:='+CLBRH';
    if MaterialCB21.ItemIndex=8 then Taxonomy[1]:='+CLBLH';
    if MaterialCB21.ItemIndex=9 then Taxonomy[1]:='+CB99';
    if MaterialCB21.ItemIndex=10 then Taxonomy[1]:='+CBS';
    if MaterialCB21.ItemIndex=11 then Taxonomy[1]:='+CBH';
    if MaterialCB21.ItemIndex=12 then Taxonomy[1]:='+MO';

    if MaterialCB11.ItemIndex=10 then begin
      Taxonomy[0]:='MR';
      if (MaterialCB41.ItemIndex=0) and (OmitCB.checked = false) then Taxonomy[1]:=Taxonomy[1]+'+MR99';
      if MaterialCB41.ItemIndex=1 then Taxonomy[1]:=Taxonomy[1]+'+RS';
      if MaterialCB41.ItemIndex=2 then Taxonomy[1]:=Taxonomy[1]+'+RW';
      if MaterialCB41.ItemIndex=3 then Taxonomy[1]:=Taxonomy[1]+'+RB';
      if MaterialCB41.ItemIndex=4 then Taxonomy[1]:=Taxonomy[1]+'+RCM';
      if MaterialCB41.ItemIndex=5 then Taxonomy[1]:=Taxonomy[1]+'+RCB';
    end;

    if (MaterialCB31.ItemIndex=0) and (OmitCB.checked = false) then Taxonomy[2]:='+MO99';
    if MaterialCB31.ItemIndex=1 then Taxonomy[2]:='+MON';
    if MaterialCB31.ItemIndex=2 then Taxonomy[2]:='+MOM';
    if MaterialCB31.ItemIndex=3 then Taxonomy[2]:='+MOL';
    if MaterialCB31.ItemIndex=4 then Taxonomy[2]:='+MOC';
    if MaterialCB31.ItemIndex=5 then Taxonomy[2]:='+MOCL';
    if MaterialCB31.ItemIndex=6 then Taxonomy[2]:='+SP99';
    if MaterialCB31.ItemIndex=7 then Taxonomy[2]:='+SPLI';
    if MaterialCB31.ItemIndex=8 then Taxonomy[2]:='+SPSA';
    if MaterialCB31.ItemIndex=9 then Taxonomy[2]:='+SPTU';
    if MaterialCB31.ItemIndex=10 then Taxonomy[2]:='+SPSL';
    if MaterialCB31.ItemIndex=11 then Taxonomy[2]:='+SPGR';
    if MaterialCB31.ItemIndex=12 then Taxonomy[2]:='+SPBA';
    if MaterialCB31.ItemIndex=13 then Taxonomy[2]:='+SPO';

  end;

  if (MaterialCB11.ItemIndex>10) and (MaterialCB11.ItemIndex<14) then begin
    if MaterialCB11.ItemIndex=11 then Taxonomy[0]:='E99';
    if MaterialCB11.ItemIndex=12 then Taxonomy[0]:='EU';
    if MaterialCB11.ItemIndex=13 then Taxonomy[0]:='ER';

    if (MaterialCB21.ItemIndex=0) and (OmitCB.checked = false) then Taxonomy[1]:='+ET99';
    if MaterialCB21.ItemIndex=1 then Taxonomy[1]:='+ETR';
    if MaterialCB21.ItemIndex=2 then Taxonomy[1]:='+ETC';
    if MaterialCB21.ItemIndex=3 then Taxonomy[1]:='+ETO';
  end;

  if MaterialCB11.ItemIndex=14 then begin
    Taxonomy[0]:='W';
    if (MaterialCB21.ItemIndex=0) and (OmitCB.checked = false) then Taxonomy[1]:='+W99';
    if MaterialCB21.ItemIndex=1 then Taxonomy[1]:='+WHE';
    if MaterialCB21.ItemIndex=2 then Taxonomy[1]:='+WLI';
    if MaterialCB21.ItemIndex=3 then Taxonomy[1]:='+WS';
    if MaterialCB21.ItemIndex=4 then Taxonomy[1]:='+WWD';
    if MaterialCB21.ItemIndex=5 then Taxonomy[1]:='+WBB';
    if MaterialCB21.ItemIndex=6 then Taxonomy[1]:='+WO';
  end;

  if MaterialCB11.ItemIndex=15 then Taxonomy[0]:='MATO';

  if (SystemCB11.ItemIndex=0) and (OmitCB.checked = false) then Taxonomy[3]:='L99';

  if (MaterialCB11.ItemIndex>10) and (MaterialCB11.ItemIndex<14) then begin
    if SystemCB11.ItemIndex=1 then Taxonomy[3]:='LN';
    if SystemCB11.ItemIndex=2 then Taxonomy[3]:='LWAL';
    if SystemCB11.ItemIndex=3 then Taxonomy[3]:='LO';
  end
  else if ((MaterialCB11.ItemIndex>6) and (MaterialCB11.ItemIndex<11)) or (MaterialCB11.ItemIndex=14) then begin
    if SystemCB11.ItemIndex=1 then Taxonomy[3]:='LN';
    if SystemCB11.ItemIndex=2 then Taxonomy[3]:='LFM';;
    if SystemCB11.ItemIndex=3 then Taxonomy[3]:='LPB';
    if SystemCB11.ItemIndex=4 then Taxonomy[3]:='LWAL';
    if SystemCB11.ItemIndex=5 then Taxonomy[3]:='LO';
  end
  else begin
    if SystemCB11.ItemIndex=1 then Taxonomy[3]:='LN';
    if SystemCB11.ItemIndex=2 then Taxonomy[3]:='LFM';
    if SystemCB11.ItemIndex=3 then Taxonomy[3]:='LFINF';
    if SystemCB11.ItemIndex=4 then Taxonomy[3]:='LFBR';
    if SystemCB11.ItemIndex=5 then Taxonomy[3]:='LPB';
    if SystemCB11.ItemIndex=6 then Taxonomy[3]:='LWAL';
    if SystemCB11.ItemIndex=7 then Taxonomy[3]:='LDUAL';
    if SystemCB11.ItemIndex=8 then Taxonomy[3]:='LFLS';
    if SystemCB11.ItemIndex=9 then Taxonomy[3]:='LFLSINF';
    if SystemCB11.ItemIndex=10 then Taxonomy[3]:='LH';
    if SystemCB11.ItemIndex=11 then Taxonomy[3]:='LO';
  end;

  if SystemCB11.ItemIndex>0 then begin
    if (SystemCB21.ItemIndex=0) and (OmitCB.checked = false) then Taxonomy[4]:='+DU99';
    if SystemCB21.ItemIndex=1 then Taxonomy[4]:='+DUC';
    if SystemCB21.ItemIndex=2 then Taxonomy[4]:='+DNO';
    if SystemCB21.ItemIndex=3 then Taxonomy[4]:='+DBD';
  end;

  if (MaterialCB12.ItemIndex=0) and (OmitCB.checked = false) then Taxonomy[5]:='MAT99';
  if MaterialCB12.ItemIndex=1 then Taxonomy[5]:='C99';
  if MaterialCB12.ItemIndex=2 then Taxonomy[5]:='CU';
  if MaterialCB12.ItemIndex=3 then Taxonomy[5]:='CR';
  if MaterialCB12.ItemIndex=4 then Taxonomy[5]:='SRC';

  if (MaterialCB12.ItemIndex>0) and (MaterialCB12.ItemIndex<5)  then begin
    if (MaterialCB22.ItemIndex=0) and (OmitCB.checked = false) then Taxonomy[6]:='+CT99';
    if MaterialCB22.ItemIndex=1 then Taxonomy[6]:='+CIP';
    if MaterialCB22.ItemIndex=2 then Taxonomy[6]:='+PC';
    if MaterialCB22.ItemIndex=3 then Taxonomy[6]:='+CIPPS';
    if MaterialCB22.ItemIndex=4 then Taxonomy[6]:='+PCPS';
  end;



  if MaterialCB12.ItemIndex=5 then begin
    Taxonomy[5]:='S';
    if (MaterialCB22.ItemIndex=0) and (OmitCB.checked = false) then Taxonomy[6]:='+S99';
    if MaterialCB22.ItemIndex=1 then Taxonomy[6]:='+SL';
    if MaterialCB22.ItemIndex=2 then Taxonomy[6]:='+SR';
    if MaterialCB22.ItemIndex=3 then Taxonomy[6]:='+SO';
  end;

  if MaterialCB12.ItemIndex=6 then begin
    Taxonomy[5]:='ME';
    if (MaterialCB22.ItemIndex=0) and (OmitCB.checked = false) then Taxonomy[6]:='+ME99';
    if MaterialCB22.ItemIndex=1 then Taxonomy[6]:='+MEIR';
    if MaterialCB22.ItemIndex=2 then Taxonomy[6]:='+MEO';
  end;

  if MaterialCB12.ItemIndex=5 then begin
    if (MaterialCB32.ItemIndex=0) and (OmitCB.checked = false) then Taxonomy[7]:='+SC99';
    if MaterialCB32.ItemIndex=1 then Taxonomy[7]:='+WEL';
    if MaterialCB32.ItemIndex=2 then Taxonomy[7]:='+RIV';
    if MaterialCB32.ItemIndex=3 then Taxonomy[7]:='+BOL';
  end;

  if (MaterialCB12.ItemIndex>6) and (MaterialCB12.ItemIndex<11) then begin
    if MaterialCB12.ItemIndex=7 then Taxonomy[5]:='M99';
    if MaterialCB12.ItemIndex=8 then Taxonomy[5]:='MUR';
    if MaterialCB12.ItemIndex=9 then Taxonomy[5]:='MCF';

    if (MaterialCB22.ItemIndex=0) and (OmitCB.checked = false) then Taxonomy[6]:='+MUN99';
    if MaterialCB22.ItemIndex=1 then Taxonomy[6]:='+ADO';
    if MaterialCB22.ItemIndex=2 then Taxonomy[6]:='+ST99';
    if MaterialCB22.ItemIndex=3 then Taxonomy[6]:='+STRUB';
    if MaterialCB22.ItemIndex=4 then Taxonomy[6]:='+STDRE';
    if MaterialCB22.ItemIndex=5 then Taxonomy[6]:='+CL99';
    if MaterialCB22.ItemIndex=6 then Taxonomy[6]:='+CLBRS';
    if MaterialCB22.ItemIndex=7 then Taxonomy[6]:='+CLBRH';
    if MaterialCB22.ItemIndex=8 then Taxonomy[6]:='+CLBLH';
    if MaterialCB22.ItemIndex=9 then Taxonomy[6]:='+CB99';
    if MaterialCB22.ItemIndex=10 then Taxonomy[6]:='+CBS';
    if MaterialCB22.ItemIndex=11 then Taxonomy[6]:='+CBH';
    if MaterialCB22.ItemIndex=12 then Taxonomy[6]:='+MO';

    if MaterialCB12.ItemIndex=10 then begin
      Taxonomy[5]:='MR';
      if (MaterialCB42.ItemIndex=0) and (OmitCB.checked = false) then Taxonomy[6]:=Taxonomy[6]+'+MR99';
      if MaterialCB42.ItemIndex=1 then Taxonomy[6]:=Taxonomy[6]+'+RS';
      if MaterialCB42.ItemIndex=2 then Taxonomy[6]:=Taxonomy[6]+'+RW';
      if MaterialCB42.ItemIndex=3 then Taxonomy[6]:=Taxonomy[6]+'+RB';
      if MaterialCB42.ItemIndex=4 then Taxonomy[6]:=Taxonomy[6]+'+RCM';
      if MaterialCB42.ItemIndex=5 then Taxonomy[6]:=Taxonomy[6]+'+RCB';
    end;

    if (MaterialCB32.ItemIndex=0) and (OmitCB.checked = false) then Taxonomy[7]:='+MO99';
    if MaterialCB32.ItemIndex=1 then Taxonomy[7]:='+MON';
    if MaterialCB32.ItemIndex=2 then Taxonomy[7]:='+MOM';
    if MaterialCB32.ItemIndex=3 then Taxonomy[7]:='+MOL';
    if MaterialCB32.ItemIndex=4 then Taxonomy[7]:='+MOC';
    if MaterialCB32.ItemIndex=5 then Taxonomy[7]:='+MOCL';
    if MaterialCB32.ItemIndex=6 then Taxonomy[7]:='+SP99';
    if MaterialCB32.ItemIndex=7 then Taxonomy[7]:='+SPLI';
    if MaterialCB32.ItemIndex=8 then Taxonomy[7]:='+SPSA';
    if MaterialCB32.ItemIndex=9 then Taxonomy[7]:='+SPTU';
    if MaterialCB32.ItemIndex=10 then Taxonomy[7]:='+SPSL';
    if MaterialCB32.ItemIndex=11 then Taxonomy[7]:='+SPGR';
    if MaterialCB32.ItemIndex=12 then Taxonomy[7]:='+SPBA';
    if MaterialCB32.ItemIndex=13 then Taxonomy[7]:='+SPO';

  end;

  if (MaterialCB12.ItemIndex>10) and (MaterialCB12.ItemIndex<14) then begin
    if MaterialCB12.ItemIndex=11 then Taxonomy[5]:='E99';
    if MaterialCB12.ItemIndex=12 then Taxonomy[5]:='EU';
    if MaterialCB12.ItemIndex=13 then Taxonomy[5]:='ER';

    if (MaterialCB22.ItemIndex=0) and (OmitCB.checked = false) then Taxonomy[6]:='+ET99';
    if MaterialCB22.ItemIndex=1 then Taxonomy[6]:='+ETR';
    if MaterialCB22.ItemIndex=2 then Taxonomy[6]:='+ETC';
    if MaterialCB22.ItemIndex=3 then Taxonomy[6]:='+ETO';
  end;

  if MaterialCB12.ItemIndex=14 then begin
    Taxonomy[5]:='W';
    if (MaterialCB22.ItemIndex=0) and (OmitCB.checked = false) then Taxonomy[6]:='+W99';
    if MaterialCB22.ItemIndex=1 then Taxonomy[6]:='+WHE';
    if MaterialCB22.ItemIndex=2 then Taxonomy[6]:='+WLI';
    if MaterialCB22.ItemIndex=3 then Taxonomy[6]:='+WS';
    if MaterialCB22.ItemIndex=4 then Taxonomy[6]:='+WWD';
    if MaterialCB22.ItemIndex=5 then Taxonomy[6]:='+WBB';
    if MaterialCB22.ItemIndex=6 then Taxonomy[6]:='+WO';
  end;

  if MaterialCB12.ItemIndex=15 then Taxonomy[5]:='MATO';

  if (SystemCB12.ItemIndex=0) and (OmitCB.checked = false) then Taxonomy[8]:='L99';

  if (MaterialCB12.ItemIndex>10) and (MaterialCB12.ItemIndex<14) then begin
    if SystemCB12.ItemIndex=1 then Taxonomy[8]:='LN';
    if SystemCB12.ItemIndex=2 then Taxonomy[8]:='LWAL';
    if SystemCB12.ItemIndex=3 then Taxonomy[8]:='LO';
  end
  else if ((MaterialCB12.ItemIndex>6) and (MaterialCB12.ItemIndex<11)) or (MaterialCB12.ItemIndex=14) then begin
    if SystemCB12.ItemIndex=1 then Taxonomy[8]:='LN';
    if SystemCB12.ItemIndex=2 then Taxonomy[8]:='LFM';;
    if SystemCB12.ItemIndex=3 then Taxonomy[8]:='LPB';
    if SystemCB12.ItemIndex=4 then Taxonomy[8]:='LWAL';
    if SystemCB12.ItemIndex=5 then Taxonomy[8]:='LO';
  end
  else begin
    if SystemCB12.ItemIndex=1 then Taxonomy[8]:='LN';
    if SystemCB12.ItemIndex=2 then Taxonomy[8]:='LFM';
    if SystemCB12.ItemIndex=3 then Taxonomy[8]:='LFINF';
    if SystemCB12.ItemIndex=4 then Taxonomy[8]:='LFBR';
    if SystemCB12.ItemIndex=5 then Taxonomy[8]:='LPB';
    if SystemCB12.ItemIndex=6 then Taxonomy[8]:='LWAL';
    if SystemCB12.ItemIndex=7 then Taxonomy[8]:='LDUAL';
    if SystemCB12.ItemIndex=8 then Taxonomy[8]:='LFLS';
    if SystemCB12.ItemIndex=9 then Taxonomy[8]:='LFLSINF';
    if SystemCB12.ItemIndex=10 then Taxonomy[8]:='LH';
    if SystemCB12.ItemIndex=11 then Taxonomy[8]:='LO';
  end;

  if SystemCB12.ItemIndex>0 then begin
    if (SystemCB22.ItemIndex=0) and (OmitCB.checked = false) then Taxonomy[9]:='+DU99';
    if SystemCB22.ItemIndex=1 then Taxonomy[9]:='+DUC';
    if SystemCB22.ItemIndex=2 then Taxonomy[9]:='+DNO';
    if SystemCB22.ItemIndex=3 then Taxonomy[9]:='+DBD';
  end;

  // MOP UNTIL HERE

 if (DateCB1.ItemIndex=0) and (OmitCB.checked = false) then Taxonomy[10]:='Y99';
  if DateCB1.ItemIndex=1 then Taxonomy[10]:='YEX:'+dateE1.Text;
  if DateCB1.ItemIndex=2 then Taxonomy[10]:='YBET:'+dateE1.Text+','+dateE2.Text;
  if DateCB1.ItemIndex=3 then Taxonomy[10]:='YPRE:'+dateE1.Text;
  if DateCB1.ItemIndex=4 then Taxonomy[10]:='YAPP:'+dateE1.Text;

  // MOP HEIGHT DONE
  if HeightCB1.ItemIndex=0 then begin
    if OmitCB.checked = false then Taxonomy[11]:='H99';
  end

  else begin
    if HeightCB1.ItemIndex=1 then Taxonomy[11]:='HBET:'+noStoreysE11.Text+','+noStoreysE12.Text;
    if HeightCB1.ItemIndex=2 then Taxonomy[11]:='HEX:'+noStoreysE11.Text;
    if HeightCB1.ItemIndex=3 then Taxonomy[11]:='HAPP:'+noStoreysE11.Text;

    if (HeightCB2.ItemIndex=0) and (OmitCB.checked = false) then Taxonomy[12]:='+HB99';
    if HeightCB2.ItemIndex=1 then Taxonomy[12]:='+HBBET:'+noStoreysE21.Text+','+noStoreysE22.Text;
    if HeightCB2.ItemIndex=2 then Taxonomy[12]:='+HBEX:'+noStoreysE21.Text;
    if HeightCB2.ItemIndex=3 then Taxonomy[12]:='+HBAPP:'+noStoreysE21.Text;

    if (HeightCB3.ItemIndex=0) and (OmitCB.checked = false) then Taxonomy[12]:='+HF99';
    if HeightCB3.ItemIndex=1 then Taxonomy[13]:='+HFBET:'+noStoreysE31.Text+','+noStoreysE32.Text;
    if HeightCB3.ItemIndex=2 then Taxonomy[13]:='+HFEX:'+noStoreysE31.Text;
    if HeightCB3.ItemIndex=3 then Taxonomy[13]:='+HFAPP:'+noStoreysE31.Text;

    if (HeightCB4.ItemIndex=1) and (OmitCB.checked = false) then Taxonomy[14]:='+HD99';
    if HeightCB4.ItemIndex=1 then Taxonomy[14]:='+HD:'+noStoreysE41.Text;
  end;

 if OccupancyCB1.ItemIndex=0 then begin
    if OmitCB.checked = false then Taxonomy[15]:='OC99';
  end
  else begin
    if OccupancyCB1.ItemIndex=1 then begin
      Taxonomy[15]:='RES';
      if (OccupancyCB2.ItemIndex=0) and (OmitCB.checked = false) then Taxonomy[16]:='+RES99';
      if OccupancyCB2.ItemIndex=1 then Taxonomy[16]:='+RES1';
      if OccupancyCB2.ItemIndex=2 then Taxonomy[16]:='+RES2';
      if OccupancyCB2.ItemIndex=3 then Taxonomy[16]:='+RES2A';
      if OccupancyCB2.ItemIndex=4 then Taxonomy[16]:='+RES2B';
      if OccupancyCB2.ItemIndex=5 then Taxonomy[16]:='+RES2C';
      if OccupancyCB2.ItemIndex=6 then Taxonomy[16]:='+RES2D';
      if OccupancyCB2.ItemIndex=7 then Taxonomy[16]:='+RES2E';
      if OccupancyCB2.ItemIndex=8 then Taxonomy[16]:='+RES2F';
      if OccupancyCB2.ItemIndex=9 then Taxonomy[16]:='+RES3';
      if OccupancyCB2.ItemIndex=10 then Taxonomy[16]:='+RES4';
      if OccupancyCB2.ItemIndex=11 then Taxonomy[16]:='+RES5';
      if OccupancyCB2.ItemIndex=12 then Taxonomy[16]:='+RES6';
    end
    else if OccupancyCB1.ItemIndex=2 then begin
      Taxonomy[15]:='COM';
      if (OccupancyCB2.ItemIndex=0) and (OmitCB.checked = false) then Taxonomy[16]:='+COM99';
      if OccupancyCB2.ItemIndex=1 then Taxonomy[16]:='+COM1';
      if OccupancyCB2.ItemIndex=2 then Taxonomy[16]:='+COM2';
      if OccupancyCB2.ItemIndex=3 then Taxonomy[16]:='+COM3';
      if OccupancyCB2.ItemIndex=4 then Taxonomy[16]:='+COM4';
      if OccupancyCB2.ItemIndex=5 then Taxonomy[16]:='+COM5';
      if OccupancyCB2.ItemIndex=6 then Taxonomy[16]:='+COM6';
      if OccupancyCB2.ItemIndex=7 then Taxonomy[16]:='+COM7';
      if OccupancyCB2.ItemIndex=8 then Taxonomy[16]:='+COM8';
      if OccupancyCB2.ItemIndex=9 then Taxonomy[16]:='+COM9';
      if OccupancyCB2.ItemIndex=10 then Taxonomy[16]:='+COM10';
      if OccupancyCB2.ItemIndex=11 then Taxonomy[16]:='+COM11';
    end
    else if OccupancyCB1.ItemIndex=3 then begin
      Taxonomy[15]:='MIX';
      if (OccupancyCB2.ItemIndex=0) and (OmitCB.checked = false) then Taxonomy[16]:='+MIX99';
      if OccupancyCB2.ItemIndex=1 then Taxonomy[16]:='+MIX1';
      if OccupancyCB2.ItemIndex=2 then Taxonomy[16]:='+MIX2';
      if OccupancyCB2.ItemIndex=3 then Taxonomy[16]:='+MIX3';
      if OccupancyCB2.ItemIndex=4 then Taxonomy[16]:='+MIX4';
      if OccupancyCB2.ItemIndex=5 then Taxonomy[16]:='+MIX5';
      if OccupancyCB2.ItemIndex=6 then Taxonomy[16]:='+MIX6';
    end
    else if OccupancyCB1.ItemIndex=4 then begin
      Taxonomy[15]:='IND';
      if (OccupancyCB2.ItemIndex=0) and (OmitCB.checked = false) then Taxonomy[16]:='+IND99';
      if OccupancyCB2.ItemIndex=1 then Taxonomy[16]:='+IND1';
      if OccupancyCB2.ItemIndex=2 then Taxonomy[16]:='+IND2';
    end
    else if OccupancyCB1.ItemIndex=5 then begin
      Taxonomy[15]:='AGR';
      if (OccupancyCB2.ItemIndex=0) and (OmitCB.checked = false) then Taxonomy[16]:='+AGR99';
      if OccupancyCB2.ItemIndex=1 then Taxonomy[16]:='+AGR1';
      if OccupancyCB2.ItemIndex=2 then Taxonomy[16]:='+AGR2';
      if OccupancyCB2.ItemIndex=3 then Taxonomy[16]:='+AGR3';
    end
    else if OccupancyCB1.ItemIndex=6 then begin
      Taxonomy[15]:='ASS';
      if (OccupancyCB2.ItemIndex=0) and (OmitCB.checked = false) then Taxonomy[16]:='+ASS99';
      if OccupancyCB2.ItemIndex=1 then Taxonomy[16]:='+ASS1';
      if OccupancyCB2.ItemIndex=2 then Taxonomy[16]:='+ASS2';
      if OccupancyCB2.ItemIndex=3 then Taxonomy[16]:='+ASS3';
      if OccupancyCB2.ItemIndex=4 then Taxonomy[16]:='+ASS4';
    end
    else if OccupancyCB1.ItemIndex=7 then begin
      Taxonomy[15]:='GOV';
      if (OccupancyCB2.ItemIndex=0) and (OmitCB.checked = false) then Taxonomy[16]:='+GOV99';
      if OccupancyCB2.ItemIndex=1 then Taxonomy[16]:='+GOV1';
      if OccupancyCB2.ItemIndex=2 then Taxonomy[16]:='+GOV2';
    end
    else if OccupancyCB1.ItemIndex=8 then begin
      Taxonomy[15]:='EDU';
      if (OccupancyCB2.ItemIndex=0) and (OmitCB.checked = false) then Taxonomy[16]:='+EDU99';
      if OccupancyCB2.ItemIndex=1 then Taxonomy[16]:='+EDU1';
      if OccupancyCB2.ItemIndex=2 then Taxonomy[16]:='+EDU2';
      if OccupancyCB2.ItemIndex=3 then Taxonomy[16]:='+EDU3';
      if OccupancyCB2.ItemIndex=4 then Taxonomy[16]:='+EDU4';
    end
    else if OccupancyCB1.ItemIndex=9 then begin
      Taxonomy[15]:='OCO';
    end
  end;


 if (PositionCB.ItemIndex=0) and (OmitCB.checked = false) then Taxonomy[17]:='BP99';
  if PositionCB.ItemIndex=1 then Taxonomy[17]:='BPD';
  if PositionCB.ItemIndex=2 then Taxonomy[17]:='BP1';
  if PositionCB.ItemIndex=3 then Taxonomy[17]:='BP2';
  if PositionCB.ItemIndex=4 then Taxonomy[17]:='BP3';
  if PositionCB.ItemIndex=5 then Taxonomy[17]:='BPI';

  if (PlanShapeCB.ItemIndex=0) and (OmitCB.checked = false) then Taxonomy[18]:='PLF99';
  if PlanShapeCB.ItemIndex=1 then Taxonomy[18]:='PLFSQ';
  if PlanShapeCB.ItemIndex=2 then Taxonomy[18]:='PLFSQO';
  if PlanShapeCB.ItemIndex=3 then Taxonomy[18]:='PLFR';
  if PlanShapeCB.ItemIndex=4 then Taxonomy[18]:='PLFRO';
  if PlanShapeCB.ItemIndex=5 then Taxonomy[18]:='PLFL';
  if PlanShapeCB.ItemIndex=6 then Taxonomy[18]:='PLFC';
  if PlanShapeCB.ItemIndex=7 then Taxonomy[18]:='PLFCO';
  if PlanShapeCB.ItemIndex=8 then Taxonomy[18]:='PLFD';
  if PlanShapeCB.ItemIndex=9 then Taxonomy[18]:='PLFDO';
  if PlanShapeCB.ItemIndex=10 then Taxonomy[18]:='PLFE';
  if PlanShapeCB.ItemIndex=11 then Taxonomy[18]:='PLFH';
  if PlanShapeCB.ItemIndex=12 then Taxonomy[18]:='PLFS';
  if PlanShapeCB.ItemIndex=13 then Taxonomy[18]:='PLFT';
  if PlanShapeCB.ItemIndex=14 then Taxonomy[18]:='PLFU';
  if PlanShapeCB.ItemIndex=15 then Taxonomy[18]:='PLFX';
  if PlanShapeCB.ItemIndex=16 then Taxonomy[18]:='PLFY';
  if PlanShapeCB.ItemIndex=17 then Taxonomy[18]:='PLFP';
  if PlanShapeCB.ItemIndex=18 then Taxonomy[18]:='PLFPO';
  if PlanShapeCB.ItemIndex=19 then Taxonomy[18]:='PLFI';

  // MOP UNTIL HERE

  if RegularityCB1.ItemIndex=0 then begin
    if OmitCB.checked = false then Taxonomy[19]:='IR99';
  end
  else begin
    if RegularityCB1.ItemIndex=1 then Taxonomy[19]:='IRRE';
    if RegularityCB1.ItemIndex=2 then begin
      Taxonomy[19]:='IRIR';
      if (OmitCB.checked = false) and (RegularityCB2.ItemIndex=0) then Taxonomy[20]:='+IRPP:IRN';
      if RegularityCB2.ItemIndex=1 then Taxonomy[20]:='+IRPP:TOR';
      if RegularityCB2.ItemIndex=2 then Taxonomy[20]:='+IRPP:REC';
      if RegularityCB2.ItemIndex=3 then Taxonomy[20]:='+IRPP:IRHO';

      if (OmitCB.checked = false) and (RegularityCB3.ItemIndex=0)  then Taxonomy[21]:='+IRVP:IRN';
      if RegularityCB3.ItemIndex=1 then Taxonomy[21]:='+IRVP:SOS';
      if RegularityCB3.ItemIndex=2 then Taxonomy[21]:='+IRVP:CRW';
      if RegularityCB3.ItemIndex=3 then Taxonomy[21]:='+IRVP:SHC';
      if RegularityCB3.ItemIndex=4 then Taxonomy[21]:='+IRVP:POP';
      if RegularityCB3.ItemIndex=5 then Taxonomy[21]:='+IRVP:SET';
      if RegularityCB3.ItemIndex=6 then Taxonomy[21]:='+IRVP:CHV';
      if RegularityCB3.ItemIndex=7 then Taxonomy[21]:='+IRVP:IRVO';

      if RegularityCB4.ItemIndex>0 then begin
        if RegularityCB4.ItemIndex=0 then Taxonomy[22]:='+IRPS:IRN';
        if RegularityCB4.ItemIndex=1 then Taxonomy[22]:='+IRPS:TOR';
        if RegularityCB4.ItemIndex=2 then Taxonomy[22]:='+IRPS:REC';
        if RegularityCB4.ItemIndex=3 then Taxonomy[22]:='+IRPS:IRHO';
      end;
      if RegularityCB5.ItemIndex>0 then begin
        if RegularityCB5.ItemIndex=0 then Taxonomy[23]:='+IRVS:IRN';
        if RegularityCB5.ItemIndex=1 then Taxonomy[23]:='+IRVS:SOS';
        if RegularityCB5.ItemIndex=2 then Taxonomy[23]:='+IRVS:CRW';
        if RegularityCB5.ItemIndex=3 then Taxonomy[23]:='+IRVS:SHC';
        if RegularityCB5.ItemIndex=4 then Taxonomy[23]:='+IRVS:POP';
        if RegularityCB5.ItemIndex=5 then Taxonomy[23]:='+IRVS:SET';
        if RegularityCB5.ItemIndex=6 then Taxonomy[23]:='+IRVS:CHV';
        if RegularityCB5.ItemIndex=7 then Taxonomy[23]:='+IRVS:IRVO';
      end;
    end
  end;

  if (WallsCB.ItemIndex=0) and (OmitCB.checked = false) then Taxonomy[24]:='EW99';
  if WallsCB.ItemIndex=1 then Taxonomy[24]:='EWC';
  if WallsCB.ItemIndex=2 then Taxonomy[24]:='EWG';
  if WallsCB.ItemIndex=3 then Taxonomy[24]:='EWE';
  if WallsCB.ItemIndex=4 then Taxonomy[24]:='EWMA';
  if WallsCB.ItemIndex=5 then Taxonomy[24]:='EWME';
  if WallsCB.ItemIndex=6 then Taxonomy[24]:='EWV';
  if WallsCB.ItemIndex=7 then Taxonomy[24]:='EWW';
  if WallsCB.ItemIndex=8 then Taxonomy[24]:='EWSL';
  if WallsCB.ItemIndex=9 then Taxonomy[24]:='EWPL';
  if WallsCB.ItemIndex=10 then Taxonomy[24]:='EWCB';
  if WallsCB.ItemIndex=11 then Taxonomy[24]:='EWO';

 if (RoofCB1.ItemIndex=0) and (OmitCB.checked = false) then Taxonomy[25]:='RSH99';
  if RoofCB1.ItemIndex=1 then Taxonomy[25]:='RSH1';
  if RoofCB1.ItemIndex=2 then Taxonomy[25]:='RSH2';
  if RoofCB1.ItemIndex=3 then Taxonomy[25]:='RSH3';
  if RoofCB1.ItemIndex=4 then Taxonomy[25]:='RSH4';
  if RoofCB1.ItemIndex=5 then Taxonomy[25]:='RSH5';
  if RoofCB1.ItemIndex=6 then Taxonomy[25]:='RSH6';
  if RoofCB1.ItemIndex=7 then Taxonomy[25]:='RSH7';
  if RoofCB1.ItemIndex=8 then Taxonomy[25]:='RSH8';
  if RoofCB1.ItemIndex=9 then Taxonomy[25]:='RSH9';
  if RoofCB1.ItemIndex=10 then Taxonomy[25]:='RSHO';

  if (RoofCB2.ItemIndex=0) and (OmitCB.checked = false) then Taxonomy[26]:='+RMT99';
  if RoofCB2.ItemIndex=1 then Taxonomy[26]:='+RMN';
  if RoofCB2.ItemIndex=2 then Taxonomy[26]:='+RMT1';
  if RoofCB2.ItemIndex=3 then Taxonomy[26]:='+RMT2';
  if RoofCB2.ItemIndex=4 then Taxonomy[26]:='+RMT3';
  if RoofCB2.ItemIndex=5 then Taxonomy[26]:='+RMT4';
  if RoofCB2.ItemIndex=6 then Taxonomy[26]:='+RMT5';
  if RoofCB2.ItemIndex=7 then Taxonomy[26]:='+RMT6';
  if RoofCB2.ItemIndex=8 then Taxonomy[26]:='+RMT7';
  if RoofCB2.ItemIndex=9 then Taxonomy[26]:='+RMT8';
  if RoofCB2.ItemIndex=10 then Taxonomy[26]:='+RMT9';
  if RoofCB2.ItemIndex=11 then Taxonomy[26]:='+RMT10';
  if RoofCB2.ItemIndex=12 then Taxonomy[26]:='+RMT11';
  if RoofCB2.ItemIndex=13 then Taxonomy[26]:='+RMTO';

  if RoofCB3.ItemIndex=0 then begin
    if OmitCB.checked = false then Taxonomy[27]:='+R99';
  end
  else begin
    if RoofCB3.ItemIndex=1 then begin
      Taxonomy[27]:='+RM';
      if (RoofCB4.ItemIndex=0) and (OmitCB.checked = false) then Taxonomy[28]:='+RM99';
      if RoofCB4.ItemIndex=1 then Taxonomy[28]:='+RM1';
      if RoofCB4.ItemIndex=2 then Taxonomy[28]:='+RM2';
      if RoofCB4.ItemIndex=3 then Taxonomy[28]:='+RM3';
    end
    else if RoofCB3.ItemIndex=2 then begin
      Taxonomy[27]:='+RE';
      if (RoofCB4.ItemIndex=0) and (OmitCB.checked = false) then Taxonomy[28]:='+RE99';
      if RoofCB4.ItemIndex=1 then Taxonomy[28]:='+RE1';
    end
    else if RoofCB3.ItemIndex=3 then begin
      Taxonomy[27]:='+RC';
      if (RoofCB4.ItemIndex=0) and (OmitCB.checked = false) then Taxonomy[28]:='+RC99';
      if RoofCB4.ItemIndex=1 then Taxonomy[28]:='+RC1';
      if RoofCB4.ItemIndex=2 then Taxonomy[28]:='+RC2';
      if RoofCB4.ItemIndex=3 then Taxonomy[28]:='+RC3';
      if RoofCB4.ItemIndex=4 then Taxonomy[28]:='+RC4';
    end
    else if RoofCB3.ItemIndex=4 then begin
      Taxonomy[27]:='+RME';
      if (RoofCB4.ItemIndex=0) and (OmitCB.checked = false) then Taxonomy[28]:='+RME99';
      if RoofCB4.ItemIndex=1 then Taxonomy[28]:='+RME1';
      if RoofCB4.ItemIndex=2 then Taxonomy[28]:='+RME2';
      if RoofCB4.ItemIndex=3 then Taxonomy[28]:='+RME3';
    end
    else if RoofCB3.ItemIndex=5 then begin
      Taxonomy[27]:='+RWO';
      if (RoofCB4.ItemIndex=0) and (OmitCB.checked = false) then Taxonomy[28]:='+RWO99';
      if RoofCB4.ItemIndex=1 then Taxonomy[28]:='+RWO1';
      if RoofCB4.ItemIndex=2 then Taxonomy[28]:='+RWO2';
      if RoofCB4.ItemIndex=3 then Taxonomy[28]:='+RWO3';
      if RoofCB4.ItemIndex=4 then Taxonomy[28]:='+RWO4';
      if RoofCB4.ItemIndex=5 then Taxonomy[28]:='+RWO5';
    end
    else if RoofCB3.ItemIndex=6 then begin
      Taxonomy[27]:='+RFA';
      if RoofCB4.ItemIndex=0 then Taxonomy[28]:='+RFA1';
      if RoofCB4.ItemIndex=1 then Taxonomy[28]:='+RFAO';
    end
    else if RoofCB3.ItemIndex=7 then begin
      Taxonomy[27]:='+RO';
    end
  end;

  if (RoofCB5.ItemIndex=0) and (OmitCB.checked = false) then Taxonomy[29]:='+RWC99';
  if RoofCB5.ItemIndex=1 then Taxonomy[29]:='+RWCN';
  if RoofCB5.ItemIndex=2 then Taxonomy[29]:='+RWCP';
  if RoofCB5.ItemIndex=3 then Taxonomy[29]:='+RTD99';
  if RoofCB5.ItemIndex=4 then Taxonomy[29]:='+RTDN';
  if RoofCB5.ItemIndex=5 then Taxonomy[29]:='+RTDP';

  if FloorCB1.ItemIndex=0 then begin
    if OmitCB.checked = false then Taxonomy[30]:='F99';
  end
  else if FloorCB1.ItemIndex=1 then begin
    Taxonomy[30]:='FN';
  end
  else begin
    if FloorCB1.ItemIndex=2 then begin
      Taxonomy[30]:='FM';
      if (FloorCB2.ItemIndex=0) and (OmitCB.checked = false) then Taxonomy[31]:='+FM99';
      if FloorCB2.ItemIndex=1 then Taxonomy[31]:='+FM1';
      if FloorCB2.ItemIndex=2 then Taxonomy[31]:='+FM2';
      if FloorCB2.ItemIndex=3 then Taxonomy[31]:='+FM3';
    end
    else if FloorCB1.ItemIndex=3 then begin
      Taxonomy[30]:='FE';
      if (FloorCB2.ItemIndex=0) and (OmitCB.checked = false) then Taxonomy[31]:='+FE99';
    end
    else if FloorCB1.ItemIndex=4 then begin
      Taxonomy[30]:='FC';
      if (FloorCB2.ItemIndex=0) and (OmitCB.checked = false) then Taxonomy[31]:='+FC99';
      if FloorCB2.ItemIndex=1 then Taxonomy[31]:='+FC1';
      if FloorCB2.ItemIndex=2 then Taxonomy[31]:='+FC2';
      if FloorCB2.ItemIndex=3 then Taxonomy[31]:='+FC3';
      if FloorCB2.ItemIndex=4 then Taxonomy[31]:='+FC4';
    end
    else if FloorCB1.ItemIndex=5 then begin
      Taxonomy[30]:='FME';
      if (FloorCB2.ItemIndex=0) and (OmitCB.checked = false) then Taxonomy[31]:='+FME99';
      if FloorCB2.ItemIndex=1 then Taxonomy[31]:='+FME1';
      if FloorCB2.ItemIndex=2 then Taxonomy[31]:='+FME2';
      if FloorCB2.ItemIndex=3 then Taxonomy[31]:='+FME3';
    end
    else if FloorCB1.ItemIndex=6 then begin
      Taxonomy[30]:='FW';
      if (FloorCB2.ItemIndex=0) and (OmitCB.checked = false) then Taxonomy[31]:='+FW99';
      if FloorCB2.ItemIndex=1 then Taxonomy[31]:='+FW1';
      if FloorCB2.ItemIndex=2 then Taxonomy[31]:='+FW2';
      if FloorCB2.ItemIndex=3 then Taxonomy[31]:='+FW3';
      if FloorCB2.ItemIndex=4 then Taxonomy[31]:='+FW4';
    end
    else if FloorCB1.ItemIndex=7 then begin
      Taxonomy[30]:='FO';
    end
  end;

  if (FloorCB3.ItemIndex=0) and (OmitCB.checked = false) then Taxonomy[32]:='+FWC99';
  if FloorCB3.ItemIndex=1 then Taxonomy[32]:='+FWCN';
  if FloorCB3.ItemIndex=2 then Taxonomy[32]:='+FWCP';

  if (FoundationsCB.ItemIndex=0) and (OmitCB.checked = false) then Taxonomy[33]:='FOS99';
  if FoundationsCB.ItemIndex=1 then Taxonomy[33]:='FOSSL';
  if FoundationsCB.ItemIndex=2 then Taxonomy[33]:='FOSN';
  if FoundationsCB.ItemIndex=3 then Taxonomy[33]:='FOSDL';
  if FoundationsCB.ItemIndex=4 then Taxonomy[33]:='FOSDN';
  if FoundationsCB.ItemIndex=5 then Taxonomy[33]:='FOSO';

  direction1:='DX';
  direction2:='DY';
  if (Direction1RB1.checked) and (OmitCB.checked = false) then begin
    direction1 := direction1+'+D99';
    direction2 := direction2+'+D99';
  end
  else if Direction1RB2.checked then begin
    direction1 := direction1+'+PF';
    direction2 := direction2+'+OF';
  end;

  ResTax:=direction1+'/'+Taxonomy[0]+Taxonomy[1]+Taxonomy[2]+'/'+Taxonomy[3]+Taxonomy[4]+'/'+direction2+'/'+Taxonomy[5]+Taxonomy[6]+Taxonomy[7]+'/'+Taxonomy[8]+Taxonomy[9]+'/'
  +Taxonomy[11]+Taxonomy[12]+Taxonomy[13]+Taxonomy[14]+'/'+Taxonomy[10]+'/'+Taxonomy[15]+Taxonomy[16]+'/'+Taxonomy[17]+'/'+Taxonomy[18]+'/'+Taxonomy[19]+Taxonomy[20]
  +Taxonomy[22]+Taxonomy[21]+Taxonomy[23]+'/'+Taxonomy[24]+'/'+Taxonomy[25]+Taxonomy[26]+Taxonomy[27]+Taxonomy[28]+Taxonomy[29]+'/'+Taxonomy[30]
  +Taxonomy[31]+Taxonomy[32]+'/'+Taxonomy[33];
  resultE.Text:=ResTax;



end;
end.
*/

function taxt_OutTypeCBSelect(obj)
{
    taxt_BuildTaxonomy();
}

function taxt_Initiate() {
    var OutTypeCB = [];
    OutTypeCB.push('Full');
    OutTypeCB.push('Omit Unknown');
    OutTypeCB.push('Short');
    select_populate('OutTypeCB', OutTypeCB);
    gem$('#OutTypeCB').on('change', taxt_OutTypeCBSelect);
    gem$('#OutTypeCB').val(2);

    gem$('#DirectionCB').prop('checked', true);
    gem$('#DirectionCB').on('change', taxt_SetDirection2);

    // FIXME: t0 only, load a preview saved taxonomy must be done
    var MaterialCB11 = [];
    /* MAT99 */ MaterialCB11.push({ _text: 'Unknown Material', 'dataGemHelp': 'glossary/cast-in-place-concrete--cip.html'});
    /* C99   */ MaterialCB11.push('Concrete, unknown reinforcement');
    /* CU    */ MaterialCB11.push('Concrete, unreinforced');
    /* CR    */ MaterialCB11.push('Concrete, reinforced');
    /* SRC   */ MaterialCB11.push('Concrete, composite with steel section');
    /* S     */ MaterialCB11.push('Steel');
    /* ME    */ MaterialCB11.push('Metal (except steel)');
    /* M99   */ MaterialCB11.push('Masonry, unknown reinforcement');
    /* MUR   */ MaterialCB11.push('Masonry, unreinforced');
    /* MCF   */ MaterialCB11.push('Masonry, confined');
    /* MR    */ MaterialCB11.push('Masonry, reinforced');
    /* E99   */ MaterialCB11.push('Earth, unknown reinforcement');
    /* EU    */ MaterialCB11.push('Earth, unreinforced');
    /* ER    */ MaterialCB11.push('Earth, reinforced');
    /* W     */ MaterialCB11.push('Wood');
    /* MATO  */ MaterialCB11.push('Other material');
    select_populate('MaterialCB11', MaterialCB11);
    gem$('#MaterialCB11').on('change', taxt_MaterialCB11Select);
    gem$('#MaterialCB21').on('change', taxt_MaterialCB21Select);
    gem$('#MaterialCB31').on('change', taxt_MaterialCB31Select);
    gem$('#MaterialCB41').on('change', taxt_MaterialCB41Select);
    gem$('#SystemCB11').on('change', taxt_SystemCB11Select);
    gem$('#SystemCB21').on('change', taxt_SystemCB21Select);

    var MaterialCB12 = [];
    /* same */ MaterialCB12.push('Unknown Material');
    /* same */ MaterialCB12.push('Concrete, unknown reinforcement');
    /* same */ MaterialCB12.push('Concrete, unreinforced');
    /* same */ MaterialCB12.push('Concrete, reinforced');
    /* same */ MaterialCB12.push('Concrete, composite with steel section');
    /* same */ MaterialCB12.push('Steel');
    /* same */ MaterialCB12.push('Metal (except steel)');
    /* same */ MaterialCB12.push('Masonry, unknown reinforcement');
    /* same */ MaterialCB12.push('Masonry, unreinforced');
    /* same */ MaterialCB12.push('Masonry, confined');
    /* same */ MaterialCB12.push('Masonry, reinforced');
    /* same */ MaterialCB12.push('Earth, unknown reinforcement');
    /* same */ MaterialCB12.push('Earth, unreinforced');
    /* same */ MaterialCB12.push('Earth, reinforced');
    /* same */ MaterialCB12.push('Wood');
    /* same */ MaterialCB12.push('Other material');
    select_populate('MaterialCB12', MaterialCB12);
    gem$('#MaterialCB12').on('change', taxt_MaterialCB12Select);
    gem$('#MaterialCB22').on('change', taxt_MaterialCB22Select);
    gem$('#MaterialCB32').on('change', taxt_MaterialCB32Select);
    gem$('#MaterialCB42').on('change', taxt_MaterialCB42Select);
    gem$('#SystemCB12').on('change', taxt_SystemCB12Select);
    gem$('#SystemCB22').on('change', taxt_SystemCB22Select);

    var HeightCB1 = [];
    /* H99  */ HeightCB1.push('Unknown number of storeys');
    /* HBET */ HeightCB1.push('Range of the number of storeys');
    /* HEX  */ HeightCB1.push('Exact number of storeys');
    /* HAPP */ HeightCB1.push('Approximate number of storeys');
    select_populate('HeightCB1', HeightCB1);
    gem$('#HeightCB1').val(0);
    gem$('#HeightCB1').on('change', taxt_HeightCB1Select);
    gem$('#noStoreysE11').on('change', taxt_HeightCB1Select);
    gem$('#noStoreysE12').on('change', taxt_HeightCB1Select);

    var HeightCB2 = [];
    /* HB99  */ HeightCB2.push('Unknown number of storeys');
    /* HBBET */ HeightCB2.push('Range of the number of storeys');
    /* HBEX  */ HeightCB2.push('Exact number of storeys');
    /* HBAPP */ HeightCB2.push('Approximate number of storeys');
    select_populate('HeightCB2', HeightCB2);
    gem$('#HeightCB2').val(0);
    gem$('#HeightCB2').on('change', taxt_HeightCB2Select);
    gem$('#noStoreysE21').on('change', taxt_HeightCB2Select);
    gem$('#noStoreysE22').on('change', taxt_HeightCB2Select);

    var HeightCB3 = [];
    /* HF99  */ HeightCB3.push('Height above grade unknown');
    /* HFBET */ HeightCB3.push('Range of height above grade');
    /* HFEX  */ HeightCB3.push('Exact height above grade');
    /* HFAPP */ HeightCB3.push('Approximate height above grade');
    select_populate('HeightCB3', HeightCB3);
    gem$('#HeightCB3').val(0);
    gem$('#HeightCB3').on('change', taxt_HeightCB3Select);
    gem$('#noStoreysE31').on('change', taxt_HeightCB3Select);
    gem$('#noStoreysE32').on('change', taxt_HeightCB3Select);

    var HeightCB4 = [];
    /* HD99  */ HeightCB4.push('Unknown slope');
    /* HD    */ HeightCB4.push('Slope of the ground');
    select_populate('HeightCB4', HeightCB4);
    gem$('#HeightCB4').val(0);
    gem$('#HeightCB4').on('change', taxt_HeightCB4Select);
    gem$('#noStoreysE41').on('change', taxt_HeightCB4Select);

    var DateCB1 = [];
    /* Y99  */ DateCB1.push('Year unknown');
    /* YEX  */ DateCB1.push('Exact date of construction or retrofit');
    /* YBET */ DateCB1.push('Bounds for the date of construction or retrofit');
    /* YPRE */ DateCB1.push('Latest possible date of construction or retrofit');
    /* YAPP */ DateCB1.push('Approximate date of construction or retrofit');
    select_populate('DateCB1', DateCB1);
    gem$('#DateCB1').val(0);
    gem$('#DateCB1').on('change', taxt_DateCB1Select);
    gem$('#DateE1').on('change', taxt_DateE1Change);
    gem$('#DateE2').on('change', taxt_DateE2Change);

    var OccupancyCB1 = [];
    /* OC99  */ OccupancyCB1.push('Unknown occupancy type');
    /* RES   */ OccupancyCB1.push('Residential');
    /* COM   */ OccupancyCB1.push('Commercial and public');
    /* MIX   */ OccupancyCB1.push('Mixed use');
    /* IND   */ OccupancyCB1.push('Industrial');
    /* AGR   */ OccupancyCB1.push('Agriculture');
    /* ASS   */ OccupancyCB1.push('Assembly');
    /* GOV   */ OccupancyCB1.push('Government');
    /* EDU   */ OccupancyCB1.push('Education');
    /* OCO   */ OccupancyCB1.push('Other occupancy type');
    select_populate('OccupancyCB1', OccupancyCB1);
    gem$('#OccupancyCB1').val(0);
    gem$('#OccupancyCB1').on('change', taxt_OccupancyCB1Select);
    gem$('#OccupancyCB2').on('change', taxt_OccupancyCB2Select);

    var PositionCB = [];
    /* BP99 */ PositionCB.push('Unknown building position');
    /* BPD  */ PositionCB.push('Detached building');
    /* BP1  */ PositionCB.push('Adjoining building(s) on one side');
    /* BP2  */ PositionCB.push('Adjoining building(s) on two sides');
    /* BP3  */ PositionCB.push('Adjoining building(s) on three sides');
    select_populate('PositionCB', PositionCB);
    gem$('#PositionCB').val(0);
    gem$('#PositionCB').on('change', taxt_PositionCBSelect);

    var PlanShapeCB = [];
    /* PLF99  */ PlanShapeCB.push('Unknown plan shape');
    /* PLFSQ  */ PlanShapeCB.push('Square, solid');
    /* PLFSQO */ PlanShapeCB.push('Square, with an opening in plan');
    /* PLFR   */ PlanShapeCB.push('Rectangular, solid');
    /* PLFRO  */ PlanShapeCB.push('Rectangular, with an opening in plan');
    /* PLFL   */ PlanShapeCB.push('L-shape');
    /* PLFC   */ PlanShapeCB.push('Curved, solid (e.g. circular, eliptical, ovoid)');
    /* PLFCO  */ PlanShapeCB.push('Curved, with an opening in plan');
    /* PLFD   */ PlanShapeCB.push('Triangular, solid');
    /* PLFDO  */ PlanShapeCB.push('Triangular, with an opening in plan');
    /* PLFE   */ PlanShapeCB.push('E-shape');
    /* PLFH   */ PlanShapeCB.push('H-shape');
    /* PLFS   */ PlanShapeCB.push('S-shape');
    /* PLFT   */ PlanShapeCB.push('T-shape');
    /* PLFU   */ PlanShapeCB.push('U- or C-shape');
    /* PLFX   */ PlanShapeCB.push('X-shape');
    /* PLFY   */ PlanShapeCB.push('Y-shape');
    /* PLFP   */ PlanShapeCB.push('Polygonal, solid');
    /* PLFPO  */ PlanShapeCB.push('Polygonal, with an opening in plan');
    /* PLFI   */ PlanShapeCB.push('Irregular plan shape');
    select_populate('PlanShapeCB', PlanShapeCB);
    gem$('#PlanShapeCB').val(0);
    gem$('#PlanShapeCB').on('change', taxt_PlanShapeCBSelect);

    var RegularityCB1 = [];
    /* IR99 */ RegularityCB1.push('Unknown structural irregularity');
    /* IRRE */ RegularityCB1.push('Regular structure');
    /* IRIR */ RegularityCB1.push('Irregular structure');
    select_populate('RegularityCB1', RegularityCB1);
    gem$('#RegularityCB1').on('change', taxt_RegularityCB1Select);
    gem$('#RegularityCB2').on('change', taxt_RegularityCB2Select);
    gem$('#RegularityCB3').on('change', taxt_RegularityCB3Select);
    gem$('#RegularityCB4').on('change', taxt_RegularityCB4Select);
    gem$('#RegularityCB5').on('change', taxt_RegularityCB5Select);

    var WallsCB = [];
    /* EW99 */  WallsCB.push('Unknown material of exterior walls');
    /* EWC  */  WallsCB.push('Concrete exterior walls');
    /* EWG  */  WallsCB.push('Glass exterior walls');
    /* EWE  */  WallsCB.push('Earthen exterior walls');
    /* EWMA */  WallsCB.push('Masonry exterior walls');
    /* EWME */  WallsCB.push('Metal exterior walls');
    /* EWV  */  WallsCB.push('Vegetative exterior walls');
    /* EWW  */  WallsCB.push('Wooden exterior walls');
    /* EWSL */  WallsCB.push('Stucco finish on light framing for exterior walls');
    /* EWPL */  WallsCB.push('Plastic/vinyl exterior walls, various');
    /* EWCB */  WallsCB.push('Cement-based boards for exterior walls');
    /* EWO  */  WallsCB.push('Material of exterior walls, other');
    select_populate('WallsCB', WallsCB);
    gem$('#WallsCB').val(0);
    gem$('#WallsCB').on('change', taxt_WallsCBSelect);

    var RoofCB1 = [];
    /* RSH99  */ RoofCB1.push('Unknown roof shape');
    /* RSH1   */ RoofCB1.push('Flat');
    /* RSH2   */ RoofCB1.push('Pitched with gable ends');
    /* RSH3   */ RoofCB1.push('Pitched and hipped');
    /* RSH4   */ RoofCB1.push('Pitched with dormers');
    /* RSH5   */ RoofCB1.push('Monopitch');
    /* RSH6   */ RoofCB1.push('Sawtooth');
    /* RSH7   */ RoofCB1.push('Curved');
    /* RSH8   */ RoofCB1.push('Complex regular');
    /* RSH9   */ RoofCB1.push('Complex irregular');
    /* RSHO   */ RoofCB1.push('Roof shape, other');
    select_populate('RoofCB1', RoofCB1);
    gem$('#RoofCB1').val(0);
    gem$('#RoofCB1').on('change', taxt_RoofCB1Select);

    var RoofCB2 = [];
    /* RMT99 */ RoofCB2.push('Unknown roof covering');
    /* RMN   */ RoofCB2.push('Concrete roof, no covering');
    /* RMT1  */ RoofCB2.push('Clay or concrete tile roof covering');
    /* RMT2  */ RoofCB2.push('Fibre cement or metal tile covering');
    /* RMT3  */ RoofCB2.push('Membrane roof covering');
    /* RMT4  */ RoofCB2.push('Slate roof covering');
    /* RMT5  */ RoofCB2.push('Stone slab roof covering');
    /* RMT6  */ RoofCB2.push('Metal or asbestos sheet covering');
    /* RMT7  */ RoofCB2.push('Wooden or asphalt shingle covering');
    /* RMT8  */ RoofCB2.push('Vegetative roof covering');
    /* RMT9  */ RoofCB2.push('Earthen roof covering');
    /* RMT10 */ RoofCB2.push('Solar panelled roofs');
    /* RMT11 */ RoofCB2.push('Tensile membrane or fabric roof');
    /* RMTO  */ RoofCB2.push('Roof covering, other');
    select_populate('RoofCB2', RoofCB2);
    gem$('#RoofCB2').val(0);
    gem$('#RoofCB2').on('change', taxt_RoofCB2Select);

    var RoofCB3 = [];
    /* R99 */ RoofCB3.push('Roof material, unknown');
    /* RM  */ RoofCB3.push('Masonry roof');
    /* RE  */ RoofCB3.push('Earthen roof');
    /* RC  */ RoofCB3.push('Concrete roof');
    /* RME */ RoofCB3.push('Metal roof');
    /* RWO */ RoofCB3.push('Wooden roof');
    /* RFA */ RoofCB3.push('Fabric roof');
    /* RO  */RoofCB3.push('Roof material,other');
    select_populate('RoofCB3', RoofCB3);
    gem$('#RoofCB3').val(0);
    gem$('#RoofCB3').on('change', taxt_RoofCB3Select);
    gem$('#RoofCB4').on('change', taxt_RoofCB4Select);

    var RoofCB5 = [];
    /* RWC99 */ RoofCB5.push('Roof-wall diaphragm connection unknown');
    /* RWCN  */ RoofCB5.push('Roof-wall diaphragm connection not provided');
    /* RWCP  */ RoofCB5.push('Roof-wall diaphragm connection present');
    /* RTD99 */ RoofCB5.push('Roof tie-down unknown');
    /* RTDN  */ RoofCB5.push('Roof tie-down not provided');
    /* RTDP  */ RoofCB5.push('Roof tie-down present');
    select_populate('RoofCB5', RoofCB5);
    gem$('#RoofCB5').val(0);
    gem$('#RoofCB5').on('change', taxt_RoofCB5Select);

    var FoundationsCB = [];
    /* FOS99  */ FoundationsCB.push('Unknown foundation system');
    /* FOSSL  */ FoundationsCB.push('Shallow foundation, with lateral capacity');
    /* FOSN   */ FoundationsCB.push('Shallow foundation, with no lateral capacity');
    /* FOSDL  */ FoundationsCB.push('Deep foundation, with lateral capacity');
    /* FOSDN  */ FoundationsCB.push('Deep foundation, with no lateral capacity');
    /* FOSO   */ FoundationsCB.push('Foundation, other');
    select_populate('FoundationsCB', FoundationsCB);
    gem$('#FoundationsCB').val(0);
    gem$('#FoundationsCB').on('change', taxt_FoundationsCBSelect);

    var FloorCB1 = [];
    /* F99 */ FloorCB1.push('Floor material, unknown');
    /* FN  */ FloorCB1.push('No elevated or suspended floor material (single-storey)');
    /* FM  */ FloorCB1.push('Masonry floor');
    /* FE  */ FloorCB1.push('Earthen floor');
    /* FC  */ FloorCB1.push('Concrete floor');
    /* FME */ FloorCB1.push('Metal floor');
    /* FW  */ FloorCB1.push('Wooden floor');
    /* FO  */ FloorCB1.push('Floor material, other');
    select_populate('FloorCB1', FloorCB1);
    gem$('#FloorCB1').val(0);
    gem$('#FloorCB1').on('change', taxt_FloorCB1Select);
    gem$('#FloorCB2').on('change', taxt_FloorCB2Select);

    var FloorCB3 = [];
    /* FWC99 */ FloorCB3.push('Floor-wall diaphragm connection, unknown');
    /* FWCN  */ FloorCB3.push('Floor-wall diaphragm connection not provided');
    /* FWCP  */ FloorCB3.push('Floor-wall diaphragm connection present');
    select_populate('FloorCB3', FloorCB3);
    gem$('#FloorCB3').val(0);
    gem$('#FloorCB3').on('change', taxt_FloorCB3Select);

    // TAIL
    taxt_ValidateMaterial1();
    taxt_ValidateSystem1();
    taxt_ValidateMaterial2();
    taxt_ValidateSystem2();
    taxt_ValidateRoof();
    taxt_ValidateFloor();
    taxt_ValidateHeight();
    taxt_ValidateDate();
    taxt_ValidateRegularity();
    taxt_ValidateOccupancy();
    /* FIXME: MOP addition */
    taxt_BuildTaxonomy();
}

var subtab_cur = -1;

function tab_set(id_or_obj) {
    var tab_items;

    if (subtab_cur == -1) {
        subtab_cur = 1;
    }

    if (typeof(id_or_obj) == 'object') {
        id = id_or_obj.id;
    }
    else if (typeof(id_or_obj) == 'number') {
        taxt_Initiate();

        id = "tab_id-" + id_or_obj;
        if (arguments.length > 1) {
            subtab_cur = arguments[1];
        }
    }

    tab_items = gem$('[id|="tab_id"]');

    for (i = 0 ; i < tab_items.length ; i++) {
        if (tab_items[i].id == id) {
            gem$(tab_items[i]).removeClass("tab");
            gem$(tab_items[i]).addClass("tab_selected");
            gem$("#main_content-" + (i+1)).css('display', '');
        }
        else {
            gem$(tab_items[i]).removeClass("tab_selected");
            gem$(tab_items[i]).addClass("tab");
            gem$("#main_content-" + (i+1)).css('display', 'none');
        }
    }

    if (id == "tab_id-1") {
        sub1tab_set(subtab_cur);
    }
}

function sub1tab_set(id_or_obj) {
    var tab_items;

    if (typeof(id_or_obj) == 'object') {
        id = id_or_obj.id;
        subtab_cur = parseInt(id.substring(11));
    }
    else if (typeof(id_or_obj) == 'number') {
        id = "sub1tab_id-" + id_or_obj;
        subtab_cur = id_or_obj;
    }

    tab_items = gem$('[id|="sub1tab_id"]');


    for (i = 0 ; i < tab_items.length ; i++) {
        if (tab_items[i].id == id) {
            gem$(tab_items[i]).toggleClass("subtab_first");
            gem$(tab_items[i]).removeClass("subtab");
            gem$(tab_items[i]).addClass("subtab_selected");
            gem$(tab_items[i]).toggleClass("subtab_first");
            gem$("#sub1_content-" + (i+1)).css('display', '');
        }
        else {
            gem$(tab_items[i]).removeClass("subtab_selected");
            gem$(tab_items[i]).addClass("subtab");
            gem$("#sub1_content-" + (i+1)).css('display', 'none');
        }
    }
}

function acheck(sar, pfx)
{
    for(key in sar) {
        if (sar[key].indexOf(pfx) == 0) {
            return (sar[key]);
        }
    }
    return (null);
}

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

function populate(s, ret_s) {
    var i;
    var sar, subar, dirx, diry, el;
    var mat;

    sar = s.split('/');
    gem$('#DirectionCB').prop('checked', false);

    //
    //  Direction
    //
    dirx = sar[0];
    diry = sar[3];
    if (dirx == "DX+D99" && diry == "DY+D99") {
        gem$("#Direction1RB1").prop("checked", true);
        taxt_Direction1RB1Click(null);
    }
    else if (dirx == "DX+PF" && diry == "DY+OF") {
        gem$("#Direction1RB2").prop("checked", true);
        taxt_Direction1RB2Click(null);
    }
    else {
        ret_s.s = "Not valid 'Direction specifications' found.";
        return false;
    }

    //
    //  Material
    //
    var mat_ddown = [ '#MaterialCB11', '#MaterialCB12' ];
    var mat_selec = [ taxt_MaterialCB11Select, taxt_MaterialCB12Select ];
    var mat_tecn_ddown = [ '#MaterialCB21', '#MaterialCB22' ];
    var mat_tecn_selec = [ taxt_MaterialCB21Select, taxt_MaterialCB22Select ];
    var mat_tead_ddown = [ '#MaterialCB41', '#MaterialCB42' ];
    var mat_tead_selec = [ taxt_MaterialCB41Select, taxt_MaterialCB42Select ];
    var mat_prop_ddown = [ '#MaterialCB31', '#MaterialCB32' ];
    var mat_prop_selec = [ taxt_MaterialCB31Select, taxt_MaterialCB32Select ];
    var llrs_ddown = [ '#SystemCB11', '#SystemCB12' ];
    var llrs_selec = [ taxt_SystemCB11Select, taxt_SystemCB12Select ];
    var llrs_duct_ddown = [ '#SystemCB21', '#SystemCB22' ];
    var llrs_duct_selec = [ taxt_SystemCB21Select, taxt_SystemCB22Select ];

    var mat_id, mat_atom, llrs, llrs_atom;

    for (direct = 0 ; direct < 2 ; direct++) {
        mat  = sar[1+(direct * 3)].split('+');
        llrs = sar[2+(direct * 3)].split('+');
        if (mat.length < 1) {
            ret_s.s = "Not defined material for 'Direction " + (direct == 0 ? "X" : "Y") + "'";
            return (false);
        }
        if (llrs.length < 1) {
            ret_s.s = "Not defined LLRS for 'Direction " + (direct == 0 ? "X" : "Y") + "'";
            return (false);
        }

        for (i = 0 ; i < material.length ; i++) {
            if (mat[0] == material[i].id) {
                mat_id = mat[0];
                gem$(mat_ddown[direct]).val(i);
                mat_selec[direct]();
                break;
            }
        }
        if (i ==  material.length) {
            ret_s.s = "Not identified '" + mat[0] + "' material for 'Direction " + (direct == 0 ? "X" : "Y") + "'";
            return (false);
        }

        for (sub_i = 1 ; sub_i < mat.length ; sub_i++) {
            mat_atom = mat[sub_i];

            // Material technology
            for (i = 0 ; i < mat_tech[mat_id].length ;  i++) {
                if (mat_atom == mat_tech[mat_id][i].id) {
                    gem$(mat_tecn_ddown[direct]).val(i);
                    mat_tecn_selec[direct]();
                    break;
                }
            }
            if (i < mat_tech[mat_id].length)
                continue;

            // Material technology added
            for (i = 0 ; i < mat_tead[mat_id].length ;  i++) {
                if (mat_atom == mat_tead[mat_id][i].id) {
                    gem$(mat_tead_ddown[direct]).val(i);
                    mat_tead_selec[direct]();
                    break;
                }
            }
            if (i < mat_tead[mat_id].length)
                continue;

            // Material properties
            for (i = 0 ; i < mat_prop[mat_id].length ;  i++) {
                if (mat_atom == mat_prop[mat_id][i].id) {
                    gem$(mat_prop_ddown[direct]).val(i);
                    mat_prop_selec[direct]();
                    break;
                }
            }
            if (i < mat_prop[mat_id].length)
                continue;

            ret_s.s = "Not identified '" + mat_atom + "' as specification of '" + mat_id + "' material for 'Direction " + (direct == 0 ? "X" : "Y") + "'.";
            return (false);
        }

        //
        //  Lateral load resisting system: type
        //
        for (i = 0 ; i < llrs_type[mat_id].length ;  i++) {
            llrs_id = llrs_type[mat_id][i].id;

            if (llrs[0] == llrs_id) {
                gem$(llrs_ddown[direct]).val(i);
                llrs_selec[direct]();
                break;
            }
        }
        if (i == llrs_type[mat_id].length) {
            ret_s.s = "Not identified '" + llrs[0] + "' as LLRS of '" + mat_id + "' material for 'Direction " + (direct == 0 ? "X" : "Y") + "'.";
            return (false);
        }


        for (sub_i = 1 ; sub_i < llrs.length ; sub_i++) {
            llrs_atom = llrs[sub_i];

            // Ductility
            for (i = 0 ; i < llrs_duct[llrs_id].length ;  i++) {
                if (llrs_atom == llrs_duct[llrs_id][i].id) {
                    gem$(llrs_duct_ddown[direct]).val(i);
                    llrs_duct_selec[direct]();
                    break;
                }
            }
            if (i < llrs_duct[llrs_id].length)
                continue;

            ret_s.s = "Not identified '" + llrs_atom + "' as specification of '" + llrs[0] + "' LLRS of '" + mat_id + "' material for 'Direction " + (direct == 0 ? "X" : "Y") + "'.";
            return (false);
        }
    }
    var dir_items = [ '#MaterialCB1', '#MaterialCB2', '#MaterialCB3', '#MaterialCB4',
                      '#SystemCB1', '#SystemCB2' ];
    for (i = 0 ; i < dir_items.length ; i++) {
        if (gem$(dir_items[i]+'1').val() != gem$(dir_items[i]+'2').val()) {
            break;
        }
    }
    if (i == dir_items.length) {
        gem$('#DirectionCB').prop('checked', true);
    }

    //
    //  Height
    //
    var h, h_items, h_label, h_id, h_vals, h_grp;
    var h_map = [ 'H99' , 'HBET' , 'HEX' , 'HAPP' ,
                  'HB99', 'HBBET', 'HBEX', 'HBAPP',
                  'HF99', 'HFBET', 'HFEX', 'HFAPP',
                  'HD99',  null  , 'HD' ]

    var h_pref = [ 'H', 'HB', 'HF', 'HD' ];
    var h_cbid = [  1 ,   2 ,   3,    4  ];
    var h_title = [ 'Number of storey above ground',
                    'Number of storey below ground',
                    'Height of ground floor level above grade',
                    'Slope of the ground' ];

    var hsfx_99 = 0, hsfx_bet = 1, hsfx_ex = 2, hsfx_app = 3;

    var h_cbfun = [ taxt_HeightCB1Select, taxt_HeightCB2Select, taxt_HeightCB3Select, taxt_HeightCB4Select ];
    var h_typck = [ is_not_negative_int, is_not_negative_int, is_not_negative_float, is_in_rect_angle_float ];
    var h_typck_s = [ "positive integer", "positive integer", "positive real", "positive real between 0 and 90" ];
    var h_convf = [ parseInt, parseInt, parseFloat, parseInt ];
    h = sar[6].split('+');

    for (sub_i = 0 ; sub_i < h.length ; sub_i++) {
        var dynfunc;

        h_items = h[sub_i].split(':');
        h_label = h_items[0];

        h_id = h_map.indexOf(h_label);
        if (h_id == -1) {
            ret_s.s = "Height not defined properly.";
            return (false);
        }
        h_grp = Math.floor(h_id / 4);
        h_type = h_id % 4;

        if (h_type == hsfx_99) {
            if (h_items.length != 1) {
                ret_s.s = "Height: '" + h_label + "' type requires no values, " + is_or_are_given(h_vals.length);
                return (false);
            }
        }
        else if (h_type == hsfx_bet) {
            h_vals = h_items[1].split(',');
            if (h_vals.length != 2) {
                ret_s.s = "Height: '" + h_label + "' type requires exactly 2 values, " + is_or_are_given(h_vals.length);
                return (false);
            }
        }
        else {
            h_vals = h_items[1].split(',');
            if (h_vals.length != 1) {
                ret_s.s = "Height: '" + h_label + "' type requires exactly 2 values, " + is_or_are_given(h_vals.length);
                return (false);
            }
        }

        if (h_type != hsfx_99) {
            // is_not_negative_int || is_not_negative_float
            if (! h_typck[h_grp](h_vals[0])) {
                if (h_type == hsfx_bet) {
                    ret_s.s = h_title[h_grp] + ": lower limit not " + h_typck_s[h_grp] + ". ";
                }
                else {
                    ret_s.s = h_title[h_grp] + ": not " + h_typck_s[h_grp] + ". ";
                }
                return (false);
            }
            if (h_type == hsfx_bet) {
                if (!h_typck[h_grp](h_vals[1])) {
                    ret_s.s = h_title[h_grp] + ": higher limit not " + h_typck_s[h_grp] + ". ";
                    return (false);
                }
                else if (h_convf[h_grp](h_vals[0]) == h_convf[h_grp](h_vals[1])) {
                    ret_s.s = h_title[h_grp] + ": invalid range. ";
                    return (false);
                }

                // swap items if wrong order
                if (parseInt(h_vals[0]) > parseInt(h_vals[1])) {
                    var swap = h_vals[1];
                    h_vals[1] = h_vals[0];
                    h_vals[0] = swap;
                }
                gem$('#noStoreysE' + h_cbid[h_grp] + '2').val(h_vals[1]);
            }

            // set value (in the case of 'HD' the real index must be (h_type - 1))
            gem$('#HeightCB' + h_cbid[h_grp]).val(h_map[h_id] == 'HD' ? h_type - 1 : h_type);

            gem$('#noStoreysE' + h_cbid[h_grp] + '1').val(h_vals[0]);

            h_cbfun[h_grp](null);
        }
    }

    //
    //  Date
    //
    var date, date_index = -1, date_items, date_label, date_id, date_vals;

    date = sar[7].split('+');
    date_items = date[0].split(':');
    date_label = date_items[0];

    if (date.length != 1) {
        ret_s.s = "Date not defined properly.";
        return (false);
    }

    for (i = 0 ; i < date_type.length ; i++) {
        if (date_label == date_type[i].id) {
            date_index = i;
            date_id = date_label;
            break;
        }
    }
    if (i == date_type.length) {
        ret_s.s = "Not identified '" + date_label + "' as specification of date.";
        return (false);
    }
    if (date_id != "Y99") {
        if (date_items.length < 2) {
            ret_s.s = "Date: no values defined.";
            return (false);
        }

        date_vals = date_items[1].split(',');
        if (date_id == 'YBET') {
            if (date_vals.length != 2) {
                ret_s.s = "Date: '" + date_id + "' type requires exactly 2 values, " + is_or_are_given(date_vals.length);
                return (false);
            }
        }
        else if (date_id == 'YEX' || date_id == 'YPRE' || date_id == 'YAPP') {
            if (date_vals.length != 1) {
                ret_s.s = "Date: '" + date_id + "' type requires exactly 1 value, " + is_or_are_given(date_vals.length);
                return (false);
            }
        }

        if (!is_not_negative_int(date_vals[0]) || date_vals[0].length > 4) {
            if (date_id == 'YBET') {
                ret_s.s = "Date of construction or retrofit: lower limit is not a valid date.";
            }
            else {
                ret_s.s = "Date of construction or retrofit: it is not a valid date.";
            }
            return (false);
        }

        if (date_id == 'YBET') {
            if (!is_not_negative_int(date_vals[1]) || date_vals[1].length > 4) {
                ret_s.s = "Date of construction or retrofit: higher limit is not a valid date.";
                return (false);
            }

            if (parseInt(date_vals[0]) == parseInt(date_vals[1])) {
                ret_s.s = "Date of construction or retrofit: invalid range.";
                return (false);
            }

            // swap items if wrong order
            if (parseInt(date_vals[0]) > parseInt(date_vals[1])) {
                var swap = date_vals[1];
                date_vals[1] = date_vals[0];
                date_vals[0] = swap;
            }
            gem$('#DateE2').val(date_vals[1]);
        }
        gem$('#DateCB1').val(date_index);
        taxt_DateCB1Select(null);
        gem$('#DateE1').val(date_vals[0]);

        taxt_ValidateDate();
    }

    //
    //  Occupancy
    //
    var occu, occu_items, occu_label, occu_id, occu_vals, occu_atom;
    occu = sar[8].split('+');
    occu_label = occu[0];

    if (occu_label == 'OC99') {
        if (occu.length != 1) {
            ret_s.s = "Occupancy not defined properly (" + occu_label + ").";
            return (false);
        }
    }

    for (i = 0 ; i < occu_type.length ; i++) {
        if (occu_label == occu_type[i].id) {
            occu_id = occu_label;
            gem$('#OccupancyCB1').val(i);
            taxt_OccupancyCB1Select(null);
            break;
        }
    }
    if (i == occu_type.length) {
        ret_s.s = "Not identified '" + occu_label + "' as specification of occupancy.";
        return (false);
    }

    if (occu_label != 'OC99') {
        if (occu.length > 1) {
            // Occupancy specification
            occu_atom = occu[1];
        }
        else {
            // select the first item of proper sub-selection
            occu_atom = occu_spec[occu_id][0].id;
        }

        for (i = 0 ; i < occu_spec[occu_id].length ;  i++) {
            if (occu_atom == occu_spec[occu_id][i].id) {
                gem$('#OccupancyCB2').val(i);
                taxt_OccupancyCB2Select(null);
                break;
            }
        }
        if (i == occu_spec[occu_id].length) {
            ret_s.s = "Not identified '" + occu_atom + "' as specification of '" + occu_id + "' occupancy.";
            return (false);
        }
    }
    //
    //  Build position
    //
    var bupo, bupo_items, bupo_label, bupo_id, bupo_vals, bupo_atom;
    bupo = sar[9].split('+');
    bupo_label = bupo[0];

    if (bupo.length != 1) {
        ret_s.s = "Building position within a block not defined properly.";
        return (false);
    }

    for (i = 0 ; i < bupo_type.length ; i++) {
        if (bupo_label == bupo_type[i].id) {
            bupo_id = bupo_label;
            gem$('#PositionCB').val(i);
            taxt_PositionCBSelect(null);
            break;
        }
    }
    if (i == bupo_type.length) {
        ret_s.s = "Not identified '" + bupo_label + "' as specification of building position within a block.";
        return (false);
    }

    //
    //  Plan shape
    //
    var plsh, plsh_items, plsh_label, plsh_id, plsh_vals, plsh_atom;
    plsh = sar[10].split('+');
    plsh_label = plsh[0];

    if (plsh.length != 1) {
        ret_s.s = "Shape of the building plan not defined properly.";
        return (false);
    }

    for (i = 0 ; i < plsh_type.length ; i++) {
        if (plsh_label == plsh_type[i].id) {
            plsh_id = plsh_label;
            gem$('#PlanShapeCB').val(i);
            taxt_PlanShapeCBSelect(null);
            break;
        }
    }
    if (i == plsh_type.length) {
        ret_s.s = "Not identified '" + plsh_label + "' as specification of shape of the building plan.";
        return (false);
    }

    //
    // Structural irregularity
    //
    var stir, stir_items, stir_label, stir_id, stir_vals, stir_atom;
    var plir_id = "", plse_id = "", veir_id = "", vese_id = "";
    var ir_values = [ -1, -1, -1, -1, -1 ];

    stir = sar[11].split('+');
    stir_label = stir[0];

    for (i = 0 ; i < stir_type.length ; i++) {
        if (stir_label == stir_type[i].id) {
            stir_id = stir_label;
            ir_values[0] = i;
            break;
        }
    }
    if (i == stir_type.length) {
        ret_s.s = "Not identified '" + stir_label + "' as specification of shape of the building plan.";
        return (false);
    }

    if (stir_id != "IRIR" &&
        stir.length > 1) {
        ret_s.s = "Structural irregularity not defined properly.";
        return (false);
    }

    for (sub_i = 1 ; sub_i < stir.length ; sub_i++) {
        stir_atom = stir[sub_i];
        s_items = stir_atom.split(':');
        if (s_items.length != 2) {
            ret_s.s = "'" + stir[sub_i] + "' not define properly as specification of '" + stir_id + "' type of irregularity.";
            return (false);
        }
        s_label = s_items[0];

        // Plan structural irregularity - primary
        if (s_label == "IRPP") {
            for (i = 0 ; i < plan_irre.length ; i++) {
                if (stir_atom == plan_irre[i].id) {
                    plir_id = stir_atom;
                    ir_values[1] = i;
                    break;
                }
            }
            if (i < plan_irre.length) {
                continue;
            }
        }
        else if (s_label == "IRPS") {
            for (i = 0 ; i < plan_seco.length ; i++) {
                if (stir_atom == plan_seco[i].id) {
                    plse_id = stir_atom;
                    ir_values[3] = i;
                    break;
                }
            }
            if (i < plan_seco.length) {
                continue;
            }
        }
        else if (s_label == "IRVP") {
            for (i = 0 ; i < vert_irre.length ; i++) {
                if (stir_atom == vert_irre[i].id) {
                    veir_id = stir_atom;
                    ir_values[2] = i;
                    break;
                }
            }
            if (i < vert_irre.length) {
                continue;
            }
        }
        else if (s_label == "IRVS") {
            for (i = 0 ; i < vert_seco.length ; i++) {
                if (stir_atom == vert_seco[i].id) {
                    vese_id = stir_atom;
                    ir_values[4] = i;
                    break;
                }
            }
            if (i < vert_seco.length) {
                continue;
            }
        }
        ret_s.s = "Not identified '" + stir_atom + "' as specification of structural irregularity.";
        return (false);
    }

    if (plir_id == "IRPP:IRN" && plse_id != "") {
        ret_s.s = "'" + plir_id + "' and '" + plse_id + "' are not a valid specification of structural irregularity.";
        return (false);
    }
    if (veir_id == "IRVP:IRN" && vese_id != "") {
        ret_s.s = "'" + veir_id + "' and '" + vese_id + "' are not a valid specification of structural irregularity.";
        return (false);
    }

    // all data are retrieved before the population phase to avoid unrequired reset of values permformed
    // by hierarchical ancestors
    if (ir_values[0] > -1)
        gem$('#RegularityCB1').val(ir_values[0]);
    taxt_RegularityCB1Select(null);
    if (ir_values[1] > -1)
        gem$('#RegularityCB2').val(ir_values[1]);
    taxt_RegularityCB2Select(null);
    if (ir_values[2] > -1)
        gem$('#RegularityCB3').val(ir_values[2]);
    taxt_RegularityCB3Select(null);
    if (ir_values[3] > -1)
        gem$('#RegularityCB4').val(ir_values[3]);
    taxt_RegularityCB4Select(null);
    if (ir_values[4] > -1)
        gem$('#RegularityCB5').val(ir_values[4]);
    taxt_RegularityCB5Select(null);

    //
    //  Exterior wall
    //
    var wall, wall_items, wall_label, wall_id, wall_vals, wall_atom;
    wall = sar[12].split('+');
    wall_label = wall[0];
    if (wall.length != 1) {
        ret_s.s = "Exterior walls not defined properly.";
        return (false);
    }

    for (i = 0 ; i < wall_type.length ; i++) {
        if (wall_label == wall_type[i].id) {
            wall_id = wall_label;
            gem$('#WallsCB').val(i);
            taxt_WallsCBSelect(null);
            break;
        }
    }
    if (i == wall_type.length) {
        ret_s.s = "Not identified '" + wall_label + "' as specification of exterior walls.";
        return (false);
    }

    //
    //  Roof
    //
    // roof shape
    var rosh, rosh_items, rosh_label, rosh_id, rosh_vals, rosh_atom;
    var roof_system_set = false, roof_system_val;

    rosh = sar[13].split('+');
    rosh_label = rosh[0];

    for (i = 0 ; i < roof_shap.length ; i++) {
        if (rosh_label == roof_shap[i].id) {
            rosh_id = rosh_label;
            gem$('#RoofCB1').val(i);
            taxt_RoofCB1Select(null);
            break;
        }
    }
    if (i == roof_shap.length) {
        ret_s.s = "Not identified '" + rosh_label + "' as specification of roof shape.";
        return (false);
    }

    for (sub_i = 1 ; sub_i < rosh.length ; sub_i++) {
        rosh_atom = rosh[sub_i];

        // roof covering
        for (i = 0 ; i < roof_cove.length ; i++) {
            if (rosh_atom == roof_cove[i].id) {
                gem$('#RoofCB2').val(i);
                taxt_RoofCB2Select(null);
                break;
            }
        }
        if (i < roof_cove.length)
            continue;

        // roof system material
        for (i = 0 ; i < roof_mate.length ; i++) {
            if (rosh_atom == roof_mate[i].id) {
                roof_system_set = true;
                roof_system_val = rosh_atom;

                gem$('#RoofCB3').val(i);
                taxt_RoofCB3Select(null);
                break;
            }
        }
        if (i < roof_mate.length)
            continue;

        // roof connections
        for (i = 0 ; i < roof_conn.length ; i++) {
            if (rosh_atom == roof_conn[i].id) {
                gem$('#RoofCB5').val(i);
                taxt_RoofCB5Select(null);
                break;
            }
        }
        if (i < roof_conn.length)
            continue;

        if (roof_system_set) {
            // roof connections
            for (i = 0 ; i < roof_sys[roof_system_val].length ; i++) {
                if (rosh_atom == roof_sys[roof_system_val][i].id) {
                    gem$('#RoofCB4').val(i);
                    taxt_RoofCB4Select(null);
                    break;
                }
            }
            if (i < roof_sys[roof_system_val].length)
                continue;
        }
        ret_s.s = "Not identified '" + rosh_atom + "' as specification of roof.";
        return (false);
    }

    //
    //  Floor
    //
    var flma, flma_items, flma_label, flma_id, flma_vals, flma_atom;

    flma = sar[14].split('+');
    flma_label = flma[0];

    // floor system material
    for (i = 0 ; i < floo_syma.length ; i++) {
        if (flma_label == floo_syma[i].id) {
            flma_id = flma_label;
            gem$('#FloorCB1').val(i);
            taxt_FloorCB1Select(null);
            break;
        }
    }
    if (i == floo_syma.length) {
        ret_s.s = "Not identified '" + flma_label + "' as specification of floor system material.";
        return (false);
    }

    for (sub_i = 1 ; sub_i < flma.length ; sub_i++) {
        flma_atom = flma[sub_i];

        // floor connections
        for (i = 0 ; i < floo_conn[flma_id].length ; i++) {

            if (flma_atom == floo_conn[flma_id][i].id) {
                gem$('#FloorCB2').val(i);
                taxt_FloorCB2Select(null);
                break;
            }
        }
        if (i < floo_conn[flma_id].length)
            continue;

        // floor system type
        for (i = 0 ; i < floo_syty.length ; i++) {
            if (flma_atom == floo_syty[i].id) {
                gem$('#FloorCB3').val(i);
                taxt_FloorCB3Select(null);
                break;
            }
        }
        if (i < floo_syty.length)
            continue;

        ret_s.s = "Not identified '" + flma_atom + "' as specification of floor.";
        return (false);
    }

    //
    //  Foundation
    //
    var foun, foun_items, foun_label, foun_id, foun_vals, foun_atom;
    foun = sar[15].split('+');
    foun_label = foun[0];
    if (foun.length != 1) {
        ret_s.s = "Foundations not defined properly.";
        return (false);
    }

    for (i = 0 ; i < foun_type.length ; i++) {
        if (foun_label == foun_type[i].id) {
            foun_id = foun_label;
            gem$('#FoundationsCB').val(i);
            taxt_FoundationsCBSelect(null);
            break;
        }
    }
    if (i == foun_type.length) {
        ret_s.s = "Not identified '" + foun_label + "' as specification of foundation.";
        return (false);
    }
    return (true);
}

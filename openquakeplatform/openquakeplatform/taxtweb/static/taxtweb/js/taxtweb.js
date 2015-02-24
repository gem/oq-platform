
var mat_tech =
    { 'MAT99': [],
      'C99': mat_tech_grp[0],

      'CU':  mat_tech_grp[1],

      'CR':  mat_tech_grp[0],
      'SRC': mat_tech_grp[0],

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
      'LINF': llrs_duct_grp[0],
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


function populate_form()
{
    try {
          var el = window.opener.document.getElementById("id_taxonomy_text");
          el.value = $('#resultE').val();
          }
          catch(e) {
          }
}

function select_populate(name, items)
{
    for (var i = 0 ; i < items.length ; i++) {
        item = items[i];

        $('#' + name).append('<option value="' + i + '">' + item + '</option>');
    }
}


function taxt_ValidateSystem1() // Ok
{
    $('#SystemCB21').empty();

    if ($('#SystemCB11').val() == 0 || $('#SystemCB11').val() == 1) {
        $('SystemCB21').prop("disabled", true);
    }
    else {
        var SystemCB21 = [];
        /* DU99  */ SystemCB21.push('Ductility unknown');
        /* DUC   */ SystemCB21.push('Ductile');
        /* DNO   */ SystemCB21.push('Non-ductile');
        /* DBD   */ SystemCB21.push('Base isolation and/or energy dissipation devices');
        select_populate('SystemCB21', SystemCB21);
        $('SystemCB21').prop("disabled", false);
    }
    $('SystemCB21').val(0);
}

function taxt_ValidateSystem2() // Ok
{
    $('#SystemCB22').empty();

    if ($('#SystemCB12').val() == 0 || $('#SystemCB12').val() == 1) {
        $('SystemCB22').prop("disabled", true);
    }
    else {
        var SystemCB22 = [];
        SystemCB22.push('Ductility unknown');
        SystemCB22.push('Ductile');
        SystemCB22.push('Non-ductile');
        SystemCB22.push('Base isolation and/or energy dissipation devices');
        select_populate('SystemCB22', SystemCB22);
        $('SystemCB22').prop("disabled", false);
    }
    $('SystemCB22').val(0);
}

function taxt_ValidateMaterial1() // Ok
{
    $('#MaterialCB21').empty();
    $('#MaterialCB31').empty();
    $('#MaterialCB41').empty();
    $('#SystemCB11').empty();


    if ($('#MaterialCB11').val() == 0) {
        $('#MaterialCB21').prop("disabled", true);
        $('#MaterialCB31').prop("disabled", true);
        $('#MaterialCB41').prop("disabled", true);
    }
    else if ($('#MaterialCB11').val() == 2) {
        var MaterialCB21 = [];
        /* CT99 */ MaterialCB21.push('Unknown concrete technology');
        /* CIP  */ MaterialCB21.push('Cast-in-place concrete');
        /* PC   */ MaterialCB21.push('Precast concrete');
        select_populate('MaterialCB21', MaterialCB21);
        $('#MaterialCB21').prop("disabled", false);
    }
    else if ($('#MaterialCB11').val() == 1 ||  $('#MaterialCB11').val() == 3 || $('#MaterialCB11').val() == 4) {
        var MaterialCB21 = [];
        /* CT99 */ MaterialCB21.push('Unknown concrete technology');
        /* CIP  */ MaterialCB21.push('Cast-in-place concrete');
        /* PC   */ MaterialCB21.push('Precast concrete');
        /* CIPPS*/ MaterialCB21.push('Cast-in-place prestressed concrete');
        /* PCPS */ MaterialCB21.push('Precast prestressed concrete');
        select_populate('MaterialCB21', MaterialCB21);
        $('#MaterialCB21').prop("disabled", false);
    }
    else if ($('#MaterialCB11').val() == 5) {
        var MaterialCB21 = [];
        /*  S99 */ MaterialCB21.push('Steel, unknown ');
        /*  SL  */ MaterialCB21.push('Cold-formed steel members');
        /*  SR  */ MaterialCB21.push('Hot-rolled steel members');
        /*  SO  */ MaterialCB21.push('Steel, other ');
        select_populate('MaterialCB21', MaterialCB21);
        $('#MaterialCB21').prop("disabled", false);
    }
    else if ($('#MaterialCB11').val() == 6) {
        var MaterialCB21 = [];
        /* ME99 */ MaterialCB21.push('Metal, unknown ');
        /* MEIR */ MaterialCB21.push('Iron');
        /* MEO  */ MaterialCB21.push('Metal, other ');
        select_populate('MaterialCB21', MaterialCB21);
        $('#MaterialCB21').prop("disabled", false);
    }
    else if ($('#MaterialCB11').val() > 6 &&
             $('#MaterialCB11').val() < 11) {
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
        $('#MaterialCB21').prop("disabled", false);

        if ($('#MaterialCB11').val() == 10) {
            var MaterialCB41 = [];
            /* MR99  */  MaterialCB41.push('Unknown reinforcement');
            /* RS    */  MaterialCB41.push('Steel-reinforced');
            /* RW    */  MaterialCB41.push('Wood-reinforced');
            /* RB    */  MaterialCB41.push('Bamboo-, cane- or rope-reinforced');
            /* RCM   */  MaterialCB41.push('Fibre reinforcing mesh');
            /* RCB   */  MaterialCB41.push('Reinforced concrete bands');
            select_populate('MaterialCB41', MaterialCB41);
            $('#MaterialCB41').prop("disabled", false);
        }
    }
    else if ($('#MaterialCB11').val() > 10 && $('#MaterialCB11').val() < 14) {
        var MaterialCB21 = [];
        /* ET99 */ MaterialCB21.push('Unknown earth technology');
        /* ETR  */ MaterialCB21.push('Rammed earth');
        /* ETC  */ MaterialCB21.push('Cob or wet construction');
        /* ETO  */ MaterialCB21.push('Earth technology, other');
        select_populate('MaterialCB21', MaterialCB21);
        $('#MaterialCB21').prop("disabled", false);
    }
    else if ($('#MaterialCB11').val() == 14) {
        var MaterialCB21 = [];
        /* W99  */ MaterialCB21.push('Wood, unknown');
        /* WHE  */ MaterialCB21.push('Heavy wood');
        /* WLI  */ MaterialCB21.push('Light wood members');
        /* WS   */ MaterialCB21.push('Solid wood');
        /* WWD  */ MaterialCB21.push('Wattle and daub');
        /* WBB  */ MaterialCB21.push('Bamboo');
        /* WO   */ MaterialCB21.push('Wood, other');
        select_populate('MaterialCB21', MaterialCB21);
        $('#MaterialCB21').prop("disabled", false);
    }
    else {
        $('#MaterialCB21').prop("disabled", true);
        $('#MaterialCB31').prop("disabled", true);
        $('#MaterialCB41').prop("disabled", true);
    }

    if ($('#MaterialCB11').val() == 5) {
        var MaterialCB31 = [];
        /* SC99  */ MaterialCB31.push('Unknown connection');
        /* WEL   */ MaterialCB31.push('Welded connections');
        /* RIV   */ MaterialCB31.push('Riveted connections');
        /* BOL   */ MaterialCB31.push('Bolted connections');
        select_populate('MaterialCB31', MaterialCB31);
        $('#MaterialCB31').prop("disabled", false);
    }
    else if ($('#MaterialCB11').val() > 6 &&
             $('#MaterialCB11').val() < 11) {
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
        $('#MaterialCB31').prop("disabled", false);
    }
    else {
        $('#MaterialCB31').prop("disabled", true);
    }

    $('#MaterialCB21').val(0);
    $('#MaterialCB31').val(0);
    $('#MaterialCB41').val(0);

    if ($('#MaterialCB11').val() > 10 && $('#MaterialCB11').val() < 14) {
        var SystemCB11 = [];
        /* L99  */ SystemCB11.push('Unknown lateral load-resisting system');
        /* LN   */ SystemCB11.push('No lateral load-resisting system');
        /* LWAL */ SystemCB11.push('Wall');
        /* LH   */ SystemCB11.push('Hybrid lateral load-resisting system');
        /* LO   */ SystemCB11.push('Other lateral load-resisting system');
        select_populate('SystemCB11', SystemCB11);
    }
    else if (($('#MaterialCB11').val() > 6 && $('#MaterialCB11').val() < 11) ||
             $('#MaterialCB11').val() == 14) {
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
        /* LINF */ SystemCB11.push('Infilled frame');
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

    $('#SystemCB11').val(0);
    taxt_ValidateSystem1();
}

function taxt_ValidateMaterial2() // Ok
{
    $('#MaterialCB22').empty();
    $('#MaterialCB32').empty();
    $('#MaterialCB42').empty();
    $('#SystemCB12').empty();


    if ($('#MaterialCB12').val() == 0) {
        $('#MaterialCB22').prop("disabled", true);
        $('#MaterialCB32').prop("disabled", true);
        $('#MaterialCB42').prop("disabled", true);
    }
    else if ($('#MaterialCB12').val() == 2) {
        var MaterialCB22 = [];
        MaterialCB22.push('Unknown concrete technology');
        MaterialCB22.push('Cast-in-place concrete');
        MaterialCB22.push('Precast concrete');
        select_populate('MaterialCB22', MaterialCB22);
        $('#MaterialCB22').prop("disabled", false);
    }
    else if ($('#MaterialCB12').val() == 1 ||  $('#MaterialCB12').val() == 3 || $('#MaterialCB12').val() == 4) {
        var MaterialCB22 = [];
        MaterialCB22.push('Unknown concrete technology');
        MaterialCB22.push('Cast-in-place concrete');
        MaterialCB22.push('Precast concrete');
        MaterialCB22.push('Cast-in-place prestressed concrete');
        MaterialCB22.push('Precast prestressed concrete');
        select_populate('MaterialCB22', MaterialCB22);
        $('#MaterialCB22').prop("disabled", false);
    }
    else if ($('#MaterialCB12').val() == 5) {
        var MaterialCB22 = [];
        MaterialCB22.push('Steel, unknown ');
        MaterialCB22.push('Cold-formed steel members');
        MaterialCB22.push('Hot-rolled steel members');
        MaterialCB22.push('Steel, other ');
        select_populate('MaterialCB22', MaterialCB22);
        $('#MaterialCB22').prop("disabled", false);
    }
    else if ($('#MaterialCB12').val() == 6) {
        var MaterialCB22 = [];
        MaterialCB22.push('Metal, unknown ');
        MaterialCB22.push('Iron');
        MaterialCB22.push('Metal, other ');
        select_populate('MaterialCB22', MaterialCB22);
        $('#MaterialCB22').prop("disabled", false);
    }
    else if ($('#MaterialCB12').val() > 6 &&
             $('#MaterialCB12').val() < 11) {
        var MaterialCB22 = [];
        MaterialCB22.push('Masonry unit, unknown');
        MaterialCB22.push('Adobe blocks');
        MaterialCB22.push('Stone, unknown technology');
        MaterialCB22.push('Rubble (field stone) or semi-dressed stone');
        MaterialCB22.push('Dressed stone');
        MaterialCB22.push('Fired clay unit, unknown type');
        MaterialCB22.push('Fired clay solid bricks');
        MaterialCB22.push('Fired clay hollow bricks');
        MaterialCB22.push('Fired clay hollow blocks or tiles');
        MaterialCB22.push('Concrete blocks, unknown type');
        MaterialCB22.push('Concrete blocks, solid');
        MaterialCB22.push('Concrete blocks, hollow');
        MaterialCB22.push('Masonry unit, other');
        select_populate('MaterialCB22', MaterialCB22);
        $('#MaterialCB22').prop("disabled", false);

        if ($('#MaterialCB12').val() == 10) {
            var MaterialCB42 = [];
            MaterialCB42.push('Unknown reinforcement');
            MaterialCB42.push('Steel-reinforced');
            MaterialCB42.push('Wood-reinforced');
            MaterialCB42.push('Bamboo-, cane- or rope-reinforced');
            MaterialCB42.push('Fibre reinforcing mesh');
            MaterialCB42.push('Reinforced concrete bands');
            select_populate('MaterialCB42', MaterialCB42);
            $('#MaterialCB42').prop("disabled", false);
        }
    }
    else if ($('#MaterialCB12').val() > 10 && $('#MaterialCB12').val() < 14) {
        var MaterialCB22 = [];
        MaterialCB22.push('Unknown earth technology');
        MaterialCB22.push('Rammed earth');
        MaterialCB22.push('Cob or wet construction');
        MaterialCB22.push('Earth technology, other');
        select_populate('MaterialCB22', MaterialCB22);
        $('#MaterialCB22').prop("disabled", false);
    }
    else if ($('#MaterialCB12').val() == 14) {
        var MaterialCB22 = [];
        MaterialCB22.push('Wood, unknown');
        MaterialCB22.push('Heavy wood');
        MaterialCB22.push('Light wood members');
        MaterialCB22.push('Solid wood');
        MaterialCB22.push('Wattle and daub');
        MaterialCB22.push('Bamboo');
        MaterialCB22.push('Wood, other');
        select_populate('MaterialCB22', MaterialCB22);
        $('#MaterialCB22').prop("disabled", false);
    }
    else {
        $('#MaterialCB22').prop("disabled", true);
        $('#MaterialCB32').prop("disabled", true);
        $('#MaterialCB42').prop("disabled", true);
    }

    if ($('#MaterialCB12').val() == 5) {
        var MaterialCB32 = [];
        MaterialCB32.push('Unknown connection');
        MaterialCB32.push('Welded connections');
        MaterialCB32.push('Riveted connections');
        MaterialCB32.push('Bolted connections');
        select_populate('MaterialCB32', MaterialCB32);
        $('#MaterialCB32').prop("disabled", false);
    }
    else if ($('#MaterialCB12').val() > 6 &&
             $('#MaterialCB12').val() < 11) {
        var MaterialCB32 = [];
        MaterialCB32.push('Mortar type, unknown');
        MaterialCB32.push('No mortar');
        MaterialCB32.push('Mud mortar');
        MaterialCB32.push('Lime mortar');
        MaterialCB32.push('Cement mortar');
        MaterialCB32.push('Cement:lime mortar');
        MaterialCB32.push('Stone, unknown type');
        MaterialCB32.push('Limestone');
        MaterialCB32.push('Sandstone');
        MaterialCB32.push('Tuff');
        MaterialCB32.push('Slate');
        MaterialCB32.push('Granite');
        MaterialCB32.push('Basalt');
        MaterialCB32.push('Stone, other type');
        select_populate('MaterialCB32', MaterialCB32);
        $('#MaterialCB32').prop("disabled", false);
    }
    else {
        $('#MaterialCB32').prop("disabled", true);
    }

    $('#MaterialCB22').val(0);
    $('#MaterialCB32').val(0);
    $('#MaterialCB42').val(0);

    if ($('#MaterialCB12').val() > 10 && $('#MaterialCB12').val() < 14) {
        var SystemCB12 = [];
        SystemCB12.push('Unknown lateral load-resisting system');
        SystemCB12.push('No lateral load-resisting system');
        SystemCB12.push('Wall');
        SystemCB12.push('Hybrid lateral load-resisting system');
        SystemCB12.push('Other lateral load-resisting system');
        select_populate('SystemCB12', SystemCB12);
    }
    else if (($('#MaterialCB12').val() > 6 && $('#MaterialCB12').val() < 11) ||
             $('#MaterialCB12').val() == 14) {
        var SystemCB12 = [];
        SystemCB12.push('Unknown lateral load-resisting system');
        SystemCB12.push('No lateral load-resisting system');
        SystemCB12.push('Moment frame');
        SystemCB12.push('Post and beam');
        SystemCB12.push('Wall');
        SystemCB12.push('Hybrid lateral load-resisting system');
        SystemCB12.push('Other lateral load-resisting system');
        select_populate('SystemCB12', SystemCB12);
    }
    else {
        var SystemCB12 = [];
        SystemCB12.push('Unknown lateral load-resisting system');
        SystemCB12.push('No lateral load-resisting system');
        SystemCB12.push('Moment frame');
        SystemCB12.push('Infilled frame');
        SystemCB12.push('Braced frame');
        SystemCB12.push('Post and beam');
        SystemCB12.push('Wall');
        SystemCB12.push('Dual frame-wall system');
        SystemCB12.push('Flat slab/plate or waffle slab');
        SystemCB12.push('Infilled flat slab/plate or infilled waffle slab');
        SystemCB12.push('Hybrid lateral load-resisting system');
        SystemCB12.push('Other lateral load-resisting system');
        select_populate('SystemCB12', SystemCB12);
    }

    $('#SystemCB12').val(0);
    taxt_ValidateSystem2();
}

function taxt_ValidateHeight() // Ok
{
    $('#HeightCB2').prop("disabled", true);
    $('#HeightCB3').prop("disabled", true);
    $('#HeightCB4').prop("disabled", true);
    $('#noStoreysE11').prop("disabled", true);
    $('#noStoreysE12').prop("disabled", true);
    $('#noStoreysE21').prop("disabled", true);
    $('#noStoreysE22').prop("disabled", true);
    $('#noStoreysE31').prop("disabled", true);
    $('#noStoreysE32').prop("disabled", true);
    $('#noStoreysE4').prop("disabled", true);

    if ($('#HeightCB1').val() > 0) {
        $('#HeightCB2').prop("disabled", false);
        $('#HeightCB3').prop("disabled", false);
        $('#HeightCB4').prop("disabled", false);
        $('#noStoreysE11').prop("disabled", false);
        $('#noStoreysE12').prop("disabled", false);

        if ($('#HeightCB1').val() == 1) {
            $('#noStoreysE11').css('width', '45%');
            $('#noStoreysE11').prop("disabled", false);
            $('#noStoreysE12').css('display', 'inline');
            $('#noStoreysE12').prop("disabled", false);
        }
        else {
            $('#noStoreysE11').css('width', '90%');
            $('#noStoreysE11').prop("disabled", false);
            $('#noStoreysE12').css('display', 'none');
            $('#noStoreysE12').prop("disabled", true);
        }

        if ($('#HeightCB2').val() == 0) {
            $('#noStoreysE21').css('width', '90%');
            $('#noStoreysE21').prop("disabled", true);
            $('#noStoreysE22').css('display', 'none');
            $('#noStoreysE22').prop("disabled", true);
        }
        else if ($('#HeightCB2').val() == 1) {
            $('#noStoreysE21').css('width', '45%');
            $('#noStoreysE21').prop("disabled", false);
            $('#noStoreysE22').css('display', 'inline');
            $('#noStoreysE22').prop("disabled", false);
        }
        else {
            $('#noStoreysE21').css('width', '90%');
            $('#noStoreysE21').prop("disabled", false);
            $('#noStoreysE22').css('display', 'none');
            $('#noStoreysE22').prop("disabled", true);
        }

        if ($('#HeightCB3').val() == 0) {
            $('#noStoreysE31').css('width', '90%');
            $('#noStoreysE31').prop("disabled", true);
            $('#noStoreysE32').css('display', 'none');
            $('#noStoreysE32').prop("disabled", true);
        }
        else if ($('#HeightCB3').val() == 1) {
            $('#noStoreysE31').css('width', '45%');
            $('#noStoreysE31').prop("disabled", false);
            $('#noStoreysE32').css('display', 'inline');
            $('#noStoreysE32').prop("disabled", false);
        }
        else {
            $('#noStoreysE31').css('width', '90%');
            $('#noStoreysE31').prop("disabled", false);
            $('#noStoreysE32').css('display', 'none');
            $('#noStoreysE32').prop("disabled", true);
        }

        if ($('#HeightCB4').val() == 0) {
            $('#noStoreysE4').prop("disabled", true);
        }
        else {
            $('#noStoreysE4').prop("disabled", false);
        }
    }
    else {
        $('#noStoreysE11').css('width', '90%');
        $('#noStoreysE11').prop("disabled", true);
        $('#noStoreysE12').css('display', 'none');
        $('#noStoreysE12').prop("disabled", true);
    }
}

function taxt_ValidateDate() // Ok
{
    if ($('#DateCB1').val() == 0) {
        $('#DateE1').css('width', '90%');
        $('#DateE1').prop("disabled", true);
        $('#DateE2').prop("disabled", true);
    }
    else if ($('#DateCB1').val() == 2) {
        $('#DateE1').css('width', '45%');
        $('#DateE1').prop("disabled", false);
        $('#DateE2').css('display', 'inline');
        $('#DateE2').prop("disabled", false);
    }
    else {
        $('#DateE1').css('width', '90%');
        $('#DateE1').prop("disabled", false);
        $('#DateE2').css('display', 'none');
        $('#DateE2').prop("disabled", true);
    }
}

function taxt_ValidateOccupancy() // Ok
{

    $('#OccupancyCB2').empty();

    if ($('#OccupancyCB1').val() == 0) {
        $('#OccupancyCB2').prop("disabled", true);
    }
    else if ($('#OccupancyCB1').val() == 1) {
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
        $('#OccupancyCB2').prop("disabled", false);
    }
    else if ($('#OccupancyCB1').val() == 2) {
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
        $('#OccupancyCB2').prop("disabled", false);
    }
    else if ($('#OccupancyCB1').val() == 3) {
        var OccupancyCB2 = [];
        /* MIX99  */ OccupancyCB2.push('Mixed, unknown type');
        /* MIX1   */ OccupancyCB2.push('Mostly residential and commercial');
        /* MIX2   */ OccupancyCB2.push('Mostly commercial and residential');
        /* MIX3   */ OccupancyCB2.push('Mostly commercial and industrial');
        /* MIX4   */ OccupancyCB2.push('Mostly residential and industrial');
        /* MIX5   */ OccupancyCB2.push('Mostly industrial and commercial');
        /* MIX6   */ OccupancyCB2.push('Mostly industrial and residential');
        select_populate('OccupancyCB2', OccupancyCB2);
        $('#OccupancyCB2').prop("disabled", false);
    }
    else if ($('#OccupancyCB1').val() == 4) {
        var OccupancyCB2 = [];
        /* IND99  */ OccupancyCB2.push('Industrial, unknown type');
        /* IND1   */ OccupancyCB2.push('Heavy industrial');
        /* IND2   */ OccupancyCB2.push('Light industrial');
        select_populate('OccupancyCB2', OccupancyCB2);
        $('#OccupancyCB2').prop("disabled", false);
    }
    else if ($('#OccupancyCB1').val() == 5) {
        var OccupancyCB2 = [];
        /* AGR99  */ OccupancyCB2.push('Agriculture, unknown type');
        /* AGR1   */ OccupancyCB2.push('Produce storage');
        /* AGR2   */ OccupancyCB2.push('Animal shelter');
        /* AGR3   */ OccupancyCB2.push('Agricultural processing');
        select_populate('OccupancyCB2', OccupancyCB2);
        $('#OccupancyCB2').prop("disabled", false);
    }
    else if ($('#OccupancyCB1').val() == 6) {
        var OccupancyCB2 = [];
        /* ASS99  */ OccupancyCB2.push('Assembly, unknown type');
        /* ASS1   */ OccupancyCB2.push('Religious gathering');
        /* ASS2   */ OccupancyCB2.push('Arena');
        /* ASS3   */ OccupancyCB2.push('Cinema or concert hall');
        /* ASS4   */ OccupancyCB2.push('Other gatherings');
        select_populate('OccupancyCB2', OccupancyCB2);
        $('#OccupancyCB2').prop("disabled", false);
    }
    else if ($('#OccupancyCB1').val() == 7) {
        var OccupancyCB2 = [];
        /* GOV99  */ OccupancyCB2.push('Government, unknown type');
        /* GOV1   */ OccupancyCB2.push('Government, general services');
        /* GOV2   */ OccupancyCB2.push('Government, emergency response');
        select_populate('OccupancyCB2', OccupancyCB2);
        $('#OccupancyCB2').prop("disabled", false);
    }
    else if ($('#OccupancyCB1').val() == 8) {
        var OccupancyCB2 = [];
        /* EDU99  */ OccupancyCB2.push('Education, unknown type');
        /* EDU1   */ OccupancyCB2.push('Pre-school facility');
        /* EDU2   */ OccupancyCB2.push('School');
        /* EDU3   */ OccupancyCB2.push('College/university, offices and/or classrooms');
        /* EDU4   */ OccupancyCB2.push('College/university, research facilities and/or labs');
        select_populate('OccupancyCB2', OccupancyCB2);
        $('#OccupancyCB2').prop("disabled", false);
    }
    else {
        $('#OccupancyCB2').prop("disabled", true);
    }

    $('#OccupancyCB2').val(0);
}

function taxt_ValidateRegularity()
{
    $('#RegularityCB2').empty();
    $('#RegularityCB3').empty();
    $('#RegularityCB4').empty();
    $('#RegularityCB5').empty();

    if ($('#RegularityCB1').val() == 0 ||
        $('#RegularityCB1').val() == 1) {
        $('#RegularityCB2').prop("disabled", true);
        $('#RegularityCB3').prop("disabled", true);
        $('#RegularityCB4').prop("disabled", true);
        $('#RegularityCB5').prop("disabled", true);
    }
    else if ($('#RegularityCB1').val() == 2) {
        var RegularityCB2 = [], RegularityCB3 = [];
        RegularityCB2.push('No irregularity');
        RegularityCB2.push('Torsion eccentricity');
        RegularityCB2.push('Re-entrant corner');
        RegularityCB2.push('Other plan irregularity');
        $('#RegularityCB2').prop("disabled", false);
        select_populate('RegularityCB2', RegularityCB2);

        RegularityCB3.push('No irregularity');
        RegularityCB3.push('Soft storey');
        RegularityCB3.push('Cripple wall');
        RegularityCB3.push('Short column');
        RegularityCB3.push('Pounding potential');
        RegularityCB3.push('Setback');
        RegularityCB3.push('Change in vertical structure');
        RegularityCB3.push('Other vertical irregularity');
        $('#RegularityCB3').prop("disabled", false);
        select_populate('RegularityCB3', RegularityCB3);
    }

    $('#RegularityCB2').val(0);
    $('#RegularityCB3').val(0);
    $('#RegularityCB4').val(0);
    $('#RegularityCB5').val(0);
}

function taxt_ValidateRegularity2()
{
    $('#RegularityCB4').empty();

    if ($('#RegularityCB2').val() == 0) {
        $('#RegularityCB4').prop("disabled", true);
    }
    else {
        var RegularityCB4 = [];

        RegularityCB4.push('No irregularity');
        RegularityCB4.push('Torsion eccentricity');
        RegularityCB4.push('Re-entrant corner');
        RegularityCB4.push('Other plan irregularity');
        select_populate('RegularityCB4', RegularityCB4);
        $('#RegularityCB4').prop("disabled", false);
    }
    $('#RegularityCB4').val(0);
}


function taxt_ValidateRegularity3()
{
    $('#RegularityCB5').empty();

    if ($('#RegularityCB3').val() == 0) {
        $('#RegularityCB5').prop("disabled", true);
    }
    else {
        var RegularityCB5 = [];

        RegularityCB5.push('No irregularity');
        RegularityCB5.push('Soft storey');
        RegularityCB5.push('Cripple wall');
        RegularityCB5.push('Short column');
        RegularityCB5.push('Pounding potential');
        RegularityCB5.push('Setback');
        RegularityCB5.push('Change in vertical structure');
        RegularityCB5.push('Other vertical irregularity');
        select_populate('RegularityCB5', RegularityCB5);
        $('#RegularityCB5').prop("disabled", false);
    }
    $('#RegularityCB5').val(0);
}

function taxt_ValidateRoof()
{
    var RoofCB4 = [];

    $('#RoofCB4').empty();

    if ($('#RoofCB3').val() == 0 || $('#RoofCB3').val() == 7)
        $('#RoofCB4').prop("disabled", true);
    else if ($('#RoofCB3').val() == 1) {
        RoofCB4.push('Masonry roof, unknown');
        RoofCB4.push('Vaulted masonry roof');
        RoofCB4.push('Shallow-arched masonry roof');
        RoofCB4.push('Composite masonry and concrete roof system');
        select_populate('RoofCB4', RoofCB4);
        $('#RoofCB4').prop("disabled", false);
    }
    else if ($('#RoofCB3').val() == 2) {
        RoofCB4.push('Earthen roof, unknown');
        RoofCB4.push('Vaulted earthen roofs');
        select_populate('RoofCB4', RoofCB4);
        $('#RoofCB4').prop("disabled", false);
    }
    else if ($('#RoofCB3').val() == 3) {
        RoofCB4.push('Concrete roof, unknown');
        RoofCB4.push('Cast-in-place beamless RC roof');
        RoofCB4.push('Cast-in-place beam-supported RC roof');
        RoofCB4.push('Precast concrete roof with RC topping');
        RoofCB4.push('Precast concrete roof without RC topping');
        select_populate('RoofCB4', RoofCB4);
        $('#RoofCB4').prop("disabled", false);
    }
    else if ($('#RoofCB3').val() == 4) {
        RoofCB4.push('Metal roof, unknown');
        RoofCB4.push('Metal beams or trusses supporting light roofing');
        RoofCB4.push('Metal roof beams supporting precast concrete slabs');
        RoofCB4.push('Composite steel roof deck and concrete slab');
        select_populate('RoofCB4', RoofCB4);
        $('#RoofCB4').prop("disabled", false);
    }
    else if ($('#RoofCB3').val() == 5) {
        RoofCB4.push('Wooden roof, unknown');
        RoofCB4.push('Wooden structure with light roof covering');
        RoofCB4.push('Wooden beams or trusses with heavy roof covering');
        RoofCB4.push('Wood-based sheets on rafters or purlins');
        RoofCB4.push('Plywood panels or other light-weigth panels for roof');
        RoofCB4.push('Bamboo, straw or thatch roof');
        select_populate('RoofCB4', RoofCB4);
        $('#RoofCB4').prop("disabled", false);
    }
    else if ($('#RoofCB3').val() == 6) {
        RoofCB4.push('inflatable or tensile membrane roof');
        RoofCB4.push('Fabric roof, other');
        select_populate('RoofCB4', RoofCB4);
        $('#RoofCB4').prop("disabled", false);
    }
    $('#RoofCB4').val(0);
}

function taxt_ValidateFloor()
{
    var FloorCB2 = [];

    $('#FloorCB2').empty();

    if ($('#FloorCB1').val() == 0 || $('#FloorCB1').val() == 1 || $('#FloorCB1').val() == 7)
        $('#FloorCB2').prop("disabled", true);
    else if ($('#FloorCB1').val() == 2) {
        FloorCB2.push('Masonry floor, unknown');
        FloorCB2.push('Vaulted masonry floor');
        FloorCB2.push('Shallow-arched masonry floor');
        FloorCB2.push('Composite cast-in place RC and masonry floor');
        select_populate('FloorCB2', FloorCB2);
        $('#FloorCB2').prop("disabled", false);
    }
    else if ($('#FloorCB1').val() == 3) {
        FloorCB2.push('Earthen floor, unknown');
        select_populate('FloorCB2', FloorCB2);
        $('#FloorCB2').prop("disabled", false);
    }
    else if ($('#FloorCB1').val() == 4)  {
        FloorCB2.push('Concrete floor, unknown');
        FloorCB2.push('Cast-in-place beamless RC floor');
        FloorCB2.push('Cast-in-place beam-supported RC floor');
        FloorCB2.push('Precast concrete floor with RC topping');
        FloorCB2.push('Precast concrete floor without RC topping');
        select_populate('FloorCB2', FloorCB2);
        $('#FloorCB2').prop("disabled", false);
    }
    else if ($('#FloorCB1').val() == 5) {
        FloorCB2.push('Metal floor, unknown');
        FloorCB2.push('Metal beams, trusses or joists supporting light flooring');
        FloorCB2.push('Metal floor beams supporting precast concrete slabs');
        FloorCB2.push('Composite steel deck and concrete slab');
        select_populate('FloorCB2', FloorCB2);
        $('#FloorCB2').prop("disabled", false);
    }
    else if ($('#FloorCB1').val() == 6) {
        FloorCB2.push('Wooden floor, unknown');
        FloorCB2.push('Wood beams/trusses & joists supporting light flooring');
        FloorCB2.push('Wood beams/trusses & joists supporting heavy flooring');
        FloorCB2.push('Wood-based sheets on joists or beams');
        FloorCB2.push('Plywood panels or other light-weigth panels for floor');
        select_populate('FloorCB2', FloorCB2);
        $('#FloorCB2').prop("disabled", false);
    }
    $('#FloorCB2').val(0);
}

function taxt_SetDirection2() // Ok
{
    if ($('#DirectionCB').prop('checked')) {
        $('#MaterialCB12').val($('#MaterialCB11').val());
        $('#MaterialCB22').val($('#MaterialCB21').val());
        $('#MaterialCB32').val($('#MaterialCB31').val());
        $('#MaterialCB42').val($('#MaterialCB41').val());
        $('#SystemCB12').val($('#SystemCB11').val());
        $('#SystemCB22').val($('#SystemCB21').val());
    }
}

function taxt_MaterialCB11Select(obj) // Ok
{
    taxt_ValidateMaterial1();
    taxt_SetDirection2();
    if ($('#DirectionCB').prop('checked')) {
        taxt_ValidateMaterial2();
    }
    taxt_BuildTaxonomy();
}

function taxt_MaterialCB12Select(obj) // Ok
{
    taxt_ValidateMaterial2();
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
taxt_BuildTaxonomy();
}

function taxt_MaterialCB31Select(obj) // Ok
{
    taxt_SetDirection2();
    taxt_BuildTaxonomy();
}

function taxt_MaterialCB32Select(obj) // Ok
{
taxt_BuildTaxonomy();
}

function taxt_MaterialCB41Select(obj) // Ok
{
    taxt_SetDirection2();
    taxt_BuildTaxonomy();
}

function taxt_MaterialCB42Select(obj) // Ok
{
    taxt_BuildTaxonomy();
}

function taxt_SystemCB11Select(obj) // Ok
{
    taxt_SetDirection2();
    taxt_ValidateSystem1();
    if ($('#DirectionCB').prop('checked')) {
        taxt_ValidateSystem2();
    }
    taxt_BuildTaxonomy();
}

function taxt_SystemCB12Select(obj) // Ok
{
    taxt_ValidateSystem2();
    taxt_BuildTaxonomy();
}

function taxt_SystemCB21Select(obj) // Ok
{
    taxt_SetDirection2();
    taxt_BuildTaxonomy();
}

function taxt_SystemCB22Select(obj) // Ok
{
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
    $("#Direction2RB1").prop("checked", true);
    taxt_BuildTaxonomy();
}
function taxt_Direction1RB2Click(obj) // Ok
{
    $("#Direction2RB3").prop("checked", true);
    taxt_BuildTaxonomy();
}
function taxt_Direction2RB1Click(obj) // Ok
{
    $("#Direction1RB1").prop("checked", true);
    taxt_BuildTaxonomy();
}
function taxt_Direction2RB3Click(obj) // Ok
{
    $("#Direction1RB2").prop("checked", true);
    taxt_BuildTaxonomy();
}

function taxt_OmitCBClick(obj) // Ok
{
    taxt_BuildTaxonomy();
}



function taxt_BuildTaxonomy()
{
    var Taxonomy = [], ResTax, direction1, direction2;

    for (var i = 0 ; i < 50 ; i++)
        Taxonomy[i] = "";
    /* Structural System: Direction X */

    if ( $('#MaterialCB11').val() == 0 && !$('#OmitCB').prop('checked') )
        Taxonomy[0] = 'MAT99';
    if ($('#MaterialCB11').val() == 1)
        Taxonomy[0] = 'C99';
    if ($('#MaterialCB11').val() == 2)
        Taxonomy[0] = 'CU';
    if ($('#MaterialCB11').val() == 3)
        Taxonomy[0] = 'CR';
    if ($('#MaterialCB11').val() == 4)
        Taxonomy[0] = 'SRC';

    if ( ($('#MaterialCB11').val() > 0) && ($('#MaterialCB11').val() < 5) ) {
        if ( ($('#MaterialCB21').val() == 0) && !$('#OmitCB').prop('checked') )
            Taxonomy[1] = '+CT99';
        if ($('#MaterialCB21').val() == 1)
            Taxonomy[1] = '+CIP';
        if ($('#MaterialCB21').val() == 2)
            Taxonomy[1] = '+PC';
        if ($('#MaterialCB21').val() == 3)
            Taxonomy[1] = '+CIPPS';
        if ($('#MaterialCB21').val() == 4)
            Taxonomy[1] = '+PCPS';
    }
    if ($('#MaterialCB11').val() == 5) {
        Taxonomy[0] = 'S';
        if ( $('#MaterialCB21').val() == 0 && !$('#OmitCB').prop('checked') )
            Taxonomy[1] = '+S99';
        if ( $('#MaterialCB21').val() == 1 )
            Taxonomy[1] = '+SL';
        if ( $('#MaterialCB21').val() == 2 )
            Taxonomy[1] = '+SR';
        if ( $('#MaterialCB21').val() == 3 )
            Taxonomy[1] = '+SO';
    }

    if ($('#MaterialCB11').val() == 6) {
        Taxonomy[0] = 'ME';
        if ( $('#MaterialCB21').val() == 0 && !$('#OmitCB').prop('checked') )
            Taxonomy[1] = '+ME99';
        if ($('#MaterialCB21').val() == 1)
            Taxonomy[1] = '+MEIR';
        if ($('#MaterialCB21').val() == 2)
            Taxonomy[1] = '+MEO';
    }

    if ($('#MaterialCB11').val() == 5) {
        if ( $('#MaterialCB31').val() == 0 && !$('#OmitCB').prop('checked') )
            Taxonomy[2] = '+SC99';
        if ($('#MaterialCB31').val() == 1)
            Taxonomy[2] = '+WEL';
        if ($('#MaterialCB31').val() == 2)
            Taxonomy[2] = '+RIV';
        if ($('#MaterialCB31').val() == 3)
            Taxonomy[2] = '+BOL';
    }

    if ($('#MaterialCB11').val() > 6 && $('#MaterialCB11').val() < 11) {
        if ($('#MaterialCB11').val() == 7)
            Taxonomy[0] = 'M99';
        if ($('#MaterialCB11').val() == 8)
            Taxonomy[0] = 'MUR';
        if ($('#MaterialCB11').val() == 9)
            Taxonomy[0] = 'MCF';

        if ( $('#MaterialCB21').val() == 0 && !$('#OmitCB').prop('checked') )
            Taxonomy[1] = '+MUN99';
        if ($('#MaterialCB21').val() == 1)
            Taxonomy[1] = '+ADO';
        if ($('#MaterialCB21').val() == 2)
            Taxonomy[1] = '+ST99';
        if ($('#MaterialCB21').val() == 3)
            Taxonomy[1] = '+STRUB';
        if ($('#MaterialCB21').val() == 4)
            Taxonomy[1] = '+STDRE';
        if ($('#MaterialCB21').val() == 5)
            Taxonomy[1] = '+CL99';
        if ($('#MaterialCB21').val() == 6)
            Taxonomy[1] = '+CLBRS';
        if ($('#MaterialCB21').val() == 7)
            Taxonomy[1] = '+CLBRH';
        if ($('#MaterialCB21').val() == 8)
            Taxonomy[1] = '+CLBLH';
        if ($('#MaterialCB21').val() == 9)
            Taxonomy[1] = '+CB99';
        if ($('#MaterialCB21').val() == 10)
            Taxonomy[1] = '+CBS';
        if ($('#MaterialCB21').val() == 11)
            Taxonomy[1] = '+CBH';
        if ($('#MaterialCB21').val() == 12)
            Taxonomy[1] = '+MO';

        if ($('#MaterialCB11').val() == 10) {
            Taxonomy[0] = 'MR';
            if ( ($('#MaterialCB41').val() == 0) && !$('#OmitCB').prop('checked') )
                Taxonomy[1] = Taxonomy[1]+'+MR99';
            if ($('#MaterialCB41').val() == 1)
                Taxonomy[1] = Taxonomy[1]+'+RS';
            if ($('#MaterialCB41').val() == 2)
                Taxonomy[1] = Taxonomy[1]+'+RW';
            if ($('#MaterialCB41').val() == 3)
                Taxonomy[1] = Taxonomy[1]+'+RB';
            if ($('#MaterialCB41').val() == 4)
                Taxonomy[1] = Taxonomy[1]+'+RCM';
            if ($('#MaterialCB41').val() == 5)
                Taxonomy[1] = Taxonomy[1]+'+RCB';
        }

        if (($('#MaterialCB31').val() == 0) && !$('#OmitCB').prop('checked') )
            Taxonomy[2] = '+MO99';
        if ($('#MaterialCB31').val() == 1)
            Taxonomy[2] = '+MON';
        if ($('#MaterialCB31').val() == 2)
            Taxonomy[2] = '+MOM';
        if ($('#MaterialCB31').val() == 3)
            Taxonomy[2] = '+MOL';
        if ($('#MaterialCB31').val() == 4)
            Taxonomy[2] = '+MOC';
        if ($('#MaterialCB31').val() == 5)
            Taxonomy[2] = '+MOCL';
        if ($('#MaterialCB31').val() == 6)
            Taxonomy[2] = '+SP99';
        if ($('#MaterialCB31').val() == 7)
            Taxonomy[2] = '+SPLI';
        if ($('#MaterialCB31').val() == 8)
            Taxonomy[2] = '+SPSA';
        if ($('#MaterialCB31').val() == 9)
            Taxonomy[2] = '+SPTU';
        if ($('#MaterialCB31').val() == 10)
            Taxonomy[2] = '+SPSL';
        if ($('#MaterialCB31').val() == 11)
            Taxonomy[2] = '+SPGR';
        if ($('#MaterialCB31').val() == 12)
            Taxonomy[2] = '+SPBA';
        if ($('#MaterialCB31').val() == 13)
            Taxonomy[2] = '+SPO';
    }

    if ( ($('#MaterialCB11').val()>10) && ($('#MaterialCB11').val()<14) ) {
        if ($('#MaterialCB11').val() == 11)
            Taxonomy[0] = 'E99';
        if ($('#MaterialCB11').val() == 12)
            Taxonomy[0] = 'EU';
        if ($('#MaterialCB11').val() == 13)
            Taxonomy[0] = 'ER';

        if ( ($('#MaterialCB21').val() == 0) && !$('#OmitCB').prop('checked') )
            Taxonomy[1] = '+ET99';
        if ($('#MaterialCB21').val() == 1)
            Taxonomy[1] = '+ETR';
        if ($('#MaterialCB21').val() == 2)
            Taxonomy[1] = '+ETC';
        if ($('#MaterialCB21').val() == 3)
            Taxonomy[1] = '+ETO';
    }

    if ($('#MaterialCB11').val() == 14) {
        Taxonomy[0] = 'W';
        if (($('#MaterialCB21').val() == 0) && !$('#OmitCB').prop('checked'))
            Taxonomy[1] = '+W99';
        if ($('#MaterialCB21').val() == 1)
            Taxonomy[1] = '+WHE';
        if ($('#MaterialCB21').val() == 2)
            Taxonomy[1] = '+WLI';
        if ($('#MaterialCB21').val() == 3)
            Taxonomy[1] = '+WS';
        if ($('#MaterialCB21').val() == 4)
            Taxonomy[1] = '+WWD';
        if ($('#MaterialCB21').val() == 5)
            Taxonomy[1] = '+WBB';
        if ($('#MaterialCB21').val() == 6)
            Taxonomy[1] = '+WO';
    }

    if ($('#MaterialCB11').val() == 15)
        Taxonomy[0] = 'MATO';

    if (($('#SystemCB11').val() == 0) && !$('#OmitCB').prop('checked'))
        Taxonomy[3] = 'L99';

    if ( ($('#MaterialCB11').val()>10) && ($('#MaterialCB11').val()<14) ) {
        if ($('#SystemCB11').val() == 1)
            Taxonomy[3] = 'LN';
        if ($('#SystemCB11').val() == 2)
            Taxonomy[3] = 'LWAL';
        if ($('#SystemCB11').val() == 3)
            Taxonomy[3] = 'LH';
        if ($('#SystemCB11').val() == 4)
            Taxonomy[3] = 'LO';
    }
    else if ( (($('#MaterialCB11').val()>6) && ($('#MaterialCB11').val()<11)) || ($('#MaterialCB11').val() == 14)) {
        if ($('#SystemCB11').val() == 1)
            Taxonomy[3] = 'LN';
        if ($('#SystemCB11').val() == 2)
            Taxonomy[3] = 'LFM';;
        if ($('#SystemCB11').val() == 3)
            Taxonomy[3] = 'LPB';
        if ($('#SystemCB11').val() == 4)
            Taxonomy[3] = 'LWAL';
        if ($('#SystemCB11').val() == 5)
            Taxonomy[3] = 'LH';
        if ($('#SystemCB11').val() == 6)
            Taxonomy[3] = 'LO';
    }
    else {
        if ($('#SystemCB11').val() == 1)
            Taxonomy[3] = 'LN';
        if ($('#SystemCB11').val() == 2)
            Taxonomy[3] = 'LFM';
        if ($('#SystemCB11').val() == 3)
            Taxonomy[3] = 'LFINF';
        if ($('#SystemCB11').val() == 4)
            Taxonomy[3] = 'LFBR';
        if ($('#SystemCB11').val() == 5)
            Taxonomy[3] = 'LPB';
        if ($('#SystemCB11').val() == 6)
            Taxonomy[3] = 'LWAL';
        if ($('#SystemCB11').val() == 7)
            Taxonomy[3] = 'LDUAL';
        if ($('#SystemCB11').val() == 8)
            Taxonomy[3] = 'LFLS';
        if ($('#SystemCB11').val() == 9)
            Taxonomy[3] = 'LFLSINF';
        if ($('#SystemCB11').val() == 10)
            Taxonomy[3] = 'LH';
        if ($('#SystemCB11').val() == 11)
            Taxonomy[3] = 'LO';
    }

    if ($('#SystemCB11').val() > 0) {
        if (($('#SystemCB21').val() == 0) && !$('#OmitCB').prop('checked'))
            Taxonomy[4] = '+DU99';
        if ($('#SystemCB21').val() == 1)
            Taxonomy[4] = '+DUC';
        if ($('#SystemCB21').val() == 2)
            Taxonomy[4] = '+DNO';
        if ($('#SystemCB21').val() == 3)
            Taxonomy[4] = '+DBD';
    }




    /* Structural System: Direction Y */




    if ( $('#MaterialCB12').val() == 0 && !$('#OmitCB').prop('checked') )
        Taxonomy[5] = 'MAT99';
    if ($('#MaterialCB12').val() == 1)
        Taxonomy[5] = 'C99';
    if ($('#MaterialCB12').val() == 2)
        Taxonomy[5] = 'CU';
    if ($('#MaterialCB12').val() == 3)
        Taxonomy[5] = 'CR';
    if ($('#MaterialCB12').val() == 4)
        Taxonomy[5] = 'SRC';

    if ( ($('#MaterialCB12').val() > 0) && ($('#MaterialCB12').val() < 5) ) {
        if ( ($('#MaterialCB22').val() == 0) && !$('#OmitCB').prop('checked') )
            Taxonomy[6] = '+CT99';
        if ($('#MaterialCB22').val() == 1)
            Taxonomy[6] = '+CIP';
        if ($('#MaterialCB22').val() == 2)
            Taxonomy[6] = '+PC';
        if ($('#MaterialCB22').val() == 3)
            Taxonomy[6] = '+CIPPS';
        if ($('#MaterialCB22').val() == 4)
            Taxonomy[6] = '+PCPS';
    }
    if ($('#MaterialCB12').val() == 5) {
        Taxonomy[5] = 'S';
        if ( $('#MaterialCB22').val() == 0 && !$('#OmitCB').prop('checked') )
            Taxonomy[6] = '+S99';
        if ( $('#MaterialCB22').val() == 1 )
            Taxonomy[6] = '+SL';
        if ( $('#MaterialCB22').val() == 2 )
            Taxonomy[6] = '+SR';
        if ( $('#MaterialCB22').val() == 3 )
            Taxonomy[6] = '+SO';
    }

    if ($('#MaterialCB12').val() == 6) {
        Taxonomy[5] = 'ME';
        if ( $('#MaterialCB22').val() == 0 && !$('#OmitCB').prop('checked') )
            Taxonomy[6] = '+ME99';
        if ($('#MaterialCB22').val() == 1)
            Taxonomy[6] = '+MEIR';
        if ($('#MaterialCB22').val() == 2)
            Taxonomy[6] = '+MEO';
    }

    if ($('#MaterialCB12').val() == 5) {
        if ( $('#MaterialCB32').val() == 0 && !$('#OmitCB').prop('checked') )
            Taxonomy[7] = '+SC99';
        if ($('#MaterialCB32').val() == 1)
            Taxonomy[7] = '+WEL';
        if ($('#MaterialCB32').val() == 2)
            Taxonomy[7] = '+RIV';
        if ($('#MaterialCB32').val() == 3)
            Taxonomy[7] = '+BOL';
    }

    if ($('#MaterialCB12').val() > 6 && $('#MaterialCB12').val() < 11) {
        if ($('#MaterialCB12').val() == 7)
            Taxonomy[5] = 'M99';
        if ($('#MaterialCB12').val() == 8)
            Taxonomy[5] = 'MUR';
        if ($('#MaterialCB12').val() == 9)
            Taxonomy[5] = 'MCF';

        if ( $('#MaterialCB22').val() == 0 && !$('#OmitCB').prop('checked') )
            Taxonomy[6] = '+MUN99';
        if ($('#MaterialCB22').val() == 1)
            Taxonomy[6] = '+ADO';
        if ($('#MaterialCB22').val() == 2)
            Taxonomy[6] = '+ST99';
        if ($('#MaterialCB22').val() == 3)
            Taxonomy[6] = '+STRUB';
        if ($('#MaterialCB22').val() == 4)
            Taxonomy[6] = '+STDRE';
        if ($('#MaterialCB22').val() == 5)
            Taxonomy[6] = '+CL99';
        if ($('#MaterialCB22').val() == 6)
            Taxonomy[6] = '+CLBRS';
        if ($('#MaterialCB22').val() == 7)
            Taxonomy[6] = '+CLBRH';
        if ($('#MaterialCB22').val() == 8)
            Taxonomy[6] = '+CLBLH';
        if ($('#MaterialCB22').val() == 9)
            Taxonomy[6] = '+CB99';
        if ($('#MaterialCB22').val() == 10)
            Taxonomy[6] = '+CBS';
        if ($('#MaterialCB22').val() == 11)
            Taxonomy[6] = '+CBH';
        if ($('#MaterialCB22').val() == 12)
            Taxonomy[6] = '+MO';

        if ($('#MaterialCB12').val() == 10) {
            Taxonomy[5] = 'MR';
            if ( ($('#MaterialCB42').val() == 0) && !$('#OmitCB').prop('checked') )
                Taxonomy[6] = Taxonomy[6] + '+MR99';
            if ($('#MaterialCB42').val() == 1)
                Taxonomy[6] = Taxonomy[6] + '+RS';
            if ($('#MaterialCB42').val() == 2)
                Taxonomy[6] = Taxonomy[6] + '+RW';
            if ($('#MaterialCB42').val() == 3)
                Taxonomy[6] = Taxonomy[6] + '+RB';
            if ($('#MaterialCB42').val() == 4)
                Taxonomy[6] = Taxonomy[6] + '+RCM';
            if ($('#MaterialCB42').val() == 5)
                Taxonomy[6] = Taxonomy[6] + '+RCB';
        }

        if (($('#MaterialCB32').val() == 0) && !$('#OmitCB').prop('checked') )
            Taxonomy[7] = '+MO99';
        if ($('#MaterialCB32').val() == 1)
            Taxonomy[7] = '+MON';
        if ($('#MaterialCB32').val() == 2)
            Taxonomy[7] = '+MOM';
        if ($('#MaterialCB32').val() == 3)
            Taxonomy[7] = '+MOL';
        if ($('#MaterialCB32').val() == 4)
            Taxonomy[7] = '+MOC';
        if ($('#MaterialCB32').val() == 5)
            Taxonomy[7] = '+MOCL';
        if ($('#MaterialCB32').val() == 6)
            Taxonomy[7] = '+SP99';
        if ($('#MaterialCB32').val() == 7)
            Taxonomy[7] = '+SPLI';
        if ($('#MaterialCB32').val() == 8)
            Taxonomy[7] = '+SPSA';
        if ($('#MaterialCB32').val() == 9)
            Taxonomy[7] = '+SPTU';
        if ($('#MaterialCB32').val() == 10)
            Taxonomy[7] = '+SPSL';
        if ($('#MaterialCB32').val() == 11)
            Taxonomy[7] = '+SPGR';
        if ($('#MaterialCB32').val() == 12)
            Taxonomy[7] = '+SPBA';
        if ($('#MaterialCB32').val() == 13)
            Taxonomy[7] = '+SPO';
    }

    if ( ($('#MaterialCB12').val()>10) && ($('#MaterialCB12').val()<14) ) {
        if ($('#MaterialCB12').val() == 11)
            Taxonomy[5] = 'E99';
        if ($('#MaterialCB12').val() == 12)
            Taxonomy[5] = 'EU';
        if ($('#MaterialCB12').val() == 13)
            Taxonomy[5] = 'ER';

        if ( ($('#MaterialCB22').val() == 0) && !$('#OmitCB').prop('checked') )
            Taxonomy[6] = '+ET99';
        if ($('#MaterialCB22').val() == 1)
            Taxonomy[6] = '+ETR';
        if ($('#MaterialCB22').val() == 2)
            Taxonomy[6] = '+ETC';
        if ($('#MaterialCB22').val() == 3)
            Taxonomy[6] = '+ETO';
    }

    if ($('#MaterialCB12').val() == 14) {
        Taxonomy[5] = 'W';
        if (($('#MaterialCB22').val() == 0) && !$('#OmitCB').prop('checked'))
            Taxonomy[6] = '+W99';
        if ($('#MaterialCB22').val() == 1)
            Taxonomy[6] = '+WHE';
        if ($('#MaterialCB22').val() == 2)
            Taxonomy[6] = '+WLI';
        if ($('#MaterialCB22').val() == 3)
            Taxonomy[6] = '+WS';
        if ($('#MaterialCB22').val() == 4)
            Taxonomy[6] = '+WWD';
        if ($('#MaterialCB22').val() == 5)
            Taxonomy[6] = '+WBB';
        if ($('#MaterialCB22').val() == 6)
            Taxonomy[6] = '+WO';
    }

    if ($('#MaterialCB12').val() == 15)
        Taxonomy[5] = 'MATO';

    if (($('#SystemCB12').val() == 0) && !$('#OmitCB').prop('checked'))
        Taxonomy[8] = 'L99';

    if ( ($('#MaterialCB12').val()>10) && ($('#MaterialCB12').val()<14) ) {
        if ($('#SystemCB12').val() == 1)
            Taxonomy[8] = 'LN';
        if ($('#SystemCB12').val() == 2)
            Taxonomy[8] = 'LWAL';
        if ($('#SystemCB12').val() == 3)
            Taxonomy[8] = 'LH';
        if ($('#SystemCB12').val() == 4)
            Taxonomy[8] = 'LO';
    }
    else if ( (($('#MaterialCB12').val()>6) && ($('#MaterialCB12').val()<11)) || ($('#MaterialCB12').val() == 14)) {
        if ($('#SystemCB12').val() == 1)
            Taxonomy[8] = 'LN';
        if ($('#SystemCB12').val() == 2)
            Taxonomy[8] = 'LFM';;
        if ($('#SystemCB12').val() == 3)
            Taxonomy[8] = 'LPB';
        if ($('#SystemCB12').val() == 4)
            Taxonomy[8] = 'LWAL';
        if ($('#SystemCB12').val() == 5)
            Taxonomy[8] = 'LH';
        if ($('#SystemCB12').val() == 6)
            Taxonomy[8] = 'LO';
    }
    else {
        if ($('#SystemCB12').val() == 1)
            Taxonomy[8] = 'LN';
        if ($('#SystemCB12').val() == 2)
            Taxonomy[8] = 'LFM';
        if ($('#SystemCB12').val() == 3)
            Taxonomy[8] = 'LFINF';
        if ($('#SystemCB12').val() == 4)
            Taxonomy[8] = 'LFBR';
        if ($('#SystemCB12').val() == 5)
            Taxonomy[8] = 'LPB';
        if ($('#SystemCB12').val() == 6)
            Taxonomy[8] = 'LWAL';
        if ($('#SystemCB12').val() == 7)
            Taxonomy[8] = 'LDUAL';
        if ($('#SystemCB12').val() == 8)
            Taxonomy[8] = 'LFLS';
        if ($('#SystemCB12').val() == 9)
            Taxonomy[8] = 'LFLSINF';
        if ($('#SystemCB12').val() == 10)
            Taxonomy[8] = 'LH';
        if ($('#SystemCB12').val() == 11)
            Taxonomy[8] = 'LO';
    }

    if ($('#SystemCB12').val() > 0) {
        if (($('#SystemCB22').val() == 0) && !$('#OmitCB').prop('checked'))
            Taxonomy[9] = '+DU99';
        if ($('#SystemCB22').val() == 1)
            Taxonomy[9] = '+DUC';
        if ($('#SystemCB22').val() == 2)
            Taxonomy[9] = '+DNO';
        if ($('#SystemCB22').val() == 3)
            Taxonomy[9] = '+DBD';
    }

    if ($('#DateCB1').val() == 0  && !$('#OmitCB').prop('checked'))
        Taxonomy[10] = 'Y99';
    if ($('#DateCB1').val() == 1)
        Taxonomy[10] = 'YEX:' + $('#DateE1').val();
    else if ($('#DateCB1').val() == 2)
        Taxonomy[10] = 'YBET:' + $('#DateE1').val() + "," + $('#DateE2').val();
    else if ($('#DateCB1').val() == 3)
        Taxonomy[10] = 'YPRE:' + $('#DateE1').val();
    else if ($('#DateCB1').val() == 4)
        Taxonomy[10] = 'YAPP:' + $('#DateE1').val();

    if ($('#HeightCB1').val() == 0) {
        if (!$('#OmitCB').prop('checked'))
            Taxonomy[11] ='H99';
    }
    else {
        if ($('#HeightCB1').val() == 1)
            Taxonomy[11] = 'HBET:' + $('#noStoreysE11').val() + ',' + $('#noStoreysE12').val();
        if ($('#HeightCB1').val() == 2)
            Taxonomy[11] = 'HEX:' + $('#noStoreysE11').val();
        if ($('#HeightCB1').val() == 3)
            Taxonomy[11] = 'HAPP:' + $('#noStoreysE11').val();

        if ($('#HeightCB2').val() == 0 && !$('#OmitCB').prop('checked'))
            Taxonomy[12] = '+HB99';
        if ($('#HeightCB2').val() == 1)
            Taxonomy[12] = '+HBBET:' + $('#noStoreysE21').val() + ',' + $('#noStoreysE22').val();
        if ($('#HeightCB2').val() == 2)
            Taxonomy[12] = '+HBEX:' + $('#noStoreysE21').val();
        if ($('#HeightCB2').val() == 3)
            Taxonomy[12] = '+HBAPP:' + $('#noStoreysE21').val();

        if ($('#HeightCB3').val() == 0 && !$('#OmitCB').prop('checked'))
            Taxonomy[13] = '+HF99';
        if ($('#HeightCB3').val() == 1)
            Taxonomy[13] = '+HFBET:' + $('#noStoreysE31').val() + ',' + $('#noStoreysE32').val();
        if ($('#HeightCB3').val() == 2)
            Taxonomy[13] = '+HFEX:' + $('#noStoreysE31').val();
        if ($('#HeightCB3').val() == 3)
            Taxonomy[13] = '+HFAPP:' + $('#noStoreysE31').val();

        if ($('#HeightCB4').val() == 0 && !$('#OmitCB').prop('checked'))
            Taxonomy[14] = '+HD99';
        if ($('#HeightCB4').val() == 1)
            Taxonomy[14] = '+HD:' + $('#noStoreysE4').val();
    }

    if ($('#OccupancyCB1').val() == 0) {
        if (!$('#OmitCB').prop('checked'))
            Taxonomy[15] = 'OC99';
    }
    else if ($('#OccupancyCB1').val() == 1) {
        Taxonomy[15] = 'RES';
        if ($('#OccupancyCB2').val() == 0 && !$('#OmitCB').prop('checked'))
            Taxonomy[16] = '+RES99';
        if ($('#OccupancyCB2').val() == 1)
            Taxonomy[16] = '+RES1';
        if ($('#OccupancyCB2').val() == 2)
            Taxonomy[16] = '+RES2';
        if ($('#OccupancyCB2').val() == 3)
            Taxonomy[16] = '+RES2A';
        if ($('#OccupancyCB2').val() == 4)
            Taxonomy[16] = '+RES2B';
        if ($('#OccupancyCB2').val() == 5)
            Taxonomy[16] = '+RES2C';
        if ($('#OccupancyCB2').val() == 6)
            Taxonomy[16] = '+RES2D';
        if ($('#OccupancyCB2').val() == 7)
            Taxonomy[16] = '+RES2E';
        if ($('#OccupancyCB2').val() == 8)
            Taxonomy[16] = '+RES2F';
        if ($('#OccupancyCB2').val() == 9)
            Taxonomy[16] = '+RES3';
        if ($('#OccupancyCB2').val() == 10)
            Taxonomy[16] = '+RES4';
        if ($('#OccupancyCB2').val() == 11)
            Taxonomy[16] = '+RES5';
        if ($('#OccupancyCB2').val() == 12)
            Taxonomy[16] = '+RES6';
    }
    else if ($('#OccupancyCB1').val() == 2) {
        Taxonomy[15] = 'COM';
        if ($('#OccupancyCB2').val() == 0 && !$('#OmitCB').prop('checked'))
            Taxonomy[16] = '+COM99';
        if ($('#OccupancyCB2').val() == 1)
            Taxonomy[16] = '+COM1';
        if ($('#OccupancyCB2').val() == 2)
            Taxonomy[16] = '+COM2';
        if ($('#OccupancyCB2').val() == 3)
            Taxonomy[16] = '+COM3';
        if ($('#OccupancyCB2').val() == 4)
            Taxonomy[16] = '+COM4';
        if ($('#OccupancyCB2').val() == 5)
            Taxonomy[16] = '+COM5';
        if ($('#OccupancyCB2').val() == 6)
            Taxonomy[16] = '+COM6';
        if ($('#OccupancyCB2').val() == 7)
            Taxonomy[16] = '+COM7';
        if ($('#OccupancyCB2').val() == 8)
            Taxonomy[16] = '+COM8';
        if ($('#OccupancyCB2').val() == 9)
            Taxonomy[16] = '+COM9';
        if ($('#OccupancyCB2').val() == 10)
            Taxonomy[16] = '+COM10';
        if ($('#OccupancyCB2').val() == 11)
            Taxonomy[16] = '+COM11';
    }
    else if ($('#OccupancyCB1').val() == 3) {
        Taxonomy[15] = 'MIX';
        if ($('#OccupancyCB2').val() == 0 && !$('#OmitCB').prop('checked'))
            Taxonomy[16] = '+MIX99';
        if ($('#OccupancyCB2').val() == 1)
            Taxonomy[16] = '+MIX1';
        if ($('#OccupancyCB2').val() == 2)
            Taxonomy[16] = '+MIX2';
        if ($('#OccupancyCB2').val() == 3)
            Taxonomy[16] = '+MIX3';
        if ($('#OccupancyCB2').val() == 4)
            Taxonomy[16] = '+MIX4';
        if ($('#OccupancyCB2').val() == 5)
            Taxonomy[16] = '+MIX5';
        if ($('#OccupancyCB2').val() == 6)
            Taxonomy[16] = '+MIX6';
    }
    else if ($('#OccupancyCB1').val() == 4) {
        Taxonomy[15] = 'IND';
        if ($('#OccupancyCB2').val() == 0 && !$('#OmitCB').prop('checked'))
            Taxonomy[16] = '+IND99';
        if ($('#OccupancyCB2').val() == 1)
            Taxonomy[16] = '+IND1';
        if ($('#OccupancyCB2').val() == 2)
            Taxonomy[16] = '+IND2';
    }
    else if ($('#OccupancyCB1').val() == 5) {
        Taxonomy[15] = 'AGR';
        if ($('#OccupancyCB2').val() == 0 && !$('#OmitCB').prop('checked'))
            Taxonomy[16] = '+AGR99';
        if ($('#OccupancyCB2').val() == 1)
            Taxonomy[16] = '+AGR1';
        if ($('#OccupancyCB2').val() == 2)
            Taxonomy[16] = '+AGR2';
        if ($('#OccupancyCB2').val() == 3)
            Taxonomy[16] = '+AGR3';
    }
    else if ($('#OccupancyCB1').val() == 6) {
        Taxonomy[15] = 'ASS';
        if ($('#OccupancyCB2').val() == 0 && !$('#OmitCB').prop('checked'))
            Taxonomy[16] = '+ASS99';
        if ($('#OccupancyCB2').val() == 1)
            Taxonomy[16] = '+ASS1';
        if ($('#OccupancyCB2').val() == 2)
            Taxonomy[16] = '+ASS2';
        if ($('#OccupancyCB2').val() == 3)
            Taxonomy[16] = '+ASS3';
        if ($('#OccupancyCB2').val() == 4)
            Taxonomy[16] = '+ASS4';
    }
    else if ($('#OccupancyCB1').val() == 7) {
        Taxonomy[15] = 'GOV';
        if ($('#OccupancyCB2').val() == 0 && !$('#OmitCB').prop('checked'))
            Taxonomy[16] = '+GOV99';
        if ($('#OccupancyCB2').val() == 1)
            Taxonomy[16] = '+GOV1';
        if ($('#OccupancyCB2').val() == 2)
            Taxonomy[16] = '+GOV2';
    }
    else if ($('#OccupancyCB1').val() == 8) {
        Taxonomy[15] = 'EDU';
        if ($('#OccupancyCB2').val() == 0 && !$('#OmitCB').prop('checked'))
            Taxonomy[16] = '+EDU99';
        if ($('#OccupancyCB2').val() == 1)
            Taxonomy[16] = '+EDU1';
        if ($('#OccupancyCB2').val() == 2)
            Taxonomy[16] = '+EDU2';
        if ($('#OccupancyCB2').val() == 3)
            Taxonomy[16] = '+EDU3';
        if ($('#OccupancyCB2').val() == 4)
            Taxonomy[16] = '+EDU4';
    }
    else if ($('#OccupancyCB1').val() == 9) {
        Taxonomy[15] = 'OCO';
    }

    if ($('#PositionCB').val() == 0 && !$('#OmitCB').prop('checked'))
        Taxonomy[17] = 'BP99';
    else if ($('#PositionCB').val() == 1)
        Taxonomy[17] = 'BPD';
    else if ($('#PositionCB').val() == 2)
        Taxonomy[17] = 'BP1';
    else if ($('#PositionCB').val() == 3)
        Taxonomy[17] = 'BP2';
    else if ($('#PositionCB').val() == 4)
        Taxonomy[17] = 'BP3';
    else if ($('#PositionCB').val() == 5)
        Taxonomy[17] = 'BPI';

    if ($('#PlanShapeCB').val() == 0 && !$('#OmitCB').prop('checked'))
        Taxonomy[18] = 'PLF99';
    else if ($('#PlanShapeCB').val() == 1)
        Taxonomy[18] = 'PLFSQ';
    else if ($('#PlanShapeCB').val() == 2)
        Taxonomy[18] = 'PLFSQO';
    else if ($('#PlanShapeCB').val() == 3)
        Taxonomy[18] = 'PLFR';
    else if ($('#PlanShapeCB').val() == 4)
        Taxonomy[18] = 'PLFRO';
    else if ($('#PlanShapeCB').val() == 5)
        Taxonomy[18] = 'PLFL';
    else if ($('#PlanShapeCB').val() == 6)
        Taxonomy[18] = 'PLFC';
    else if ($('#PlanShapeCB').val() == 7)
        Taxonomy[18] = 'PLFCO';
    else if ($('#PlanShapeCB').val() == 8)
        Taxonomy[18] = 'PLFD';
    else if ($('#PlanShapeCB').val() == 9)
        Taxonomy[18] = 'PLFDO';
    else if ($('#PlanShapeCB').val() == 10)
        Taxonomy[18] = 'PLFE';
    else if ($('#PlanShapeCB').val() == 11)
        Taxonomy[18] = 'PLFH';
    else if ($('#PlanShapeCB').val() == 12)
        Taxonomy[18] = 'PLFS';
    else if ($('#PlanShapeCB').val() == 13)
        Taxonomy[18] = 'PLFT';
    else if ($('#PlanShapeCB').val() == 14)
        Taxonomy[18] = 'PLFU';
    else if ($('#PlanShapeCB').val() == 15)
        Taxonomy[18] = 'PLFX';
    else if ($('#PlanShapeCB').val() == 16)
        Taxonomy[18] = 'PLFY';
    else if ($('#PlanShapeCB').val() == 17)
        Taxonomy[18] = 'PLFP';
    else if ($('#PlanShapeCB').val() == 18)
        Taxonomy[18] = 'PLFPO';
    else if ($('#PlanShapeCB').val() == 19)
        Taxonomy[18] = 'PLFI';

    if ($('#RegularityCB1').val() == 0) {
        if (!$('#OmitCB').prop('checked'))
            Taxonomy[19] = 'IR99';
    }
    else {
        if ($('#RegularityCB1').val() == 1)
            Taxonomy[19] = 'IRRE';
        if ($('#RegularityCB1').val() == 2) {
            Taxonomy[19] = 'IRIR';
            if ($('#RegularityCB2').val() == 0 && !$('#OmitCB').prop('checked'))
                Taxonomy[20] = '+IRPP:IRN';
            if ($('#RegularityCB2').val() == 1)
                Taxonomy[20] = '+IRPP:TOR';
            if ($('#RegularityCB2').val() == 2)
                Taxonomy[20] = '+IRPP:REC';
            if ($('#RegularityCB2').val() == 3)
                Taxonomy[20] = '+IRPP:IRHO';

            if ($('#RegularityCB3').val() == 0 && !$('#OmitCB').prop('checked'))
                Taxonomy[21] = '+IRVP:IRN';
            if ($('#RegularityCB3').val() == 1)
                Taxonomy[21] = '+IRVP:SOS';
            if ($('#RegularityCB3').val() == 2)
                Taxonomy[21] = '+IRVP:CRW';
            if ($('#RegularityCB3').val() == 3)
                Taxonomy[21] = '+IRVP:SHC';
            if ($('#RegularityCB3').val() == 4)
                Taxonomy[21] = '+IRVP:POP';
            if ($('#RegularityCB3').val() == 5)
                Taxonomy[21] = '+IRVP:SET';
            if ($('#RegularityCB3').val() == 6)
                Taxonomy[21] = '+IRVP:CHV';
            if ($('#RegularityCB3').val() == 7)
                Taxonomy[21] = '+IRVP:IRVO';

            if ($('#RegularityCB4').val() > 0) {
                if ($('#RegularityCB4').val() == 0)
                    Taxonomy[22] = '+IRPS:IRN';
                if ($('#RegularityCB4').val() == 1)
                    Taxonomy[22] = '+IRPS:TOR';
                if ($('#RegularityCB4').val() == 2)
                    Taxonomy[22] = '+IRPS:REC';
                if ($('#RegularityCB4').val() == 3)
                    Taxonomy[22] = '+IRPS:IRHO';
            }
            if ($('#RegularityCB5').val() > 0) {
                if ($('#RegularityCB5').val() == 0)
                    Taxonomy[23] = '+IRVS:IRN';
                if ($('#RegularityCB5').val() == 1)
                    Taxonomy[23] = '+IRVS:SOS';
                if ($('#RegularityCB5').val() == 2)
                    Taxonomy[23] = '+IRVS:CRW';
                if ($('#RegularityCB5').val() == 3)
                    Taxonomy[23] = '+IRVS:SHC';
                if ($('#RegularityCB5').val() == 4)
                    Taxonomy[23] = '+IRVS:POP';
                if ($('#RegularityCB5').val() == 5)
                    Taxonomy[23] = '+IRVS:SET';
                if ($('#RegularityCB5').val() == 6)
                    Taxonomy[23] = '+IRVS:CHV';
                if ($('#RegularityCB5').val() == 7)
                    Taxonomy[23] = '+IRVS:IRVO';
            }
        }
    }

    if ($('#WallsCB').val() == 0 && !$('#OmitCB').prop('checked'))
        Taxonomy[24] = 'EW99';
    if ($('#WallsCB').val() == 1)
        Taxonomy[24] = 'EWC';
    if ($('#WallsCB').val() == 2)
        Taxonomy[24] = 'EWG';
    if ($('#WallsCB').val() == 3)
        Taxonomy[24] = 'EWE';
    if ($('#WallsCB').val() == 4)
        Taxonomy[24] = 'EWMA';
    if ($('#WallsCB').val() == 5)
        Taxonomy[24] = 'EWME';
    if ($('#WallsCB').val() == 6)
        Taxonomy[24] = 'EWV';
    if ($('#WallsCB').val() == 7)
        Taxonomy[24] = 'EWW';
    if ($('#WallsCB').val() == 8)
        Taxonomy[24] = 'EWSL';
    if ($('#WallsCB').val() == 9)
        Taxonomy[24] = 'EWPL';
    if ($('#WallsCB').val() == 10)
        Taxonomy[24] = 'EWCB';
    if ($('#WallsCB').val() == 11)
        Taxonomy[24] = 'EWO';

    if ($('#RoofCB1').val() == 0 && !$('#OmitCB').prop('checked'))
        Taxonomy[25] = 'RSH99';
    if ($('#RoofCB1').val() == 1)
        Taxonomy[25] = 'RSH1';
    if ($('#RoofCB1').val() == 2)
        Taxonomy[25] = 'RSH2';
    if ($('#RoofCB1').val() == 3)
        Taxonomy[25] = 'RSH3';
    if ($('#RoofCB1').val() == 4)
        Taxonomy[25] = 'RSH4';
    if ($('#RoofCB1').val() == 5)
        Taxonomy[25] = 'RSH5';
    if ($('#RoofCB1').val() == 6)
        Taxonomy[25] = 'RSH6';
    if ($('#RoofCB1').val() == 7)
        Taxonomy[25] = 'RSH7';
    if ($('#RoofCB1').val() == 8)
        Taxonomy[25] = 'RSH8';
    if ($('#RoofCB1').val() == 9)
        Taxonomy[25] = 'RSH9';
    if ($('#RoofCB1').val() == 10)
        Taxonomy[25] = 'RSHO';

    if ($('#RoofCB2').val() == 0 && !$('#OmitCB').prop('checked'))
        Taxonomy[26] = '+RMT99';
    if ($('#RoofCB2').val() == 1)
        Taxonomy[26] = '+RMN';
    if ($('#RoofCB2').val() == 2)
        Taxonomy[26] = '+RMT1';
    if ($('#RoofCB2').val() == 3)
        Taxonomy[26] = '+RMT2';
    if ($('#RoofCB2').val() == 4)
        Taxonomy[26] = '+RMT3';
    if ($('#RoofCB2').val() == 5)
        Taxonomy[26] = '+RMT4';
    if ($('#RoofCB2').val() == 6)
        Taxonomy[26] = '+RMT5';
    if ($('#RoofCB2').val() == 7)
        Taxonomy[26] = '+RMT6';
    if ($('#RoofCB2').val() == 8)
        Taxonomy[26] = '+RMT7';
    if ($('#RoofCB2').val() == 9)
        Taxonomy[26] = '+RMT8';
    if ($('#RoofCB2').val() == 10)
        Taxonomy[26] = '+RM9T';
    if ($('#RoofCB2').val() == 11)
        Taxonomy[26] = '+RMT10';
    if ($('#RoofCB2').val() == 12)
        Taxonomy[26] = '+RMT11';
    if ($('#RoofCB2').val() == 13)
        Taxonomy[26] = '+RMTO';

    if ($('#RoofCB3').val() == 0) {
        if (!$('#OmitCB').prop('checked'))
            Taxonomy[27] = '+R99';
    }
    else {
        if ($('#RoofCB3').val() == 1) {
            Taxonomy[27] = '+RM';
            if ($('#RoofCB4').val() == 0 && !$('#OmitCB').prop('checked'))
                Taxonomy[28] = '+RM99';
            if ($('#RoofCB4').val() == 1)
                Taxonomy[28] = '+RM1';
            if ($('#RoofCB4').val() == 2)
                Taxonomy[28] = '+RM2';
            if ($('#RoofCB4').val() == 3)
                Taxonomy[28] = '+RM3';
        }
        else if ($('#RoofCB3').val() == 2) {
            Taxonomy[27] = '+RE';
            if ($('#RoofCB4').val() == 0 && !$('#OmitCB').prop('checked'))
                Taxonomy[28] = '+RE99';
            if ($('#RoofCB4').val() == 1)
                Taxonomy[28] = '+RE1';
        }
        else if ($('#RoofCB3').val() == 3) {
            Taxonomy[27] = '+RC';
            if ($('#RoofCB4').val() == 0 && !$('#OmitCB').prop('checked'))
                Taxonomy[28] = '+RC99';
            if ($('#RoofCB4').val() == 1)
                Taxonomy[28] = '+RC1';
            if ($('#RoofCB4').val() == 2)
                Taxonomy[28] = '+RC2';
            if ($('#RoofCB4').val() == 3)
                Taxonomy[28] = '+RC3';
            if ($('#RoofCB4').val() == 4)
                Taxonomy[28] = '+RC4';
        }
        else if ($('#RoofCB3').val() == 4) {
            Taxonomy[27] = '+RME';
            if ($('#RoofCB4').val() == 0 && !$('#OmitCB').prop('checked'))
                Taxonomy[28] = '+RME99';
            if ($('#RoofCB4').val() == 1)
                Taxonomy[28] = '+RME1';
            if ($('#RoofCB4').val() == 2)
                Taxonomy[28] = '+RME2';
            if ($('#RoofCB4').val() == 3)
                Taxonomy[28] = '+RME3';
        }
        else if ($('#RoofCB3').val() == 5) {
            Taxonomy[27] = '+RWO';
            if ($('#RoofCB4').val() == 0 && !$('#OmitCB').prop('checked'))
                Taxonomy[28] = '+RWO99';
            if ($('#RoofCB4').val() == 1)
                Taxonomy[28] = '+RWO1';
            if ($('#RoofCB4').val() == 2)
                Taxonomy[28] = '+RWO2';
            if ($('#RoofCB4').val() == 3)
                Taxonomy[28] = '+RWO3';
            if ($('#RoofCB4').val() == 4)
                Taxonomy[28] = '+RWO4';
            if ($('#RoofCB4').val() == 5)
                Taxonomy[28] = '+RWO5';
        }
        else if ($('#RoofCB3').val() == 6) {
            Taxonomy[27] = '+RFA';
            if ($('#RoofCB4').val() == 0)
                Taxonomy[28] = '+RFA1';
            if ($('#RoofCB4').val() == 1)
                Taxonomy[28] = '+RFAO';
        }
        else if ($('#RoofCB3').val() == 7) {
            Taxonomy[27] = '+RO';
        }
    }

    if ($('#RoofCB5').val() == 0 && !$('#OmitCB').prop('checked'))
        Taxonomy[29] = '+RWC99';
    if ($('#RoofCB5').val() == 1)
        Taxonomy[29] = '+RWCN';
    if ($('#RoofCB5').val() == 2)
        Taxonomy[29] = '+RWCP';
    if ($('#RoofCB5').val() == 3)
        Taxonomy[29] = '+RTD99';
    if ($('#RoofCB5').val() == 4)
        Taxonomy[29] = '+RTDN';
    if ($('#RoofCB5').val() == 5)
        Taxonomy[29] = '+RTDP';

    if ($('#FloorCB1').val() == 0) {
        if (!$('#OmitCB').prop('checked'))
            Taxonomy[30] = 'F99';
    }
    else if ($('#FloorCB1').val() == 1) {
        Taxonomy[30] = 'FN';
    }
    else {
        if ($('#FloorCB1').val() == 2) {
            Taxonomy[30] = 'FM';
            if ($('#FloorCB2').val() == 0 && !$('#OmitCB').prop('checked'))
                Taxonomy[31] = '+FM99';
            if ($('#FloorCB2').val() == 1)
                Taxonomy[31] = '+FM1';
            if ($('#FloorCB2').val() == 2)
                Taxonomy[31] = '+FM2';
            if ($('#FloorCB2').val() == 3)
                Taxonomy[31] = '+FM3';
        }
        else if ($('#FloorCB1').val() == 3) {
            Taxonomy[30] = 'FE';
            if ($('#FloorCB2').val() == 0 && !$('#OmitCB').prop('checked'))
                Taxonomy[31] = '+FE99';
        }
        else if ($('#FloorCB1').val() == 4) {
            Taxonomy[30] = 'FC';
            if ($('#FloorCB2').val() == 0 && !$('#OmitCB').prop('checked'))
                Taxonomy[31] = '+FC99';
            if ($('#FloorCB2').val() == 1)
                Taxonomy[31] = '+FC1';
            if ($('#FloorCB2').val() == 2)
                Taxonomy[31] = '+FC2';
            if ($('#FloorCB2').val() == 3)
                Taxonomy[31] = '+FC3';
            if ($('#FloorCB2').val() == 4)
                Taxonomy[31] = '+FC4';
        }
        else if ($('#FloorCB1').val() == 5) {
            Taxonomy[30] = 'FME';
            if ($('#FloorCB2').val() == 0 && !$('#OmitCB').prop('checked'))
                Taxonomy[31] = '+FME99';
            if ($('#FloorCB2').val() == 1)
                Taxonomy[31] = '+FME1';
            if ($('#FloorCB2').val() == 2)
                Taxonomy[31] = '+FME2';
            if ($('#FloorCB2').val() == 3)
                Taxonomy[31] = '+FME3';
        }
        else if ($('#FloorCB1').val() == 6) {
            Taxonomy[30] = 'FW';
            if ($('#FloorCB2').val() == 0 && !$('#OmitCB').prop('checked'))
                Taxonomy[31] = '+FW99';
            if ($('#FloorCB2').val() == 1)
                Taxonomy[31] = '+FW1';
            if ($('#FloorCB2').val() == 2)
                Taxonomy[31] = '+FW2';
            if ($('#FloorCB2').val() == 3)
                Taxonomy[31] = '+FW3';
            if ($('#FloorCB2').val() == 4)
                Taxonomy[31] = '+FW4';
        }
        else if ($('#FloorCB1').val() == 7) {
            Taxonomy[30] = 'FO';
        }
    }
    if ($('#FloorCB3').val() == 0 && !$('#OmitCB').prop('checked'))
        Taxonomy[32] = '+FWC99';
    if ($('#FloorCB3').val() == 1)
        Taxonomy[32] = '+FWCN';
    if ($('#FloorCB3').val() == 2)
        Taxonomy[32] = '+FWCP';

    if ($('#FoundationsCB').val() == 0 && !$('#OmitCB').prop('checked'))
        Taxonomy[33] = 'FOS99';
    if ($('#FoundationsCB').val() == 1)
        Taxonomy[33] = 'FOSSL';
    if ($('#FoundationsCB').val() == 2)
        Taxonomy[33] = 'FOSN';
    if ($('#FoundationsCB').val() == 3)
        Taxonomy[33] = 'FOSDL';
    if ($('#FoundationsCB').val() == 4)
        Taxonomy[33] = 'FOSDN';
    if ($('#FoundationsCB').val() == 5)
        Taxonomy[33] = 'FOSO';


    // TAIL
    direction1 = 'DX';
    direction2 = 'DY';

    if ($('#Direction1RB1').prop('checked')  && !$('#OmitCB').prop('checked')) {
        direction1 = direction1 + '+D99';
        direction2 = direction2 + '+D99';
        }
    else if ($('#Direction1RB2').prop('checked')) {
        direction1 = direction1 + '+PF';
        direction2 = direction2 + '+OF';
    }

    /* 
       0) direction X

          0 - Material type
          1 - Material technology
          2 - Material properties

          3 - Type of lateral system
          4 - System ductility

          direction Y

          5 - Material type
          6 - Material technology
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

    ResTax = direction1 + '/' + Taxonomy[0] + Taxonomy[1] + Taxonomy[2] + '/' + Taxonomy[3] + Taxonomy[4] +
        '/' + direction2 + '/' + Taxonomy[5] + Taxonomy[6] + Taxonomy[7] + '/' + Taxonomy[8] + Taxonomy[9] +
        '/' + Taxonomy[11] + Taxonomy[12] + Taxonomy[13] + Taxonomy[14] + '/' + Taxonomy[10] +
        '/' + Taxonomy[15] + Taxonomy[16] + '/' + Taxonomy[17] + '/' + Taxonomy[18] +
        '/' + Taxonomy[19] + Taxonomy[20] + Taxonomy[22] + Taxonomy[21] + Taxonomy[23] +
        '/' + Taxonomy[24] + '/' + Taxonomy[25] + Taxonomy[26] + Taxonomy[27] + Taxonomy[28] + Taxonomy[29] +
        '/' + Taxonomy[30] + Taxonomy[31] + Taxonomy[32] + '/' + Taxonomy[33];
    $('#resultE').val(ResTax);
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
    if HeightCB4.ItemIndex=1 then Taxonomy[14]:='+HD:'+noStoreysE4.Text;
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
  if RoofCB2.ItemIndex=10 then Taxonomy[26]:='+RM9T';
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



function taxt_Initiate() {

    $('#DirectionCB').prop('checked', true);

    // FIXME: t0 only, load a preview saved taxonomy must be done
    var MaterialCB11 = [], MaterialCB12 = [];



    /* MAT99 */ MaterialCB11.push('Unknown Material');
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
    $('#MaterialCB11').on('change', taxt_MaterialCB11Select);
    $('#MaterialCB21').on('change', taxt_MaterialCB21Select);
    $('#MaterialCB31').on('change', taxt_MaterialCB31Select);
    $('#MaterialCB41').on('change', taxt_MaterialCB41Select);
    $('#SystemCB11').on('change', taxt_SystemCB11Select);
    $('#SystemCB21').on('change', taxt_SystemCB21Select);

    MaterialCB12.push('Unknown Material');
    MaterialCB12.push('Concrete, unknown reinforcement');
    MaterialCB12.push('Concrete, unreinforced');
    MaterialCB12.push('Concrete, reinforced');
    MaterialCB12.push('Concrete, composite with steel section');
    MaterialCB12.push('Steel');
    MaterialCB12.push('Metal (except steel)');
    MaterialCB12.push('Masonry, unknown reinforcement');
    MaterialCB12.push('Masonry, unreinforced');
    MaterialCB12.push('Masonry, confined');
    MaterialCB12.push('Masonry, reinforced');
    MaterialCB12.push('Earth, unknown reinforcement');
    MaterialCB12.push('Earth, unreinforced');
    MaterialCB12.push('Earth, reinforced');
    MaterialCB12.push('Wood');
    MaterialCB12.push('Other material');
    select_populate('MaterialCB12', MaterialCB12);
    $('#MaterialCB12').on('change', taxt_MaterialCB12Select);
    $('#MaterialCB22').on('change', taxt_MaterialCB22Select);
    $('#MaterialCB32').on('change', taxt_MaterialCB32Select);
    $('#MaterialCB42').on('change', taxt_MaterialCB42Select);
    $('#SystemCB12').on('change', taxt_SystemCB12Select);
    $('#SystemCB22').on('change', taxt_SystemCB22Select);

    var HeightCB1 = [];
    /* H99  */ HeightCB1.push('Unknown number of storeys');
    /* HBET */ HeightCB1.push('Range of the number of storeys');
    /* HEX  */ HeightCB1.push('Exact number of storeys');
    /* HAPP */ HeightCB1.push('Approximate number of storeys');
    select_populate('HeightCB1', HeightCB1);
    $('#HeightCB1').val(0);
    $('#HeightCB1').on('change', taxt_HeightCB1Select);
    $('#noStoreysE11').on('change', taxt_HeightCB1Select);
    $('#noStoreysE12').on('change', taxt_HeightCB1Select);

    var HeightCB2 = [];
    /* HB99  */ HeightCB2.push('Unknown number of storeys');
    /* HBBET */ HeightCB2.push('Range of the number of storeys');
    /* HBEX  */ HeightCB2.push('Exact number of storeys');
    /* HBAPP */ HeightCB2.push('Approximate number of storeys');
    select_populate('HeightCB2', HeightCB2);
    $('#HeightCB2').val(0);
    $('#HeightCB2').on('change', taxt_HeightCB2Select);
    $('#noStoreysE21').on('change', taxt_HeightCB2Select);
    $('#noStoreysE22').on('change', taxt_HeightCB2Select);

    var HeightCB3 = [];
    /* HF99  */ HeightCB3.push('Height above grade unknown');
    /* HFBET */ HeightCB3.push('Range of height above grade');
    /* HFEX  */ HeightCB3.push('Exact height above grade');
    /* HFAPP */ HeightCB3.push('Approximate height above grade');
    select_populate('HeightCB3', HeightCB3);
    $('#HeightCB3').val(0);
    $('#HeightCB3').on('change', taxt_HeightCB3Select);
    $('#noStoreysE31').on('change', taxt_HeightCB3Select);
    $('#noStoreysE32').on('change', taxt_HeightCB3Select);

    var HeightCB4 = [];
    /* HD99  */ HeightCB4.push('Unknown slope');
    /* HD    */ HeightCB4.push('Slope of the ground');
    select_populate('HeightCB4', HeightCB4);
    $('#HeightCB4').val(0);
    $('#HeightCB4').on('change', taxt_HeightCB4Select);
    $('#noStoreysE4').on('change', taxt_HeightCB4Select);

    var DateCB1 = [];
    /* Y99  */ DateCB1.push('Year unknown');
    /* YEX  */ DateCB1.push('Exact date of construction or retrofit');
    /* YBET */ DateCB1.push('Bounds for the date of construction or retrofit');
    /* YPRE */ DateCB1.push('Latest possible date of construction or retrofit');
    /* YAPP */ DateCB1.push('Approximate date of construction or retrofit');
    select_populate('DateCB1', DateCB1);
    $('#DateCB1').val(0);
    $('#DateCB1').on('change', taxt_DateCB1Select);
    $('#DateE1').on('change', taxt_DateE1Change);
    $('#DateE2').on('change', taxt_DateE2Change);

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
    $('#OccupancyCB1').val(0);
    $('#OccupancyCB1').on('change', taxt_OccupancyCB1Select);
    $('#OccupancyCB2').on('change', taxt_OccupancyCB2Select);

    var PositionCB = [];

    PositionCB.push('Unknown building position');
    PositionCB.push('Detached building');
    PositionCB.push('Adjoining building(s) on one side');
    PositionCB.push('Adjoining building(s) on two sides');
    PositionCB.push('Adjoining building(s) on three sides');
    select_populate('PositionCB', PositionCB);
    $('#PositionCB').val(0);
    $('#PositionCB').on('change', taxt_PositionCBSelect);

    var PlanShapeCB = [];
    PlanShapeCB.push('Unknown plan shape');
    PlanShapeCB.push('Square, solid');
    PlanShapeCB.push('Square, with an opening in plan');
    PlanShapeCB.push('Rectangular, solid');
    PlanShapeCB.push('Rectangular, with an opening in plan');
    PlanShapeCB.push('L-shape');
    PlanShapeCB.push('Curved, solid (e.g. circular, eliptical, ovoid)');
    PlanShapeCB.push('Curved, with an opening in plan');
    PlanShapeCB.push('Triangular, solid');
    PlanShapeCB.push('Triangular, with an opening in plan');
    PlanShapeCB.push('E-shape');
    PlanShapeCB.push('H-shape');
    PlanShapeCB.push('S-shape');
    PlanShapeCB.push('T-shape');
    PlanShapeCB.push('U- or C-shape');
    PlanShapeCB.push('X-shape');
    PlanShapeCB.push('Y-shape');
    PlanShapeCB.push('Polygonal, solid');
    PlanShapeCB.push('Polygonal, with an opening in plan');
    PlanShapeCB.push('Irregular plan shape');
    select_populate('PlanShapeCB', PlanShapeCB);
    $('#PlanShapeCB').val(0);
    $('#PlanShapeCB').on('change', taxt_PlanShapeCBSelect);

    var RegularityCB1 = [];
    RegularityCB1.push('Unknown structural irregularity');
    RegularityCB1.push('Regular structure');
    RegularityCB1.push('Irregular structure');
    select_populate('RegularityCB1', RegularityCB1);
    $('#RegularityCB1').val(0);
    $('#RegularityCB1').on('change', taxt_RegularityCB1Select);
    $('#RegularityCB2').on('change', taxt_RegularityCB2Select);
    $('#RegularityCB3').on('change', taxt_RegularityCB3Select);
    $('#RegularityCB4').on('change', taxt_RegularityCB4Select);
    $('#RegularityCB5').on('change', taxt_RegularityCB5Select);

    var WallsCB = [];
    WallsCB.push('Unknown material of exterior walls');
    WallsCB.push('Concrete exterior walls');
    WallsCB.push('Glass exterior walls');
    WallsCB.push('Earthen exterior walls');
    WallsCB.push('Masonry exterior walls');
    WallsCB.push('Metal exterior walls');
    WallsCB.push('Vegetative exterior walls');
    WallsCB.push('Wooden exterior walls');
    WallsCB.push('Stucco finish on light framing for exterior walls');
    WallsCB.push('Plastic/vinyl exterior walls, various');
    WallsCB.push('Cement-based boards for exterior walls');
    WallsCB.push('Material of exterior walls, other');
    select_populate('WallsCB', WallsCB);
    $('#WallsCB').val(0);
    $('#WallsCB').on('change', taxt_WallsCBSelect);

    var RoofCB1 = [];
    RoofCB1.push('Unknown roof shape');
    RoofCB1.push('Flat');
    RoofCB1.push('Pitched with gable ends');
    RoofCB1.push('Pitched and hipped');
    RoofCB1.push('Pitched with dormers');
    RoofCB1.push('Monopitch');
    RoofCB1.push('Sawtooth');
    RoofCB1.push('Curved');
    RoofCB1.push('Complex regular');
    RoofCB1.push('Complex irregular');
    RoofCB1.push('Roof shape, other');
    select_populate('RoofCB1', RoofCB1);
    $('#RoofCB1').val(0);
    $('#RoofCB1').on('change', taxt_RoofCB1Select);

    var RoofCB2 = [];
    RoofCB2.push('Unknown roof covering');
    RoofCB2.push('Concrete roof, no covering');
    RoofCB2.push('Clay or concrete tile roof covering');
    RoofCB2.push('Fibre cement or metal tile covering');
    RoofCB2.push('Membrane roof covering');
    RoofCB2.push('Slate roof covering');
    RoofCB2.push('Stone slab roof covering');
    RoofCB2.push('Metal or asbestos sheet covering');
    RoofCB2.push('Wooden or asphalt shingle covering');
    RoofCB2.push('Vegetative roof covering');
    RoofCB2.push('Earthen roof covering');
    RoofCB2.push('Solar panelled roofs');
    RoofCB2.push('Tensile membrane or fabric roof');
    RoofCB2.push('Roof covering, other');
    select_populate('RoofCB2', RoofCB2);
    $('#RoofCB2').val(0);
    $('#RoofCB2').on('change', taxt_RoofCB2Select);

    var RoofCB3 = [];
    RoofCB3.push('Roof material, unknown');
    RoofCB3.push('Masonry roof');
    RoofCB3.push('Earthen roof');
    RoofCB3.push('Concrete roof');
    RoofCB3.push('Metal roof');
    RoofCB3.push('Wooden roof');
    RoofCB3.push('Fabric roof');
    RoofCB3.push('Roof material,other');
    select_populate('RoofCB3', RoofCB3);
    $('#RoofCB3').val(0);
    $('#RoofCB3').on('change', taxt_RoofCB3Select);
    $('#RoofCB4').on('change', taxt_RoofCB4Select);

    var RoofCB5 = [];
    RoofCB5.push('Roof-wall diaphragm connection unknown');
    RoofCB5.push('Roof-wall diaphragm connection not provided');
    RoofCB5.push('Roof-wall diaphragm connection present');
    RoofCB5.push('Roof tie-down unknown');
    RoofCB5.push('Roof tie-down not provided');
    RoofCB5.push('Roof tie-down present');
    select_populate('RoofCB5', RoofCB5);
    $('#RoofCB5').val(0);
    $('#RoofCB5').on('change', taxt_RoofCB5Select);

    var FoundationsCB = [];
    FoundationsCB.push('Unknown foundation system');
    FoundationsCB.push('Shallow foundation, with lateral capacity');
    FoundationsCB.push('Shallow foundation, with no lateral capacity');
    FoundationsCB.push('Deep foundation, with lateral capacity');
    FoundationsCB.push('Deep foundation, with no lateral capacity');
    FoundationsCB.push('Foundation, other');
    select_populate('FoundationsCB', FoundationsCB);
    $('#FoundationsCB').val(0);
    $('#FoundationsCB').on('change', taxt_FoundationsCBSelect);

    var FloorCB1 = [];
    FloorCB1.push('Floor material, unknown');
    FloorCB1.push('No elevated or suspended floor material (single-storey)');
    FloorCB1.push('Masonry floor');
    FloorCB1.push('Earthen floor');
    FloorCB1.push('Concrete floor');
    FloorCB1.push('Metal floor');
    FloorCB1.push('Wooden floor');
    FloorCB1.push('Floor material, other');
    select_populate('FloorCB1', FloorCB1);
    $('#FloorCB1').val(0);
    $('#FloorCB1').on('change', taxt_FloorCB1Select);
    $('#FloorCB2').on('change', taxt_FloorCB2Select);

    var FloorCB3 = [];
    FloorCB3.push('Floor-wall diaphragm connection, unknown');
    FloorCB3.push('Floor-wall diaphragm connection not provided');
    FloorCB3.push('Floor-wall diaphragm connection present');
    select_populate('FloorCB3', FloorCB3);
    $('#FloorCB3').val(0);
    $('#FloorCB3').on('change', taxt_FloorCB3Select);


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

function menu_set(id_or_obj) {
    var menu_items;
    var submenu_cur = 1;

    if (typeof(id_or_obj) == 'object') {
        id = id_or_obj.id;
    }
    else if (typeof(id_or_obj) == 'number') {
        taxt_Initiate();

        id = "menu_id-" + id_or_obj;
        if (arguments.length > 1) {
            submenu_cur = arguments[1];
        }
    }

    menu_items = $('[id|="menu_id"]');

    for (i = 0 ; i < menu_items.length ; i++) {
        if (menu_items[i].id == id) {
            $(menu_items[i]).removeClass("vuln_menu");
            $(menu_items[i]).addClass("vuln_menu_selected");
            $("#main_content-" + (i+1)).css('display', '');
        }
        else {
            $(menu_items[i]).removeClass("vuln_menu_selected");
            $(menu_items[i]).addClass("vuln_menu");
            $("#main_content-" + (i+1)).css('display', 'none');
        }
    }
    if (typeof(id_or_obj) == 'number' && id == "menu_id-1") {
        sub1menu_set(submenu_cur);
    }
}

function sub1menu_set(id_or_obj) {
    var menu_items;

    if (typeof(id_or_obj) == 'object') {
        id = id_or_obj.id;
    }
    else if (typeof(id_or_obj) == 'number') {
        id = "sub1menu_id-" + id_or_obj;
    }

    menu_items = $('[id|="sub1menu_id"]');


    for (i = 0 ; i < menu_items.length ; i++) {
        if (menu_items[i].id == id) {
            $(menu_items[i]).toggleClass("vuln_submenu_first");
            $(menu_items[i]).removeClass("vuln_submenu");
            $(menu_items[i]).addClass("vuln_submenu_selected");
            $(menu_items[i]).toggleClass("vuln_submenu_first");
            $("#sub1_content-" + (i+1)).css('display', '');
        }
        else {
            $(menu_items[i]).removeClass("vuln_submenu_selected");
            $(menu_items[i]).addClass("vuln_submenu");
            $("#sub1_content-" + (i+1)).css('display', 'none');
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

function populate(s) {
    var i;
    var sar, subar, dirx, diry, el;
    var mat;

    sar = s.split('/');
    $('#DirectionCB').prop('checked', false);

    //
    //  Direction
    //
    dirx = sar[0];
    diry = sar[3];
    if (dirx == "DX+D99" && diry == "DY+D99") {
        $("#Direction1RB1").prop("checked", true);
        taxt_Direction1RB1Click(null);
    }
    else if (dirx == "DX+PF" && diry == "DY+OF") {
        $("#Direction1RB2").prop("checked", true);
        taxt_Direction1RB2Click(null);
    }
    else {
        alert("Not valid 'Direction specifications' found.");
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
            alert("Not defined material for 'Direction " + (direct == 0 ? "X" : "Y") + "'");
            return (false);
        }
        if (llrs.length < 1) {
            alert("Not defined LLRS for 'Direction " + (direct == 0 ? "X" : "Y") + "'");
            return (false);
        }

        for (i = 0 ; i < material.length ; i++) {
            if (mat[0] == material[i].id) {
                mat_id = mat[0];
                $(mat_ddown[direct]).val(i);
                mat_selec[direct]();
                break;
            }
        }
        if (i ==  material.length) {
            alert("Not identified '" + mat[0] + "' material for 'Direction " + (direct == 0 ? "X" : "Y") + "'");
            return (false);
        }

        for (sub_i = 1 ; sub_i < mat.length ; sub_i++) {
            mat_atom = mat[sub_i];

            // Material technology
            for (i = 0 ; i < mat_tech[mat_id].length ;  i++) {
                if (mat_atom == mat_tech[mat_id][i].id) {
                    $(mat_tecn_ddown[direct]).val(i);
                    mat_tecn_selec[direct]();
                    break;
                }
            }
            if (i < mat_tech[mat_id].length)
                continue;

            // Material technology added
            for (i = 0 ; i < mat_tead[mat_id].length ;  i++) {
                if (mat_atom == mat_tead[mat_id][i].id) {
                    $(mat_tead_ddown[direct]).val(i);
                    mat_tead_selec[direct]();
                    break;
                }
            }
            if (i < mat_tead[mat_id].length)
                continue;

            // Material properties
            for (i = 0 ; i < mat_prop[mat_id].length ;  i++) {
                if (mat_atom == mat_prop[mat_id][i].id) {
                    $(mat_prop_ddown[direct]).val(i);
                    mat_prop_selec[direct]();
                    break;
                }
            }
            if (i < mat_prop[mat_id].length)
                continue;

            alert("Not identified '" + mat_atom + "' as specification of '" + mat_id + "' material for 'Direction " + (direct == 0 ? "X" : "Y") + "'.");
            return (false);
        }

        //
        //  Lateral load resisting system: type
        //
        for (i = 0 ; i < llrs_type[mat_id].length ;  i++) {
            llrs_id = llrs_type[mat_id][i].id;

            if (llrs[0] == llrs_id) {
                $(llrs_ddown[direct]).val(i);
                llrs_selec[direct]();
                break;
            }
        }
        if (i == llrs_type[mat_id].length) {
            alert("Not identified '" + llrs[0] + "' as LLRS of '" + mat_id + "' material for 'Direction " + (direct == 0 ? "X" : "Y") + "'.");
        }


        for (sub_i = 1 ; sub_i < llrs.length ; sub_i++) {
            llrs_atom = llrs[sub_i];

            // Ductility
            for (i = 0 ; i < llrs_duct[llrs_id].length ;  i++) {
                if (llrs_atom == llrs_duct[llrs_id][i].id) {
                    $(llrs_duct_ddown[direct]).val(i);
                    llrs_duct_selec[direct]();
                    break;
                }
            }
            if (i < llrs_duct[llrs_id].length)
                continue;

            alert("Not identified '" + llrs_atom + "' as specification of '" + llrs[0] + "' LLRS of '" + mat_id + "' material for 'Direction " + (direct == 0 ? "X" : "Y") + "'.");
            return (false);
        }
    }
    var dir_items = [ '#MaterialCB1', '#MaterialCB2', '#MaterialCB3', '#MaterialCB4',
                      '#SystemCB1', '#SystemCB2' ];
    for (i = 0 ; i < dir_items.length ; i++) {
        if ($(dir_items[i]+'1').val() != $(dir_items[i]+'2').val()) {
            break;
        }
    }
    if (i == dir_items.length) {
        $('#DirectionCB').prop('checked', true);
    }


    //
    //  Height
    //
    var h, h_items, h_label, h_id, h_vals;

    h = sar[6].split('+');
    h_items = h[0].split(':');
    h_label = h_items[0];

    if (h.length != 4) {
        alert("Height not defined properly.");
        return (false);
    }

    for (i = 0 ; i < h_aboveground.length ; i++) {
        if (h_label == h_aboveground[i].id) {
            h_id = h_label;
            $('#HeightCB1').val(i);
            taxt_HeightCB1Select(null);
            break;
        }
    }
    if (i == h_aboveground.length) {
        alert("Not identified '" + h_label + "' as specification of height.");
        return (false);
    }
    /* if some height is defined we must retrieve value/intervals and get the other
       3 height attributes */
    if (h_id != "H99") {
        if (h_items.length < 2) {
            alert("Height: no values defined.");
            return (false);
        }

        h_vals = h_items[1].split(',');
        if (h_id == 'HBET') {
            if (h_vals.length != 2) {
                alert("Height: '" + h_id + "' type requires exactly 2 values, " + h_vals.length + " are given.");
                return (false);
            }
            $('#noStoreysE11').val(h_vals[0]);
            $('#noStoreysE12').val(h_vals[1]);
            taxt_HeightCB1Select(null);
        }
        else if (h_id == 'HEX' || h_id == 'HAPP') {
            if (h_vals.length != 1) {
                alert("Height: '" + h_id + "' type requires exactly 1 value, " + h_vals.length + " are given.");
                return (false);
            }
            $('#noStoreysE11').val(h_vals[0]);
            taxt_HeightCB1Select(null);
        }
    }

    for (sub_i = 1 ; sub_i < h.length ; sub_i++) {
        h_items = h[sub_i].split(':');
        h_label = h_items[0];

        // Number of storey below ground
        if (h_label.substring(0,2) == "HB") {
            if (sub_i != 1) {
                alert("Height specification HBxx not in position 1.");
            }
            for (e = 0 ; e < h_belowground.length ; e++) {
                if (h_label == h_belowground[e].id) {
                    h_id = h_label;
                    $('#HeightCB2').val(e);
                    taxt_HeightCB2Select(null);
                    break;
                }
            }
            if (e == h_belowground.length) {
                alert("Not identified '" + h_label + "' as specification of number of storey below ground.");
                return (false);
            }

            h_vals = h_items[1].split(',');
            if (h_id == 'HB99') {
                if (h_vals.length != 0) {
                    alert("Height: '" + h_id + "' type requires no values, " + h_vals.length + " are given.");
                    return (false);
                }
            }
            else if (h_id == 'HBBET') {
                if (h_vals.length != 2) {
                    alert("Height: '" + h_id + "' type requires exactly 2 values, " + h_vals.length + " are given.");
                    return (false);
                }
                $('#noStoreysE21').val(h_vals[0]);
                $('#noStoreysE22').val(h_vals[1]);
                taxt_HeightCB1Select(null);
            }
            else if (h_id == 'HBEX' || h_id == 'HBAPP') {
                if (h_vals.length != 1) {
                    alert("Height: '" + h_id + "' type requires exactly 1 value, " + h_vals.length + " are given.");
                    return (false);
                }
                $('#noStoreysE21').val(h_vals[0]);
                taxt_HeightCB1Select(null);
            }
        }
        // Above grade
        else if (h_label.substring(0,2) == "HF") {
            if (sub_i != 2) {
                alert("Height specification HFxx not in position 2.");
            }
            for (e = 0 ; e < h_abovegrade.length ; e++) {
                if (h_label == h_abovegrade[e].id) {
                    h_id = h_label;
                    $('#HeightCB3').val(e);
                    taxt_HeightCB2Select(null);
                    break;
                }
            }
            if (e == h_abovegrade.length) {
                alert("Height: not identified '" + h_label + "' as specification of height of ground floor level above grade.");
                return (false);
            }

            h_vals = h_items[1].split(',');
            if (h_id == 'HF99') {
                if (h_vals.length != 0) {
                    alert("Height: '" + h_id + "' type requires no values, " + h_vals.length + " are given.");
                    return (false);
                }
            }
            else if (h_id == 'HFBET') {
                if (h_vals.length != 2) {
                    alert("Height: '" + h_id + "' type requires exactly 2 values, " + h_vals.length + " are given.");
                    return (false);
                }
                $('#noStoreysE31').val(h_vals[0]);
                $('#noStoreysE32').val(h_vals[1]);
                taxt_HeightCB3Select(null);
            }
            else if (h_id == 'HFEX' || h_id == 'HFAPP') {
                if (h_vals.length != 1) {
                    alert("Height: '" + h_id + "' type requires exactly 1 value, " + h_vals.length + " are given.");
                    return (false);
                }
                $('#noStoreysE31').val(h_vals[0]);
                taxt_HeightCB3Select(null);
            }
        }
        // Slope
        else if (h_label.substring(0,2) == "HD") {
            if (sub_i != 3) {
                alert("Height specification HDxx not in position 3.");
            }
            for (e = 0 ; e < h_slope.length ; e++) {
                if (h_label == h_slope[e].id) {
                    h_id = h_label;
                    $('#HeightCB4').val(e);
                    taxt_HeightCB4Select(null);
                    break;
                }
            }
            if (e == h_slope.length) {
                alert("Height: not identified '" + h_label + "' as specification of slope of the ground.");
                return (false);
            }

            h_vals = h_items[1].split(',');
            if (h_id == 'HD99') {
                if (h_vals.length != 0) {
                    alert("Height: '" + h_id + "' type requires no values, " + h_vals.length + " are given.");
                    return (false);
                }
            }
            if (h_id == 'HD') {
                if (h_vals.length != 1) {
                    alert("Height: '" + h_id + "' type requires exactly 1 value, " + h_vals.length + " are given.");
                    return (false);
                }
                $('#noStoreysE4').val(h_vals[0]);
                taxt_HeightCB4Select(null);
            }
        }
        else {
            alert("Height: not identified '" + h_label + "' as specification of height.");
            return (false);
        }
    }

    //
    //  Date
    //
    var date, date_items, date_label, date_id, date_vals;

    date = sar[7].split('+');
    date_items = date[0].split(':');
    date_label = date_items[0];

    if (date.length != 1) {
        alert("Date not defined properly.");
        return (false);
    }

    for (i = 0 ; i < date_type.length ; i++) {
        if (date_label == date_type[i].id) {
            date_id = date_label;
            $('#DateCB1').val(i);
            taxt_DateCB1Select(null);
            break;
        }
    }
    if (i == date_type.length) {
        alert("Not identified '" + date_label + "' as specification of date.");
        return (false);
    }
    if (date_id != "Y99") {
        if (date_items.length < 2) {
            alert("Date: no values defined.");
            return (false);
        }

        date_vals = date_items[1].split(',');
        if (date_id == 'YBET') {
            if (date_vals.length != 2) {
                alert("Date: '" + date_id + "' type requires exactly 2 values, " + date_vals.length + " are given.");
                return (false);
            }
            $('#DateE1').val(date_vals[0]);
            $('#DateE2').val(date_vals[1]);
            taxt_HeightCB1Select(null);
        }
        else if (date_id == 'YEX' || date_id == 'YPRE' || date_id == 'YAPP') {
            if (date_vals.length != 1) {
                alert("Date: '" + date_id + "' type requires exactly 1 value, " + date_vals.length + " are given.");
                return (false);
            }
            $('#DateE1').val(date_vals[0]);
            taxt_HeightCB1Select(null);
        }
    }

    //
    //  Occupancy
    //
    var occu, occu_items, occu_label, occu_id, occu_vals, occu_atom;
    occu = sar[8].split('+');
    occu_label = occu[0];

    if (occu.length != 2) {
        alert("Occupancy not defined properly.");
        return (false);
    }

    for (i = 0 ; i < occu_type.length ; i++) {
        if (occu_label == occu_type[i].id) {
            occu_id = occu_label;
            $('#OccupancyCB1').val(i);
            taxt_OccupancyCB1Select(null);
            break;
        }
    }
    if (i == occu_type.length) {
        alert("Not identified '" + occu_label + "' as specification of occupancy.");
        return (false);
    }

    // Occupancy specification
    occu_atom = occu[1];
    for (i = 0 ; i < occu_spec[occu_id].length ;  i++) {
        if (occu_atom == occu_spec[occu_id][i].id) {
            $('#OccupancyCB2').val(i);
            taxt_OccupancyCB2Select(null);
            break;
        }
    }
    if (i == occu_spec[occu_id].length) {
        alert("Not identified '" + occu_atom + "' as specification of '" + occu_id + "' occupancy.");
        return (false);
    }


}

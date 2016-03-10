$(document).ready(function () {
    $('.vf_gid #functionId').val('111vv1');
    $('.vf_gid #assetCategory').val('buildings');
    $('.vf_gid #functionDescription').val('the description');

    // create first prob mass func
    $('.vf_gid #addProbMassFunc').trigger('click');
    { // blocks are used to reflect DOM hierarchy
        var table = $('.vf_gid [name="tableDiv1"]').handsontable('getInstance');
        $('.vf_gid .table1_id [name="id"]').val('111');
        $('.vf_gid .table1_id [name="imt"]').val('PGA');
        $('.vf_gid .table1_id [name="imls"]').val('0.2 0.3 0.4 0.5 0.7 0.8');
        $('.vf_gid .table1_id [name="imls"]').trigger('change');
        
        var cells = $('.vf_gid .table1_id table.htCore td');
        var data = [ [ 0.4 ] ];
        for (var i = 1 ; i < cells.length ; i++) {
            data[0][i] = parseFloat(i) / 10.0;
        }
        table.loadData(data);
    }

    // create second prob mass func
    $('.vf_gid #addProbMassFunc').trigger('click');
    {
        var table = $('.vf_gid [name="tableDiv2"]').handsontable('getInstance');
        $('.vf_gid .table2_id [name="id"]').val('222');
        $('.vf_gid .table2_id [name="imt"]').val('PGA');
        $('.vf_gid .table2_id [name="imls"]').val('1.2 1.3 1.4 1.5 1.7 1.8');
        $('.vf_gid .table2_id [name="imls"]').trigger('change');
        
        var cells = $('.vf_gid .table2_id table.htCore td');
        var data = [ [ 0.4 ] ];
        for (var i = 1 ; i < cells.length ; i++) {
            data[0][i] = 3.0 + parseFloat(i) / 10.0;
        }
        table.loadData(data);
    }

    // create second prob mass func
    $('.vf_gid #addDiscreteFunc').trigger('click');
    {
        var table = $('.vf_gid [name="tableDiv3"]').handsontable('getInstance');
        $('.vf_gid .table3_id [name="id"]').val('333');
        $('.vf_gid .table3_id [name="imt"]').val('PGA');
        $('.vf_gid .table3_id [name="imls"]').val('2.2 2.3 2.4 2.5');
        $('.vf_gid .table3_id [name="imls"]').trigger('change');

        var data = [ [ 0.1, 0.2 ], [ 0.3, 0.4 ], [ 0.5, 0.6 ], [ 0.7, 0.8 ] ];
        table.loadData(data);
    }

    $('.vf_gid #convertBtn').trigger('click');
});

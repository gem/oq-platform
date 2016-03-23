$(document).ready(function () {
    var data = [
        [ "-9.9958", "35.004", "590", "inferred", "19.36719673", "0.588625072" ],
        [ "-9.9623", "35.004", "590", "inferred", "19.36719673", "0.588625072" ],
        [ "-9.9288", "35.004", "590", "inferred", "19.36719673", "0.588625072" ],
        [ "-9.8953", "35.004", "590", "inferred", "19.36719673", "0.588625072" ],
        [ "-9.8618", "35.004", "590", "inferred", "19.36719673", "0.588625072" ]
    ];

    var table = $('.sc_gid #table').handsontable('getInstance');
    table.loadData(data);

    $('.sc_gid #convertBtn').trigger('click');
});

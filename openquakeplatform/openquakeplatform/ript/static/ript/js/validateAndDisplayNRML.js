function sfx2name(sfx)
{
    var map = { 'ex': 'exposure', 'ff': 'fragility', 'vf': 'vulnerability', 'sc': 'sites_conditions' };

    return map[sfx];
}


function row_split(row_in)
{
    var el = null, data_in = row_in.trim();
    var divisor = ["	", ",", ";"];
    for (var d in divisor) {
        if (data_in.indexOf(divisor[d]) > -1) {
            el = data_in.split(divisor[d]);
            for (var i = 0 ; i < el.length ; i++) {
                el[i] = el[i].trim();
            }
            break;
        }
    }
    if (el == null) {
        el = data_in.split(' ');
    }
    return el;
}

function sendbackNRML(nrml, sfx)
{
    var funcType = sfx2name(sfx);
    var $form = $('.' + sfx + '_gid #downloadForm');
    $form.empty();
    $form.attr({'action': SENDBACK_URL});
    $new_input = $('<input/>');
    $new_input.attr('type', 'hidden').attr({'name': 'xml_text', 'value': nrml });
    $form.append($new_input);
    $new_input = $('<input/>');
    $new_input.attr('type', 'hidden').attr({'name': 'func_type', 'value': funcType });
    $form.append($new_input);
    $form.submit();
}


function validationErrorShow(funcType, error_msg){
    $('.' + funcType + '_gid #validationErrorMsg').text(
        'Validation error: ' + error_msg.replace(/\/tmp\/[a-zA-Z0-9-]*\.xml/, 'this NRML file') + '.');
    $('.' + funcType + '_gid #validationErrorMsg').show();
}

function validationErrorHide(funcType){
    $('.' + funcType + '_gid #validationErrorMsg').hide();
}

function infoMessageShow(funcType, textBox){
    $('.' + funcType + '_gid #infoMsg').show();
    selectAllTextareaText(textBox);
}


function infoMessageHide(funcType){
    $('.' + funcType + '_gid #infoMsg').hide();
}


function output_manager(funcType, error_msg, error_line, nrml)
{
    var textarea = null;

    // Provide the user with the xml output
    $('.' + funcType + '_gid #outputText').empty();
    if (nrml) {
        var $textarea = $('<textarea/>').attr({id: 'textarea' + funcType,
                                               style: 'width: 600px; height: 700px;'}).val(nrml);
        $('.' + funcType + '_gid #outputText').append($textarea);
        textarea = $textarea.get(0);
    }

    if (error_msg) {
        validationErrorShow(funcType, error_msg);
        if (nrml && error_line) {
            selectTextareaLine(textarea, error_line);
        }
        $('.' + funcType + '_gid #infoMsg').hide();
        $('.' + funcType + '_gid #downloadLink').hide();
        $('.' + funcType + '_gid #outputDiv').show();
        return false;
    }
    else {
        if (textarea)
            infoMessageShow(funcType, textarea);
        validationErrorHide(funcType);
        $('.' + funcType + '_gid #downloadLink').show();
        $('.' + funcType + '_gid #outputDiv').show();
        return true;
    }

}

function validateAndDisplayNRML(nrml, funcType, retobj){
    // funcType can be 'ex', 'ff' or 'vf'

    // Call the engine server api to check if the NRML is valid
    $.post(VALIDATION_URL, {xml_text: nrml})
        .done(function(resp){
            output_manager(funcType, resp.error_msg, resp.error_line, nrml);
            if (!resp.error_msg) {
                retobj.nrml = nrml;
            }
        })
        .fail(function(resp){
            var error_msg = "The call to the validation API failed, returning following error message: " +
                resp.statusText;
            output_manager(funcType, error_msg, null, null);
        });
}


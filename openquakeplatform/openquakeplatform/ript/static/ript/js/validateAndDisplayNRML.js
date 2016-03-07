function sfx2name(sfx)
{
    var map = { 'ex': 'exposure', 'ff': 'fragility', 'vf': 'vulnerability' };

    return map[sfx];
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

function validateAndDisplayNRML(nrml, funcType, retobj){
    // funcType can be 'ex', 'ff' or 'vf'

    console.log("inside validate and display");
    function displayValidationError(textBox, error_msg){
        $('.' + funcType + '_gid #validationErrorMsg').text(
            'Validation error: ' + error_msg.replace(/\/tmp\/[a-zA-Z0-9-]*\.xml/, 'this NRML file') + '.');
        $('.' + funcType + '_gid #validationErrorMsg').css('display', 'block');
    }

    function hideValidationError(){
        $('.' + funcType + '_gid #validationErrorMsg').css('display', 'none');
    }

    function displayInfoMessage(textBox){
        $('.' + funcType + '_gid #infoMsg').css('display', 'block');
        selectAllTextareaText(textBox);
    }

    function hideInfoMessage(){
        $('.' + funcType + '_gid #infoMsg').css('display', 'none');
    }

    // Provide the user with the xml output
    $('.' + funcType + '_gid #outputText').empty();
    var $textarea = $('<textarea/>').attr({id: 'textarea' + funcType,
                                      style: 'width: 600px; height: 700px;'}).val(nrml);
    $('.' + funcType + '_gid #outputText').append($textarea);
    var textarea = $textarea.get(0);
    $('.' + funcType + '_gid #outputDiv').css('display', 'block');
                  // var textBox = document.getElementById("textarea");
    // Call the engine server api to check if the NRML is valid
    console.log('NRML: ' + nrml);
    $.post(VALIDATION_URL, {xml_text: nrml})
        .done(function(resp){
            if (resp.error_msg) {
                displayValidationError(textarea, resp.error_msg);
                if (resp.error_line) {
                    selectTextareaLine(textarea, resp.error_line);
                }
                hideInfoMessage();
                $('.' + funcType + '_gid #downloadLink').hide();
            } else {
                displayInfoMessage(textarea);
                hideValidationError()
                retobj.nrml = nrml;
                $('.' + funcType + '_gid #downloadLink').show();
            }
        })
        .fail(function(resp){
            var error_msg = "The call to the validation API failed, returning following error message: " + resp.statusText;
            displayValidationError(textarea, error_msg);
            displayInfoMessage(textarea);
            $('.' + funcType + '_gid #downloadLink').hide();
        });

}

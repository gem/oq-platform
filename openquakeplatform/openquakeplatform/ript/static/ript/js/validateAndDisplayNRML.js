function sfx2name(sfx)
{
    var map = { 'EX': 'exposure', 'FF': 'fragility', 'VF': 'vulnerability' };

    return map[sfx];
}

function sendbackNRML(NRML, sfx)
{
    var funcType = sfx2name(sfx);
    var $form = $('#downloadForm' + sfx);
    $form.empty();
    $form.attr({'action': SENDBACK_URL});
    $new_input = $('<input/>');
    $new_input.attr('type', 'hidden').attr({'name': 'xml_text', 'value': NRML });
    $form.append($new_input);
    $new_input = $('<input/>');
    $new_input.attr('type', 'hidden').attr({'name': 'func_type', 'value': funcType });
    $form.append($new_input);
    $form.submit();
}

function validateAndDisplayNRML(NRML, funcType){
    // funcType can be 'EX', 'FF' or 'VF'

    function displayValidationError(textBox, error_msg){
        $('#validationErrorMsg' + funcType).text(
            'Validation error: ' + error_msg.replace(/\/tmp\/[a-zA-Z0-9-]*\.xml/, 'this NRML file') + '.');
        $('#validationErrorMsg' + funcType).css('display', 'block');
    }

    function hideValidationError(){
        $('#validationErrorMsg' + funcType).css('display', 'none');
    }

    function displayInfoMessage(textBox){
        $('#infoMsg' + funcType).css('display', 'block');
        selectAllTextareaText(textBox);
    }

    function hideInfoMessage(){
        $('#infoMsg' + funcType).css('display', 'none');
    }

    // Provide the user with the xml output
    $('#outputText' + funcType).empty();
    var $textarea = $('<textarea/>').attr({id: 'textarea' + funcType,
                                      style: 'width: 600px; height: 700px;'}).val(NRML);
    $('#outputText' + funcType).append($textarea);
    var textarea = $textarea.get(0);
    $('#outputDiv' + funcType).css('display', 'block');
                  // var textBox = document.getElementById("textarea");
    // Call the engine server api to check if the NRML is valid                                                                                                                                          
    $.post(VALIDATION_URL, {xml_text: NRML})
        .done(function(resp){
            if (resp.error_msg) {
                displayValidationError(textarea, resp.error_msg);
                if (resp.error_line) {
                    selectTextareaLine(textarea, resp.error_line);
                }
                hideInfoMessage();
                $('#downloadLink' + funcType).hide();
            } else {
                displayInfoMessage(textarea);
                hideValidationError()
                $('#downloadLink' + funcType).show();
            }
        })
        .fail(function(resp){
            var error_msg = "The call to the validation API failed, returning following error message: " + resp.statusText;
            displayValidationError(textarea, error_msg);
            displayInfoMessage(textarea);
            $('#downloadLink' + funcType).hide();
        });

}

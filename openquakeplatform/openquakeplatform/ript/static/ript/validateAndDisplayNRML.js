function validateAndDisplayNRML(NRML, funcType){
    // funcType can be 'EX', 'FF' or 'VF'

    function displayValidationError(textBox, error_msg){
        $('#validationErrorMsg' + funcType).text(
            'Validation error: ' + error_msg);
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
    $('#outputText' + funcType).append('<textarea id="textarea" style="width: 600px;  height: 700px;>' + NRML + '</textarea>');
    $('#outputDiv' + funcType).css('display', 'block');
    var textBox = document.getElementById("textarea");

    // Call the engine server api to check if the NRML is valid                                                                                                                                          
    $.post(VALIDATION_URL, {xml_text: NRML})
        .done(function(resp){
            if (resp.error_msg) {
                displayValidationError(textBox, resp.error_msg);
                if (resp.error_line) {
                    selectTextareaLine(textBox, resp.error_line);
                }
                hideInfoMessage();
            } else {
                displayInfoMessage(textBox);
                hideValidationError()
            }
        })
        .fail(function(resp){
            var error_msg = "The call to the validation API failed, returning following error message: " + resp.statusText;
            displayValidationError(textBox, error_msg);
            displayInfoMessage(textBox);
        });

}

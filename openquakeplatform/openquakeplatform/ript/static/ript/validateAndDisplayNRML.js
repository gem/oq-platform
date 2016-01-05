function validateAndDisplayNRML(NRML, funcType){
    // funcType can be 'EX', 'FF' or 'VF'

    function displayValidationError(textBox, resp){
        $('#infoMsg' + funcType).css('display', 'none');
        $('#validationErrorMsg' + funcType).text(resp.error_msg);
        $('#validationErrorMsg' + funcType).css('display', 'block');
        selectTextareaLine(textBox, resp.error_line);
    }

    function displayInfoMessage(textBox){
        $('#validationErrorMsg' + funcType).css('display', 'none');
        $('#infoMsg' + funcType).css('display', 'block');
        selectAllTextareaText(textBox);
    }

    // Provide the user with the xml output
    $('#outputText' + funcType).empty();
    $('#outputText' + funcType).append('<textarea id="textarea" style="width: 600px;  height: 700px;>' + NRML + '</textarea>');
    $('#outputDiv' + funcType).css('display', 'block');
    var textBox = document.getElementById("textarea");

    // Call the engine server api to check if the NRML is valid                                                                                                                                          
    $.post(VALIDATION_URL, {xml_text: NRML})
        .done(function(resp){
            if (resp.error_line) {
                displayValidationError(textBox, resp);
            } else {
                displayInfoMessage(textBox);
            }
        })
        .fail(function(resp){
            alert("The call to the validation API failed, due to the following reason: " + resp.statusText);
            displayInfoMessage(textBox);
        });

}

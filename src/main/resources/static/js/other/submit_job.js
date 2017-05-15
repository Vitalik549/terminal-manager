function createJob(){
    function submitForm(){
        if(validateForm()){
            var obj = getSubmitFormJson();
            //postJson("jobs/", obj)


            drawRow(getSubmitFormObject());


        }else{
            highlightError();
        }


    }

    function getSubmitFormJson() {
        return JSON.stringify(getSubmitFormObject());
    }

    function getSubmitFormObject() {
        var obj = {name: '', command: '', description: '', startingDirectory: ''}

        $('input[type="text"]').each(function( ) {
            obj[$(this).attr('name')] = $(this).val();
        });
        return obj;
    }

    function validateForm(){
        // var valid = tru
        return true;
//
        //  if (inpObj.checkValidity() == false) {
        //          document.getElementById("demo").innerHTML = inpObj.validationMessage;
        //      }
    }

    function highlightError(){

    }
}
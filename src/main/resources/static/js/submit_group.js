function createGroup() {

    submitForm();

    function submitForm() {
        if (validateForm()) {

           $.ajax({
                    type: "POST",
                    url: "/groups",
                    data:  getSubmitFormJson(),
                    dataType: "json",
                    contentType : "application/json"
                }).done(function(group, status) {
                    drawGroup(group);
                });
        } else {
            highlightError();
        }
    }

    function getSubmitFormJson() {
        return JSON.stringify(getSubmitFormObject());
    }

    function getSubmitFormObject() {
        var obj = {name: '', command: '', description: '', startingDirectory: ''}

        $('#create-group-form>input[type="text"]').each(function () {
            obj[$(this).attr('name')] = $(this).val();
        });
        return obj;
    }

    function validateForm() {
        return true;
    }

    function highlightError() {
        alert("failed to create group")
    }
}
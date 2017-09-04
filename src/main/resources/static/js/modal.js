var LogStrategy = {
    "values" : {
            "select" : "Select log strategy..." ,
            "override" : "Override",
            "append" : "Append",
            "iterate" : "Iterate" }
}

$('#modal')
    .on('show.bs.modal', function (event) {
         var groupName = event.relatedTarget.getAttribute('group') // Button that triggered the modal
         var group = findGroupByName(groupName).group;

         $(this).data('group', group);

         var icon = $("<span class='glyphicon glyphicon-cog'/>").click(drawGroupForm);

         $(this).find('.modal-title').text(groupName).append(icon);

         drawModalGroupJobs(group);
    })
    .on('hidden.bs.modal', function (event) {
        $(this).find('.modal-title').text("");
        $(this).find('#modal-list').html("");
        $(this).find('#editor').html("");
        $(this).removeData();
    });

function drawModalGroupJobs(group){
     var list = $("<div class='scrollable list-group'/>")
              .sortable({
                  change: function (e, ui) { console.log('change');},
                  stop: function (e, ui) {console.log('stop');},
                  cursor: "move"
              });

     $('#modal').find('#modal-list').append(list);

     if(group.jobs) group.jobs.forEach(function(job){
        drawJobInLeftList(list, job)
     });

     list.append($('<button type="button" class="list-group-item btn btn-sm btn-block"><span class="glyphicon glyphicon-plus-sign"></span></button>'
                     ).click(function(){
                        var job = new Job();
                        drawJobInLeftList(list, job)
                        drawJobForm(job);
                     }));

     drawGroupForm();
}

function drawJobInLeftList(list, job){
    $("<div class='movable list-group-item'/>")
        .appendTo(list)
        .click(function(){drawJobForm(job);})
        .append("<div class='inline glyphicon glyphicon-align-justify'/>")
        .append($("<div  class='inline text-nowrap'/>").text(job.name));
}

function drawGroupForm(){
    var group = $('#modal').data("group");
    var form = $('<form class="form-horizontal" />');

    $('#editor')
             .html("")
             .append($("<div class='container-fluid'/>").append(form))
             .data('isGroup', true)
             .data('data', group);

    form
        .append(editorInput('Group name', group.name, 'name', group))
        .append(editorTextArea('Description', group.description,'description', group))
        .append(editorInput('Starting directory', group.startingDirectory,'startingDirectory', group));
}

function drawJobForm(job){
    var form = $('<form class="form-horizontal" />');

    $('#editor')
        .html("")
        .data('isGroup', false)
        .data('data', job)
        .append($("<div class='container-fluid'/>").append(form));
    form
        .append(editorInput('Job name', job.name, 'name', job))
        .append(editorTextArea('Description', job.description,'description', job))
        .append(editorInput('Command', job.command,'command', job))
        .append(editorInput('Starting directory', job.startingDirectory,'startingDirectory', job))
        .append(editorInput('Base log file', job.baseLogFile,'baseLogFile', job))
        .append(editorSelect('Log strategy', job.logStrategy,'logStrategy', job))

}

function saveObj(entity){
    var obj = entity.isGroup? $('#modal').data("group") : $modalJob(entity.name);
    obj[fieldName] = element.val();
}

function editorSelect(label, value, id, job){
    var select = $('<select class="form-control" />')

    $.each(LogStrategy.values, function(key, value) {
         select.append($("<option></option>")
                        .attr("value", key)
                        .text(value));
    });

    var v = LogStrategy.values[value] ? value : "select"; //if unknown - change to default

    select.val(v.toLowerCase());

    return inputWrapper(label, value, select, id, job)
}

function editorInput(label, value, id, job){
    var input = $('<input class="form-control" type="text" >').val(value);

    return inputWrapper(label, value, input, id, job)
}

function editorTextArea(label, value, id, job){
    var input = $('<textarea class="form-control" type="text" >')
                    .val(value)
                    .css("resize", "vertical");

    return inputWrapper(label, value, input, id, job)
}

function inputWrapper(label, value, element, fieldName, entity){
    var wrap = $("<div class='form-group'/>")
        .append('<label class="col-sm-3 control-label">'+label+'</label>')
        .append($('<div class="col-sm-9" />').append(element));

    var attr = isEditingGroup()? 'group-input' :'job-input';

    element
        .attr(attr, fieldName)
        .change(function() {
           showSave('Save Job');
        });

    return wrap;
}

function getGroupEditorData(){
    var group = {
        name : $('[group-input="name"').val(),
        description : $('[group-input="description"').val(),
        startingDirectory : $('[group-input="startingDirectory"').val()
    };
     return group;
}

function getJobEditorData(){
    var job = {
        name : $('[job-input="name"').val(),
        description : $('[job-input="description"').val(),
        command : $('[job-input="command"').val(),
        startingDirectory : $('[job-input="startingDirectory"').val(),
        baseLogFile : $('[job-input="baseLogFile"').val(),
        logStrategy : $('[job-input="logStrategy"').val()
    };
     return job;
}

function showSave(text){
    $('#modal').find('.save-btn').show().text(text);

}

function hideSave(){
    $('#modal').find('.save-btn').hide();
}

function $modalJob(jobName){
    var result =  $('#modal').data("group").jobs.filter(
     function(job){
        return job.name === jobName;
     }
    )
    return result[0];
}

function isEditingGroup(){
    return $('#editor').data('isGroup');
}

function isSaved(){
    return !$('#modal').find('.save-btn').is(":visible");
}

function validateEditor(){
    return true;
}

function showError(text){
    $('#modal').find('.modal-header').find('.bg-danger').text(text).show();
}

function hideError(){
    $('#modal').find('.modal-header').find('.bg-danger').text("").html("").hide();
}

function showDataNotSaved(){
    $('#modal')
        .find('.modal-header')
        .find('.bg-danger')
        .html("")
        .append("Please save data or <a onclick='resetData()' > reset changes</a>")
        .show();
}

function resetData(){
    var data = $('#editor').data('data');
    isEditingGroup()? drawGroupForm(data) : drawJobForm(data);
    hideSave();
    hideError();
}
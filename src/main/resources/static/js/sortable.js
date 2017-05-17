var TABLE = "#sortable";

drawTable(readData().groups);


$(function () {
    $(TABLE).sortable({
        change: function (e, ui) {
            console.log('change');
        },
        stop: function (e, ui) {
            console.log('stop');
               reSaveTableData();
        }
    });
    $(TABLE).disableSelection();
});

function reSaveTableData(){
    var data = readData();
    data.groups = getGroupsFromTable();
    writeData(data)
}

function drawTable(data) {
    for (var i = 0; i < data.length; i++) {
        drawGroup(data[i]);
    }
}

function drawGroup(group) {
    var el = $("<li />");
    var header = $("<div class='group-header'/>");
    var jobContainer = $("<div />");

    $(TABLE).append(el.append(header, jobContainer));

    el.addClass('ui-state-default ui-sortable-handle');
    el.attr('group', group.name);

    header.text(group.name);
    header.attr('data-toggle', 'collapse');
    header.attr('data-target', '[job-container="' +group.name+'"]');


    jobContainer.attr('job-container',group.name);
    jobContainer.attr('group-name', group.name);
    jobContainer.addClass('collapse jobs-data-container');
    jobContainer.data(group);


    if (!!group.jobs){
        drawJobs(group);
    }
}

function $g(group){
       return $('[group=\''+ group.name || group +'\']');
}

function drawJobs(group) {
    var el = $("<div class='container-fluid job-container'/>");

    $g(group).find('.jobs-data-container').append(el);

    el.attr('id', 'jobs-list-' + group.name);
    el.sortable();
    el.disableSelection();

    for (var i = 0; i < group.jobs.length; i++) {
        drawJob(group, group.jobs[i]);
    }
}

function drawJob(group, job) {
    var el = $('<div class="row justify-content-between  text-nowrap"/>');

    el.data(job);
    el.attr('job-id', job.name);
    el.append($("<div class='job-name col-md-7 text-nowrap'>" + job.name + "</div>"));

    var btnWrapper = $("<div class='col-md-5'/>");

    $g(group).find('.job-container').append(el);
    el.append(btnWrapper);

    drawJobControllers(btnWrapper, job);
}

function drawJobControllers(parent, job) {
    var buttons = $("<div class='btn-group'/>");
    parent.append(buttons);

    drawStartJobBtn(buttons, job);
    drawReadLogButton(buttons, job);
}


function drawStartJobBtn(parent, job) {
    var btn = $('<button type="button" class="btn btn-success start-job-btn">Start</button>');
    parent.append(btn);
    btn.click(function () {
        startJob(job);
    });
}

function drawReadLogButton(parent, job){
    var btn = $('<button type="button" class="btn read-log-btn">Logs</button>');
    parent.append(btn);
    btn.click(function () {
        console.log(job);
    });
}

function startJob(job) {
     $.ajax({
         type: "POST",
         url: "/start/job",
         data: JSON.stringify(job),
         dataType: "json",
         contentType : "application/json"
     }).done(function() {
         console.log('started ' + job)
     });
}

function getGroupsFromTable(){
    var arr = [];
    $('#sortable').find('[group-name]').each(function(){
        arr.push(jQuery.data(this))
    });
    return arr;
}

function submitGroup() {

    var group = getSubmitGroup();

    if (validateGroup(group)) {
        if (addGroup(group)) {
            drawGroup(group);
        }
    } else {
        highlightError(group);
    }

    function getSubmitGroup() {
        var group = {name: '', description: '', startingDirectory: ''};
        $('#create-group-form').find('input[type="text"]').each(function () {
            group[$(this).attr('name')] = $(this).val();
        });
        return group;
    }

    function highlightError(group) {
        alert("failed to create group" + group);
    }
}




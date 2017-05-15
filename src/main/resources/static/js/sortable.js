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

    el.addClass('ui-state-default');
    el.addClass('ui-sortable-handle');


    var header = $("<div />");
    header.text(group.name);
    header.attr('data-toggle', 'collapse');
    header.attr('data-target', '[job-container="' +group.name+'"]');

    var jobContainer = $("<div />");
    jobContainer.attr('job-container',group.name);
    jobContainer.addClass('collapse');

    jobContainer.attr('group-name', group.name);
    jobContainer.data(group);


    $(TABLE).append(el);
    el.append(header);
    el.append(jobContainer);

    if (!!group.jobs){
        drawJobs(jobContainer, group);
    }
}

function drawJobs(parent, group) {
    var el = $("<ul />");
    el.addClass('job-unordered-list');
    parent.append(el);
   // el.sortable();

    el.attr('id', 'jobs-list-' + group.name);
    el.sortable();
    el.disableSelection();


    for (var i = 0; i < group.jobs.length; i++) {
        drawJob(el, group.jobs[i]);
    }
}

function drawJob(parent, job) {
    var el = $("<li class='row justify-content-between'/>");
    el.data(job);
    el.attr('job-id', job.name);
    el.append($("<div class='job-name col-md-6'>" + job.name + "</div>"));

    $(parent).append(el);

    drawJobControllers(el, job);
}

function drawJobControllers(parent, job) {
    var buttons = $("<div class='btn-group col-md-6'/>");
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
    var btn = $('<button type="button" class="btn read-log-btn">Show log</button>');
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




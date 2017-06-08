var TABLE = "#sortable";

drawTable(readData().groups);

$('#left-panel')
    .resizable({
       // helper: "ui-resizable-helper",
        containment: "parent",
        maxWidth: 1000,
        minWidth: 225,
        distance: 10,
        handles: "e"

    });

$(function () {
    $(TABLE).sortable({
        change: function (e, ui) {
            console.log('change');
        },
        stop: function (e, ui) {
            console.log('stop');
               reOrderTableData();
        },
        handle: '.group-header',
        cursor: "move",
        items: "> li"

    });
    $(TABLE).disableSelection();
});

function serializeTable(){
    return $(TABLE).sortable("serialize", {attribute: "group"});

}


function reOrderTableData(){
    var data = readData();
    var order = $("#sortable").sortable("toArray", {attribute: "group"});

    data.groups
        .sort(function(a, b){
                 return order.indexOf(a.name) > order.indexOf(b.name);
             });
    writeData(data)
}

function drawTable(data) {
    for (var i = 0; i < data.length; i++) {
        drawGroup(data[i]);
    }
}

function drawGroup(group) {

    var el = $("<li class='ui-state-default group-element'/>");
    el.attr('group', group.name);
    el.attr('id', "_" +  group.name);

    var header = $("<div class='group-header container-fluid itm movable'/>");
    var jobContainer = $("<div />");

    $(TABLE).append(el.append(header, jobContainer));


    header.attr('data-toggle', 'collapse');
    header.attr('data-target', '[group-name="' +group.name+'"]');

    var btnWrap = $("<div class='col-xs-2 itm' />");
    var cfg = $("<span data-toggle='modal' data-target='#modal' class='pull-right header-icon glyphicon glyphicon-cog'/>")
    header.append("<div class='col-xs-10 text-nowrap itm' >" + group.name+ "</div>");
    header.append(btnWrap);
    btnWrap.append(cfg);
    cfg.attr('group', group.name);

    jobContainer.attr('group-name', group.name);
    jobContainer.addClass('collapse jobs-data-container');
    jobContainer.data(group);


    drawJobs(group);
}

function $g(group){
       return $('.group-element[group=\''+ group.name || group +'\']');
}

function drawJobs(group) {
    var el = $("<div class='container-fluid job-container'/>");

    $g(group).find('.jobs-data-container').append(el);

    el.attr('id', 'jobs-list-' + group.name);


    if (group.jobs) group.jobs.forEach(function(job){
      drawJob(group, job);
    })
}

function drawJob(group, job) {
    var el = $('<div class="row justify-content-between  text-nowrap"/>');

    el.data(job);
    el.attr('job-id', job.name);
    el.append($("<div class='job-name col-xs-6 text-nowrap itm'>" + job.name + "</div>"));

    var btnWrapper = $("<div class='col-xs-6 itm'/>");

    $g(group).find('.job-container').append(el);
    el.append(btnWrapper);

    drawJobControllers(btnWrapper, job);
}

function drawJobControllers(parent, job) {
    var buttons = $("<div class='pull-right btn-group btn-group-xs' aria-label='...' />");
    parent.append(buttons);

    drawJobButtons(buttons, job);

}

function mock(el){
     console.log(el);
}

function drawJobButtons(parent, job) {
     drawJobButton(parent, 'start', 'glyphicon-play', function () {startJob(job);});
     drawJobButton(parent, 'stop', 'glyphicon-stop', function () {mock(job);});
     drawJobButton(parent, 'view log', 'glyphicon-eye-open', function () {mock(job);});
     drawJobButton(parent, 'load log', 'glyphicon-download-alt', function () {mock(job);});
}

function drawJobButton(parent, name, glyphicon, func){
    var btn = $('<button type="button" class="btn btn-default" ><span class="glyphicon '+glyphicon+'" aria-hidden="true"></span></button>');
    parent.append(btn);
    btn.click(func);
}

function startJob(job) {
        console.log("starting " + job.name); //todo remove
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




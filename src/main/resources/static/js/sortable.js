var TABLE = $("#sortable");

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
    TABLE.sortable({
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
    TABLE.disableSelection();
});

function reOrderTableData(){
    var data = readData();
    var order = $("#sortable").sortable("toArray", {attribute: "group"});

    data.groups
        .sort(function(a, b){
                 return order.indexOf(a.name) > order.indexOf(b.name);
             });
    writeData(data)
}

function reorderData(data, order){
        return data.groups.sort(function(a, b){
                 return order.indexOf(a.name) > order.indexOf(b.name);
        });
}

function drawTable(data) {
    for (var i = 0; i < data.length; i++) {
        drawGroup(data[i]);
    }
}

function drawGroup(group) {

    var wrapper = $("<li class='ui-state-default group-element'/>")
             .attr('group', group.name)
             .attr('id', "_" +  group.name);

    var btnWrap = $("<div class='col-xs-2 itm' />")
             .append("<span data-toggle='modal' data-target='#modal' class='pull-right header-icon glyphicon glyphicon-cog' group='"+group.name+"'/>");

    var header = $("<div class='group-header container-fluid itm movable'/>")
             .attr('data-toggle', 'collapse')
             .attr('data-target', '[group-name="' +group.name+'"]')
             .append("<div class='col-xs-10 text-nowrap itm' >" + group.name+ "</div>")
             .append(btnWrap);

    var jobContainer = $("<div />")
             .attr('group-name', group.name)
             .addClass('collapse jobs-data-container')
             .data(group);

    wrapper
           .append(header)
           .append(jobContainer)
           .appendTo(TABLE);

    drawJobs(group);
}

function $g(group){
       return $('.group-element[group=\''+ group.name || group +'\']');
}

function drawJobs(group) {
    $g(group).find('.jobs-data-container')
            .append($("<div class='container-fluid job-container'/>")
                        .attr('id', 'jobs-list-' + group.name));

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

var response;

function startJob(job) {
        console.log("starting " + job.name + job); //todo remove
     $.ajax({
         type: "POST",
         url: "/start/job",
         data: JSON.stringify(job),
         dataType: "json",
         contentType : "application/json"
     }).always(function(data) {
         response = data;
         //todo: printing errors, remove when tested
         var rj = response.responseJSON;
         if(rj && rj.errors) rj.errors.forEach(function(a){console.log(a.defaultMessage)})
     });
}

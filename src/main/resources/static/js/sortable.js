drawGroupsTable();

function drawGroupsTable() {

    var TABLE = "#sortable";

    $.getJSON("../groups/", function (data) {
        drawTable(data);
    });

    $(function () {
        $(TABLE).sortable({
            change: function (e, ui) {
                console.log('change');
            },
            stop: function (e, ui) {
                console.log('stop');
            }
        });
        $(TABLE).disableSelection();
    });

    function drawTable(data) {
        for (var i = 0; i < data.length; i++) {
            drawGroup(data[i]);
        }
    }

    function drawGroup(group) {
        var el = $("<li />");
        el.data(group);
        el.addClass('ui-state-default');
        el.addClass('ui-sortable-handle');
        el.attr('group-id', group.id);

        var header = $("<div />");
        header.text(group.name);
        header.attr('data-toggle', 'collapse');
        header.attr('data-target', '#job-container-' + group.id);

        var jobContainer = $("<div />");
        jobContainer.attr('id', 'job-container-' + group.id);
        jobContainer.addClass('collapse');


        $(TABLE).append(el);
        el.append(header);
        el.append(jobContainer);

        drawJobs(jobContainer, group);
    }

    function drawJobs(parent, group) {
        var el = $("<ul />");
        parent.append(el);
        el.sortable();
        el.disableSelection();
        el.attr('id', 'jobs-list-' + group.id);

        for (var i = 0; i < group.jobs.length; i++) {
            drawJob(el, group.jobs[i]);
        }
    }

    function drawJob(parent, job) {
        var el = $("<li class='row'/>");
        el.data(job);
        el.attr('job-id', job.id);
        el.append($("<div class='job-name col-md-6'>" + job.name + "</div>"));

        $(parent).append(el);

        drawJobControllers(el, job);
    }

    function drawJobControllers(parent, job) {
        var buttons = $("<div class='job-controllers col-md-6' />");
        parent.append(buttons);

        drawStartJobBtn(buttons, job);
    }


    function drawStartJobBtn(parent, job) {
        var btn = $('<button type="button" class="btn btn-success start-job-btn">Start</button>');
        btn.click(function () {
            startJob(job.id);
        });
        parent.append(btn);
    }
}
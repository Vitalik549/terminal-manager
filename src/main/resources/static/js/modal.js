var LogStrategy = {
    "values" : {
            "select" : "Select log strategy..." ,
            "override" : "Override",
            "append" : "Append",
            "iterate" : "Iterate" }
}

$('#modal').on('show.bs.modal', function (event) {
  var groupName = event.relatedTarget.getAttribute('group') // Button that triggered the modal

  $(this).find('.modal-title').text(groupName);

    var group = findGroupByName(groupName).group;
  drawModalGroupJobs(group);

  $(this).data("group", group);
})

$('#modal').on('hidden.bs.modal', function (event) {
  $(this).find('.modal-title').text("");
  $(this).find('#modal-list').html("");
  $(this).find('#editor').html("");
 // $(this).removeData();
})

function drawModalGroupJobs(group){
     var list = $("<div class='scrollable list-group'/>");
     list.sortable({
                  change: function (e, ui) {
                      console.log('change');
                  },
                  stop: function (e, ui) {
                      console.log('stop');
                  },
                  cursor: "move"
              });

     $('#modal').find('#modal-list').append(list);

     if(group.jobs) group.jobs.forEach(function(job){

        var wrap = $("<div class='list-group-item'/>")
        var icon = $("<div class='glyphicon glyphicon-align-justify movable'/>");
        var item = $("<div type='button' class='btn text-nowrap'/>")
        item.click(function(){
            drawJobForm(job);
        });
        item.text(job.name);

        wrap.append(icon);
        wrap.append(item);
        list.append(wrap);
     });

     var addIcon = $('<button type="button" class="list-group-item btn btn-sm btn-block"><span class="glyphicon glyphicon-plus-sign"></span></button>');
     addIcon.click(drawJobForm);

     list.append(addIcon)
}



function drawJobForm(job){
    $('#editor').html("");

    var wrapper = $("<div class='container-fluid'/>");
    var form = $('<form class="form-horizontal" />');
    $('#editor').append(wrapper);
    wrapper.append(form);


    drawInput(form, 'Job name', job.name, 'name', job);
    drawTextArea(form, 'Description', job.description,'description', job);
    drawInput(form, 'Command', job.command,'command', job);
    drawInput(form, 'Starting directory', job.startingDirectory,'startingDirectory', job);
    drawInput(form, 'Base log file', job.baseLogFile,'baseLogFile', job);
    drawSelect(form, 'Log strategy', job.logStrategy,'logStrategy', job);

}

function drawGroup(parent, label, value, input, job){
    var wrap = $("<div class='form-group'/>");
    var elWrap = $('<div class="col-sm-9" />');

    parent.append(wrap);
    wrap.append('<label class="col-sm-3 control-label">'+label+'</label>')
    wrap.append(elWrap);
    elWrap.append(input);

    input.change(function() {
                var field = input.attr('job-input');

                $modalJob(job.name)[field] = input.val();

                console.log($modalJob(job.name));
    });
}

function drawSelect(parent, label, value, id, job){
    var select = $('<select class="form-control" />')
    select.attr('job-input', id);

    $.each(LogStrategy.values, function(key, value) {
         select.append($("<option></option>")
                        .attr("value", key)
                        .text(value));
    });

    var v = LogStrategy.values[value] ? value : "select";

    select.val(v.toLowerCase());

    drawGroup(parent, label, value, select, job)
}

function drawInput(parent, label, value, id, job){
    var input = $('<input class="form-control" type="text" >');
    input.attr('job-input', id);

    input.val(value);

    drawGroup(parent, label, value, input, job)

    input.change(function() {
                $('#modal').data().group[id] = input.val();
        });
}


function drawTextArea(parent, label, value, id, job){
    var input = $('<textarea class="form-control" type="text" >');
    input.attr('job-input', id);

    input.val(value);

    drawGroup(parent, label, value, input, job)
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



function $modalJob (jobName){
    var result =  $('#modal').data("group").jobs.filter(
     function(job){
        return job.name === jobName;
     }
    )
    return result[0];
}
/*

div class="container">
  <h2>Horizontal form: control states</h2>
  <form class="form-horizontal">

    <div class="form-group">
      <label class="col-sm-2 control-label">Focused</label>
      <div class="col-sm-10">
        <input class="form-control" id="input-" type="text" >
      </div>
    </div>

  </form>
</div>

  "name": "test job",
  "description": "starting tests",
  "command" : "mvn --help",
  "startingDirectory" : "/Users/admin/work/projects/crud-tests",
  "baseLogFile" : "/Users/admin/Desktop/ZZZZZ.txt",
  "logStrategy" : "append"

*/
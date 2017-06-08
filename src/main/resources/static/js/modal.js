$('#modal').on('show.bs.modal', function (event) {
  var groupName = event.relatedTarget.getAttribute('group') // Button that triggered the modal

  $(this).find('.modal-title').text(groupName);

  drawModalGroupJobs(findGroupByName(groupName).group);
 // $(this).data("group", group);
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

     list.append('<button type="button" class="list-group-item btn btn-sm btn-block"><span class="glyphicon glyphicon-plus-sign"></span></button>')
}

function drawJobForm(job){
    console.log(job);
    $('#editor').html("");

    var wrapper = $("<div class='container-fluid'/>");
    var form = $('<form class="form-horizontal" />');
    $('#editor').append(wrapper);
    wrapper.append(form);


    drawInput(form, 'Job name', job.name);
    drawInput(form, 'Description', job.description);
    drawInput(form, 'Command', job.command);
    drawInput(form, 'Starting directory', job.startingDirectory);
    drawInput(form, 'Base log file', job.baseLogFile);
    drawSelect(form, 'Log strategy', job.logStrategy);

}

var LogStrategy = {
    "values" : {
            "select" : "Select log strategy..." ,
            "override" : "Override",
            "append" : "Append",
            "iterate" : "Iterate" }
}

function drawGroup(parent, label, value, input){
    var wrap = $("<div class='form-group'/>");
    var elWrap = $('<div class="col-sm-10" />');

    parent.append(wrap);
    wrap.append('<label class="col-sm-2 control-label">'+label+'</label>')
    wrap.append(elWrap);
    elWrap.append(input);
}

function drawSelect(parent, label, value){
    var select = $('<select class="form-control" />')

    $.each(LogStrategy.values, function(key, value) {
         select.append($("<option></option>")
                        .attr("value", key)
                        .text(value));
    });

    var v = LogStrategy.values[value] ? value : "select";

    select.val(v.toLowerCase());

    drawGroup(parent, label, value, select)
}

function drawInput(parent, label, value){
    var input = $('<input class="form-control" id="input-'+label+'" type="text" >');

    input.val(value);

    drawGroup(parent, label, value, input)
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
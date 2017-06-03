$('#modal').on('show.bs.modal', function (event) {
  var groupName = event.relatedTarget.getAttribute('group') // Button that triggered the modal

  $(this).find('.modal-title').text(groupName);

  drawModalGroupJobs(findGroupByName(groupName).group);
 // $(this).data("group", group);
})

$('#modal').on('hidden.bs.modal', function (event) {
  $(this).find('.modal-title').text("");
  $(this).find('#modal-list').html("");
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

    var ename = $('<a >test</a>');;

    wrapper.append(ename);
    $('#editor').append(wrapper);

}

/*

  "name": "test job",
  "description": "starting tests",
  "command" : "mvn --help",
  "startingDirectory" : "/Users/admin/work/projects/crud-tests",
  "baseLogFile" : "/Users/admin/Desktop/ZZZZZ.txt",
  "logStrategy" : "append"

*/
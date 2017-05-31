$('#modal').on('show.bs.modal', function (event) {
  var groupName = event.relatedTarget.getAttribute('group') // Button that triggered the modal

  $(this).find('.modal-title').text(groupName);

  drawModalGroupJobs(findGroupByName(groupName).group);
})

$('#modal').on('hidden.bs.modal', function (event) {
  $(this).find('.modal-title').text("");
  $(this).find('#modal-list').html("");
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
                  //handle: '.glyphicon-align-justify',
                  cursor: "move"
              });

     $('#modal').find('#modal-list').append(list);

     if(group.jobs) group.jobs.forEach(function(job){
        var item = $("<div class='list-group-item text-nowrap movable'/>")
        var icon = $("<div class='pull-left glyphicon glyphicon-align-justify' />");
        item.text(job.name);
        item.append(icon);

        list.append(item);
     });

     list.append('<button type="button" class="list-group-item btn btn-sm btn-block"><span class="glyphicon glyphicon-plus-sign"></span></button>')
}
$('#modal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget) // Button that triggered the modal
  var recipient = g4;
  var modal = $(this);
  modal.find('.modal-title').text(recipient.name);
console.log("1");
  drawModalList();
})

function drawModalList(){
    var container = $("<div class='container-fluid scrollable list-group'></div>")
    var groups = readData().groups;
    var listG = $("<div class='list-group-item'>  </div>");
    container.append(listG);


    groups.forEach(function(group){

            var item = $("<h4 class='list-group-item-heading text-nowrap'>"+group.name+"</h4>");
            item.attr("id" , "modal-item-" + group.name)


            listG.append(item);


             group.jobs.forEach(function(job){
                item.append("<p class='text-nowrap list-group-item-text'>"
                +"<span class='glyphicon glyphicon-align-justify'></span>"+job.name+"</p>");
             });


    })
     $('#modal').find('#modal-list').find(".container-fluid").replaceWith(container);
}
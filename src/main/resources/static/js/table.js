drawJobsTable();

function drawJobsTable(){

        $.getJSON("jobs/", function(data){
                    drawTable(data);
                });

        function drawTable(data) {
            for (var i = 0; i < data.length; i++) {
               drawRow(data[i]);
            }
        }

        function drawRow(rowData, element, bool) {
            var row = $("<tr />")
            $("#personDataTable").append(row); //this will append tr element to table... keep its reference for a while since we will add cels into it


            row.append($("<td>" + rowData.id + "</td>"));
            row.append($("<td>" + rowData.name + "</td>"));
            row.append($("<td>" + rowData.command + "</td>"));
            row.append($("<td>" + rowData.description + "</td>"));
            row.append($("<td>" + rowData.startingDirectory + "</td>"));

        }
}


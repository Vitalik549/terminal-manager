drawGroupsTable();


function drawGroupsTable() {
    $.getJSON("groups/", function (data) {
        drawTable(data);
    });


    function drawTable(data) {
        for (var i = 0; i < data.length; i++) {
            drawRow(data[i]);
        }
    }

    function drawRow(group) {
        var row = $("<tr />")
        $("#groups").append(row); //this will append tr element to table... keep its reference for a while since we will add cels into it
        row.append($("<td>" + group.name + "</td>"));
        row.append($("<td>" + group.description + "</td>"));
        row.append($("<td>" + group.startingDirectory + "</td>"));
        row.append($("<td>" + getJobsList(group) + "</td>"));

    }

    function getJobsList(group) {
        var result = "";
        group.jobs
            .forEach(function (job) {
                result += job.name + " ";
            });
        return result;
    }
}
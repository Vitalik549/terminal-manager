
    function Group(name, description, startingDirectory, jobs) {
        this.id = Date.now();
        this.name = name;
        this.description = description;
        this.startingDirectory = startingDirectory;
        this.jobs = jobs;
    }

    function Job(name, description, command , startingDirectory, baseLogFile , logStrategy) {
        this.id = Date.now();
        this.name = name;
        this.description = description;
        this.command = command;
        this.startingDirectory = startingDirectory;
        this.baseLogFile = baseLogFile;
        this.logStrategy = logStrategy;
    }

    function readData() {
        var stored = localStorage.getItem('terminal-manager');
        var data;
        try {
            data = JSON.parse(stored) || {groups: []};
        } catch (e) {
            data = {groups: []}
        }
        return data;
    }

    function writeData(data) {
        localStorage.setItem('terminal-manager', JSON.stringify(data))
    }

    function findGroupByName(name, data) {
        data = data || readData();
        var index = 0;
        var groups = data.groups;
        var group = groups.filter(function (group, i) {
            var match = group.name == name;
            if (match) index = i;
            return match;
        })[0];

        return {
            group: group,
            index: group ? index : -1
        }
    }

    //TODO reuse code
    function findGroupByID(id, data) {
            data = data || readData();
            var index = 0;
            var groups = data.groups;
            var group = groups.filter(function (group, i) {
                var match = group.id == id;
                if (match) index = i;
                return match;
            })[0];

            return {
                group: group,
                index: group ? index : -1
            }
    }

    function addGroup(group, data) {
        data = data || readData();
        var result = findGroupByName(group.name, data);

        if (!result.group && validateGroup(group)) {
            data.groups.push(group);
            writeData(data);
            return group;
        } else {
            return {};
        }
    }

    function validateGroup(group){
    return group.name && group.description && group.startingDirectory;
    }

    function removeGroupByName(name, data) {
        data = data || readData();
        var result = findGroupByName(name, data);

        if (existing.group) {
            data.groups.splice(existing.index, 1);
            writeData(data);
            return existing;
        } else {
            return null;
        }
    }

    function updateGroup(group, data) {
        data = data || readData();
        var result = findGroupByName(group.name, data);

        if (result.group) {
            Object.assign(
                data.groups[existing.index],
                group
            );
            writeData(data);
            return existing;
        } else {
            return null;
        }
    }


var g1 = new Group("Project 1" , "description", "/Users/admin/", [
    new Job("Job printer 11", "prints directory 3 times", "pwd && pwd && pwd", "/Users/admin/Desktop" ),
    new Job("Job printer 12", "prints directory 3 times", "pwd && pwd && pwd", "/Users/admin/Desktop" ),
    new Job("Job printer 13", "prints directory 3 times", "pwd && pwd && pwd", "/Users/admin/Desktop" ),
    new Job("Job printer 14", "prints directory 3 times", "pwd && pwd && pwd", "/Users/admin/Desktop" ),
    new Job("Job printer 15", "prints directory 3 times", "pwd && pwd && pwd", "/Users/admin/Desktop" )
]);

var g2 = new Group("Project 2" , "description", "/Users/admin/", [
    new Job("Job printer 21", "prints directory 3 times", "pwd && pwd && pwd", "/Users/admin/Desktop" ),
    new Job("Job printer 22", "prints directory 3 times", "pwd && pwd && pwd", "/Users/admin/Desktop" ),
    new Job("Job printer 23", "prints directory 3 times", "pwd && pwd && pwd", "/Users/admin/Desktop" ),
    new Job("Job printer 24", "prints directory 3 times", "pwd && pwd && pwd", "/Users/admin/Desktop" ),
    new Job("Job printer 25", "prints directory 3 times", "pwd && pwd && pwd", "/Users/admin/Desktop" )
]);

var g3 = new Group("CRUD" , "crud project builder", "/Users/admin/work/projects/crud-tests", [
    new Job("Maven Clean", "cleaning targets", "mvn clean", "/Users/admin/work/projects/crud-tests", "/Users/admin/Desktop/crud_clean_log.txt", "append"),
    new Job("Maven Test", "starting tests", "mvn test", "/Users/admin/work/projects/crud-tests", "/Users/admin/Desktop/crud_clean_log.txt", "append"),
    new Job("Maven Help", "cleaning targets", "mvn clean", "/Users/admin/work/projects/crud-tests", "/Users/admin/Desktop/ZZZZZ.txt", "override"),
]);

var g4 = new Group("Print directories", "Print something", "/Users/admin/",[
    new Job("Print documents" , "info1", "prints directory 1",  "pwd", "/Users/admin/Documents"),
    new Job("Print desktop" , "info1", "prints directory 1",  "pwd", "/Users/admin/Desktop"),
    new Job("Print downloads" , "info1", "prints directory 1",  "pwd", "/Users/admin/Downloads"),
]);

var noJobsGroup = new Group("Group without jobs", "info","/Users/admin/");
var emptyGroup = new Group();


function r(){
localStorage.clear();
addGroup(g1);
addGroup(g2);
addGroup(g3);
addGroup(g4);
addGroup(noJobsGroup);
addGroup(emptyGroup);
}

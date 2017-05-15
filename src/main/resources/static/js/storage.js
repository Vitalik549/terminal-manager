
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

    function addGroup(group, data) {
        data = data || readData();
        var existing = findGroupByName(group.name, data);

        if (!existing.group) {
            data.groups.push(group);
            writeData(data);
            return group;
        } else {
            return null;
        }
    }

    function validateGroup(group){
    return group.name && group.description && group.startingDirectory;
    }



    function removeGroupByName(name, data) {
        data = data || readData();
        var existing = findGroupByName(name, data);

        if (existing) {
            data.groups.splice(existing.index, 1);
            writeData(data);
            return existing;
        } else {
            return null;
        }
    }

    function updateGroup(group, data) {
        data = data || readData();
        var existing = findGroupByName(group.name, data);

        if (existing) {
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




var g1 = {
  "name": "Project name 1",
  "description": "description 1",
  "startingDirectory" : "/Users/admin/",
"jobs" : [
{
  "name": "PWD PRINTER",
  "description": "prints directory 5 time",
  "command" : "pwd && pwd && pwd && pwd && pwd",
  "startingDirectory" : "/Users/admin/Desktop"
},
{
  "name": "Another printer",
  "description": "prints directory 2 time",
  "command" : "pwd && pwd",
  "startingDirectory" : "/Users/admin/Documents"
}]
}

var g3 = {
  "name": "Project name 3",
  "description": "descr3",
 "startingDirectory" : "/Users/admin/",
"jobs" : [
{
  "name": "Job from group 3",
  "description": "prints directory 5 time",
  "command" : "pwd && pwd && pwd && pwd && pwd",
  "startingDirectory" : "/Users/admin/Desktop"
},
{
  "name": "Job 2 from group 3",
  "description": "prints directory 2 time",
  "command" : "pwd && pwd",
  "startingDirectory" : "/Users/admin/Documents"
}]
}


var g2 = {
  "name": "g2",
  "description": "2descr2",
 "startingDirectory" : "/Users/admin/",
"jobs" : [
{
  "name": "Another printer222",
  "description": "prints directory",
  "command" : "pwd",
  "startingDirectory" : "/Users/admin/Documents"
}]
}

var groups = [g1,g2]

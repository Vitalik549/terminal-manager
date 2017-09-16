
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
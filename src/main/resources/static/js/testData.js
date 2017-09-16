
var g1 = new Group("Project 1" , "description", "/Users/admin/", [
    new Job("Job printer 11", "prints directory 3 times", "pwd && pwd && pwd", "/Users/admin/Desktop" ),
    new Job("Job printer 12", "prints directory 3 times", "pwd && pwd && pwd", "/Users/admin/Desktop" ),
    new Job("Job printer 13", "prints directory 3 times", "pwd && pwd && pwd", "/Users/admin/Desktop" ),
    new Job("", "prints directory 3 times", "pwd && pwd && pwd", "/Users/admin/Desktop" ),
    new Job("WrongFir", "prints directory 3 times", "pwd && pwd && pwd", "/Users/admin/Desktop2" )
]);

var g2 = new Group("Project 2" , "description", "/Users/admin/", [
    new Job("Job printer 21", "prints directory 3 times", "pwd && pwd && pwd", "/Users/admin/Desktop" ),
    new Job("Job printer 22", "prints directory 3 times", "pwd && pwd && pwd", "/Users/admin/Desktop" ),
    new Job("Job printer 23", "prints directory 3 times", "pwd && pwd && pwd", "/Users/admin/Desktop" ),
    new Job("Job printer 24", "prints directory 3 times", "pwd && pwd && pwd", "/Users/admin/Desktop" ),
    new Job("Job printer 25", "prints directory 3 times", "pwd && pwd && pwd", "/Users/admin/Desktop" )
]);

var g3 = new Group("CRUD" , "crud project builder", "/Users/admin/work/projects/crud-tests", [
    new Job("Maven Clean", "cleaning targets", "mvn clean", "/Users/admin/work/projects/crud-tests", "/Users/admin/Desktop/crud_clean_log.txt", "APPEND"),
    new Job("Maven Test", "starting tests", "mvn test", "/Users/admin/work/projects/crud-tests", "/Users/admin/Desktop/crud_clean_log.txt", "APPEND"),
    new Job("Maven Help", "cleaning targets", "mvn --help", "/Users/admin/work/projects/crud-tests", "/Users/admin/Desktop/ZZZZZ.txt", "OVERRIDE"),
]);

var g4 = new Group("Print directories", "Print something", "/Users/admin/",[
    new Job("Print documents" , "info1", "prints directory 1",  "pwd", "/Users/admin/Documents"),
    new Job("Print desktop" , "info1", "prints directory 1",  "pwd", "/Users/admin/Desktop"),
    new Job("Print downloads" , "info1", "prints directory 1",  "pwd", "/Users/admin/Downloads"),
]);

var testGroup = new Group("Validation group", "Group to check job validity", "/Users/admin/",[
    new Job("", "valid descr", "pwd", "/Users/admin/Desktop", "/Users/admin/Desktop/valid.txt", "APPEND"),
    new Job("no description", "", "pwd", "/Users/admin/Desktop", "/Users/admin/Desktop/valid.txt", "APPEND"),
    new Job("no command", "valid descr", "", "/Users/admin/Desktop", "/Users/admin/Desktop/valid.txt", "APPEND"),
    new Job("no base dir", "valid descr", "pwd", "", "/Users/admin/Desktop/valid.txt", "APPEND"),
    new Job("no file", "valid descr", "pwd", "/Users/admin/Desktop", "", "APPEND"),
    new Job("no log strategy", "valid descr", "pwd", "/Users/admin/Desktop", "/Users/admin/Desktop/valid.txt", ""),
    new Job("not real command", "valid descr", "pwdaas", "/Users/admin/Desktop", "/Users/admin/Desktop/valid.txt", "APPEND"),
    new Job("not real directory", "valid descr", "pwd", "/Users/admin/Desktop/notExistingDirectory", "/Users/admin/Desktop/valid.txt", "APPEND"),
    new Job("not real file", "valid descr", "pwd", "/Users/admin/Desktop", "/Users/admin/Desktop/valid2.txt", "APPEND"),
    new Job("not real log strategy", "valid descr", "pwd", "/Users/admin/Desktop", "/Users/admin/Desktop/valid.txt", "PSAPPEND"),
    new Job("valid", "valid descr", "pwd", "/Users/admin/Desktop", "/Users/admin/Desktop/valid.txt", "APPEND"),

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
addGroup(testGroup);
}

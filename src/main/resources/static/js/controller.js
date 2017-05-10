function startJob(jobId) {
    $.post("/exec/" + jobId + "/start");
}


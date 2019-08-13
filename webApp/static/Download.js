function insertDownloadLinks(files) {
    $("#downloadResults").empty();
//    $("#downloadStripPlot").empty();
//    $("#email").empty();

    if (!jQuery.isEmptyObject(files)) {
        if (files['results'])
            $("#downloadResults").append("<button id='downloadResultsButton'>Download results table</button><br>");
        if (files['shiftlist'])
            $("#downloadResults").append("<button id='downloadShiftlistButton'>Download assigned chemical shifts</button><br>");
        if (files['hsqc_plot'])
            $("#downloadResults").append("<button id='downloadHsqcPlotButton'>Download HSQC plot</button><br>");
        if (files['strip_plot'])
            $("#downloadResults").append("<button id='downloadStripPlotButton'>Download strip plot</button><br>");
        if (files['log_file'])
            $("#downloadResults").append("<button id='downloadLogButton'>Download log file</button><br>");

//        if (files['results'] || files['plot'])
//            $("#email").append("<form id='emailForm'><input type='text' name='emailAddress' placeholder='your@email.com' class='fileSender'><button id='emailSubmit'>Email all results</button></form>");
    }
    $("#downloadResultsButton").click(function () {
        download('results', files['results']);
    });
    $("#downloadShiftlistButton").click(function () {
        download('shiftlist', files['shiftlist']);
    });
    $("#downloadHsqcPlotButton").click(function () {
        download('hsqcPlot.htm', files['hsqc_plot_file']);
    });
    $("#downloadStripPlotButton").click(function () {
        download('stripPlot.htm', files['strip_plot_file']);
    });
    $("#downloadLogButton").click(function () {
        download('log', files['log_file']);
    });
/*    $(document).on("submit", "#emailForm", function (event) {
        event.preventDefault();
        var data = new FormData(this);
        $.each(files, function (key, value) {
            if (value)
                data.append(key, value);
        });
        $.ajax({
            url: $SCRIPT_ROOT + '/email',
            type: "POST",
            dataType: "JSON",
            data: data,
            processData: false,
            contentType: false,
            success: function (data) {
                if (data.status !== 'ok') {
                    alert(data.message);
                }
                else {
                    alert("Results emailed successfully");
                }
            },
            error: function (err) {
                alert("Email failed");
                console.log(err);
            }
        });
    });*/
}

function download(fileName, file) {
    var snaps_download = new Blob([file], { type: "application / octet - stream" });
    saveAs(snaps_download, fileName);
}
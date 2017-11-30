$(document).ready(function() {

    function hideMessages (){
        $('#info').hide();
        $('#danger').hide();
    };

    hideMessages();


    $("#btnget").click(function() {
        hideMessages();

        $.get("content", function(data, status){
            $('#answer').text(`Status - ${status}; Responce: ${JSON.stringify(data)}`);
            $('#info').show();
        });
    });

    $("#btnpost").click(function() {
        hideMessages();

        $.post("content", {name: "John", age: 31}, function(data, status){
            $('#answer').text(`Status - ${status}; Responce: ${JSON.stringify(data)}`);
            $('#info').show();
        });
    });

    $("#btndel").click(function() {
        hideMessages();

        $.ajax({
            url: 'content',
            type: 'DELETE',
            data: {name: 'Alex'},
            success: function(data){
                $('#answer').text(`Responce: ${JSON.stringify(data)}`);
                $('#info').show();
            },
            error: function(data) {
            }
        });
    });

    $("#btnerr").click(function() {
        hideMessages();

        $.ajax({
            url: 'error',
            type: 'GET',
            success: function(data){
            },
            error: function(data) {
                $('#error').text(`${JSON.stringify(data)}`);
                $('#danger').show();
            }
        });
    });
});

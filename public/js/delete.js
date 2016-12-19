$(document).ready(function() {
    $("#search").click(function() {
        // alert("Email: " + $("#email").val());

        var id = $("#id").val();

        if (id != "") {
            $.ajax({
                url: "/content_id/" + id
            }).then(function(reuslt) {
                $("#showResult").hide();

                if (reuslt != null) {
                    $('#name').val(reuslt.name);
                    $('#title').val(reuslt.title);
                    $('#url').val(reuslt.url);
                } else {


                    $("#showResult").show();
                    $("#showResult").removeClass("alert alert-success").addClass("alert alert-danger").text("No data available with this id");
                    $('#name').val("");
                    $('#title').val("");
                    $('#url').val("");

                }

            }, function(error) {
                console.log('uh oh: ', error); // 'uh oh: something bad happened’
            });
        } else {
            alert("Pleae insert ID value");
        }


    });
});


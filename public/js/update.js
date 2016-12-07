$(document).ready(function() {
    $("#search").click(function() {
        //alert("Email");
        // $('#name').val("motiur");
        // $('#title').val("rahman");
        // $('#url').val("palash");

        // var data = {"id":$("#id").val()};
        var id = $("#id").val();
        //alert(id);

        if (id !== "") {

            $.ajax({
                    url: 'http://localhost:3000/content_id/' + id,
                    type: 'get',
                    dataType: 'json',
                    //data: $("#email").val(),
                    //data: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    success: function(data, textStatus, jQxhr) {
                        if (data == null) {
                            alert("NO data available with this id");
                        }
                    },
                    error: function(jqXhr, textStatus, errorThrown) {
                        alert("Error:"+errorThrown);
                    }
                })
                .done(function(reuslt) {
                    //console.log(reuslt);
                    if (reuslt != null) {
                        var data = JSON.stringify(reuslt);
                        $("#speakerName").val(reuslt.name).change();
                        $("#lecture").val(reuslt.lecture).change();
                        $('#title').val(reuslt.title);
                        $('#url').val(reuslt.url);
                        $("#type_id").val(reuslt.wasType).change();
                        $("#wascatatory").val(reuslt.wasCatatory).change();

                    }

                    //alert(reuslt.name);
                })
                .fail(function() {
                    console.log("error");
                })
                .always(function() {
                    console.log("complete");
                });
        } else {
            alert("Pleae insert ID value");
        }

    });
});

// $(document).ready(function() {
// $("#update").click(function(){
//         var value = {"id":$("#id").val(),
//                      "name":$("#name").val(),
//                     "title":$("#title").val(),
//                     "url":$("#url").val(),

//                     };

//         $.ajax({
//           url: 'http://localhost:3000/admin/updateDelete',
//           type: 'put',
//           dataType: 'json',
//           //data: $("#email").val(),
//           data: JSON.stringify(value),
//           headers: {
//               'Content-Type': 'application/json;charset=utf-8'
//             },
//             success:function(data){
//             document.location.href = 'http://localhost:3000/'
//             },
//             error:function(error){
//             alert(error)
//             }
//         });

//     });
//   });

$(document).ready(function() {
    $("#search").click(function() {
        // alert("Email: " + $("#email").val());

        var id = $("#id").val();
        //alert(id);

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
                    console.log(errorThrown);
                }
            })
            .done(function(reuslt) {
                //console.log(reuslt);
                // var data = JSON.stringify(reuslt);
                $('#name').val(reuslt.name);
                $('#title').val(reuslt.title);
                $('#url').val(reuslt.url);
                //alert(reuslt.name);
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
                console.log("complete");
            });

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

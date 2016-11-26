$(document).ready(function() {
    $("#search").click(function() {
        // alert("Email: " + $("#email").val());

        var id = $("#id").val();
        
        if (id != "") {
            $.ajax({
                url: 'http://localhost:3000/content_id/' + id
            }).then(function(reuslt) {

                if (reuslt != null) {
                    $('#name').val(reuslt.name);
                    $('#title').val(reuslt.title);
                    $('#url').val(reuslt.url);
                } else {
                    alert("There is no data available with this value");
                }

            }, function(error) {
                console.log('uh oh: ', error); // 'uh oh: something bad happened’
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

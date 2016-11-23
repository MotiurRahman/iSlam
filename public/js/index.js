function run() {
    var name = $("#catagory").val();

    // window.location.replace('http://localhost:3000/api/name/'+name);


    window.location.replace('http://localhost:3000/speaker/' + name);

    // $.ajax({
    //   url: 'http://localhost:3000/api/name/'+name,
    //   type: 'get',
    //   dataType: 'json',
    //   //data: $("#email").val(),
    //   //data: JSON.stringify(data),
    //   headers: {
    //       'Content-Type': 'application/json;charset=utf-8'
    //     },
    //     success:function(data, textStatus, jQxhr){
    //      if(data==null)
    //    {
    //     alert("NO data available with this na");
    //    }
    //     },
    //     error:function(jqXhr, textStatus, errorThrown){
    //     alert(errorThrown);
    //     }
    // })
    // .done(function(data) {

    //   window.location.reload();
    //   //console.log(reuslt);
    //  // var data = JSON.stringify(reuslt);
    //  //   $('#name').val(reuslt.name);
    //  //   $('#title').val(reuslt.title);
    //  //   $('#url').val(reuslt.url);

    //  //   console.log("done:"+data);
    //   // $("body").ul(data);
    //   //alert(reuslt.title);
    // })
    // .fail(function() {
    //   console.log("error");
    // })
    // .always(function() {
    //   console.log("complete");
    // });


}
//$("#elementId :selected").text(); // The text content of the selected option


//var e = document.getElementById("ddlViewBy");
//var strUser = e.options[e.selectedIndex].value;
//$('#name').val(strUser);

$(document).ready(function () {
    $("#cc_email > option").prop("selected","selected");
    $("#cc_email").trigger("change");
    $('#country').change(function(){
        $.ajax({
            url:`/admin/vendor/state/${$('#country').val()}`,
            type:'get',
            success:function(res){
                $('#state').empty();
                $('#state').append(`<option value=''>State</option>`);
                $('#city').empty();
                $('#city').append(`<option value=''>City</option>`);
                res.map(res=>{
                    $('#state').append(`<option value='${res.id}'>${res.name}</option>`)
                })
            },
            error:function(res){
            }
        });
    });

    $('#state').change(function(){
        $.ajax({
            url:`/admin/vendor/city/${$('#state').val()}`,
            type:'get',
            success:function(res){
                $('#city').empty();
                $('#city').append(`<option value=''>City</option>`);
                res.map(res=>{
                    $('#city').append(`<option value='${res.id}'>${res.name}</option>`)
                })
            },
            error:function(res){
            }
        });
    });
    opt_count = 1;
    $("#extra").hide();
    $(".option_section").hide();
    $("#cc_email").select2({
        maximumSelectionLength: 5,
        tags: true,
    });

});

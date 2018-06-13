$(function() {
    $("#email-signup").submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "http://aa-sendgrid-signup.azurewebsites.net/api/signup",
            data: { "email": $("#signup_email").val() },
            success: function(){
              $('#email-signup').trigger("reset");
              $('.success').fadeIn(1000);
            }
        });

        return false;
    });
});

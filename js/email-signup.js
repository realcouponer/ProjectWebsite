jQuery( document ).ready(function($) {
    $("#email-signup").submit(function(e) {
        e.preventDefault();
        console.log($("#signup_email").val());
        $.ajax({
            type: "POST",
            contentType: 'application/json; charset=UTF-8',
            url: "https://aa-sendgrid-signup.azurewebsites.net/api/sendverify",
            data: { "email": $("#signup_email").val(), "dev": true }
        })
        .done(function(success){
          console.log('success', success);
          $('#email-signup').trigger("reset");
          $('.message').html("Please check your inbox to confirm your email address. In case you can not find the confirmation email, please check your trash or junk mail folder.");
          $('.message').fadeIn(1000);
        })
        .fail(function(xhr, status, errorThrown){
          console.log('error', xhr, status, errorThrown);
          $('#email-signup').trigger("reset");
          $('.message').html("Error: " + status + ": " + errorThrown));
          $('.message').fadeIn(1000);
        });

        return false;
    });
});

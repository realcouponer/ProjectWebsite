jQuery( document ).ready(function($) {
    $("#email-signup").submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "http://aa-sendgrid-signup.azurewebsites.net/api/emailverify",
            data: { "email": $("#signup_email").val() }
        })
        .done(function(success){
          console.log('success', success);
          $('#email-signup').trigger("reset");
          $('.message').innerHTML("Please check your inbox to confirm your email address. In cse you can not find the confirmation email, please check your trash or junk mail folder.");
          $('.message').fadeIn(1000);
        })
        .fail(function(xhr, status, errorThrown){
          console.log('error', xhr, status, errorThrown);
          $('#email-signup').trigger("reset");
          $('.message').innerHTML("Error: " + status + ": " + errorThrown));
          $('.message').fadeIn(1000);
        });

        return false;
    });
});

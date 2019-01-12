jQuery( document ).ready(function($) {
    $("#email-signup").on('submit', function(e) {
        e.preventDefault();
        $("#email-submit").prop('disabled', true);
        $("#email-submit span").toggle();
        var email = $("#signup_email").val();
        $.ajax({
          method: "POST",
          url: "https://platform-api-dev.advancedalgos.net",
          contentType: "application/json",
          dataType: 'json',
          xhrFields: {
            'withCredentials': true
          },
          data: JSON.stringify({
            query: "mutation ($email: String!) {notifications_Corporate_NewsletterSignup(email: $email)}",
            variables: { "email": email }
          }),
          success: function (response, status) {
            console.log('success', response, status);
            $('#email-signup').trigger("reset");
            $('.signup-message').html("Please check your inbox to confirm your email address. In case you can not find the confirmation email, please check your trash or junk mail folder.");
            $('.signup-message').fadeIn(1000).delay(5000).fadeOut(1000);
            $('.signup-message').addClass("text-success");
            $("#email-submit").prop('disabled', false);
            $("#email-submit span").hide();
           },
           error: function (xOptions, textStatus) {
             console.log('error', xOptions, textStatus);
             if (textStatus === 'parsererror' && xOptions.status >= 200 && xOptions.status <= 300){
               $('#email-signup').trigger("reset");
               $('.signup-message').html("Please check your inbox to confirm your email address. In case you can not find the confirmation email, please check your trash or junk mail folder.");
               $('.signup-message').fadeIn(1000).delay(5000).fadeOut(1000);
               $('.signup-message').addClass("text-success");
               $("#email-submit").prop('disabled', false);
               $("#email-submit span").hide();
             } else {
               $('#email-signup').trigger("reset");
               $('.signup-message').html("Error: " + textStatus + ": " + xOptions.statusText);
               $('.signup-message').fadeIn(1000).delay(5000).fadeOut(1000);
               $('.signup-message').addClass("text-danger");
               $("#email-submit").prop('disabled', false);
               $("#email-submit span").hide();
             }
           }
          });
        return;
    });
});

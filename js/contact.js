jQuery( document ).ready(function($) {
    $(".contact_1").on('submit', function(e) {
        e.preventDefault();
        $(".contact_form_submit").prop('disabled', true);
        $(".contact_form_submit span").toggle();
        var email = $("#contact_form_email").val();
        var name = $("#contact_form_name").val();
        var message = $("#contact_form_message").val();
        var recaptcha = $("#g-recaptcha-response").val();
        var dev = 'false';

        $.ajax({
          method: "POST",
          url: "https://platform-api.superalgos.org/graphql",
          contentType: "application/json",
          dataType: 'json',
          xhrFields: {
            'withCredentials': true
          },
          data: JSON.stringify({
            query: "mutation ($email: String! $name: String! $message: String! $recaptcha: String!) { notifications_Corporate_Contact(email: $email message: $message name: $name recaptcha: $recaptcha) }",
            variables: { "email": email, "name": name, "message": message, "recaptcha": recaptcha}
          }),
          success: function (response, status) {
            //console.log('success', response, status);
            $('.contact_1').trigger("reset");
            $('.contact-message').html("Thank you for contacting us! We will be in touch soon.");
            $('.contact-message').fadeIn(1000).delay(5000).fadeOut(1000);
            $('.contact-message').addClass("text-success");
            $(".contact_form_submit").prop('disabled', false);
            $(".contact_form_submit span").hide();
           },
           error: function (xOptions, textStatus) {
             if (textStatus === 'parsererror' && xOptions.status >= 200 && xOptions.status <= 300){
               $('.contact_1').trigger("reset");
               $('.contact-message').html("Thank you for contacting us! We will be in touch soon.");
               $('.contact-message').fadeIn(1000).delay(5000).fadeOut(1000);
               $('.contact-message').addClass("text-success");
               $(".contact_form_submit").prop('disabled', false);
               $(".contact_form_submit span").hide();
             } else {
               $('.contact_1').trigger("reset");
               $('.contact-message').html("Error: " + textStatus + ": " + xOptions.statusText);
               $('.contact-message').fadeIn(1000).delay(5000).fadeOut(1000);
               $('.contact-message').addClass("text-danger");
               $(".contact_form_submit").prop('disabled', false);
               $(".contact_form_submit span").hide();
             }
           }
          });
        return;
    });
});

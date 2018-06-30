jQuery( document ).ready(function($) {
    $(".contact_1").on('submit', function(e) {
        e.preventDefault();
        $(".contact_form_submit").prop('disabled', true);
        $(".contact_form_submit span").toggle();
        var email = urlencode($("#contact_form_email").val());
        var name = urlencode($("#contact_form_name").val());
        var message = urlencode($("#contact_form_message").val());
        var dev = 'true';

        var url = if (dev !== 'true') ? 'https://aa-sendgrid-signup.azurewebsites.net/api/sendcontact/' : 'http://localhost:4000/api/sendcontact/';
        $.ajax({
            type: "GET",
            url: url + email + '/' + name + '/' + message + '/' + dev,
            crossDomain: true,
            dataType: 'jsonp',
          success: function (response, status) {
            //console.log('success', response, status);
            $('.contact_1').trigger("reset");
            $('.message').html("Thank you for contacting us! We will be in touch soon.");
            $('.message').fadeIn(1000).delay(5000).fadeOut(1000);
            $('.message').addClass("text-success");
            $(".contact_form_submit").prop('disabled', false);
            $(".contact_form_submit span").hide();
           },
           error: function (xOptions, textStatus) {
             if (textStatus === 'parsererror' && xOptions.status >= 200 && xOptions.status <= 300){
               $('.contact_1').trigger("reset");
               $('.message').html("Thank you for contacting us! We will be in touch soon.");
               $('.message').fadeIn(1000).delay(5000).fadeOut(1000);
               $('.message').addClass("text-success");
               $(".contact_form_submit").prop('disabled', false);
               $(".contact_form_submit span").hide();
             } else {
               $('.contact_1').trigger("reset");
               $('.message').html("Error: " + textStatus + ": " + xOptions.statusText);
               $('.message').fadeIn(1000).delay(5000).fadeOut(1000);
               $('.message').addClass("text-danger");
               $(".contact_form_submit").prop('disabled', false);
               $(".contact_form_submit span").hide();
             }
           }
          });
        return;
    });
});

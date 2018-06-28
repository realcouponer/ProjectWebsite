jQuery( document ).ready(function($) {
  console.log( $("#signup_email").val() );
    $("#email-signup").on('submit', function(e) {
        e.preventDefault();
        var email = $("#signup_email").val();
        $.ajax({
            type: "GET",
            url: "http://aa-sendgrid-signup.azurewebsites.net/api/sendverify/" + email + '?callback=?',
            dataType: 'jsonp',
          success: function (response, status) {
            //console.log('success', response, status);
            $('#email-signup').trigger("reset");
            $('.message').html("Please check your inbox to confirm your email address. In case you can not find the confirmation email, please check your trash or junk mail folder.");
            $('.message').fadeIn(1000);
            $('.message').addClass("text-success");
           },
           error: function (xOptions, textStatus) {
             if (textStatus === 'parsererror' && xOptions.status >= 200 && xOptions.status <= 300){
               $('#email-signup').trigger("reset");
               $('.message').html("Please check your inbox to confirm your email address. In case you can not find the confirmation email, please check your trash or junk mail folder.");
               $('.message').fadeIn(1000);
               $('.message').addClass("text-success");
             } else {
               $('#email-signup').trigger("reset");
               $('.message').html("Error: " + textStatus + ": " + xOptions.statusText);
               $('.message').fadeIn(1000);
               $('.message').addClass("text-danger");
             }
           }
          });
        return;
    });
});
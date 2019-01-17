jQuery( document ).ready(function($) {
  var regex = /email-verification.shtml/i;
  var staticURL = regex.test(document.URL);
  var param = document.URL.match(/token=([a-zA-Z0-9\.\-_]+)/)
  var token = '';

  if (staticURL && param !== null){
    token = (param.length > 0 && param[1] !== null && param[1] !== undefined) ? param[1] : '';
  } else{
    $('#verify-loader').toggle("slow");
    $('#verify-message').html("Nothing to verify. Please re-click your confirmation link or try signing up again");
    $('#resend_email_section').toggle("slow");
  }

   if(token !== ''){
     $.ajax({
       method: "POST",
       url: "https://platform-api.superalgos.org",
       contentType: "application/json",
       dataType: 'json',
       xhrFields: {
         'withCredentials': true
       },
       data: JSON.stringify({
         query: `mutation ($token: String!) {notifications_Corporate_NewsletterSignupVerify(token: $token)}`,
         variables: { "token": token }
       }),
       success: function (response, status) {
         console.log('success: ', response, status)
         $('#verify-message').html("Thank you! Your email address has been verified.");
         $('#verify-loader').toggle("slow");
        },
        error: function (xhr, status, text) {
          console.log('error: ', xhr, status, text)
          if (status === 'parsererror' && xhr.status >= 200 && xhr.status <= 300){
            $('#verify-message').html("Thank you! Your email address has been verified.");
            $('#verify-loader').toggle("slow");
          } else {
            $('#verify-message').html("We're sorry, there's been an error - " + xhr.status + ": " + status);
            $('#verify-loader').toggle("slow");
          }
        }
     });
   }
});

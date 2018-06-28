jQuery( document ).ready(function($) {
  var regex = /email-verification.shtml/i;
  var staticURL = regex.test(document.URL);
  console.log(document.URL, staticURL);
  var param = document.URL.match(/token=([a-zA-Z0-9\.\-_]+)/)
  var token = '';
  console.log(param);
  if (staticURL && param !== null){
      console.log(param, param[1]);
    token = (param.length > 0 && param[1] !== null && param[1] !== undefined) ? param[1] : '';
  } else{
    $('#verify-loader').toggle("slow");
    $('#verify-message').html("Nothing to verify. Please re-click your confirmation link or try signing up again");
    $('#resend_email_section').toggle("slow");
  }

   if(token !== ''){
     $.ajax({
       type: "GET",
       url: "https://aa-sendgrid-signup.azurewebsites.net/api/signup/" + token + '?callback=?',
       crossDomain: true,
       success: function (response, status) {
         $('#verify-message').html("Thank you! Your email address has been verified.");
         $('#verify-loader').toggle("slow");
        },
        error: function (xhr, status, text) {
          console.log(xhr, status, text);
          if (text === 'parsererror' && status >= 200 && status <= 300){
            $('#verify-message').html("Thank you! Your email address has been verified.");
            $('#verify-loader').toggle("slow");
          } else {
            $('#verify-message').html("We're sorry, there's been an error - " + status + ": " + text);
            $('#verify-loader').toggle("slow");
          }
        }
     });
   }
});

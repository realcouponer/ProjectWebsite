jQuery( document ).ready(function($) {
  var param = document.URL.match(/token=([a-zA-Z0-9.]+)/)
  var token = (param !== null && param.lenght > 0 && param[1] !== null || param[1] !== undefined) ? param[1] : '';

   if(token !== ''){
     $.ajax({
       type: "GET",
       url: "https://aa-sendgrid-signup.azurewebsites.net/api/signup/" + token + '?callback=?',
       dataType: 'jsonp',
       success: function (response, status) {
         $('#verify-message').html("Thank you! Your email address has been verified.");
        },
        error: function (xOptions, textStatus) {
          if (textStatus === 'parsererror' && xOptions.status >= 200 && xOptions.status <= 300){
            $('#verify-message').html("Thank you! Your email address has been verified.");
            $('#verify-loader').toggle("slow");
          } else {
            $('#verify-message').html("We're sorry, there's been an error - " + textStatus + ": " + xOptions);
            $('#verify-loader').toggle("slow");
          }
        }
     });
   }
});

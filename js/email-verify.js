jQuery( document ).ready(function($) {
  var param = document.URL.match(/token=([a-zA-Z0-9]+)/)
  var token = param[1];
   console.log('token: ', token);

   if(token !== ''){
     $.ajax({
       type: "POST",
       contentType: 'application/json; charset=UTF-8',
       url: "https://aa-sendgrid-signup.azurewebsites.net/api/signup",
       data: { "token": token, "dev": true }
     })
     .done(function(success){
       console.log('success', success);
       $('#verify-message').html("Thank you! Your email address has been verified.");
       $('#verify-loader').toggle("slow");
     })
     .fail(function(xhr, status, errorThrown){
       console.log('error', xhr, status, errorThrown);
       $('#verify-message').html("We're sorry, there's been an error - " + status + ": " + errorThrown);
       $('#verify-loader').toggle("slow");
     });
   }
});

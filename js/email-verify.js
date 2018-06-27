jQuery( document ).ready(function($) {
   var p={};
   var token = '';
   location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(s,k,v){token = p['token']})
   console.log('token: ', token);

   if(token !== ''){
     $.ajax({
       type: "POST",
       url: "http://aa-sendgrid-signup.azurewebsites.net/api/emailverify",
       data: { "token": token }
     })
     .done(function(success){
       console.log('success', success);
       $('#verify-message').innerHTML("Thank you! Your email address has been verified.");
     })
     .fail(function(xhr, status, errorThrown){
       console.log('error', xhr, status, errorThrown);
       $('#verify-message').innerHTML("We're sorry, there's been an error - " + status + ": " + errorThrown);
     });
   }
});

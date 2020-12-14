<?php
require('constant.php');
?>

<?php include 'includes/doctype.shtml';?>

<head>
    <title>Contact the Superalgos Project</title>
    <meta name="description" content="Get in touch with the Superalgos Core Team. We'd love to hear from you!">
    <meta charset="utf-8">

    <?php include 'includes/headlinks.shtml';?>

    <script src="component/jquery/jquery-3.2.1.min.js"></script>
	<script>
	$(document).ready(function (e){
		$("#frmContact").on('submit',(function(e){
			e.preventDefault();
			$("#mail-status").hide();
			$('#send-message').hide();
			$('#loader-icon').show();
			$.ajax({
				url: "contact.php",
				type: "POST",
				dataType:'json',
				data: {
				"name":$('input[name="name"]').val(),
				"email":$('input[name="email"]').val(),
				"phone":$('input[name="phone"]').val(),
				"content":$('textarea[name="content"]').val(),
				"g-recaptcha-response":$('textarea[id="g-recaptcha-response"]').val()},				
				success: function(response){
				$("#mail-status").show();
				$('#loader-icon').hide();
				if(response.type == "error") {
					$('#send-message').show();
					$("#mail-status").attr("class","error");				
				} else if(response.type == "message"){
					$('#send-message').hide();
					$("#mail-status").attr("class","success");							
				}
				$("#mail-status").html(response.text);	
				},
				error: function(){} 
			});
		}));
	});
	</script>

<script src='https://www.google.com/recaptcha/api.js'></script>	

</head>
<body>
    <!--[if lt IE 7]>
        <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
    <![endif]-->

    <div id="box_wrapper" class="landing_page header_style_1 header_wrapper_height_auto slider_style_1">

    <?php include 'includes/header.shtml';?>
    <?php include 'includes/header-logo-dark-bg.shtml';?>
    <?php include 'includes/header2.shtml';?>


        <section id="mainslider" class="fullwidth no_padding_container no_margin_col">
            <div class="container">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="flexslider slider_height_max">
                            <ul class="slides text-center">
                                <li>
                                    <img src="img/photos/contacts.jpg" alt="">
                                    <div class="slide_description_wrapper slider_textblock_center">
                                        <div class="slide_description to_animate">
                                            <div data-animation="fadeInUp" align="center">
                                                <div>
                                                    <div style="padding: 0 15px 0 15px;">
                                                        <h2>
                                                            
                                                        </h2>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="contacts_section" class="light_section">
            <div class="container">
                <div class="row text-center">
                    <div class="col-sm-12">
                        <h1 class="sc_title">Share Your Thoughs</h1>
                        <h5 class="sc_title sc_title_underline">We'd love to hear from you</h5>

                        <div id="message" class="sc_contact_form sc_contact_form_contact contact_form_1">
                            <form id="frmContact" action="" method="POST" novalidate="novalidate">
                                <div class="columnsWrap">
                                    <div class="quote_form">
                                        <label class="required" for="contact_form_username">Name</label>
                                        <input type="text" id="name" name="name" placeholder="Your name"  aria-required="true" required>
                                    </div>
                                    <div class="quote_form">
                                        <label class="required" for="contact_form_email">E-mail</label>
                                        <input type="text" id="email" name="email" placeholder="Your e-mail"  aria-required="true" required>
                                    </div>
                                </div>
                                <div class="contact_message">
                                    <div class="">
                                        <label class="required" for="contact_form_message">Message</label>
                                        <textarea id="comment-content" name="content" class="textAreaSize" placeholder="Message"></textarea>
                                    </div>
                                </div>
                                <div class="contact-message" style="margin-top:1em; font-size:1.4em;display:none;"></div>
                                <div class="sc_contact_form_button">

                                    <div class="squareButton big">
                                        <div class="g-recaptcha" data-sitekey="<?php echo SITE_KEY; ?>"></div></br>
                                        <div id="mail-status" class="contact-message"></div></br>
                                        <button type="submit" id="send-message" class="contact_form_submit"><span class="glyphicon glyphicon-refresh animate-spin" style="display:none;"></span> SEND THE MESSAGE</button>
                                    </div>
                                </div>

                            </form>
                            <div id="loader-icon" style="display:none;"><img src="img/loader.gif" /></div>
                        </div>
                        </br></br>




                    </div>
                </div>

            </div>
    </div>
    </section>

    <?php include 'includes/footer.shtml';?>
    <?php include 'includes/preloader.shtml';?>

</body>
</html>

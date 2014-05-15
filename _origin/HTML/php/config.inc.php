<?php
// SMTP Server Settings
$config['smtp_host'] 			= 'ssl://smtp.gmail.com';   // eg.: smtp.mandrillapp.com
$config['smtp_port'] 			= 465;						// eg.: 587
$config['smtp_user'] 			= ''; 						// you@gmail.com
$config['smtp_pass'] 			= '';						// password
$config['smtp_ssl']				= false;					// should remain false

// Who receive all emails?
$config['send_to']				= 'you@gmail.com';			// destination of all emails sent throught contact form

// Email Subject
$config['subject']				= 'Contact Form';			// subject of emails you receive
?>
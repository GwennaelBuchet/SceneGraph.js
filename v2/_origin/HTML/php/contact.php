<?php
/** ****************************************** **
 *	@CONTACT FORM 	V1.0.0
 *	@AUTHOR			Dorin Grigoras
 *	@DATE			Saturday, November 23, 2013
 ** ****************************************** **/
	@ini_set('display_errors', 0);
	@ini_set('track_errors', 0);
	@date_default_timezone_set('Europe/Bucharest'); // Used only to avoid annoying warnings.

	if($_REQUEST['action'] = 'email_send') {

		$array['name'] 		= isset($_REQUEST['name']) 		? strip_tags(trim($_REQUEST['name'])) 							: '';
		$array['email']		= isset($_REQUEST['email']) 	? ckmail($_REQUEST['email']) 									: '';
		$array['subject'] 	= isset($_REQUEST['subject']) 	? strip_tags(trim($_REQUEST['subject'])) 						: '-';
		$array['message'] 	= isset($_REQUEST['message']) 	? (trim(strip_tags($_REQUEST['message'], '<b><a><strong>')))	: '';

		// Check required fields
		if($array['name'] == '' || $array['email'] == '' || $array['message'] == '')
			die('_required_');

		// Check email
		if($array['email'] === false)
			die('_invalid_email_');

		// Visitor IP:
		$ip = ip();

		// DATE
		$date = date('l, d F Y , H:i:s');

		// BEGIN
		require('config.inc.php');
		require('phpmailer/5.1/class.phpmailer.php');

		$m = new PHPMailer();
		$m->IsSMTP();
		$m->SMTPDebug  	= false;					// enables SMTP debug information (for testing) [default: 2]
		$m->SMTPAuth   	= true;						// enable SMTP authentication
		$m->Host       	= $config['smtp_host']; 	// sets the SMTP server
		$m->Port       	= $config['smtp_port'];		// set the SMTP port for the GMAIL server
		$m->Username   	= $config['smtp_user'];		// SMTP account username
		$m->Password   	= $config['smtp_pass'];		// SMTP account password
		$m->SingleTo   	= true;
		$m->CharSet    	= "UTF-8";
		$m->Subject 	= ($array['subject'] == '-') ? $config['subject'] : $array['subject'];
		$m->AltBody 	= 'To view the message, please use an HTML compatible email viewer!';

		$m->AddAddress($config['send_to'], 'Contact Form');
		$m->AddReplyTo($array['email'], $array['name']);
		$m->SetFrom($config['smtp_user'], 'Contact Form');
		$m->MsgHTML("
			<b>Date:</b> {$date} <br> 
			<b>Name:</b> {$array['name']}<br>
			<b>Email:</b> {$array['email']}<br>
			<b>Subject:</b> {$array['subject']}<br>
			<b>Message:</b> {$array['message']}<br>
			---------------------------------------------------<br>
			IP: {$ip}
		");

		if($config['smtp_ssl'] === true)
			$m->SMTPSecure = 'ssl';					// sets the prefix to the server

		// @SEND MAIL
		if($m->Send()) {
			die('_sent_ok_'); 
		} else {
			die($m->ErrorInfo); 
		}

		unset($array, $m);
	}

/** ********************************** 
 @CHECK EMAIL
/** ******************************* **/
	function ckmail($email) {
		$email = trim(strtolower($email));
		if(preg_match('/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/',trim($email))){
			return $email;
		} else { return false; }
	}

 /** ********************************** 
 @VISITOR ip
/** ******************************* **/
	function ip() {
		if     (getenv('HTTP_CLIENT_IP'))       { $ip = getenv('HTTP_CLIENT_IP');       } 
		elseif (getenv('HTTP_X_FORWARDED_FOR')) { $ip = getenv('HTTP_X_FORWARDED_FOR'); } 
		elseif (getenv('HTTP_X_FORWARDED'))     { $ip = getenv('HTTP_X_FORWARDED');     } 
		elseif (getenv('HTTP_FORWARDED_FOR'))   { $ip = getenv('HTTP_FORWARDED_FOR');   } 
		elseif (getenv('HTTP_FORWARDED'))       { $ip = getenv('HTTP_FORWARDED');       } 
										   else { $ip = $_SERVER['REMOTE_ADDR'];        } 
		return $ip;
	}
?>
<?php
/** ****************************************** **
 *	@CONTACT FORM 	V1.0.0
 *	@AUTHOR			Dorin Grigoras
 *	@DATE			Tuesday, January 14, 2014
 ** ****************************************** **/
	@ini_set('display_errors', 0);
	@ini_set('track_errors', 0);
	@date_default_timezone_set('Europe/Bucharest'); // Used only to avoid annoying warnings.

	if($_REQUEST['action'] = 'newsletter_subscribe') {

		$array['email']	= isset($_REQUEST['email']) ? ckmail($_REQUEST['email']) : '';

		// Check required fields
		if($array['email'] == '')
			die('_required_');

		// Check email
		if($array['email'] === false)
			die('_invalid_email_');

		$fh = fopen('_newsletter.txt', 'a+');
		fwrite($fh, "\n" . $array['email']);
		fclose($fh);

		die('_ok_');
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
?>
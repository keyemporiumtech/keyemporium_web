export interface RecaptchaVerifyInterface {
	success?: boolean;
	challenge_ts?: any; // timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
	hostname?: string; // the hostname of the site where the reCAPTCHA was solved
	errorcodes?: string[];
}

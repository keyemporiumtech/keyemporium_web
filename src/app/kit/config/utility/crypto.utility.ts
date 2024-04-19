import * as CryptoJS from 'crypto-js';

export class CryptoUtility {
	static encryptAES(value: string, iv: string, passphrase: string): string {
		const key = CryptoJS.enc.Hex.parse(passphrase);
		const ivkey = CryptoJS.enc.Hex.parse(iv);
		const encrypted = CryptoJS.AES.encrypt(value, key, {
			iv: ivkey,
			padding: CryptoJS.pad.ZeroPadding,
		});
		return encrypted.toString();
	}

	static decryptAES(value: string, iv: string, passphrase: string): string {
		const key = CryptoJS.enc.Hex.parse(passphrase);
		const ivkey = CryptoJS.enc.Hex.parse(iv);
		const decrypted = CryptoJS.AES.decrypt(value, key, {
			iv: ivkey,
			padding: CryptoJS.pad.ZeroPadding,
		});
		return decrypted.toString(CryptoJS.enc.Utf8);
	}

	static encodeBase64(value: string) {
		return btoa(value);
	}
	static decodeBase64(value: string) {
		return atob(value);
	}
	static encryptSHA1(value: string): string {
		return CryptoJS.SHA1(value).toString(CryptoJS.enc.Hex);
	}

	/**
	 * Pseudo-random string generator
	 * http://stackoverflow.com/a/27872144/383904
	 * Default: return a random alpha-numeric string
	 *
	 * @param {Integer} len Desired length
	 * @param {String} an Optional (alphanumeric), "a" (alpha), "n" (numeric)
	 * @return {String}
	 */
	static randomString(len: number, an?: string) {
		an = an && an.toLowerCase();
		var str = '',
			i = 0,
			min = an == 'a' ? 10 : 0,
			max = an == 'n' ? 10 : 62;
		for (; i++ < len; ) {
			var r = (Math.random() * (max - min) + min) << 0;
			str += String.fromCharCode((r += r > 9 ? (r < 36 ? 55 : 61) : 48));
		}
		return str;
	}
}

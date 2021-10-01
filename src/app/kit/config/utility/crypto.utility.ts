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
}

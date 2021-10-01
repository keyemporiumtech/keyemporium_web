import { CryptoUtility, DateModel } from '@ddc/kit';
import { TokenDecodeInterface } from '../interfaces/token-decode.interface';
import { PayloadInterface } from '../interfaces/payload.interface';
import { ExpirationInfo } from '../interfaces/expiration-info.interface';

export class AuthUtility {
	/**
	 * Decodifica un token e si aspetta il seguente metodo di compilazione del token
	 * header: base64
	 * {alg: tipo algoritmo, type: nome algoritmo}
	 * payload: base64
	 * {iss: nome server, aud: client id, iat: time creazione, nbf: time inizio validita, exp: time fine validità, data: informazioni utente}
	 *
	 * Il token è valido se il nome del server corrisponde a servername.
	 *
	 * Ritorna un oggetto
	 * {auth: true o false, message: valid o not_valid, header: info algoritmo, payload: info di sistema, token: token ricevuto}
	 * @param tokenauth token da decodificare
	 * @param servername nome del server da verificare
	 */
	static decodeTokenAuth(tokenauth: string, servername: string): TokenDecodeInterface {
		if (!tokenauth) {
			return {
				auth: false,
				message: 'TOKEN_EMPTY',
				header: undefined,
				payload: undefined,
				token: undefined,
				tokenSended: tokenauth,
			};
		}
		const tokenSplit: string[] = tokenauth.split('.');
		if (!tokenSplit || tokenSplit.length !== 3) {
			return {
				auth: false,
				message: 'TOKEN_NOT_SPLITTED',
				header: undefined,
				payload: undefined,
				token: undefined,
				tokenSended: tokenauth,
			};
		}
		const headerReceived = tokenSplit[0];
		const payloadReceived = tokenSplit[1];
		const tokenReceived = tokenSplit[2];
		const payload: any = JSON.parse(CryptoUtility.decodeBase64(payloadReceived));
		const verify = payload.iss === servername;
		return {
			auth: verify,
			message: verify ? 'TOKEN_VALID' : 'TOKEN_NOT_VALID',
			header: JSON.parse(CryptoUtility.decodeBase64(headerReceived)),
			payload: payload,
			token: tokenReceived,
			tokenSended: tokenauth,
		};
	}

	static getExpirationInfo(payload: PayloadInterface): ExpirationInfo {
		return payload
			? {
					createAt: new DateModel(payload.iat * 1000),
					startAt: new DateModel(payload.nbf * 1000),
					expireAt: new DateModel(payload.exp * 1000),
			  }
			: undefined;
	}
}

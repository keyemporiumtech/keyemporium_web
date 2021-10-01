export interface PayloadInterface {
	iss: string; // server name
	aud: string; // client id
	iat: number; // creato il
	nbf: number; // inizio validità
	exp: number; // fine validità
	data: any;
}

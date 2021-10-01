export class IbanUtility {
	static getCodIsoByIban(iban: string) {
		return iban.substring(0, 2);
	}
}

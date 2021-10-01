export class BehaviourObserverModel {
	private _actionPre: () => any; // usato prima di eseguire un Observable
	private _actionResponse: (res: any) => any; // usato quando l'Observable termina correttamente
	private _actionError: (err: any) => any; // usato quando l'Observable termina con errore
	private _actionResponseOk?: (input?: any) => any;
	private _actionResponseKo?: (input?: any) => any;

	constructor(
		actionPre?: () => any,
		actionResponse?: (res: any) => any,
		actionError?: (err: any) => any,
		actionResponseOk?: (input: any) => any,
		actionResponseKo?: (input: any) => any,
	) {
		this.actionPre = actionPre;
		this.actionResponse = actionResponse;
		this.actionError = actionError;
		this.actionResponseOk = actionResponseOk;
		this.actionResponseKo = actionResponseKo;
	}

	get actionPre(): () => any {
		return this._actionPre;
	}

	set actionPre(value: () => any) {
		this._actionPre = value;
	}

	get actionResponse(): (res: any) => any {
		return this._actionResponse;
	}

	set actionResponse(value: (res: any) => any) {
		this._actionResponse = value;
	}

	get actionError(): (err: any) => any {
		return this._actionError;
	}

	set actionError(value: (err: any) => any) {
		this._actionError = value;
	}

	get actionResponseOk(): (input?: any) => any {
		return this._actionResponseOk;
	}

	set actionResponseOk(value: (input?: any) => any) {
		this._actionResponseOk = value;
	}

	get actionResponseKo(): (input?: any) => any {
		return this._actionResponseKo;
	}

	set actionResponseKo(value: (input?: any) => any) {
		this._actionResponseKo = value;
	}
}

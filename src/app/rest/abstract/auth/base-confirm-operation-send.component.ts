import { BaseComponent, BehaviourObserverModel } from '@ddc/kit';
import { Observable, Subscription } from 'rxjs';
import { OnDestroy, Input, Directive } from '@angular/core';

/**
 * Da estendere per creare un componente che invia un codice di verifica per l'autorizzazione di una determinata operazione
 */
@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export abstract class BaseConfirmOperationSendComponent extends BaseComponent implements OnDestroy {
	// sub
	subSend: Subscription;

	ngOnDestroy() {
		if (this.subSend) {
			this.subSend.unsubscribe();
		}
		super.ngOnDestroy();
	}

	send() {
		this.sendConfirmOperationBehaviour().actionPre();
		this.subSend = this.fnSendConfirmOperation().subscribe(
			(res) => {
				this.sendConfirmOperationBehaviour().actionResponse(res);
			},
			(err) => {
				this.sendConfirmOperationBehaviour().actionError(err);
			},
		);
	}
	/**
	 * Chiamata rest per l'invio della richiesta di un codice di autorizzazione
	 */
	abstract fnSendConfirmOperation(): Observable<any>;
	abstract sendConfirmOperationBehaviour(): BehaviourObserverModel;
}

import { BaseComponent, BehaviourObserverModel } from '@ddc/kit';
import { Observable, Subscription } from 'rxjs';
import { OnDestroy, Input, Directive } from '@angular/core';

/**
 * Da estendere per creare un componente che verifica un codice inviato per autorizzare operazione
 */
@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export abstract class BaseConfirmOperationVerifyComponent
	extends BaseComponent
	implements OnDestroy
{
	// sub
	subVerify: Subscription;

	ngOnDestroy() {
		if (this.subVerify) {
			this.subVerify.unsubscribe();
		}
		super.ngOnDestroy();
	}

	verify() {
		this.verifyOperationBehaviour().actionPre();
		this.subVerify = this.fnVerifyOperation().subscribe(
			(res) => {
				this.verifyOperationBehaviour().actionResponse(res);
			},
			(err) => {
				this.verifyOperationBehaviour().actionError(err);
			},
		);
	}
	/**
	 * Chiamata rest per l'invio della richiesta di un codice di autorizzazione
	 */
	abstract fnVerifyOperation(): Observable<any>;
	abstract verifyOperationBehaviour(): BehaviourObserverModel;
}

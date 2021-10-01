import { Injectable } from '@angular/core';
import { BaseService } from '../../abstract/base.service';
import { ApplicationLoggerService } from '../../logger/services/application-logger.service';
import { Subject, Observable } from 'rxjs';
import { MessageModel } from '../models/message.model';
import { RouteUrlModel } from '../../routing/models/route-url.model';
import { ApplicationStorageService } from '../../storage/services/application-storage.service';
import { PreviousRouteService } from '../../routing/services/previous-route.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
	providedIn: 'root',
})
export class MessageService extends BaseService {
	private _environment: any;
	// component
	subjects: any[] = [];
	private subject = new Subject<any>();

	constructor(
		applicationLogger: ApplicationLoggerService,
		private applicationStorage: ApplicationStorageService,
		private previousRoute: PreviousRouteService,
		private translateService: TranslateService,
	) {
		super(applicationLogger);
		this.environment = this.applicationLogger.environment;
	}

	getClassName(): string {
		return 'MessageService';
	}

	// - SUBJECT

	/**
	 * Se viene passato un id del componente, allora aggiunge un subject alla lista dei subjects.
	 * @param idComponent id del componente in ascolto
	 */
	instanceSubjectComponent(idComponent?: string) {
		if (idComponent) {
			const comp = this.subjects.find((el) => el.id === idComponent);
			if (!comp) {
				const newSubject: any = { id: idComponent, subject: new Subject<any>() };
				this.subjects.push(newSubject);
			}
		}
	}

	/**
	 * Se viene passato un id del componente, allora ritorna il subject corrispondente nella lista dei subjects.
	 * Altrimenti ritorna il subject principale
	 * @param idComponent id del componente in ascolto
	 */
	currentSubject(idComponent?: string) {
		if (!idComponent) {
			return this.subject;
		}
		const comp = this.subjects.find((el) => el.id === idComponent);
		if (!comp) {
			return this.subject;
		}
		return comp.subject;
	}

	sendSubjectMessage(message: MessageModel, idComponent?: string) {
		this.currentSubject(idComponent).next({ message: message });
	}

	clearSubjectMessage(idComponent?: string) {
		this.currentSubject(idComponent).next();
	}

	getSubjectMessage(idComponent?: string): Observable<any> {
		return this.currentSubject(idComponent).asObservable();
	}

	// - ROUTING
	sendRoutingMessage(message: MessageModel, back?: RouteUrlModel, to?: RouteUrlModel) {
		if (!to && this.environment.url.message) {
			to = new RouteUrlModel(this.environment.url.message);
		} else if (!to && !this.environment.url.message) {
			alert(
				'non è stata definita nessuna pagina a cui inviare il message.' +
					'\nValorizzare il parametro to della chiamata sendRouting oppure definire il parametro url.message in environment',
			);
		}

		if (to) {
			this.clearRoutingMessage();
			this.applicationStorage.messageCode.set(message.code ? message.code.toString() : '');
			this.applicationStorage.messageException.setTranslate(
				message.exception,
				this.translateService,
			);
			this.applicationStorage.messageText.setTranslate(message.text, this.translateService);
			this.applicationStorage.messageTitle.setTranslate(message.title, this.translateService);
			this.applicationStorage.messageType.set(message.type.toString());
			if (!back && this.environment.url.home) {
				back = new RouteUrlModel(this.environment.url.home);
			} else if (!back && !this.environment.url.home) {
				alert(
					'non è stata definita nessuna pagina di ritorno dal message.' +
						'\nValorizzare il parametro back della chiamata sendRouting oppure definire il parametro url.home in environment',
				);
			}
			if (back) {
				this.previousRoute.navigateStore(to, back);
			}
		}
	}

	clearRoutingMessage() {
		this.applicationStorage.messageCode.del();
		this.applicationStorage.messageException.del();
		this.applicationStorage.messageText.del();
		this.applicationStorage.messageTitle.del();
		this.applicationStorage.messageType.del();
	}

	/**
	 * Getter environment
	 * @return any
	 */
	public get environment(): any {
		return this._environment;
	}

	/**
	 * Setter environment
	 * @param any value
	 */
	public set environment(value: any) {
		this._environment = value;
	}
}

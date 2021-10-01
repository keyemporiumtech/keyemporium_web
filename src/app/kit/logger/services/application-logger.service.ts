import { Injectable, Inject } from '@angular/core';
import { EnvironmentLoaderService } from '../../config/services/environment-loader.service';
import { LoggerWriter } from './logger.service';
import { MessageModel } from '../../message/models/message.model';
import { FormGroup } from '@angular/forms';

@Injectable({
	providedIn: 'root',
})
export class ApplicationLoggerService {
	private _environment: any;

	constructor(private _environmentLoader: EnvironmentLoaderService) {
		// console.error('ApplicationLoggerService: ' + Math.random());
		this.environment = this._environmentLoader.getEnvironment();
		// this.environment = environment;
	}

	logConstructor(log: LoggerWriter, className: string, id: any) {
		if (this.environment.logger.constructors) {
			log.messageColor(
				this.environment.logger.color.constructor,
				'Created ' + className + ' with ID=' + id,
			);
		}
	}

	// storage : InnerStorageService
	logStorageAdd(log: LoggerWriter, key: string) {
		if (this.environment.logger.storage) {
			log.info('Setted into storage key = ' + key);
		}
	}
	logStorageRemove(log: LoggerWriter, key: string) {
		if (this.environment.logger.storage) {
			log.info('Removed by storage key = ' + key);
		}
	}

	// locale : LocaleService
	logSystemLanguageSet(log: LoggerWriter, cod: string) {
		log.info('Language setted ' + cod);
	}
	logSystemCurrencySet(log: LoggerWriter, cod: string) {
		log.info('Currency setted ' + cod);
	}
	logSystemNationSet(log: LoggerWriter, cod: string) {
		log.info('Nation setted ' + cod);
	}

	// message : MessageService
	logMessageSubjectReceived(log: LoggerWriter, idComponent: string, message: MessageModel) {
		log.info('Message Received by ' + idComponent, message);
	}

	// wizard : WizardBaseComponent - form : FormBaseComponent
	logFormModelToSave(log: LoggerWriter, model: any) {
		if (this.environment.enable.debugMode) {
			log.info('sto salvando il model', model);
		}
	}
	logWizardStepValidation(log: LoggerWriter, indexStep: number, formStep: FormGroup) {
		if (this.environment.enable.debugMode) {
			log.info('Valutazione step ' + indexStep, formStep);
		}
	}

	// readFile : FileService
	logFileServiceReadFile(log: LoggerWriter, blob: any) {
		if (this.environment.logger.response) {
			log.info('File letto', blob);
		}
	}

	// REST: BaseChatSocketService
	logChatSocketOpenReceived(log: LoggerWriter, resourceId: string, token: string) {
		if (this.environment.logger.security) {
			log.messageColor(
				this.environment.logger.color.security,
				'Connesso al socket con resourceId:' + resourceId + ' e token:' + token,
			);
		}
	}
	logChatSocketAuthSended(log: LoggerWriter, userId: string) {
		if (this.environment.logger.security) {
			log.messageColor(
				this.environment.logger.color.security,
				"Invio al socket token di verifica dall'utente:" + userId,
			);
		}
	}
	logSocketError(log: LoggerWriter, err: any) {
		log.error('Si è verificato un errore dal socket', err);
	}
	logSocketComplete(log: LoggerWriter) {
		log.error('Comunicazione con il socket chiusa');
	}

	// REST: BaseInfoServerService
	logInfoServerTimezone(log: LoggerWriter, timezone: string, key: string) {
		if (this.environment.enable.debugMode) {
			log.info('Timezone server settato in localStorage ' + key + '=' + timezone);
		}
	}
	logInfoServerTimezoneName(log: LoggerWriter, timezoneName: string, key: string) {
		if (this.environment.enable.debugMode) {
			log.info('Nome del Timezone server settato in localStorage ' + key + '=' + timezoneName);
		}
	}

	/**
	 * Assegna al logWriter della classe i colori definiti in environment.logger.color.component per le chiamate info(), debug() ed error()
	 * @param log oggetto logWriter della classe
	 */
	paintComponent(log: LoggerWriter) {
		this.paintMe(
			log,
			this.environment.logger.color.component.info,
			this.environment.logger.color.component.debug,
			this.environment.logger.color.component.error,
		);
	}

	/**
	 * Assegna al logWriter della classe i colori definiti in environment.logger.color.service per le chiamate info(), debug() ed error()
	 * @param log oggetto logWriter della classe
	 */
	paintService(log: LoggerWriter) {
		this.paintMe(
			log,
			this.environment.logger.color.service.info,
			this.environment.logger.color.service.debug,
			this.environment.logger.color.service.error,
		);
	}

	// utils

	/**
	 * Assegna ad un logWriter i colori da utilizzare per le chiamate info(), debug() ed error()
	 * @param log oggetto LogWriter
	 * @param info colore da utilizzare per i messaggi in info()
	 * @param debug colore da utilizzare per i messaggi in debug()
	 * @param error colore da utilizzare per i messaggi in error()
	 */
	paintMe(log: LoggerWriter, info: string, debug: string, error: string) {
		log.colorInfo = info;
		log.colorDebug = debug;
		log.colorError = error;
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

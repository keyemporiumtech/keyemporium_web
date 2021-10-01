import { BaseClassModel } from './base-class.model';
import { ApplicationLoggerService } from '../logger/services/application-logger.service';

export abstract class BaseService extends BaseClassModel {
	resetStorage: boolean; // da usare per resettare le variabili di inner storage quando vanno in errore
	constructor(applicationLogger: ApplicationLoggerService) {
		super(applicationLogger);
		this.applicationLogger.paintService(this.log);
	}
}

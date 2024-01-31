import { ApplicationLoggerService } from '../logger/services/application-logger.service';
import { LoggerService, LoggerWriter } from '../logger/services/logger.service';
import { StringTranslate } from '../translation/models/string-translate.model';
import { BaseIdModel } from './base-id.model';

export abstract class BaseClassModel extends BaseIdModel {
	log: LoggerWriter;
	applicationLogger: ApplicationLoggerService;

	constructor(applicationLoggerService: ApplicationLoggerService) {
		super();
		this.log = LoggerService.getLogger(this.getClassName());
		this.applicationLogger = applicationLoggerService;
		this.applicationLogger.logConstructor(this.log, this.getClassName(), this.getId());
	}

	loggami(first?: string) {
		this.log.info(first ? first : '', this.getClassName() + ' ID: ' + this.getId());
	}
	translateKey(obj: string | StringTranslate) {
		if (obj instanceof StringTranslate) {
			return obj.key;
		}
		return obj;
	}
	translateParams(obj: string | StringTranslate) {
		if (obj instanceof StringTranslate) {
			return obj.params;
		}
		return undefined;
	}

	abstract getClassName(): string;
}

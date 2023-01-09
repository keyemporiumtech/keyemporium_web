import { LoggerWriter, LoggerService } from '../logger/services/logger.service';
import { StringTranslate } from '../translation/models/string-translate.model';
import { ApplicationLoggerService } from '../logger/services/application-logger.service';

export abstract class BaseClassModel {
	id: string;
	log: LoggerWriter;
	applicationLogger: ApplicationLoggerService;

	constructor(applicationLoggerService: ApplicationLoggerService) {
		this.log = LoggerService.getLogger(this.getClassName());
		this.applicationLogger = applicationLoggerService;
		this.id = Math.random().toString(36).replace('0.', '');
		this.applicationLogger.logConstructor(this.log, this.getClassName(), this.getId());
	}

	getId(): string {
		return this.id;
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

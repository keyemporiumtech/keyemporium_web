import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class LoggerService {
	private static _instance: LoggerService = LoggerService.getInstance();

	private oldConsole: any;

	private loggersWriters: any;

	private loggersConfiguration: any;

	private isActive: boolean = false;

	private infoStyle: string = 'border: 0px solid DarkBlue; color: DarkBlue ; padding:2px';

	private autoActive = false;

	static getOldConsole(): any {
		return LoggerService.getInstance().oldConsole;
	}
	/**
	 * Shortcut for have a logger
	 */
	static getLogger(name: string): LoggerWriter {
		return LoggerService.getInstance().getLogger(name);
	}
	/**
	 * Return a shared instance of Logger Service
	 */
	static getInstance(): LoggerService {
		if (!LoggerService._instance) {
			LoggerService._instance = new LoggerService();

			// oh my remote controller
			window['log'] = window['LoggerService'] = {
				list: LoggerService._instance.getLoggersAvailable,
				active: LoggerService._instance.activeLogger,
				disable: LoggerService._instance.disableLogger,
				on: () => {
					LoggerService._instance.toggleLogger(true);
				},
				off: () => {
					LoggerService._instance.toggleLogger(false);
				},
				autoActiveNewLogger: (auto = true) => {
					LoggerService._instance.autoActiveNewLogger(auto);
				},
				activeAll: LoggerService._instance.activeAll,
				disableAll: LoggerService._instance.disableAll,
				help: LoggerService._instance.help,
			};
		}
		return LoggerService._instance;
	}

	constructor() {
		// take the console away
		this.oldConsole = {
			log: window.console.log,
			error: window.console.error,
			warn: window.console.warn,
		};
		// and disable it (no more)
		this.disableConsole();

		// load actual configuration
		const conf = localStorage.getItem('logger-active');
		this.loggersConfiguration = conf ? JSON.parse(conf) : {};
		this.loggersWriters = {};
		this.isActive = true; // !environment.production;
		this.toggleLogger(this.isActive);
		this.oldConsole.log('%c To understand how use LoggerService write log.help()', this.infoStyle);
	}

	getLogger(loggerName: string, color?: string) {
		let writer = this.loggersWriters[loggerName];

		if (!this.loggersConfiguration[loggerName] && !this.autoActive) {
			this.loggersConfiguration[loggerName] = false;
		} else {
			this.loggersConfiguration[loggerName] = true;
		}

		if (!writer) {
			writer = new LoggerWriter();
			writer.name = loggerName;
			writer.color = color || 'green';
			this.injectWriter(writer, this.loggersConfiguration[loggerName]);
			this.loggersWriters[loggerName] = writer;
		}

		return writer;
	}

	private info(who: string, mainMessage: string, color: string, params: any[]) {
		let args = [
			'%cLOG   ' + who + ': ' + '%c' + mainMessage,
			'color:' + color + ';font-weight:800',
			'color:#666',
		];
		args = args.concat(params);
		this.oldConsole.log.apply(this.oldConsole.log, args);
	}

	private debug(who: string, mainMessage: string, color: string, params: any[]) {
		let args = [
			'%cDEBUG   ' + who + ': ' + '%c' + mainMessage,
			'color:' + color + ';font-weight:800',
			'color:#666',
		];
		args = args.concat(params);
		this.oldConsole.warn.apply(this.oldConsole.log, args);
	}

	private error(who: string, mainMessage: string, color: string, params: any[]) {
		let args = [
			'%cERROR   ' + who + ': ' + '%c' + mainMessage,
			'color:' + color + ';font-weight:800',
			'color:#666',
		];
		args = args.concat(params);
		this.oldConsole.error.apply(this.oldConsole.log, args);
	}

	getLoggersAvailable = () => {
		this.oldConsole.log('%c Actual configuration:', this.infoStyle, this.loggersConfiguration);
	};

	activeLogger = (loggerName: string) => {
		if (loggerName === 'console') {
			this.activeConsole();
			return;
		}
		this.loggersConfiguration[loggerName] = true;
		localStorage.setItem('logger-active', JSON.stringify(this.loggersConfiguration));
		this.injectWriter(this.loggersWriters[loggerName], this.loggersConfiguration[loggerName]);
		this.oldConsole.log("%cLogger '" + loggerName + "' activated.", this.infoStyle);
	};

	disableLogger = (loggerName: string) => {
		if (loggerName === 'console') {
			this.disableConsole();
			return;
		}
		this.loggersConfiguration[loggerName] = false;
		localStorage.setItem('logger-active', JSON.stringify(this.loggersConfiguration));
		this.injectWriter(this.loggersWriters[loggerName], this.loggersConfiguration[loggerName]);
		this.oldConsole.log("%cLogger '" + loggerName + "' disabled.", this.infoStyle);
	};

	activeAll = () => {
		for (const key of Object.keys(this.loggersConfiguration)) {
			// this.loggersConfiguration[key]=true;
			this.activeLogger(key);
		}
	};

	disableAll = () => {
		for (const key of Object.keys(this.loggersConfiguration)) {
			this.disableLogger(key);
			// this.loggersConfiguration[key]=false;
		}
	};

	private activeConsole() {
		window.console.log = this.oldConsole.log;
	}

	private disableConsole() {
		window.console.log = () => {
			return;
		};
		this.oldConsole.log(
			"%c console.log() disabled. To temporarily active it use LoggerService.activeLogger('console')",
			this.infoStyle,
		);
	}

	private autoActiveNewLogger(yes = true) {
		this.autoActive = yes;
	}
	toggleLogger = (active?: boolean) => {
		this.isActive = !!active;
		for (const keyWriter of Object.keys(this.loggersWriters)) {
			const writer = this.loggersWriters[keyWriter];
			this.injectWriter(writer, this.loggersConfiguration[writer.name]);
		}
		if (active) {
			this.oldConsole.log(
				'%cLogger is active. To disable it use LoggerService.off()',
				this.infoStyle,
			);
		} else {
			this.oldConsole.log(
				'%cLogger is disabled. To active it use LoggerService.on()',
				this.infoStyle,
			);
		}
	};

	help = () => {
		LoggerService._instance.oldConsole.log(
			'%c         `7MMF\'                          \n			MM                            \n  ,6"Yb.    MM         ,pW"Wq.   .P' +
				'"Ybmmm \n 8)   MM    MM        6W\'   `Wb :MI  I8   \n  ,pm9MM    MM      , 8M     M8  WmmmP"   \n 8M   MM    MM     ,M' +
				" YA.   ,A9 8M        \n `Moo9^Yo..JMMmmmmMMM  `Ybmd9'   YMMMMMb  \n								6'     dP \n								Ybmmmd'" +
				'    . \n\n- list(): get all logger already available\n- active(name): active the logger with that name\n- disable(name):' +
				' disable the logger with that name\n- on(): enable the logger service (default in dev)\n- off(): disable the logger ' +
				'service (default in prod)\n- autoActiveNewLogger(auto=true):active all new logger.\n- activeAll: active all logger ' +
				'available (not the new one)\n- disableAll: disable all active logger  \n ',
			'color:blue',
		);
	};
	/**
	 * Manage the extreme optimization
	 * @param writer
	 */
	injectWriter(writer: LoggerWriter, active: boolean) {
		if (!writer) {
			return;
		}
		// if log is active use logger
		if (active && this.isActive) {
			writer.info = (mainMessage: string, ...params: any[]) => {
				this.info(
					writer.name,
					mainMessage,
					writer.colorInfo ? writer.colorInfo : writer.color,
					params,
				);
			};
			writer.debug = (mainMessage: string, ...params: any[]) => {
				this.debug(
					writer.name,
					mainMessage,
					writer.colorDebug ? writer.colorDebug : writer.color,
					params,
				);
			};
			writer.error = (mainMessage: string, ...params: any[]) => {
				this.error(
					writer.name,
					mainMessage,
					writer.colorError ? writer.colorError : writer.color,
					params,
				);
			};
			writer.messageColor = (color: string, mainMessage: string, ...params: any[]) => {
				this.info(writer.name, mainMessage, color, params);
			};
		} else {
			// if  log is disabled i skip it
			writer.info = function () {};
			writer.debug = function () {};
			writer.error = function () {};
			writer.messageColor = function () {};
		}
	}
}

export class LoggerWriter {
	name: string;
	color: string;
	colorInfo: string;
	colorDebug: string;
	colorError: string;

	info: any;
	debug: any;
	error: any;
	messageColor: any;
}

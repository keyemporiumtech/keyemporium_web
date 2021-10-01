import { Component, Input } from '@angular/core';
import { BaseComponent } from '../../../abstract/base.component';
import { ApplicationLoggerService } from '../../../logger/services/application-logger.service';
import { BrowserService } from '../../../config/services/browser.service';

@Component({
	selector: 'ddc-init-embed-youtube',
	templateUrl: './embed-youtube.component.html',
	styleUrls: ['./embed-youtube.component.scss'],
})
export class EmbedYoutubeComponent extends BaseComponent {
	@Input() width: string;
	@Input() height: string;
	@Input() video: string;
	@Input() control: boolean = true;
	@Input() autoplay: boolean = false;
	@Input() playlist: string;
	@Input() loop: boolean = false;
	private _url: string = 'https://www.youtube.com/embed';
	querystring: string;
	browserName: string;

	constructor(applicationLogger: ApplicationLoggerService, private browserService: BrowserService) {
		super(applicationLogger);
		this.browserName = this.browserService.getBrowserName();
	}

	ngOnInitForChildren() {
		this.querystring = this._url + '/' + this.video + this.buildQueryString();
		if (!this.width) {
			this.width = '100%';
		}
		if (!this.height) {
			this.height = '100%';
		}
	}
	ngAfterViewInitForChildren() {}
	ngOnDestroyForChildren() {}
	getClassName(): string {
		return 'EmbedYoutubeComponent';
	}

	private buildQueryString() {
		let query = '';
		let first = true;
		if (this.playlist || this.autoplay || !this.control) {
			query += '?';
		}

		if (this.playlist) {
			if (!first) {
				query += '&';
			}
			query += 'playlist=' + this.playlist;
			first = false;
			if (this.loop) {
				query += '&loop=' + YoutubeLoopEnum.LOOP;
			}
		} else {
			if (this.autoplay) {
				if (!first) {
					query += '&';
				}
				query += 'autoplay=' + YoutubeAutoplayEnum.AUTO_LOAD;
				first = false;
			}
			if (!this.control) {
				if (!first) {
					query += '&';
				}
				query += 'controls=' + YoutubeControlEnum.NOT_DISPLAY;
				first = false;
			}
		}
		return query;
	}
}

/** Usato per le playlist */
export enum YoutubeLoopEnum {
	ONLY_ONCE = 0,
	LOOP = 1,
}

export enum YoutubeAutoplayEnum {
	NOT_AUTO_LOAD = 0,
	AUTO_LOAD = 1,
}

/** Indica se mostrare il player (comandi) su un video */
export enum YoutubeControlEnum {
	NOT_DISPLAY = 0,
	DISPLAY = 1,
}

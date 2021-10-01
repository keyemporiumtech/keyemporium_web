import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { BaseComponent } from '../../../abstract/base.component';
import { ApplicationLoggerService } from '../../../logger/services/application-logger.service';
import { EnumMediaPreload } from '../../enums/media-preload.enum';
import { EnumStatusPlayer } from '../../enums/status-player.enum';

@Component({
	selector: 'ddc-init-embed-video',
	templateUrl: './embed-video.component.html',
	styleUrls: ['./embed-video.component.scss'],
})
export class EmbedVideoComponent extends BaseComponent {
	@Input() width: string;
	@Input() height: string;
	@Input() path: string;
	@Input() pathImage: string;
	@Input() mimeType: string;
	// attributes
	@Input() autoplay: boolean;
	@Input() controls: boolean = true;
	@Input() loop: boolean;
	@Input() muted: boolean;
	@Input() preload: EnumMediaPreload;
	@Input() browserNotSupported: string = 'Browser Not Supported!!';
	private _initVolume: number; // [0..1]
	@Input() set initVolume(val: number) {
		this._initVolume = val;
		if (val && this.player) {
			this.player.volume = val;
		}
	}
	get initVolume(): number {
		return this._initVolume;
	}
	@Output() endedEmit: EventEmitter<boolean> = new EventEmitter<boolean>();

	// HTML 5
	@ViewChild('playerElementRef') playerElementRef: ElementRef;
	player: HTMLAudioElement;
	duration: number;
	status: EnumStatusPlayer;
	currentTime: number;

	constructor(applicationLogger: ApplicationLoggerService) {
		super(applicationLogger);
	}

	ngOnInitForChildren() {}
	ngAfterViewInitForChildren() {
		this.player = this.playerElementRef.nativeElement;
		this.bindPlayerEvents();
		if (this.initVolume) {
			this.player.volume = this.initVolume;
		}
	}
	ngOnDestroyForChildren() {}
	getClassName(): string {
		return 'EmbedVideoComponent';
	}

	private bindPlayerEvents() {
		this.player.addEventListener('playing', () => {
			this.status = EnumStatusPlayer.PLAYING;
		});

		this.player.addEventListener('pause', () => {
			this.status = EnumStatusPlayer.STOPPED;
		});

		this.player.addEventListener('timeupdate', () => {
			this.currentTime = Math.floor(this.player.currentTime);
		});

		this.player.addEventListener('loadstart', () => {
			this.loading = true;
			this.status = EnumStatusPlayer.ON_LOAD;
		});

		this.player.addEventListener('loadeddata', () => {
			this.loading = false;
			this.duration = Math.floor(this.player.duration);
			this.status = EnumStatusPlayer.LOADED;
		});

		this.player.addEventListener('ended', () => {
			this.endedEmit.emit(true);
			this.status = EnumStatusPlayer.ENDED;
		});
	}
}

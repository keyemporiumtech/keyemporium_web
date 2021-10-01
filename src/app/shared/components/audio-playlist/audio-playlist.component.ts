import { AfterViewChecked, Component, Input, QueryList, ViewChildren } from '@angular/core';
import {
	ApplicationLoggerService,
	BaseComponent,
	EmbedAudioComponent,
	StringTranslate,
	AudioFileModel,
	EnumStatusPlayer,
} from '@ddc/kit';

@Component({
	selector: 'ddc-init-audio-playlist',
	templateUrl: './audio-playlist.component.html',
	styleUrls: ['./audio-playlist.component.scss'],
})
export class AudioPlaylistComponent extends BaseComponent implements AfterViewChecked {
	@Input() autoplay: boolean;
	@Input() controls: boolean = true;
	@Input() loop: boolean;
	@Input() title: string | StringTranslate;

	private _initVolume: number; // [0..1]
	@Input() set initVolume(val: number) {
		this._initVolume = val;
		if (val) {
			this.currentVolume = val ? val : 1;
		}
	}
	get initVolume(): number {
		return this._initVolume;
	}
	@Input() showVolume: boolean = true; // volume generale per tutta la playlist
	// PLAYLIST
	private _playlist: AudioFileModel[];
	@Input() set playlist(val: AudioFileModel[]) {
		this._playlist = val;
		this.managePlaylist();
		this.manageEmbedAudios();
	}
	get playlist(): AudioFileModel[] {
		return this._playlist;
	}
	@ViewChildren('embedAudios') embedAudios: QueryList<EmbedAudioComponent>;
	currentPlaylistIndex: number;
	currentVolume: number;
	EnumStatusPlayer = EnumStatusPlayer;

	constructor(applicationLogger: ApplicationLoggerService) {
		super(applicationLogger);
		this._playlist = [];
	}

	ngOnInitForChildren() {
		this.currentVolume = this.initVolume ? this.initVolume : 1;
	}

	ngAfterViewInitForChildren() {
		if (this.autoplay && this.currentPlaylistIndex === 0) {
			this.embedAudios.toArray()[0].player.play();
		}
	}
	ngAfterViewChecked() {
		setTimeout(() => {
			this.manageEmbedAudios();
		}, 0);
	}
	ngOnDestroyForChildren() {}
	getClassName(): string {
		return 'AudioPlaylistComponent';
	}

	get volumeDecode(): number {
		return this.currentVolume ? this.currentVolume * 10 : 10;
	}

	changeVolume(value: number) {
		if (this.embedAudios && value >= 0 && value <= 10) {
			this.currentVolume = value === 0 ? 0 : value / 10;
			this.embedAudios.toArray()[this.currentPlaylistIndex].player.volume = this.currentVolume;

			const audios = this.embedAudios.toArray();
			for (let i = 0; i < audios.length; i++) {
				if (i !== this.currentPlaylistIndex) {
					audios[i].player.volume = this.currentVolume;
				}
			}
		}
	}

	onEnd() {
		if (this.currentPlaylistIndex < this.playlist.length - 1) {
			this.currentPlaylistIndex++;
			this.embedAudios.toArray()[this.currentPlaylistIndex].player.play();
		} else {
			this.currentPlaylistIndex = 0;
			if (this.loop) {
				this.embedAudios.toArray()[0].player.currentTime = 0;
				this.embedAudios.toArray()[0].player.play();
			}
		}
	}

	change(index: number) {
		this.embedAudios.toArray()[this.currentPlaylistIndex].player.pause();
		this.embedAudios.toArray()[this.currentPlaylistIndex].player.currentTime = 0;
		this.currentPlaylistIndex = index;
		this.embedAudios.toArray()[this.currentPlaylistIndex].player.currentTime = 0;
		this.embedAudios.toArray()[this.currentPlaylistIndex].player.play();
	}

	next() {
		if (this.currentPlaylistIndex < this.playlist.length - 1) {
			this.change(this.currentPlaylistIndex + 1);
		}
	}

	prev() {
		if (this.currentPlaylistIndex > 0) {
			this.change(this.currentPlaylistIndex - 1);
		}
	}

	player(index?: number) {
		if (!this.embedAudios) {
			return undefined;
		}
		if (!index) {
			index = this.currentPlaylistIndex;
		}
		return this.embedAudios.toArray()[index].player;
	}

	status(index?: number) {
		if (!this.embedAudios) {
			return undefined;
		}
		if (!index) {
			index = this.currentPlaylistIndex;
		}
		return this.embedAudios.toArray()[index].status;
	}

	private manageEmbedAudios() {
		if (this.embedAudios) {
			const audios = this.embedAudios.toArray();
			for (let i = 0; i < audios.length; i++) {
				if (!this.playlist[i].duration) {
					this.playlist[i].duration = audios[i].duration;
				}
			}
		}
	}
	private managePlaylist() {
		if (this.playlist && this.playlist.length > 1) {
			if (!this.currentPlaylistIndex) {
				this.currentPlaylistIndex = 0;
			} else {
				this.currentPlaylistIndex++;
			}
		}
	}
}

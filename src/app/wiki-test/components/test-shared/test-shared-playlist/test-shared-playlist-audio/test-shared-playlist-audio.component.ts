import { Component, OnInit } from '@angular/core';
import { AudioFileModel } from '@ddc/kit';

@Component({
	selector: 'wiki-test-shared-playlist-audio',
	templateUrl: './test-shared-playlist-audio.component.html',
	styleUrls: ['./test-shared-playlist-audio.component.scss'],
})
export class TestSharedPlaylistAudioComponent implements OnInit {
	playlist: AudioFileModel[];
	autoplayExample: boolean;

	constructor() {
		this.playlist = [];
		this.loadPlaylist();
	}

	ngOnInit() {}

	private loadPlaylist() {
		this.playlist.push(new AudioFileModel('assets/test/audio/test.mp3', 'test'));
		this.playlist.push(
			new AudioFileModel('http://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', 'sound'),
		);
		this.playlist.push(
			new AudioFileModel(
				'assets/test/audio/test.mp3',
				'another test',
				'Autore Sconosciuto',
				'Descrizione',
				3000,
			),
		);
	}

	autoplayStart() {
		this.autoplayExample = true;
	}
	autoplayStop() {
		this.autoplayExample = false;
	}
}

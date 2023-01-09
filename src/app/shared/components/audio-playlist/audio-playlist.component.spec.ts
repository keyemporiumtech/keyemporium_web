import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioPlaylistComponent } from './audio-playlist.component';

describe('AudioPlaylistComponent', () => {
	let component: AudioPlaylistComponent;
	let fixture: ComponentFixture<AudioPlaylistComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [AudioPlaylistComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AudioPlaylistComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSharedPlaylistAudioComponent } from './test-shared-playlist-audio.component';

describe('TestSharedPlaylistAudioComponent', () => {
	let component: TestSharedPlaylistAudioComponent;
	let fixture: ComponentFixture<TestSharedPlaylistAudioComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TestSharedPlaylistAudioComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TestSharedPlaylistAudioComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

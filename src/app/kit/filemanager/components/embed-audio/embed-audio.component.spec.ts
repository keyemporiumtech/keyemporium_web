import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbedAudioComponent } from './embed-audio.component';

describe('EmbedAudioComponent', () => {
	let component: EmbedAudioComponent;
	let fixture: ComponentFixture<EmbedAudioComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [EmbedAudioComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(EmbedAudioComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

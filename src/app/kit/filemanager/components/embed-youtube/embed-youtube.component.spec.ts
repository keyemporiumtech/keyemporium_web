import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbedYoutubeComponent } from './embed-youtube.component';

describe('EmbedYoutubeComponent', () => {
	let component: EmbedYoutubeComponent;
	let fixture: ComponentFixture<EmbedYoutubeComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [EmbedYoutubeComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(EmbedYoutubeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

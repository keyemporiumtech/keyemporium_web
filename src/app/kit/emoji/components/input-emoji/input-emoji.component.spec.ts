import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputEmojiComponent } from './input-emoji.component';

describe('InputEmojiComponent', () => {
	let component: InputEmojiComponent;
	let fixture: ComponentFixture<InputEmojiComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [InputEmojiComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(InputEmojiComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

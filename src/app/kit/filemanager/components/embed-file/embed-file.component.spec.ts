import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbedFileComponent } from './embed-file.component';

describe('EmbedFileComponent', () => {
	let component: EmbedFileComponent;
	let fixture: ComponentFixture<EmbedFileComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [EmbedFileComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(EmbedFileComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCommonsPagesComponent } from './test-commons-pages.component';

describe('TestCommonsPagesComponent', () => {
	let component: TestCommonsPagesComponent;
	let fixture: ComponentFixture<TestCommonsPagesComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TestCommonsPagesComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TestCommonsPagesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestApiUniqueComponent } from './test-api-unique.component';

describe('TestApiUniqueComponent', () => {
	let component: TestApiUniqueComponent;
	let fixture: ComponentFixture<TestApiUniqueComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TestApiUniqueComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TestApiUniqueComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

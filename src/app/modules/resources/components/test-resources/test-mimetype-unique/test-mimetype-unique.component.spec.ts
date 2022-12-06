import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestMimetypeUniqueComponent } from './test-mimetype-unique.component';

describe('TestMimetypeUniqueComponent', () => {
	let component: TestMimetypeUniqueComponent;
	let fixture: ComponentFixture<TestMimetypeUniqueComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TestMimetypeUniqueComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TestMimetypeUniqueComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

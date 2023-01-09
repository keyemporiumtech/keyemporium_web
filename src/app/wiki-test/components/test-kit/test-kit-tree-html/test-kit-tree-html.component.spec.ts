import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestKitTreeHtmlComponent } from './test-kit-tree-html.component';

describe('TestKitTreeHtmlComponent', () => {
	let component: TestKitTreeHtmlComponent;
	let fixture: ComponentFixture<TestKitTreeHtmlComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TestKitTreeHtmlComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TestKitTreeHtmlComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

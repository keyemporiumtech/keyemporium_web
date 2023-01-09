import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeHtmlComponent } from './tree-html.component';

describe('TreeHtmlComponent', () => {
	let component: TreeHtmlComponent;
	let fixture: ComponentFixture<TreeHtmlComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TreeHtmlComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TreeHtmlComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

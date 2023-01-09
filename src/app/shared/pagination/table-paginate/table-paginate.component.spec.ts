import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePaginateComponent } from './table-paginate.component';

describe('TablePaginateComponent', () => {
	let component: TablePaginateComponent;
	let fixture: ComponentFixture<TablePaginateComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TablePaginateComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TablePaginateComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

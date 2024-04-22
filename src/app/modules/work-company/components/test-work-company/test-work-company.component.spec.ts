import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestWorkCompanyComponent } from './test-work-company.component';

describe('TestWorkCompanyComponent', () => {
  let component: TestWorkCompanyComponent;
  let fixture: ComponentFixture<TestWorkCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestWorkCompanyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestWorkCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestKitStatisticComponent } from './test-kit-statistic.component';

describe('TestKitStatisticComponent', () => {
  let component: TestKitStatisticComponent;
  let fixture: ComponentFixture<TestKitStatisticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestKitStatisticComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestKitStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

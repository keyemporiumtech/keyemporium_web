import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestActivityTreeMakerComponent } from './test-activity-tree-maker.component';

describe('TestActivityTreeMakerComponent', () => {
  let component: TestActivityTreeMakerComponent;
  let fixture: ComponentFixture<TestActivityTreeMakerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestActivityTreeMakerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestActivityTreeMakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoubleTreeComponent } from './double-tree.component';

describe('DoubleTreeComponent', () => {
  let component: DoubleTreeComponent;
  let fixture: ComponentFixture<DoubleTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoubleTreeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoubleTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

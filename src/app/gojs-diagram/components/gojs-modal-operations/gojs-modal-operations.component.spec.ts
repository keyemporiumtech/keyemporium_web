import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GojsModalOperationsComponent } from './gojs-modal-operations.component';

describe('GojsModalOperationsComponent', () => {
  let component: GojsModalOperationsComponent;
  let fixture: ComponentFixture<GojsModalOperationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GojsModalOperationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GojsModalOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournmentComponent } from './tournment.component';

describe('TournmentComponent', () => {
  let component: TournmentComponent;
  let fixture: ComponentFixture<TournmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TournmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TournmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

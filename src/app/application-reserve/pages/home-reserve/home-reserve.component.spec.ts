import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeReserveComponent } from './home-reserve.component';

describe('HomeReserveComponent', () => {
  let component: HomeReserveComponent;
  let fixture: ComponentFixture<HomeReserveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeReserveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeReserveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

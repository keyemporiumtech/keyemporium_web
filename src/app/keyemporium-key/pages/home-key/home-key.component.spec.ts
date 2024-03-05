import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeKeyComponent } from './home-key.component';

describe('HomeKeyComponent', () => {
  let component: HomeKeyComponent;
  let fixture: ComponentFixture<HomeKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeKeyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

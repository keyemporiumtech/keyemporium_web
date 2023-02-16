import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSubMenuComponent } from './user-sub-menu.component';

describe('UserSubMenuComponent', () => {
  let component: UserSubMenuComponent;
  let fixture: ComponentFixture<UserSubMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSubMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserSubMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

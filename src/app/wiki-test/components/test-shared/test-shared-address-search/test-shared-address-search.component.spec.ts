import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSharedAddressSearchComponent } from './test-shared-address-search.component';

describe('TestSharedAddressSearchComponent', () => {
  let component: TestSharedAddressSearchComponent;
  let fixture: ComponentFixture<TestSharedAddressSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestSharedAddressSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSharedAddressSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

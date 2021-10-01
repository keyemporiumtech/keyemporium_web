import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestRestOpenstreetmapComponent } from './test-rest-openstreetmap.component';

describe('TestRestOpenstreetmapComponent', () => {
  let component: TestRestOpenstreetmapComponent;
  let fixture: ComponentFixture<TestRestOpenstreetmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestRestOpenstreetmapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestRestOpenstreetmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSharedPlaylistComponent } from './test-shared-playlist.component';

describe('TestSharedPlaylistComponent', () => {
  let component: TestSharedPlaylistComponent;
  let fixture: ComponentFixture<TestSharedPlaylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestSharedPlaylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSharedPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestKitQuillEditorComponent } from './test-kit-quill-editor.component';

describe('TestKitQuillEditorComponent', () => {
  let component: TestKitQuillEditorComponent;
  let fixture: ComponentFixture<TestKitQuillEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestKitQuillEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestKitQuillEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

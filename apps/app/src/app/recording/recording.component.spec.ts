import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordingComponent } from './recording.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RecordingComponent', () => {
  let component: RecordingComponent;
  let fixture: ComponentFixture<RecordingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecordingComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [MatSnackBarModule, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(RecordingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

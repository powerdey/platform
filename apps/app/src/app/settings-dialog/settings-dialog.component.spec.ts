import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsDialogComponent } from './settings-dialog.component';
import { provideMockStore } from '@ngrx/store/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { mock } from 'jest-mock-extended';

describe('SettingsDialogComponent', () => {
  let component: SettingsDialogComponent;
  let fixture: ComponentFixture<SettingsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingsDialogComponent],
      providers: [
        provideMockStore(),
        {
          provide: MatDialogRef<any>,
          useValue: mock<MatDialogRef<any>>(),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

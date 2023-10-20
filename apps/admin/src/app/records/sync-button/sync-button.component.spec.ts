import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SyncButtonComponent } from './sync-button.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { mock } from 'jest-mock-extended';
import { Functions } from '@angular/fire/functions';

describe('SyncButtonComponent', () => {
  let component: SyncButtonComponent;
  let fixture: ComponentFixture<SyncButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SyncButtonComponent],
      imports: [MatSnackBarModule],
      providers: [
        {
          provide: Functions,
          useValue: mock(Functions),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SyncButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

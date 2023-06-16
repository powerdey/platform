import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Firestore } from '@angular/fire/firestore';
import { mock } from 'jest-mock-extended';
import { GenerateButtonComponent } from './generate-button.component';

describe('GenerateButtonComponent', () => {
  let component: GenerateButtonComponent;
  let fixture: ComponentFixture<GenerateButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenerateButtonComponent],
      imports: [MatSnackBarModule],
      providers: [
        {
          provide: Firestore,
          useValue: mock(Firestore),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GenerateButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

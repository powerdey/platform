import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { mock } from 'jest-mock-extended';
import { GenerateButtonComponent } from './generate-button.component';
import { RecordsRepositoryService } from '../../repositories/records-repository.service';

describe('GenerateButtonComponent', () => {
  let component: GenerateButtonComponent;
  let fixture: ComponentFixture<GenerateButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenerateButtonComponent],
      imports: [MatSnackBarModule],
      providers: [
        {
          provide: RecordsRepositoryService,
          useValue: mock(RecordsRepositoryService),
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

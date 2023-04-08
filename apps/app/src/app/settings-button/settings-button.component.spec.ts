import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsButtonComponent } from './settings-button.component';
import { MatDialogModule } from '@angular/material/dialog';

describe('SettingsButtonComponent', () => {
  let component: SettingsButtonComponent;
  let fixture: ComponentFixture<SettingsButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingsButtonComponent],
      imports: [MatDialogModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SettingsDialogComponent } from '../settings-dialog/settings-dialog.component';

@Component({
  selector: 'powerdey-settings-button',
  templateUrl: './settings-button.component.html',
  styleUrls: ['./settings-button.component.scss'],
})
export class SettingsButtonComponent {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(SettingsDialogComponent, {
      width: '500px',
      maxWidth: 'calc(100vw-50px)',
    });
  }
}

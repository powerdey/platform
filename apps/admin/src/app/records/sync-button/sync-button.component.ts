import { Component } from '@angular/core';
import { httpsCallable, Functions } from '@angular/fire/functions';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'pw-admin-sync-button',
  templateUrl: './sync-button.component.html',
  styleUrls: ['./sync-button.component.scss'],
})
export class SyncButtonComponent {
  constructor(
    private firebaseFunctions: Functions,
    private snackbar: MatSnackBar
  ) {}

  async sync() {
    try {
      await httpsCallable(this.firebaseFunctions, 'syncBigQuery')();
      this.snackbar.open(`Data synced to BigQuery`, undefined, {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
    } catch (err) {
      this.snackbar.open(`Error occurred: ${err}`, undefined, {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
    }
  }
}

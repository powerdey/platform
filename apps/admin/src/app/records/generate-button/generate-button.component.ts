import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RecordsRepositoryService } from '../../repositories/records-repository.service';

@Component({
  selector: 'pw-admin-generate-button',
  templateUrl: './generate-button.component.html',
  styleUrls: ['./generate-button.component.scss'],
})
export class GenerateButtonComponent {
  constructor(
    private snackbar: MatSnackBar,
    private repository: RecordsRepositoryService
  ) {}

  async generate() {
    await this.repository.generate();

    this.snackbar.open(`Kpakam! E don enter`, undefined, {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}

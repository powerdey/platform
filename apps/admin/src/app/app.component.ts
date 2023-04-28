import { Component, inject } from '@angular/core';
import { Performance } from '@angular/fire/performance';

@Component({
  selector: 'pw-admin-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  performance = inject(Performance);
}

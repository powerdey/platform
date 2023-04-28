import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@powerdey/api-interfaces';
import { Performance } from '@angular/fire/performance';

@Component({
  selector: 'powerdey-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  hello$ = this.http.get<Message>('/api/hello');
  performance = inject(Performance);
  constructor(private http: HttpClient) {}
}

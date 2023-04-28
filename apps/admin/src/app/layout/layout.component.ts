import { Component } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'pw-admin-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  constructor(private auth: Auth, private router: Router) {}

  menuItems = [
    {
      link: '/dashboard',
      title: 'Dashboard',
    },
    {
      link: '/example',
      title: 'Example',
    },
  ];

  logout() {
    signOut(this.auth).then(() => this.router.navigate(['/login']));
  }
}

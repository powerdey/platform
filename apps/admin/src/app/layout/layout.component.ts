import { Component } from '@angular/core';

@Component({
  selector: 'pw-admin-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
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
}

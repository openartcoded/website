import { Component, Input, OnInit } from '@angular/core';
import { Menu } from '@core/models/menu';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  @Input()
  navlist: boolean;

  homeSection: Menu[] = [
    {
      name: 'Sparql Endpoint',
      icon: 'storage',
      url: 'yasgui',
      routerLinkedActiveOptions: { exact: true },
    },
    {
      name: 'Curriculum Vitae',
      icon: 'school',
      url: '',
      routerLinkedActiveOptions: { exact: true },
    },
    {
      name: 'Blog',
      icon: 'history_edu',
      url: 'blog',
      routerLinkedActiveOptions: { exact: false },
    },
    {
      name: 'Gallery',
      icon: 'collections',
      url: 'gallery',
      routerLinkedActiveOptions: { exact: true },
    },
    {
      name: 'Contact',
      icon: 'mail',
      url: 'contact',
      routerLinkedActiveOptions: { exact: true },
    },
    {
      name: 'Privacy',
      icon: 'privacy_tip',
      url: 'policy',
      routerLinkedActiveOptions: { exact: true },
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}

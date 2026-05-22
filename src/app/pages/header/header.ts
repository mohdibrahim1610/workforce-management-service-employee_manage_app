import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, CommonModule, RouterOutlet],
  templateUrl: './header.html',
  styleUrl: './header.css',
    standalone: true,

})
export class Header {


   isCollapsed = false;

  toggle() {
    this.isCollapsed = !this.isCollapsed;
  }

  navItems = [
    { label: 'Dashboard',    icon: 'fa-house',        route: '/dashboard' },
    { label: 'Employees',    icon: 'fa-users',        route: '/employees',    badge: 24 },
    { label: 'New Employee', icon: 'fa-user-plus',    route: '/new-employee' },
    { label: 'Departments',  icon: 'fa-building',     route: '/departments' },
    { label: 'Designations', icon: 'fa-briefcase',    route: '/designations' },
    { label: 'Attendance',   icon: 'fa-calendar',     route: '/attendance',   badge: 3, badgeWarn: true },
    { label: 'Reports',      icon: 'fa-chart-bar',    route: '/reports' },
    { label: 'Settings',     icon: 'fa-gear',         route: '/settings' },
  ];
}

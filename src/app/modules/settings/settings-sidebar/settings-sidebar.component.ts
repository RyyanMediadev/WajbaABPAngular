import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IconsComponent } from "../../../components/icons/icons.component";

@Component({
  selector: 'app-settings-sidebar',
  standalone: true,
  imports: [NgbModule, CommonModule, IconsComponent],
  templateUrl: './settings-sidebar.component.html',
  styleUrl: './settings-sidebar.component.scss'
})
export class SettingsSidebarComponent {
  isSidebarOpen = true;
  selectedName: string = '';
  breadcrumbs: any;
  // private selectedNameSub!: Subscription;

  menuItems = [
    { type: 'link', name: 'Company', iconName: 'company', href: 'company' },
    { type: 'link', name: 'Site', iconName: 'site', href: 'site' },
    { type: 'link', name: 'Branches', iconName: 'branches', href: 'branches' },
    { type: 'link', name: 'Email', iconName: 'email', href: 'email' },
    { type: 'link', name: 'Order Setup', iconName: 'orderSetup', href: 'orderSetup' },
    { type: 'link', name: 'OTP', iconName: 'OTP', href: 'otp' },
    { type: 'link', name: 'Notification', iconName: 'notification_2', href: 'notification' },
    { type: 'link', name: 'Notification Alert', iconName: 'notificationAlert', href: 'notification-alert' },
    { type: 'link', name: 'Social Media', iconName: 'socialMedia', href: 'social-media' },
    { type: 'link', name: 'FAQs', iconName: 'aboutUs', href: 'faqs' },
    { type: 'link', name: 'Analytics', iconName: 'analytics', href: 'analytics' },
    { type: 'link', name: 'Theme', iconName: 'theme', href: 'theme' },
    { type: 'link', name: 'Time Slots', iconName: 'timeSlots', href: 'time-slots' },
    { type: 'link', name: 'Sliders', iconName: 'sliders', href: 'sliders' },
    { type: 'link', name: 'Currencies', iconName: 'currencies', href: 'currencies' },
    { type: 'link', name: 'Item categories', iconName: 'itemCategories', href: 'item-categories' },
    { type: 'link', name: 'Item Attributes', iconName: 'itemAttributes', href: 'item-attributes' },
    { type: 'link', name: 'Taxes', iconName: 'taxes', href: 'taxes' },
    { type: 'link', name: 'Pages', iconName: 'pages', href: 'pages' },
    { type: 'link', name: 'Role & Permissions', iconName: 'role', href: 'role-permissions' },
    { type: 'link', name: 'Languages', iconName: 'languages', href: 'languages' },
    { type: 'link', name: 'Sms Gateway', iconName: 'smsGateway', href: 'sms-gateway' },
    { type: 'link', name: 'License', iconName: 'license', href: 'license' },
  ];

  loadComponent(item) {
    this.selectedName = item.name;

    // localStorage.setItem('selectedComponentName', name);

    // this.sidebarService.setSelectedComponentName(name);
  }
}

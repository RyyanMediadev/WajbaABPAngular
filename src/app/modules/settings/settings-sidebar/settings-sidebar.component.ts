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
    { type: 'link', name: 'Company', iconName: 'company' },
    { type: 'link', name: 'Site', iconName: 'site' },
    { type: 'link', name: 'Branches', iconName: 'branches' },
    { type: 'link', name: 'Email', iconName: 'email' },
    { type: 'link', name: 'Order Setup', iconName: 'orderSetup' },
    { type: 'link', name: 'OTP', iconName: 'OTP' },
    { type: 'link', name: 'Notification', iconName: 'notification_2' },
    { type: 'link', name: 'Notification Alert', iconName: 'notificationAlert' },
    { type: 'link', name: 'Social Media', iconName: 'socialMedia' },
    { type: 'link', name: 'FAQs', iconName: 'aboutUs' },
    { type: 'link', name: 'Analytics', iconName: 'analytics' },
    { type: 'link', name: 'Theme', iconName: 'theme' },
    { type: 'link', name: 'Time Slots', iconName: 'timeSlots' },
    { type: 'link', name: 'Sliders', iconName: 'sliders' },
    { type: 'link', name: 'Currencies', iconName: 'currencies' },
    { type: 'link', name: 'Item categories', iconName: 'itemCategories' },
    { type: 'link', name: 'Item Attributes', iconName: 'itemAttributes' },
    { type: 'link', name: 'Taxes', iconName: 'taxes' },
    { type: 'link', name: 'Pages', iconName: 'pages' },
    { type: 'link', name: 'Role & Permissions', iconName: 'role' },
    { type: 'link', name: 'Languages', iconName: 'languages' },
    { type: 'link', name: 'Sms Gateway', iconName: 'smsGateway' },
    { type: 'link', name: 'License', iconName: 'license' },
  ];
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './company/company.component';
import { SiteComponent } from './site/site.component';
import { OrderSetupComponent } from './order-setup/order-setup.component';
import { OTPComponent } from './otp/otp.component';
import { NotificationComponent } from './notification/notification.component';
import { ThemeComponent } from './theme/theme.component';
import { TimeSlotsComponent } from './time-slots/time-slots.component';
import { FAQsComponent } from './faqs/faqs.component';
// import { BranchesComponent } from './branches/branches.component';

const routes: Routes = [
  { path: '', redirectTo: 'company', pathMatch: 'full' },
  { path: 'company', component: CompanyComponent },
  { path: 'site', component: SiteComponent },
  {
    path: 'branches',
    loadChildren: () => import('./branches/branches.module').then(m => m.BranchesModule),
  },
  // { path: 'email', component: EmailComponent },
  { path: 'orderSetup', component: OrderSetupComponent },
  { path: 'otp', component: OTPComponent },
  { path: 'notification', component: NotificationComponent },
  // { path: 'notificationAlert', component: NotificationAlertComponent },
  // { path: 'socialMedia', component: SocialMediaComponent },
  { path: 'faqs', component: FAQsComponent },
  // { path: 'analytics', component: AnalyticsComponent },
  { path: 'theme', component: ThemeComponent },
  { path: 'time-slots', component: TimeSlotsComponent },
  // { path: 'sliders', component: SlidersComponent },
  // { path: 'currencies', component: CurrenciesComponent },
  // { path: 'itemCategories', component: ItemCategoriesComponent },
  // { path: 'itemAttributes', component: ItemAttributesComponent },
  // { path: 'taxes', component: TaxesComponent },
  // { path: 'pages', component: PagesComponent },
  // { path: 'role', component: RoleComponent },
  // { path: 'languages', component: LanguagesComponent },
  // { path: 'smsGateway', component: SmsGatewayComponent },
  // { path: 'license', component: LicenseComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }

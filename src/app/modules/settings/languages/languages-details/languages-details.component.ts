import { Component } from '@angular/core';
import { SettingsSidebarComponent } from "../../settings-sidebar/settings-sidebar.component";
import { UpdateLanguagedto } from '@proxy/dtos/languages';

@Component({
  selector: 'app-languages-details',
  standalone: true,
  imports: [SettingsSidebarComponent],
  templateUrl: './languages-details.component.html',
  styleUrl: './languages-details.component.scss'
})
export class LanguagesDetailsComponent {
  selectedCategory!: UpdateLanguagedto;

  ngOnInit(): void {

  }
}

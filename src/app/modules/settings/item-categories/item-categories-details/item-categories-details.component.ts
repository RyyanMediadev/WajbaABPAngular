import { Component } from '@angular/core';
import { UpdateBranchDto } from '@proxy/dtos/branch-contract';
import { SettingsSidebarComponent } from "../../settings-sidebar/settings-sidebar.component";

@Component({
  selector: 'app-item-categories-details',
  standalone: true,
  imports: [SettingsSidebarComponent],
  templateUrl: './item-categories-details.component.html',
  styleUrl: './item-categories-details.component.scss'
})
export class ItemCategoriesDetailsComponent {
  selectedCategory!: UpdateBranchDto;

  ngOnInit(): void {

  }
}

import { Component } from '@angular/core';
import { TableComponent } from 'src/app/shared/table/table.component';
import { SettingsSidebarComponent } from '../../settings-sidebar/settings-sidebar.component';
import { IconsComponent } from 'src/app/shared/icons/icons.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UpdateBranchDto } from '@proxy/dtos/branch-contract';
import { CategoryService } from '@proxy/controllers';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { PagedAndSortedResultRequestDto } from '@abp/ng.core';
import { AddItemCategoriesComponent } from '../add-item-categories/add-item-categories.component';
import { ConfirmDeleteModalComponent } from 'src/app/shared/confirm-delete-modal/confirm-delete-modal.component';

@Component({
  selector: 'app-item-categories',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IconsComponent, SettingsSidebarComponent, TableComponent],
  templateUrl: './item-categories.component.html',
  styleUrl: './item-categories.component.scss'
})
export class ItemCategoriesComponent {
  itemCategories: UpdateBranchDto[] = [];
  isAddMode = true;

  columns = [
    { field: 'name', header: 'Name' },
    { field: 'status', header: 'Status' },
    { field: 'action', header: 'Action' },
  ];

  actions = [
    {
      icon: 'assets/images/edit.svg',
      tooltip: 'Edit',
      show: (row: any) => true,
      callback: (row: any) => this.openAddEditModal(row),
    },
    {
      icon: 'assets/images/view.svg',
      tooltip: 'View',
      show: (row: any) => true,
      callback: (row: any) => this.openItemCategoryDetailsAndNavigate(row),
    },
    {
      icon: 'assets/images/delete.svg',
      tooltip: 'Delete',
      show: (row: any) => row.status === 1,
      callback: (row: any) => this.openConfirmDeleteModal(row.id, row.name),
    },
  ];

  constructor(
    private modalService: NgbModal,
    private categoryService: CategoryService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loadItemCategories();
  }

  // Load all Item Categories
  loadItemCategories(): void {
    const defaultInput: PagedAndSortedResultRequestDto = {
      sorting: '',
      skipCount: 0,
      maxResultCount: 10
    };

    this.categoryService.getList(defaultInput).subscribe({
      next: (response) => {
        console.log(response)
        this.itemCategories = response.data.items;
      },
      error: (err) => {
        console.error('Error loading Item Categories:', err);
      },
    });
  }

  openAddEditModal(ItemCategory?: UpdateBranchDto): void {
    const modalRef = this.modalService.open(AddItemCategoriesComponent, {
      size: 'lg',
      centered: true,
      backdrop: 'static',
    });

    modalRef.componentInstance.isOpen = true;
    modalRef.componentInstance.ItemCategory = ItemCategory || null;

    modalRef.componentInstance.close.subscribe(() => {
      modalRef.close();
    });

    modalRef.result
      .then((result) => {
        if (result === 'saved') {
          this.loadItemCategories();
        }
      })
      .catch((reason) => {
        console.log('Modal dismissed:', reason);
      });
  }

  openConfirmDeleteModal(ItemCategoryId: number, ItemCategoryName: string): void {
    const modalRef = this.modalService.open(ConfirmDeleteModalComponent, {
      size: 'lg',
      centered: true,
      backdrop: 'static',
    });

    // Pass data to the modal instance
    modalRef.componentInstance.id = ItemCategoryId;
    modalRef.componentInstance.name = ItemCategoryName;

    // Handle modal result
    modalRef.componentInstance.confirmDelete.subscribe((id) => {
      this.deleteItemCategory(id); // Call the delete method with the branch ID
    });

    modalRef.componentInstance.cancelDelete.subscribe(() => {
      modalRef.close(); // Close modal on cancel
    });
  }

  deleteItemCategory(id: number): void {
    this.categoryService.delete(id).subscribe({
      next: () => {
        this.itemCategories = this.itemCategories.filter((itemCategory) => itemCategory.id !== id);
        this.modalService.dismissAll(); // Close all modals
      },
      error: (err) => {
        console.error('Error deleting Item Category:', err);
      },
    });
  }

  openItemCategoryDetailsAndNavigate(ItemCategory: UpdateBranchDto) {
    this.router.navigate(['/settings/item-categories', ItemCategory.id]);
  }
}

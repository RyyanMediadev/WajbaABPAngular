import { Component } from '@angular/core';
import { TableComponent } from 'src/app/shared/table/table.component';
import { SettingsSidebarComponent } from '../../settings-sidebar/settings-sidebar.component';
import { IconsComponent } from 'src/app/shared/icons/icons.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UpdateBranchDto } from '@proxy/dtos/branch-contract';
import { BranchService } from '@proxy/controllers';
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
  branches: UpdateBranchDto[] = [];
  isAddMode = true;
  selectedBranch: any = null;
  pageSize = 10; // Default page size
  pageNumber = 0; // Default page number

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
      callback: (row: any) => this.openBranchDetailsAndNavigate(row),
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
    private branchService: BranchService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loadBranches();
  }

  // Load all branches
  loadBranches(): void {
    const request: PagedAndSortedResultRequestDto = {
      skipCount: this.pageNumber * this.pageSize,
      maxResultCount: this.pageSize,
      sorting: 'name', // Default sorting field
    };

    this.branchService.getList(request).subscribe({
      next: (response) => {
        console.log(response)
        this.branches = response.data.items;
      },
      error: (err) => {
        console.error('Error loading branches:', err);
      },
    });
  }

  openAddEditModal(branch?: UpdateBranchDto): void {
    const modalRef = this.modalService.open(AddItemCategoriesComponent, {
      size: 'lg',
      centered: true,
      backdrop: 'static',
    });

    modalRef.componentInstance.isOpen = true;
    modalRef.componentInstance.branch = branch || null;

    modalRef.componentInstance.close.subscribe(() => {
      modalRef.close();
    });

    modalRef.result
      .then((result) => {
        if (result === 'saved') {
          this.loadBranches();
        }
      })
      .catch((reason) => {
        console.log('Modal dismissed:', reason);
      });
  }

  openConfirmDeleteModal(branchId: number, branchName: string): void {
    const modalRef = this.modalService.open(ConfirmDeleteModalComponent, {
      size: 'lg',
      centered: true,
      backdrop: 'static',
    });

    // Pass data to the modal instance
    modalRef.componentInstance.id = branchId;
    modalRef.componentInstance.name = branchName;

    // Handle modal result
    modalRef.componentInstance.confirmDelete.subscribe((id) => {
      this.deleteBranch(id); // Call the delete method with the branch ID
    });

    modalRef.componentInstance.cancelDelete.subscribe(() => {
      modalRef.close(); // Close modal on cancel
    });
  }

  deleteBranch(id: number): void {
    this.branchService.delete(id).subscribe({
      next: () => {
        this.branches = this.branches.filter((branch) => branch.id !== id);
        this.modalService.dismissAll(); // Close all modals
      },
      error: (err) => {
        console.error('Error deleting branch:', err);
      },
    });
  }

  openBranchDetailsAndNavigate(branch: UpdateBranchDto) {
    this.router.navigate(['/settings/branches', branch.id]);
  }
}

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
import { ConfirmDeleteModalComponent } from 'src/app/shared/confirm-delete-modal/confirm-delete-modal.component';
import { CreateUpdateItemAttributeDto } from '@proxy/dtos/item-attributes';
import { AddItemAttributesComponent } from '../add-item-attributes/add-item-attributes.component';

@Component({
  selector: 'app-item-attributes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IconsComponent, SettingsSidebarComponent, TableComponent],
  templateUrl: './item-attributes.component.html',
  styleUrl: './item-attributes.component.scss'
})
export class ItemAttributesComponent {
  attributes: CreateUpdateItemAttributeDto[] = [];
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
        this.attributes = response.data.items;
      },
      error: (err) => {
        console.error('Error loading branches:', err);
      },
    });
  }

  openAddEditModal(branch?: UpdateBranchDto): void {
    const modalRef = this.modalService.open(AddItemAttributesComponent, {
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
        // this.attributes = this.attributes.filter((attribute) => attribute.id !== id);
        this.modalService.dismissAll(); // Close all modals
      },
      error: (err) => {
        console.error('Error deleting branch:', err);
      },
    });
  }
}

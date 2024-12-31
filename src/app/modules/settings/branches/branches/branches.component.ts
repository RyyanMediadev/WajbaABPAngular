import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BranchService } from '@proxy/controllers';
import { PagedAndSortedResultRequestDto } from '@abp/ng.core';
import { IconsComponent } from "../../../../shared/icons/icons.component";
import { AddBranchComponent } from '../add-branch/add-branch.component';
import { SettingsSidebarComponent } from "../../settings-sidebar/settings-sidebar.component";
import { Router } from '@angular/router';
import { ConfirmDeleteModalComponent } from 'src/app/shared/confirm-delete-modal/confirm-delete-modal.component';
import { UpdateBranchDto } from '@proxy/dtos/branch-contract';

@Component({
  selector: 'app-branches',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IconsComponent, SettingsSidebarComponent],
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.scss'],
})
export class BranchesComponent implements OnInit {
  branches: UpdateBranchDto[] = [];
  isAddMode = true;
  selectedBranch: any = null;
  branchLabel: string = 'Branches';
  pageSize = 10; // Default page size
  pageNumber = 0; // Default page number

  constructor(
    private modalService: NgbModal,
    @Inject(BranchService) private branchService: BranchService,
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
    const modalRef = this.modalService.open(AddBranchComponent, {
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

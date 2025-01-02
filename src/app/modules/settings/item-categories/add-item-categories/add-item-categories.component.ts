import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BranchService } from '@proxy/controllers';
import { CreateBranchDto, UpdateBranchDto } from '@proxy/dtos/branch-contract';
import { IconsComponent } from "../../../../shared/icons/icons.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-item-categories',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, IconsComponent],
  templateUrl: './add-item-categories.component.html',
  styleUrl: './add-item-categories.component.scss'
})
export class AddItemCategoriesComponent {
  @Input() isOpen: boolean = false;
  @Input() branch: UpdateBranchDto | null = null;
  @Output() close = new EventEmitter<void>();

  itemCategoryForm: FormGroup;
  isMapModalOpen: boolean = false;

  constructor(
    private fb: FormBuilder,
    private branchService: BranchService,
  ) {
    this.itemCategoryForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      image: [null, Validators.required],
      description: ['', Validators.required],
      status: ['active'],
    });
  }

  ngOnInit(): void {
    if (this.branch) {
      this.populateForm(this.branch);
    }
  }

  populateForm(branch: UpdateBranchDto) {
    this.itemCategoryForm.patchValue({
      id: branch.id,
      name: branch.name,
      email: branch.email,
      city: branch.city,
      state: branch.state,
      phone: branch.phone,
      zipCode: branch.zipCode,
      address: branch.address,
      status: branch.status === 1 ? 'active' : 'inactive',
      longitude: branch.longitude || '',
      latitude: branch.latitude || '',
    });
  }

  closeModal() {
    this.close.emit();
  }

  submitForm() {
    if (this.itemCategoryForm.valid) {
      // Declare the formValue outside the if-else block
      let formValue: CreateBranchDto | UpdateBranchDto;

      // Determine whether it's an update or create operation
      if (this.itemCategoryForm.value.id) {
        formValue = this.itemCategoryForm.value as UpdateBranchDto;
      } else {
        formValue = this.itemCategoryForm.value as CreateBranchDto;
      }

      console.log(formValue);

      if (this.branch) {
        // Update existing branch
        this.branchService.update(formValue as UpdateBranchDto)
          .subscribe(
            response => {
              // Handle successful response
              console.log('Branch updated successfully:', response);
            },
            error => {
              // Handle error response
              console.error('Error updating branch:', error);
            }
          );
      } else {
        // Create a new branch
        this.branchService.create(formValue as CreateBranchDto)
          .subscribe(
            response => {
              // Handle successful response
              console.log('Branch created successfully:', response);
            },
            error => {
              // Handle error response
              console.error('Error creating branch:', error);
            }
          );
      }
    } else {
      // Mark all form controls as touched to trigger validation messages
      this.itemCategoryForm.markAllAsTouched();
    }
  }

  closeMapModal() {
    this.isMapModalOpen = false;
  }
}

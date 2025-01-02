import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '@proxy/controllers';
import { CreateBranchDto } from '@proxy/dtos/branch-contract';
import { IconsComponent } from "../../../../shared/icons/icons.component";
import { CommonModule } from '@angular/common';
import { CreateUpdateCategoryDto, UpdateCategory } from '@proxy/dtos/categories';

@Component({
  selector: 'app-add-item-categories',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, IconsComponent],
  templateUrl: './add-item-categories.component.html',
  styleUrl: './add-item-categories.component.scss'
})
export class AddItemCategoriesComponent {
  @Input() isOpen: boolean = false;
  @Input() itemCategory: UpdateCategory | null = null;
  @Output() close = new EventEmitter<void>();

  itemCategoryForm: FormGroup;
  isMapModalOpen: boolean = false;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
  ) {
    this.itemCategoryForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      image: [null, Validators.required],
      description: ['', Validators.required],
      status: [1],
    });
  }

  ngOnInit(): void {
    if (this.itemCategory) {
      this.populateForm(this.itemCategory);
    }
  }

  populateForm(itemCategory: UpdateCategory) {
    this.itemCategoryForm.patchValue({
      id: itemCategory.id,
      name: itemCategory.name,
      image: itemCategory.image,
      description: itemCategory.description,
      status: itemCategory.status
    });
  }

  closeModal() {
    this.close.emit();
  }

  submitForm() {
    if (this.itemCategoryForm.valid) {
      // Declare the formValue outside the if-else block
      let formValue: CreateBranchDto | UpdateCategory;

      // Determine whether it's an update or create operation
      if (this.itemCategoryForm.value.id) {
        formValue = this.itemCategoryForm.value as UpdateCategory;
      } else {
        formValue = this.itemCategoryForm.value as CreateBranchDto;
      }

      console.log(formValue);

      if (this.itemCategory) {
        // Update existing Item Category
        this.categoryService.update(formValue as UpdateCategory)
          .subscribe(
            response => {
              // Handle successful response
              console.log('Item Category updated successfully:', response);
            },
            error => {
              // Handle error response
              console.error('Error updating Item Category:', error);
            }
          );
      } else {
        // Create a new branch
        this.categoryService.create(formValue as CreateUpdateCategoryDto)
          .subscribe(
            response => {
              // Handle successful response
              console.log('Item Category created successfully:', response);
            },
            error => {
              // Handle error response
              console.error('Error creating Item Category:', error);
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

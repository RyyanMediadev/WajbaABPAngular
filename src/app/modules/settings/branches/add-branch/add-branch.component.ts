import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BranchService } from '@proxy/controllers';
import { AfterActionService } from 'src/app/services/after-action/after-action-service.service';
import { IconsComponent } from "../../../../shared/icons/icons.component";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MapModalComponent } from '../map-modal/map-modal.component';
import { CreateUpdateBranchDto } from '@proxy/dtos/branch-contract';

@Component({
  selector: 'app-add-branch',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, IconsComponent],
  templateUrl: './add-branch.component.html',
  styleUrl: './add-branch.component.scss'
})
export class AddBranchComponent {
  @Input() isOpen: boolean = false;
  @Input() branch: CreateUpdateBranchDto | null = null;
  @Output() close = new EventEmitter<void>();

  branchForm: FormGroup;
  isMapModalOpen: boolean = false;

  constructor(
    private fb: FormBuilder,
    private afterActionService: AfterActionService,
    @Inject(BranchService) private branchService: BranchService,
    private modalService: NgbModal,
  ) {
    this.branchForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      city: ['', Validators.required],
      state: ['', Validators.required],
      phone: ['', [Validators.required]],
      zipCode: ['', [Validators.required]],
      address: ['', Validators.required],
      status: ['active'],
      longitude: ['', [Validators.required]],
      latitude: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    if (this.branch) {
      this.populateForm(this.branch);
    }
  }

  populateForm(branch: CreateUpdateBranchDto) {
    this.branchForm.patchValue({
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
    if (this.branchForm.valid) {
      const branchData = this.branchForm.value;

      // Create FormData object to append the form fields
      const formData = new FormData();
      formData.append('Name', branchData.name);
      formData.append('Email', branchData.email);
      formData.append('City', branchData.city);
      formData.append('State', branchData.state);
      formData.append('Phone', branchData.phone);
      formData.append('ZipCode', branchData.zipCode);
      formData.append('Address', branchData.address);
      formData.append('Status', branchData.status === 'active' ? '1' : '0');
      formData.append('Longitude', branchData.longitude);
      formData.append('Latitude', branchData.latitude);

      if (this.branch) {
        // Update existing branch
        this.branchService.update(this.branch.id, formData).subscribe({
          next: () => {
            console.log('Branch updated successfully');
            this.afterActionService.reloadCurrentRoute();
            this.closeModal();
          },
          error: (err) => console.error('Update Error:', err),
        });
      } else {
        // Create a new branch
        this.branchService.create(formData).subscribe({
          next: () => {
            console.log('Branch created successfully');
            this.afterActionService.reloadCurrentRoute();
            this.closeModal();
          },
          error: (err) => console.error('Create Error:', err),
        });
      }
    } else {
      this.branchForm.markAllAsTouched();
    }
  }

  openMapModal() {
    const modalRef = this.modalService.open(MapModalComponent, {
      size: 'lg',
      centered: true,
      backdrop: 'static',
    });

    modalRef.componentInstance.close.subscribe(() => {
      modalRef.close();
    });

    modalRef.componentInstance.coordinatesSelected.subscribe(({ longitude, latitude }) => {
      this.setCoordinates(longitude, latitude);
      modalRef.close();
    });
  }

  closeMapModal() {
    this.isMapModalOpen = false;
  }

  // Method to receive coordinates from the map modal
  setCoordinates(longitude: number, latitude: number) {
    this.branchForm.patchValue({
      longitude: longitude,
      latitude: latitude
    });
    this.closeMapModal();
  }
}

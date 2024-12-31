import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { SettingsSidebarComponent } from "../settings-sidebar/settings-sidebar.component";
import { CommonModule } from '@angular/common';
import { CompanyService } from '@proxy/controllers';
import { CreateUpdateComanyDto } from '@proxy/dtos/company-contact';

export function urlValidator(control: AbstractControl): ValidationErrors | null {
  const urlRegex = /^(https?|ftp)?(:\/\/)?[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+.*$/;
  return urlRegex.test(control.value) ? null : { invalidUrl: true };
}
@Component({
  selector: 'app-company',
  standalone: true,
  imports: [ReactiveFormsModule, SettingsSidebarComponent, CommonModule],
  templateUrl: './company.component.html',
  styleUrl: './company.component.scss'
})
export class CompanyComponent implements OnInit {
  companyForm: FormGroup;
  companyId: number = 1; // Replace with the actual company ID

  constructor(
    private fb: FormBuilder,
    private companyService: CompanyService
  ) {
    this.companyForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[0-9]{7,14}$/)]],
      websiteURL: ['', [Validators.required, urlValidator]],
      city: ['', Validators.required],
      state: ['', Validators.required],
      countryCode: ['', Validators.required],
      zipCode: ['', Validators.required],
      address: ['', Validators.required],
      logoUrl: [''],
    });
  }

  ngOnInit() {
    this.loadCompanyData();
  }

  loadCompanyData() {
    this.companyService.getById().subscribe({
      next: (response) => {
        console.log(response);
        this.companyForm.patchValue(response.data);
      },
      error: (err) => {
        console.error('Failed to load company data:', err);
      },
    });
  }

  submitForm() {
    if (this.companyForm.valid) {
      // Map the form values to CreateUpdateComanyDto
      const input: CreateUpdateComanyDto = this.companyForm.value;

      console.log(input);
      // Call the update method from the CompanyService
      this.companyService.update(input).subscribe({
        next: (response) => {
          console.log('Company updated successfully:', response);
          // Add any success handling logic here (e.g., showing a success message)
        },
        error: (err) => {
          console.error('Error updating company:', err);
          // Add any error handling logic here (e.g., showing an error message)
        },
      });
    } else {
      this.companyForm.markAllAsTouched();
    }
  }
}

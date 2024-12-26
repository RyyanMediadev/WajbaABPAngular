import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SettingsSidebarComponent } from "../settings-sidebar/settings-sidebar.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [ReactiveFormsModule, SettingsSidebarComponent,CommonModule],
  templateUrl: './company.component.html',
  styleUrl: './company.component.scss'
})
export class CompanyComponent {
  companyForm: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
    // Initialize the form with default values and validators
    this.companyForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[0-9]{7,14}$/)]],
      website: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      countryCode: ['', Validators.required],
      zipCode: ['', Validators.required],
      address: ['', Validators.required],
      logoUrl: ['']
    });
  }

  submitForm() {
    if (this.companyForm.valid) {
      const formData = new FormData();

      // Append form fields to FormData
      formData.append('Name', this.companyForm.get('name')?.value);
      formData.append('Email', this.companyForm.get('email')?.value);
      formData.append('Phone', this.companyForm.get('phone')?.value);
      formData.append('WebsiteURL', this.companyForm.get('website')?.value);
      formData.append('City', this.companyForm.get('city')?.value);
      formData.append('State', this.companyForm.get('state')?.value);
      formData.append('CountryCode', this.companyForm.get('countryCode')?.value);
      formData.append('ZipCode', this.companyForm.get('zipCode')?.value);
      formData.append('Address', this.companyForm.get('address')?.value);

      // Append the file if selected
    }
  }
}

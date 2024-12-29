import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SettingsSidebarComponent } from "../settings-sidebar/settings-sidebar.component";
import { CommonModule } from '@angular/common';
import { CompanyService } from '@proxy/controllers';

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
    private companyService: CompanyService,
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

  ngOnInit() {
    this.loadCompanyData();
  }

  loadCompanyData() {
    this.companyService.getById(this.companyId).subscribe({
      next: (response: any) => {
        // Assuming response contains company data
        this.companyForm.patchValue({
          name: response.name,
          email: response.email,
          phone: response.phone,
          website: response.website,
          city: response.city,
          state: response.state,
          countryCode: response.countryCode,
          zipCode: response.zipCode,
          address: response.address,
          logoUrl: response.logoUrl
        });
      },
      error: (err) => console.error('Failed to load company data', err)
    });
  }

  submitForm() {
    if (this.companyForm.valid) {
      const formData = new FormData();

      // Append form fields
      formData.append('Name', this.companyForm.get('name')?.value);
      formData.append('Email', this.companyForm.get('email')?.value);
      formData.append('Phone', this.companyForm.get('phone')?.value);
      formData.append('WebsiteURL', this.companyForm.get('website')?.value);
      formData.append('City', this.companyForm.get('city')?.value);
      formData.append('State', this.companyForm.get('state')?.value);
      formData.append('CountryCode', this.companyForm.get('countryCode')?.value);
      formData.append('ZipCode', this.companyForm.get('zipCode')?.value);
      formData.append('Address', this.companyForm.get('address')?.value);

      // Append the logo file if selected
      const logoFile = (document.getElementById('logo') as HTMLInputElement)?.files?.[0];
      if (logoFile) {
        formData.append('LogoUrl', logoFile);
      } else {
        alert('Please select a logo file.');
        return;
      }

      // Call the service
      // this.companyService.create(formData).subscribe({
      //   next: () => {
      //     alert('Company created successfully!');
      //   },
      //   error: (error) => {
      //     console.error('Error creating company:', error);
      //     alert('Failed to create company.');
      //   },
      // });
    } else {
      // alert('Please fill out all required fields.');
      this.companyForm.markAllAsTouched();
    }
  }
}

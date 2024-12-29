import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SiteService } from '@proxy/controllers';
import { SettingsSidebarComponent } from "../settings-sidebar/settings-sidebar.component";

@Component({
  selector: 'app-site',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SettingsSidebarComponent],
  templateUrl: './site.component.html',
  styleUrl: './site.component.scss'
})
export class SiteComponent {
  siteForm: FormGroup;
  logoFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private siteService: SiteService,
    // private snackbarService: SnackbarService,
  ) {
    // Initialize the form with default values and validators
    this.siteForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      defaultLanguage: ['', Validators.required],
      defaultBranch: ['', Validators.required],
      androidAppLink: ['', Validators.required],
      iosAppLink: ['', Validators.required],
      copyrights: ['', Validators.required],
      googleMapKey: ['', Validators.required],
      digitAfterDecimal: ['', [Validators.min(0), Validators.max(10), Validators.required]],
      defaultCurrency: ['', Validators.required],
      currencyPosition: ['left', Validators.required],
      languageSwitch: ['enable', Validators.required],
    });
  }

  languages = [
    { value: 'en', viewValue: 'English' },
    { value: 'ar', viewValue: 'Arabic' },
    { value: 'fr', viewValue: 'French' }
  ];

  branches = [
    { value: 'branch1', viewValue: 'Branch 1' },
    { value: 'branch2', viewValue: 'Branch 2' },
    { value: 'branch3', viewValue: 'Branch 3' }
  ];

  currencies = [
    { value: 'usd', viewValue: 'USD' },
    { value: 'eur', viewValue: 'Euro' },
    { value: 'sar', viewValue: 'Saudi Riyal' }
  ];

  ngOnInit(): void {
    this.getCompany();
  }

  getCompany(): void {
    // this.siteService.getCompanyById(1).subscribe(
    //   (response) => {
    //     // Populate form fields with fetched company data
    //     this.siteForm.patchValue({
    //       name: this.response.name,
    //       email: this.response.email,
    //       phone: this.response.phone,
    //       website: this.response.websiteURL,
    //       city: this.response.city,
    //       state: this.response.state,
    //       countryCode: this.response.countryCode,
    //       zipCode: this.response.zipCode,
    //       address: this.response.address,
    //       logoUrl: this.response.logoUrl
    //     });
    //   },
    //   (error) => {
    //     console.error('Error fetching company:', error);
    //   }
    // );
  }

  // Method to handle file input change
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.logoFile = file;
    }
  }

  // Method to handle form submission
  submitForm() {
    if (this.siteForm.valid) {
      const formData = new FormData();

      // Append form fields to FormData
      formData.append('Name', this.siteForm.get('name')?.value);
      formData.append('Email', this.siteForm.get('email')?.value);
      formData.append('Phone', this.siteForm.get('phone')?.value);
      formData.append('WebsiteURL', this.siteForm.get('website')?.value);
      formData.append('City', this.siteForm.get('city')?.value);
      formData.append('State', this.siteForm.get('state')?.value);
      formData.append('CountryCode', this.siteForm.get('countryCode')?.value);
      formData.append('ZipCode', this.siteForm.get('zipCode')?.value);
      formData.append('Address', this.siteForm.get('address')?.value);

      // Append the file if selected
      if (this.logoFile) {
        formData.append('LogoUrl', this.logoFile);
      }

      // Call the service method to submit the data
      // this.siteService.update(this.company.id, formData).subscribe({
      //   next: (response) => {
      //     console.log('Form submitted successfully!', response);
      //     this.siteForm.reset();
      //   },
      //   error: (error) => {
      //     console.error('Form submission error:', error);
      //   }
      // });
    } else {
      // Mark all controls as touched to show validation errors
      this.siteForm.markAllAsTouched();
    }
  }
}

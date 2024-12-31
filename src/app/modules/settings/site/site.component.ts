import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BranchService, CurrenciesService, LanguageService, SiteService } from '@proxy/controllers';
import { SettingsSidebarComponent } from "../settings-sidebar/settings-sidebar.component";

@Component({
  selector: 'app-site',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SettingsSidebarComponent],
  templateUrl: './site.component.html',
  styleUrl: './site.component.scss'
})
export class SiteComponent implements OnInit {
  siteForm: FormGroup;
  logoFile: File | null = null;

  languages: { value: string, viewValue: string }[] = [];
  branches: { value: string, viewValue: string }[] = [];
  currencies: { value: string, viewValue: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private siteService: SiteService,
    private branchService: BranchService,
    private languageService: LanguageService,
    private currenciesService: CurrenciesService
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

  ngOnInit(): void {
    this.getCompany();
    this.loadLanguages();
    this.loadBranches();
    this.loadCurrencies();
  }

  getCompany(): void {
    this.siteService.getById().subscribe(
      (response) => {
        this.siteForm.patchValue({
          // name: response.data.name,
          // email: response.data.email,
          // phone: response.data.phone,
          // website: response.data.websiteURL,
          // city: response.data.city,
          // state: response.data.state,
          // countryCode: response.data.countryCode,
          // zipCode: response.data.zipCode,
          // address: response.data.address,
          // logoUrl: response.data.logoUrl
        });
      },
      (error) => {
        console.error('Error fetching company:', error);
      }
    );
  }

  loadLanguages(): void {
    // this.languageService.getList().subscribe({
    //   next: (languages) => {
    //     console.log(languages)
    //     this.languages = languages.map(lang => ({
    //       value: lang.code,
    //       viewValue: lang.name
    //     }));
    //   },
    //   error: (error) => {
    //     console.error('Error fetching languages:', error);
    //   }
    // });
  }

  loadBranches(): void {
    // this.branchService.getList().subscribe({
    //   next: (branches) => {
    //     console.log(branches)
    //     this.branches = branches.map(branch => ({
    //       value: branch.id,
    //       viewValue: branch.name
    //     }));
    //   },
    //   error: (error) => {
    //     console.error('Error fetching branches:', error);
    //   }
    // });
  }

  loadCurrencies(): void {
    // this.currenciesService.getList().subscribe({
    //   next: (currencies) => {
    //     console.log(currencies)
    //     this.currencies = currencies.map(currency => ({
    //       value: currency.code,
    //       viewValue: currency.name
    //     }));
    //   },
    //   error: (error) => {
    //     console.error('Error fetching currencies:', error);
    //   }
    // });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.logoFile = file;
    }
  }

  submitForm() {
    if (this.siteForm.valid) {
      const formData = new FormData();
      formData.append('Name', this.siteForm.get('name')?.value);
      formData.append('Email', this.siteForm.get('email')?.value);
      formData.append('Phone', this.siteForm.get('phone')?.value);
      formData.append('WebsiteURL', this.siteForm.get('website')?.value);
      formData.append('City', this.siteForm.get('city')?.value);
      formData.append('State', this.siteForm.get('state')?.value);
      formData.append('CountryCode', this.siteForm.get('countryCode')?.value);
      formData.append('ZipCode', this.siteForm.get('zipCode')?.value);
      formData.append('Address', this.siteForm.get('address')?.value);

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
      this.siteForm.markAllAsTouched();
    }
  }
}

import { Component, Inject, OnInit } from '@angular/core';
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
    private companyService: CompanyService
  ) {
    this.companyForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[0-9]{7,14}$/)]],
      websiteURL: [
        '',
        [Validators.required, Validators.pattern('^(https?|ftp)://[^\s/$.?#].[^\s]*$')],
      ],
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
    // this.companyService.get().subscribe({
    //   next: (response) => {
    //     this.companyForm.patchValue(response);
    //   },
    //   error: (err) => {
    //     console.error('Failed to load company data:', err);
    //   },
    // });
  }

  submitForm() {
    if (this.companyForm.valid) {
      const formData = this.companyForm.value;

      this.companyService.update(formData).subscribe({
        next: () => {
          alert('Company updated successfully!');
        },
        error: (error) => {
          console.error('Error updating company:', error);
          alert('Failed to update company.');
        },
      });
    } else {
      this.companyForm.markAllAsTouched();
    }
  }
}

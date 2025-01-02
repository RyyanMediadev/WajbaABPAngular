import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OTPService } from '@proxy/controllers';
import { SettingsSidebarComponent } from "../settings-sidebar/settings-sidebar.component";
import { PagedAndSortedResultRequestDto } from '@abp/ng.core';
import { UpdateOtpDto } from '@proxy/dtos/otpcontract';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SettingsSidebarComponent],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.scss'
})
export class OTPComponent {
  otpForm: FormGroup;

  // Define arrays for dynamic options
  orderTypes = [
    { label: 'Both', value: 0 },
    { label: 'Mail', value: 1 },
    { label: 'SMS', value: 2 }
  ];

  otpLengths = [4, 6, 8];
  otpExpireTimes = [5, 8, 10];

  constructor(private fb: FormBuilder, private otpService: OTPService) {
    this.otpForm = this.fb.group({
      id: [null],
      orderType: ['', Validators.required],
      otpLength: ['', Validators.required],
      otpExpireTime: ['', Validators.required]
    });
  }

  loadCurrencies(): void {
    const defaultInput: PagedAndSortedResultRequestDto = {
      sorting: '',
      skipCount: 0,
      maxResultCount: 10
    };

    this.otpService.getAllByDto(defaultInput).subscribe({
      next: (response) => {
        console.log(response);
        this.otpForm.patchValue({
          id: response.data.id,
          orderType: response.data.type,
          otpLength: response.data.digitLimit,
          otpExpireTime: response.data.expiryTimeInMinutes,
        });
      },
      error: (error) => {
        console.error('Error fetching currencies:', error);
      }
    });
  }

  onSubmit() {
    if (this.otpForm.valid) {
      let formValue = this.otpForm.value as UpdateOtpDto;

      // Call the OTP service to send the data
      this.otpService.update(formValue).subscribe({
        next: (response) => {
          console.log('OTP sent successfully:', response);
          this.otpForm.reset();
        },
        error: (error) => {
          console.error('Error sending OTP:', error);
          if (error.error instanceof ErrorEvent) {
            // Client-side error
            console.error('An error occurred:', error.error.message);
          } else {
            // Server-side error
            console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
          }
        }
      });
    } else {
      this.otpForm.markAllAsTouched();
    }
  }
}

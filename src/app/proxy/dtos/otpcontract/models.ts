import type { OTPType } from '../../enums/otptype.enum';

export interface CreateUpdateOTPDto {
  type: OTPType;
  digitLimit: number;
  expiryTimeInMinutes: number;
}

export interface UpdateOtpDto {
  id: number;
  type: OTPType;
  digitLimit: number;
  expiryTimeInMinutes: number;
}

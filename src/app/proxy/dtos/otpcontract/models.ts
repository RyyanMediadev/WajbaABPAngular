import type { OTPType } from '../../enums/otptype.enum';
import type { EntityDto } from '@abp/ng.core';

export interface CreateUpdateOTPDto {
  type: OTPType;
  digitLimit: number;
  expiryTimeInMinutes: number;
}

export interface OTPDto extends EntityDto<number> {
  type: OTPType;
  digitLimit: number;
  expiryTimeInMinutes: number;
}

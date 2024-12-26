import { mapEnumToOptions } from '@abp/ng.core';

export enum OTPType {
  Mail = 0,
  SMS = 1,
  Both = 2,
}

export const otpTypeOptions = mapEnumToOptions(OTPType);

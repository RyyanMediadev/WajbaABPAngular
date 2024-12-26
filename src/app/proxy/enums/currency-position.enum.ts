import { mapEnumToOptions } from '@abp/ng.core';

export enum CurrencyPosition {
  left = 0,
  right = 1,
}

export const currencyPositionOptions = mapEnumToOptions(CurrencyPosition);

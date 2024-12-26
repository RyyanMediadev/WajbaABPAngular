import { mapEnumToOptions } from '@abp/ng.core';

export enum LanguageSwitch {
  Disable = 0,
  Enable = 1,
}

export const languageSwitchOptions = mapEnumToOptions(LanguageSwitch);

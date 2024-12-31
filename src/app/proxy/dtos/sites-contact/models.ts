import type { CurrencyPosition } from '../../enums/currency-position.enum';
import type { LanguageSwitch } from '../../enums/language-switch.enum';

export interface CreateSiteDto {
  name: string;
  email: string;
  iosappLink: string;
  androidAPPLink: string;
  copyrights: string;
  googleMapKey: string;
  quantity: number;
  currencyPosition: CurrencyPosition;
  languageSwitch: LanguageSwitch;
  branchId: number;
  currencyId: number;
  languageId: number;
}


export interface CreateUpdateCurrenciesDto {
  name: string;
  symbol: string;
  code: string;
  exchangeRate: number;
  isCryptoCurrency: boolean;
}

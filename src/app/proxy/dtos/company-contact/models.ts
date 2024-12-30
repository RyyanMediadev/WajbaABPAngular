import type { PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface CreateUpdateComanyDto {
  name: string;
  email: string;
  phone: string;
  websiteURL: string;
  city: string;
  state: string;
  countryCode: string;
  zipCode: string;
  address: string;
}

export interface GetComanyInput extends PagedAndSortedResultRequestDto {
  filter?: string;
}

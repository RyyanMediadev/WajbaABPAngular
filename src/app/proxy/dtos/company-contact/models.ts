import type { IFormFile } from '../../microsoft/asp-net-core/http/models';
import type { PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface CreateComanyDto {
  name: string;
  email: string;
  phone: string;
  websiteURL: string;
  city: string;
  state: string;
  countryCode: string;
  zipCode: string;
  address: string;
  logoUrl: IFormFile;
}

export interface GetComanyInput extends PagedAndSortedResultRequestDto {
}

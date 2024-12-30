import type { PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface CreateUpdateBranchDto {
  id:number;
  name?: string;
  longitude: number;
  latitude: number;
  email?: string;
  phone?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  address?: string;
  status: number;
}

export interface GetBranchInput extends PagedAndSortedResultRequestDto {
  filter?: string;
}

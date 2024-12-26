import type { EntityDto } from '@abp/ng.core';

export interface BranchDto extends EntityDto<number> {
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

export interface CreateUpdateBranchDto {
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

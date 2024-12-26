import type { Status } from '../../enums/status.enum';
import type { EntityDto } from '@abp/ng.core';

export interface CreateUpdateItemTaxDto {
  name?: string;
  code: number;
  taxRate: number;
  status: Status;
}

export interface ItemTaxDto extends EntityDto<number> {
  name?: string;
  code: number;
  taxRate: number;
  status: Status;
}

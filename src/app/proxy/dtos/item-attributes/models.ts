import type { Status } from '../../enums/status.enum';
import type { EntityDto } from '@abp/ng.core';

export interface CreateUpdateItemAttributeDto {
  name: string;
  status: Status;
}

export interface ItemAttributeDto extends EntityDto<number> {
  name?: string;
  status: Status;
}

import type { IFormFile } from '../../microsoft/asp-net-core/http/models';
import type { Status } from '../../enums/status.enum';
import type { EntityDto } from '@abp/ng.core';

export interface CreateUpdateLanguageDto {
  name: string;
  code: string;
  image: IFormFile;
  status: Status;
}

export interface LanguageDto extends EntityDto<number> {
  name?: string;
  code?: string;
  imageUrl?: string;
  status: Status;
}

import type { IFormFile } from '../../microsoft/asp-net-core/http/models';
import type { Status } from '../../enums/status.enum';
import type { PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface CreateUpdateCategoryDto {
  name: string;
  image: IFormFile;
  status: Status;
  description: string;
}

export interface GetCategoryInput extends PagedAndSortedResultRequestDto {
  name?: string;
}

export interface UpdateCategory {
  id: number;
  name: string;
  image: IFormFile;
  status: Status;
  description: string;
}

import type { PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface GetThemeInput extends PagedAndSortedResultRequestDto {
  filter?: string;
}

import type { IFormFile } from '../../microsoft/asp-net-core/http/models';
import type { PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface CreateThemesDto {
  logoUrl: IFormFile;
  browserTabIconUrl: IFormFile;
  footerLogoUrl: IFormFile;
}

export interface GetThemeInput extends PagedAndSortedResultRequestDto {
  filter?: string;
}

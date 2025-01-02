import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { GetThemeInput } from '../dtos/themes-contract/models';
import type { IFormFile } from '../microsoft/asp-net-core/http/models';
import type { IActionResult } from '../microsoft/asp-net-core/mvc/models';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  apiName = 'Default';
  

  create = (BrowserTabIconUrl: IFormFile, FooterLogoUrl: IFormFile, LogoUrl: IFormFile, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'POST',
      url: '/api/Theme',
      body: LogoUrl,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'DELETE',
      url: `/api/Theme/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getById = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'GET',
      url: `/api/Theme/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: GetThemeInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'GET',
      url: '/api/Theme',
      params: { filter: input.filter, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: number, BrowserTabIconUrl: IFormFile, FooterLogoUrl: IFormFile, LogoUrl: IFormFile, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'PUT',
      url: `/api/Theme/${id}`,
      body: LogoUrl,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}

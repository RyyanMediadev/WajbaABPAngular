import { RestService, Rest } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { CreateUpdateLanguageDto, LanguageDto } from '../dtos/languages/models';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  apiName = 'Default';


  create = (input: CreateUpdateLanguageDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, LanguageDto>({
      method: 'POST',
      url: '/api/Language',
      body: input.image,
    },
    { apiName: this.apiName,...config });


  delete = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/Language/${id}`,
    },
    { apiName: this.apiName,...config });


  get = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, LanguageDto>({
      method: 'GET',
      url: `/api/Language/${id}`,
    },
    { apiName: this.apiName,...config });


  getList = (input?: PagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, any>({
      method: 'GET',
      url: '/api/Language',
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });


  update = (id: number, input: CreateUpdateLanguageDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, LanguageDto>({
      method: 'PUT',
      url: `/api/Language/${id}`,
      body: input.image,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}

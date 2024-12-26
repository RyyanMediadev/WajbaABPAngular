import { RestService, Rest } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { CreateUpdateCurrenciesDto, CurrenciesDto } from '../dtos/currencies-contract/models';

@Injectable({
  providedIn: 'root',
})
export class CurrenciesService {
  apiName = 'Default';
  

  create = (input: CreateUpdateCurrenciesDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CurrenciesDto>({
      method: 'POST',
      url: '/api/Currencies',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/Currencies/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CurrenciesDto>({
      method: 'GET',
      url: `/api/Currencies/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: PagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<CurrenciesDto>>({
      method: 'GET',
      url: '/api/Currencies',
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: number, input: CreateUpdateCurrenciesDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CurrenciesDto>({
      method: 'PUT',
      url: `/api/Currencies/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}

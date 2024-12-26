import { RestService, Rest } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { CreateUpdateItemTaxDto, ItemTaxDto } from '../dtos/item-tax-contract/models';

@Injectable({
  providedIn: 'root',
})
export class ItemTaxService {
  apiName = 'Default';
  

  create = (input: CreateUpdateItemTaxDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ItemTaxDto>({
      method: 'POST',
      url: '/api/ItemTax',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/ItemTax/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ItemTaxDto>({
      method: 'GET',
      url: `/api/ItemTax/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: PagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<ItemTaxDto>>({
      method: 'GET',
      url: '/api/ItemTax',
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: number, input: CreateUpdateItemTaxDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ItemTaxDto>({
      method: 'PUT',
      url: `/api/ItemTax/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}

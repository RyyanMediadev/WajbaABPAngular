import { RestService, Rest } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { CreateUpdateItemAttributeDto, ItemAttributeDto } from '../dtos/item-attributes/models';

@Injectable({
  providedIn: 'root',
})
export class ItemAttributeService {
  apiName = 'Default';
  

  create = (input: CreateUpdateItemAttributeDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ItemAttributeDto>({
      method: 'POST',
      url: '/api/ItemAttribute',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/ItemAttribute/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ItemAttributeDto>({
      method: 'GET',
      url: `/api/ItemAttribute/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: PagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<ItemAttributeDto>>({
      method: 'GET',
      url: '/api/ItemAttribute',
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: number, input: CreateUpdateItemAttributeDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ItemAttributeDto>({
      method: 'PUT',
      url: `/api/ItemAttribute/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}

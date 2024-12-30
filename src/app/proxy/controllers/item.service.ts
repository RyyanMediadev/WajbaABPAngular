import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { CreateItemDto, GetItemInput } from '../dtos/items-dtos/models';
import type { IActionResult } from '../microsoft/asp-net-core/mvc/models';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  apiName = 'Default';
  

  create = (input: CreateItemDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'POST',
      url: '/api/Item',
      body: input.imageUrl,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'DELETE',
      url: `/api/Item/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'GET',
      url: `/api/Item/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: GetItemInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'GET',
      url: '/api/Item',
      params: { filter: input.filter, categoryId: input.categoryId, itemType: input.itemType, isFeatured: input.isFeatured, isDeleted: input.isDeleted, status: input.status, minPrice: input.minPrice, maxPrice: input.maxPrice, minTaxValue: input.minTaxValue, maxTaxValue: input.maxTaxValue, branchId: input.branchId, itemId: input.itemId, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: number, input: CreateItemDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'PUT',
      url: `/api/Item/${id}`,
      body: input.imageUrl,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}

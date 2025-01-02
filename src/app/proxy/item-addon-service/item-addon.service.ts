import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { CreateUpdateItemAddonDto, ItemAddonDto } from '../dtos/item-addon-contract/models';

@Injectable({
  providedIn: 'root',
})
export class ItemAddonService {
  apiName = 'Default';
  

  create = (input: CreateUpdateItemAddonDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ItemAddonDto>({
      method: 'POST',
      url: '/api/app/item-addon',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  deleteForSpecificItem = (itemId: number, addonId: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: '/api/app/item-addon/for-specific-item',
      params: { itemId, addonId },
    },
    { apiName: this.apiName,...config });
  

  getById = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ItemAddonDto>({
      method: 'GET',
      url: `/api/app/item-addon/${id}/by-id`,
    },
    { apiName: this.apiName,...config });
  

  getByItemId = (itemId: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ItemAddonDto[]>({
      method: 'GET',
      url: `/api/app/item-addon/by-item-id/${itemId}`,
    },
    { apiName: this.apiName,...config });
  

  updateForSpecificItem = (itemId: number, addonId: number, input: CreateUpdateItemAddonDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ItemAddonDto>({
      method: 'PUT',
      url: '/api/app/item-addon/for-specific-item',
      params: { itemId, addonId },
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}

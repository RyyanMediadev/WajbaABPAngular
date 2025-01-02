import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { CreateItemExtraDto, ItemExtraDto, UpdateItemExtraDto } from '../dtos/item-extra-contract/models';

@Injectable({
  providedIn: 'root',
})
export class ItemExtraService {
  apiName = 'Default';
  

  create = (input: CreateItemExtraDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ItemExtraDto>({
      method: 'POST',
      url: '/api/app/item-extra',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (itemId: number, extraId: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: '/api/app/item-extra',
      params: { itemId, extraId },
    },
    { apiName: this.apiName,...config });
  

  get = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ItemExtraDto>({
      method: 'GET',
      url: `/api/app/item-extra/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getListByItemId = (itemId: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ItemExtraDto[]>({
      method: 'GET',
      url: `/api/app/item-extra/by-item-id/${itemId}`,
    },
    { apiName: this.apiName,...config });
  

  updateForSpecificItem = (itemId: number, extraId: number, input: UpdateItemExtraDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ItemExtraDto>({
      method: 'PUT',
      url: '/api/app/item-extra/for-specific-item',
      params: { itemId, extraId },
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}

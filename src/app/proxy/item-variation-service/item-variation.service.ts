import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { CreateItemVariationDto, ItemVariationDto, UpdateItemVariationDto } from '../dtos/item-variation-contract/models';

@Injectable({
  providedIn: 'root',
})
export class ItemVariationService {
  apiName = 'Default';
  

  create = (input: CreateItemVariationDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ItemVariationDto>({
      method: 'POST',
      url: '/api/app/item-variation',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  deleteForSpecificItem = (itemId: number, variationId: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: '/api/app/item-variation/for-specific-item',
      params: { itemId, variationId },
    },
    { apiName: this.apiName,...config });
  

  get = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ItemVariationDto>({
      method: 'GET',
      url: `/api/app/item-variation/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getListByItemId = (itemId: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ItemVariationDto[]>({
      method: 'GET',
      url: `/api/app/item-variation/by-item-id/${itemId}`,
    },
    { apiName: this.apiName,...config });
  

  updateForSpecificItem = (itemId: number, variationId: number, input: UpdateItemVariationDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ItemVariationDto>({
      method: 'PUT',
      url: '/api/app/item-variation/for-specific-item',
      params: { itemId, variationId },
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}

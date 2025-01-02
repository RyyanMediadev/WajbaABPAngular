import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { CreateItemVariationDto, UpdateItemVariationDto } from '../dtos/item-variation-contract/models';
import type { IActionResult } from '../microsoft/asp-net-core/mvc/models';

@Injectable({
  providedIn: 'root',
})
export class ItemVariationService {
  apiName = 'Default';
  

  create = (input: CreateItemVariationDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'POST',
      url: '/api/ItemVariation',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (itemId: number, variationId: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'DELETE',
      url: `/api/ItemVariation/item/${itemId}/variation/${variationId}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'GET',
      url: `/api/ItemVariation/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getVariationsByItemId = (itemId: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'GET',
      url: `/api/ItemVariation/item/${itemId}`,
    },
    { apiName: this.apiName,...config });
  

  updateVariationForItem = (itemId: number, variationId: number, input: UpdateItemVariationDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'PUT',
      url: `/api/ItemVariation/item/${itemId}/variation/${variationId}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}

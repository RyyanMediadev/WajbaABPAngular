import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { CreateUpdateItemAddonDto } from '../dtos/item-addon-contract/models';
import type { IActionResult } from '../microsoft/asp-net-core/mvc/models';

@Injectable({
  providedIn: 'root',
})
export class ItemAddonService {
  apiName = 'Default';
  

  create = (input: CreateUpdateItemAddonDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'POST',
      url: '/api/ItemAddon',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  deleteAddonForItem = (itemId: number, addonId: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'DELETE',
      url: `/api/ItemAddon/item/${itemId}/addon/${addonId}`,
    },
    { apiName: this.apiName,...config });
  

  getAddonsByItemId = (itemId: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'GET',
      url: `/api/ItemAddon/item/${itemId}`,
    },
    { apiName: this.apiName,...config });
  

  getById = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'GET',
      url: `/api/ItemAddon/${id}`,
    },
    { apiName: this.apiName,...config });
  

  updateAddonForItem = (itemId: number, addonId: number, input: CreateUpdateItemAddonDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'PUT',
      url: `/api/ItemAddon/item/${itemId}/addon/${addonId}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}

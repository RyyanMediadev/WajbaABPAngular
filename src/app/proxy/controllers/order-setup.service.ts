import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { CreateUpdateOrderSetupDto, GetOrderSetupInput } from '../dtos/order-setup-contract/models';
import type { IActionResult } from '../microsoft/asp-net-core/mvc/models';

@Injectable({
  providedIn: 'root',
})
export class OrderSetupService {
  apiName = 'Default';
  

  create = (input: CreateUpdateOrderSetupDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'POST',
      url: '/api/OrderSetup',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'DELETE',
      url: `/api/OrderSetup/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getById = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'GET',
      url: `/api/OrderSetup/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: GetOrderSetupInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'GET',
      url: '/api/OrderSetup',
      params: { filter: input.filter, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: number, input: CreateUpdateOrderSetupDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'PUT',
      url: `/api/OrderSetup/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}

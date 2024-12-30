import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { CreateUpdateComanyDto, GetComanyInput } from '../dtos/company-contact/models';
import type { IActionResult } from '../microsoft/asp-net-core/mvc/models';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  apiName = 'Default';

  // Adjust the create method to send formData
  create = (formData: FormData, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'POST',
      url: '/api/Company',
      body: formData, // Send FormData as the body of the request
    },
    { apiName: this.apiName, ...config });

  // Other service methods (no changes here)
  delete = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'DELETE',
      url: `/api/Company/${id}`,
    },
    { apiName: this.apiName, ...config });

  getById = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'GET',
      url: `/api/Company/${id}`,
    },
    { apiName: this.apiName, ...config });

  getList = (input: GetComanyInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'GET',
      url: '/api/Company',
      params: { filter: input.filter, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName, ...config });

  update = (id: number, input: CreateUpdateComanyDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'PUT',
      url: `/api/Company/${id}`,
    },
    { apiName: this.apiName, ...config });

  constructor(private restService: RestService) {}
}


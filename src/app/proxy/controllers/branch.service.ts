import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { CreateUpdateBranchDto, GetBranchInput } from '../dtos/branch-contract/models';
import type { IActionResult } from '../microsoft/asp-net-core/mvc/models';

@Injectable({
  providedIn: 'root',
})
export class BranchService {
  apiName = 'Default';


  delete = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'DELETE',
      url: `/api/Branch/${id}`,
    },
    { apiName: this.apiName,...config });


  getById = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, any>({
      method: 'GET',
      url: `/api/Branch/${id}`,
    },
    { apiName: this.apiName,...config });


  getList = (input: GetBranchInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, any>({
      method: 'GET',
      url: '/api/Branch',
      params: { filter: input.filter, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });


    create = (input: FormData, config?: Partial<Rest.Config>) =>
      this.restService.request<any, IActionResult>({
        method: 'POST',
        url: '/api/Branch',
        body: input, // Pass FormData as the body
      }, { apiName: this.apiName, ...config });

    update = (id: number, input: FormData, config?: Partial<Rest.Config>) =>
      this.restService.request<any, IActionResult>({
        method: 'PUT',
        url: `/api/Branch/${id}`,
        body: input, // Pass FormData as the body
      }, { apiName: this.apiName, ...config });


  constructor(private restService: RestService) {}
}

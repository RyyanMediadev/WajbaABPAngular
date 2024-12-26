import { RestService, Rest } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { CouponDto, CreateUpdateCouponDto } from '../dtos/coupon-contract/models';

@Injectable({
  providedIn: 'root',
})
export class CouponService {
  apiName = 'Default';
  

  create = (input: CreateUpdateCouponDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CouponDto>({
      method: 'POST',
      url: '/api/Coupon',
      body: input.image,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/Coupon/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CouponDto>({
      method: 'GET',
      url: `/api/Coupon/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: PagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<CouponDto>>({
      method: 'GET',
      url: '/api/Coupon',
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: number, input: CreateUpdateCouponDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CouponDto>({
      method: 'PUT',
      url: `/api/Coupon/${id}`,
      body: input.image,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}

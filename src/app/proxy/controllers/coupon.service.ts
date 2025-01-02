import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { CreateUpdateCouponDto, GetCouponsInput, UpdateCoupondto } from '../dtos/coupon-contract/models';
import type { IActionResult } from '../microsoft/asp-net-core/mvc/models';

@Injectable({
  providedIn: 'root',
})
export class CouponService {
  apiName = 'Default';
  

  create = (input: CreateUpdateCouponDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'POST',
      url: '/api/Coupon',
      params: { name: input.name, code: input.code, discount: input.discount, discountType: input.discountType, startDate: input.startDate, endDate: input.endDate, minimumOrderAmount: input.minimumOrderAmount, maximumDiscount: input.maximumDiscount, limitPerUser: input.limitPerUser, description: input.description },
      body: input.image,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'DELETE',
      url: `/api/Coupon/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getById = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'GET',
      url: `/api/Coupon/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: GetCouponsInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'GET',
      url: '/api/Coupon',
      params: { filter: input.filter, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (input: UpdateCoupondto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'PUT',
      url: '/api/Coupon',
      params: { id: input.id, name: input.name, code: input.code, discount: input.discount, discountType: input.discountType, startDate: input.startDate, endDate: input.endDate, minimumOrderAmount: input.minimumOrderAmount, maximumDiscount: input.maximumDiscount, limitPerUser: input.limitPerUser, description: input.description },
      body: input.image,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}

import type { DiscountType } from '../../enums/discount-type.enum';
import type { IFormFile } from '../../microsoft/asp-net-core/http/models';
import type { PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface CreateUpdateCouponDto {
  name: string;
  code: number;
  discount: number;
  discountType: DiscountType;
  startDate?: string;
  endDate?: string;
  minimumOrderAmount: number;
  maximumDiscount: number;
  limitPerUser: number;
  description?: string;
  image: IFormFile;
}

export interface GetCouponsInput extends PagedAndSortedResultRequestDto {
  filter?: string;
}

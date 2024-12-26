import type { EntityDto } from '@abp/ng.core';
import type { DiscountType } from '../../enums/discount-type.enum';
import type { IFormFile } from '../../microsoft/asp-net-core/http/models';

export interface CouponDto extends EntityDto<number> {
  name?: string;
  code: number;
  discount: number;
  discountType: DiscountType;
  startDate?: string;
  endDate?: string;
  minimumOrderAmount: number;
  maximumDiscount: number;
  limitPerUser: number;
  countOfUsers: number;
  imageUrl?: string;
  description?: string;
  branchId: number;
  isExpired: boolean;
}

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
  branchId: number;
  image: IFormFile;
}

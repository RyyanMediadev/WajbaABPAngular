import { RestService, Rest } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { CreateUpdateOTPDto, OTPDto } from '../dtos/otpcontract/models';

@Injectable({
  providedIn: 'root',
})
export class OTPService {
  apiName = 'Default';
  

  create = (input: CreateUpdateOTPDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, OTPDto>({
      method: 'POST',
      url: '/api/OTP',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/OTP/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, OTPDto>({
      method: 'GET',
      url: `/api/OTP/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: PagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<OTPDto>>({
      method: 'GET',
      url: '/api/OTP',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  update = (id: number, input: CreateUpdateOTPDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, OTPDto>({
      method: 'PUT',
      url: `/api/OTP/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}

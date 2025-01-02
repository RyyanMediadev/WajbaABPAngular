import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { LogInDto } from '../dtos/user-dto/models';
import type { IActionResult } from '../microsoft/asp-net-core/mvc/models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiName = 'Default';
  

  logInByLogInDto = (LogInDto: LogInDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'POST',
      url: '/api/User/LogIn',
      body: LogInDto,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}

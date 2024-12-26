import type { PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface CreateTimeSlotDot {
  weekDay: any;
  openingTime: string;
  closingTime: string;
}

export interface GetTimeSlotInput extends PagedAndSortedResultRequestDto {
}

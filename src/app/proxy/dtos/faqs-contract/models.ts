import type { PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface CreateFaqs {
  question: string;
  answer: string;
}

export interface GetFaqInput extends PagedAndSortedResultRequestDto {
}

export interface UpadtefaqDto {
  id: number;
  question: string;
  answer: string;
}

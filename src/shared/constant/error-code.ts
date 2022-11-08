import { ErrCategoryCode, ErrDetailCode } from './errors';

export class DetailErrorCode {
  message?: string;
  categoryCode: ErrCategoryCode;
  detailCode: ErrDetailCode;

  constructor(
    categoryCode: ErrCategoryCode,
    detailCode: ErrDetailCode,
    message?: string
  ) {
    this.categoryCode = categoryCode;
    this.detailCode = detailCode;
    this.message = message;
  }
}

import { SelectQueryBuilder } from 'typeorm';

export function setDateInterval(
  qb: SelectQueryBuilder<any>,
  startDate: Date,
  endDate: Date,
  dateProperty = 'date',
) {
  if (startDate) {
    qb.andWhere(`${dateProperty} >= :startDate`, { startDate });
  }
  if (endDate) {
    qb.andWhere(`${dateProperty} >= :endDate`, { startDate });
  }
}

export function paginate(
  qb: SelectQueryBuilder<any>,
  page: number,
  pageSize: number,
) {
  qb.skip((page - 1) * pageSize);
  qb.take(pageSize);
}

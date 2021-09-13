export const enum TodoStatusEnum {
  'actif' = 'En cours',
  'waiting' = 'En attente',
  'done' = 'Finalisé',
}
export class TodoModel {
  constructor(
    public id: number = 0,
    public name: string = '',
    public description = '',
    public createdAt: Date = new Date(),
    public status: TodoStatusEnum = TodoStatusEnum.waiting,
  ) {}
}

export class DefaultModel {
  id: number;
  persistedAt: Date;
  updatedAt: Date;
  deleted: boolean;
  version: number;

  constructor() {
    this.id = 0;
    this.persistedAt = new Date();
    this.updatedAt = new Date();
    this.deleted = false;
    this.version = 0;
  }
}

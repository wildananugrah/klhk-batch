export interface IODKDB {
  list(limit: number): Promise<any[]>;
  update(id: string): Promise<boolean>
}

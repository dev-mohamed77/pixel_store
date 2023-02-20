export interface IProductDataSource {
  create(): Promise<string>;
  getProducts(): Promise<number>;
  getProductByID(): Promise<string>;
  updateProductByID(): Promise<string>;
  deleteProductByID(): Promise<string>;
}

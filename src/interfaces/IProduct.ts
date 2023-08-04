export interface IProduct {
  id: number;
  name: string;
  image: string;
  price: number;
  desc: string;
  categoryId: number;
}

export interface IProductWithCategory extends IProduct {
  categoryName: string;
}

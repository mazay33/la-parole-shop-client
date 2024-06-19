import type { IProduct, ProductListItem } from '../product/productApi.types';

export interface IAddProductToCartResponse {
	cartId: string;
	productId: number;
	count: number;
	createdAt: Date;
	updatedAt: Date;
}

export interface ICartItem {
	cartId: string;
	productId: number;
	count: number;
	createdAt: Date;
	updatedAt: Date;
	product: ProductListItem;
}
export interface ICart {
	userId: string;
	createdAt: Date;
	updatedAt: Date;
	cart_items: ICartItem[];
}

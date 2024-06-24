import type { ProductListItem } from '../product/productApi.types';

export interface IAddProductToWishListResponse {
	cartId: string;
	productId: number;
	count: number;
	createdAt: Date;
	updatedAt: Date;
}

export interface IWishListItem {
	cartId: string;
	productId: number;
	createdAt: Date;
	updatedAt: Date;
	product: ProductListItem;
}

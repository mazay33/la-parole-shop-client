import type { ProductListItem } from '../product/productApi.types';

export interface IAddProductToWishListResponse {
	cartId: string;
	productId: number;
	createdAt: Date;
	updatedAt: Date;
}

export interface IWishListItem {
	cartId: number;
	productId: number;
	count: number;
	createdAt: Date;
	updatedAt: Date;
}

export interface IWishList {
	userId: string;
	createdAt: Date;
	updatedAt: Date;
	cart_items: IWishListItem[];
}

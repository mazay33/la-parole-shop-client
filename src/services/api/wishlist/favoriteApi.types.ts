import type { IProduct } from '../product/productApi.types';

export interface IAddProductToWishListResponse {
	cartId: string;
	productId: number;
	count: number; //
	createdAt: Date;
	updatedAt: Date;
}

export interface IAddProductToWishListRequest {
	quantity: number; //
	configurataionId?: number;
	cupSizeId?: number;
	clothingSizeId?: number;
	beltSizeId?: number;
}

export interface IWishListProductItem {
	id: number;
	cartId: string;
	productId: number;
	quantity: number; //
	configurataionId: number | null;
	cupSizeId: number | null;
	clothingSizeId: number | null;
	beltSizeId: number | null;
	createdAt: Date;
	updatedAt: Date;
	product: Omit<IProduct, 'cupSizes' | 'clothingSizes' | 'beltSizes' | 'info'>;
}
export interface IWishList {
	userId: string;
	createdAt: Date;
	updatedAt: Date;

	cartProducts: IWishListProductItem[];
}

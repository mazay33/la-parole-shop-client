import type { IConfiguration, IProduct, ISize, ProductListItem } from '../product/productApi.types';

export interface IAddProductToCartResponse {
	cartId: string;
	productId: number;
	count: number;
	createdAt: Date;
	updatedAt: Date;
}

export interface IAddProductToCartRequest {
	quantity: number;
	configurataionId?: number;
	cupSizeId?: number;
	clothingSizeId?: number;
	beltSizeId?: number;
}

export interface ICartProductItem {
	id: number;
	cartId: string;
	productId: number;
	quantity: number;
	productConfigurationId: number | null;
	productConfiguration: IConfiguration | null;
	cupSizeId: number | null;
	cupSize: ISize | null;
	clothingSizeId: number | null;
	clothingSize: ISize | null;
	beltSizeId: number | null;
	beltSize: ISize | null;
	createdAt: Date;
	updatedAt: Date;
	product: Omit<IProduct, 'cupSizes' | 'clothingSizes' | 'beltSizes' | 'info'>;
}
export interface ICart {
	userId: string;
	createdAt: Date;
	updatedAt: Date;

	cartProducts: ICartProductItem[];
}

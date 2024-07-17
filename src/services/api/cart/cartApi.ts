import type { IPaginatedResult } from '~/@types/pagination';
import type HttpService from '../../httpService';
import { HttpMethod, type HttpReturnType } from '../../httpService';
import BaseApi from '../base';
import type { IAddProductToCartRequest, IAddProductToCartResponse, ICart, ICartProductItem } from './cartApi.types';
import type { UseFetchOptions } from '#app';
import type { IProduct } from '../product/productApi.types';

export default class CartApi extends BaseApi {
	constructor(private httpService: HttpService) {
		super();
	}

	protected getHttpService() {
		return this.httpService;
	}

	public async getCartProducts(
		options?: UseFetchOptions<ICartProductItem[]>,
	): Promise<HttpReturnType<ICartProductItem[]>> {
		const url = '/cart/products';
		return await this.sendRequest<ICartProductItem[]>(HttpMethod.GET, url, {
			...options,
		});
	}

	public async addProductToCart(
		productId: number,
		body: IAddProductToCartRequest,
		options?: UseFetchOptions<IAddProductToCartResponse>,
	): Promise<HttpReturnType<IAddProductToCartResponse>> {
		const url = `/cart/add/${productId}`;
		return await this.sendRequest<IAddProductToCartResponse, IAddProductToCartRequest>(HttpMethod.POST, url, body, {
			...options,
		});
	}

	public async updateCartProduct(cartProductId: number, body: IAddProductToCartRequest) {
		const url = `/cart/update/${cartProductId}`;
		return await this.sendRequest<IAddProductToCartResponse, IAddProductToCartRequest>(HttpMethod.PUT, url, body);
	}

	public async getCartQuantity(
		options?: UseFetchOptions<{ totalQuantity: number }>,
	): Promise<HttpReturnType<{ totalQuantity: number }>> {
		const url = '/cart/quantity';
		return await this.sendRequest<{ totalQuantity: number }>(HttpMethod.GET, url, {
			...options,
		});
	}

	public async deleteCartProduct(cartProductId: number): Promise<HttpReturnType<{ message: string }>> {
		const url = `/cart/remove/${cartProductId}`;
		return await this.sendRequest<{ message: string }>(HttpMethod.DELETE, url);
	}

	public async deleteAllCartProducts(): Promise<HttpReturnType<{ message: string }>> {
		const url = '/cart/clear';
		return await this.sendRequest<{ message: string }>(HttpMethod.DELETE, url);
	}

	// Получение товаров, ессли юзер не залогинен
	public async getProductsForCartByIds(ids: number[]): Promise<HttpReturnType<Omit<IProduct[], 'info'>>> {
		const url = '/cart/products';
		return await this.sendRequest<Omit<IProduct[], 'info'>, number[]>(HttpMethod.POST, url, ids);
	}
}

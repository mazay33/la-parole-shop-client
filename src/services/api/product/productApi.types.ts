export interface ICategory {
	id: number;
	description: string | null;
	name: string;
}

export interface ISubCategory {
	id: number;
	name: string;
}

export interface ISize {
	id: number;
	size: string;
}

export interface IConfiguration {
	id: number;
	sku: string;
	price: number;
	name: string;
}
export interface IInfo {
	id: number;
	title: string;
	description: string;
}
export interface IProductImage {
	id: number;
	url: string;
}

export interface IProduct {
	id: number;
	name: string;
	sku: string;
	price: number;
	discount: number;
	stock: number;
	isAvailable: boolean;
	categoryId: number;
	createdAt: Date;
	updatedAt: Date;
	category: ICategory;
	subCategories: ISubCategory[];
	cupSizes: ISize[];
	clothingSizes: ISize[];
	beltSizes: ISize[];
	productConfigurations: IConfiguration[];
	info: IInfo[];
	images: IProductImage[];
}

export interface ProductListItem
	extends Omit<IProduct, 'cupSizes' | 'clothingSizes' | 'beltSizes' | 'productConfigurations' | 'info'> {}

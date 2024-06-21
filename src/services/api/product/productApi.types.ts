export interface ICategory {
	createdAt: Date;
	description: string | null;
	id: number;
	name: string;
	updatedAt: Date;
}

export interface ISubCategory {
	id: number;
	name: string;
	description: string;
	categoryId: number;
	createdAt: Date;
	updatedAt: Date;
}

export interface ISize {
	id: number;
	size: string;
}

export interface IVariation {
	id: number;
	productId: number;
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
	productId: number;
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
	sub_categories: ISubCategory[];
	cup_sizes: ISize[];
	clothing_sizes: ISize[];
	underbust_sizes: ISize[];
	variations: IVariation[];
	info: IInfo[];
	img: IProductImage[];
}

export interface ProductListItem extends Omit<IProduct, 'cup_sizes' | 'clothing_sizes' | 'underbust_sizes' | 'info'> {}

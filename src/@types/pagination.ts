export interface IPaginationMeta {
	page: number;
	pageSize: number;
	total: number;
	totalPages: number;
}

export interface IPaginatedResult<T> extends IPaginationMeta {
	data: T[];
}

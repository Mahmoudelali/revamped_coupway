export interface Offer {
	id: number;
	image_url: string;
	title: string;
	coupons: number;
	working: boolean;
	main_picture: string;
	highlights: string;
	compensations: string;
	fine_print: string;
	description: string;
	old_price: number;
	new_price: number;
	isVip: boolean;
	is_unique: boolean;
	company: Company;
	location: Location;
	category: Category;
	subcategories: Subcategory[];
}

export interface Company {
	id: number;
	name: string;
	location_description: string;
	city: string;
	review: number;
	reviews_count: number;
	location: Location;
}

export interface Location {
	id: number;
	name: string;
	lng: number;
	lat: number;
}

export interface Category {
	id: number;
	name: string;
	category_illustration: string;
}

export interface Subcategory {
	id: number;
	name: string;
	category: Category2;
}

export interface Category2 {
	id: number;
	name: string;
	category_illustration: string;
}

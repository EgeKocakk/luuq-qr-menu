export type Category = {
  id: string;
  name: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
};

export type ProductOption = {
  id: string;
  group_id: string;
  name: string;
  price_diff: number;
  is_default: boolean;
  sort_order: number;
};

export type ProductOptionGroup = {
  id: string;
  product_id: string;
  name: string;
  type: "single" | "multi";
  is_required: boolean;
  sort_order: number;
  product_options: ProductOption[];
};

export type Product = {
  id: string;
  category_id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  base_price: number;
  is_active: boolean;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
};

export type ProductWithOptions = Product & {
  product_option_groups: ProductOptionGroup[];
};

export type CategoryWithProducts = Category & {
  products: ProductWithOptions[];
};

export type Settings = {
  id: true;
  announcement: string | null;
  hero_image_url: string | null;
  updated_at: string;
};

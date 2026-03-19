import { IProductModel, PRODUCT_CATEGORIES, ProductModel } from "@/models/product";
import dbConnect from "@/src/lib/db";
import { cache } from "react";
import { FilterQuery, Types } from "mongoose";

export type LeanProduct = Pick<IProductModel, 
  'name' | 'slug' | 'description' | 'price' | 'category' | 'brand' | 'stock' | 'image' | 'requiresPrescription' | 'createdAt'
> & { _id: Types.ObjectId };

export type ProductDTO = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  formattedPrice: string;
  category: typeof PRODUCT_CATEGORIES[number];
  brand: string;
  stock: number;
  inStock: boolean;
  image: string;
  requiresPrescription: boolean;
  createdAt: string;
}

export function serializeProduct(product: LeanProduct): ProductDTO {
    return {
    id: product._id.toString(),
    name: product.name,
    slug: product.slug,
    description: product.description,
    price: product.price,
    formattedPrice: new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(product.price),
    category: product.category,
    brand: product.brand,
    stock: product.stock,
    inStock: product.stock > 0,
    image: product.image,
    requiresPrescription: product.requiresPrescription,
    createdAt: product.createdAt.toISOString(),
  };
}

interface GetProductsParams {
  category?: typeof PRODUCT_CATEGORIES[number];
  search?: string;
  limit?: number;
  page?: number;
}

export const getProductsServer = cache(async ({
  category,
  search,
  limit = 12,
  page = 1,
}: GetProductsParams = {}): Promise<{
  products: ProductDTO[];
  total: number;
  pages: number;
  currentPage: number;
}> => {
    await dbConnect();

    try {
        const query: FilterQuery<IProductModel> = {};

        if (category) query.category = category;
        if (search) {
            query.$text = { $search: search };
        }

        const skip = (Math.max(1, page) - 1) * limit;

        const [products, total] = await Promise.all([
          ProductModel.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean<LeanProduct[]>(),
          ProductModel.countDocuments(query),
        ]);

        return {
            products: products.map(serializeProduct),
            total,
            pages: Math.ceil(total / limit),
            currentPage: page,
        };
    }catch (error) {
        console.error("Error fetching products:", error);
        throw new Error("Failed to fetch products");
    }
});
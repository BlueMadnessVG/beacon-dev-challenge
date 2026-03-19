import { cache } from "react";
import { LeanProduct, ProductDTO, serializeProduct } from "./getProducts.action";
import dbConnect from "@/src/lib/db";
import { ProductModel } from "@/models/product";

export const getSlugProductServer = cache(async (slug: string): Promise<ProductDTO | null> => {
    if (!slug) return null;
    
    await dbConnect();

    try {
        const product = await ProductModel.findOne({ slug }).lean<LeanProduct>();

        if (!product) return null;
        return serializeProduct(product);
    } catch (error) {
        console.error(`Error fetching product with slug: ${slug}`, error);
        throw new Error("Failed to fetch product details");
    }
}) 
import mongoose, { Schema, Document } from 'mongoose';

export const PRODUCT_CATEGORIES = [
  'medicamentos',
  'suplementos', 
  'cuidado-personal',
  'dispositivos-medicos'
] as const;

export type ProductCategory = typeof PRODUCT_CATEGORIES[number];

export interface IProductModel extends Document {
  name: string;              // Product name
  slug: string;              // URL-friendly identifier
  description: string;       // Product description
  price: number;             // Price in USD
  category: typeof PRODUCT_CATEGORIES[number];          // "medicamentos" | "suplementos" | "cuidado-personal" | "dispositivos-medicos"
  brand: string;             // Brand name
  stock: number;             // Available quantity
  image: string;             // Placeholder image URL
  requiresPrescription: boolean;  // Whether prescription is needed
  createdAt: Date;  
}

const ProductSchema = new Schema<IProductModel>({
  name: { 
    type: String, 
    required: [true, 'El nombre del producto es requerido'],
    trim: true,
    maxlength: [100, 'El nombre no puede exceder 100 caracteres']
  },
  
  slug: { 
    type: String, 
    required: [true, 'El slug es requerido'],
    unique: true,
    lowercase: true,
    trim: true,
    index: true
  },
  
  description: { 
    type: String, 
    required: [true, 'La descripción es requerida'],
    trim: true,
    maxlength: [1000, 'La descripción no puede exceder 1000 caracteres']
  },
  
  price: { 
    type: Number, 
    required: [true, 'El precio es requerido'],
    min: [0, 'El precio no puede ser negativo']
  },
  
  category: { 
    type: String, 
    required: [true, 'La categoría es requerida'],
    enum: {
      values: PRODUCT_CATEGORIES,
      message: 'Categoría no válida'
    }
  },
  
  brand: { 
    type: String, 
    required: [true, 'La marca es requerida'],
    trim: true,
    index: true
  },
  
  stock: { 
    type: Number, 
    required: [true, 'El stock es requerido'],
    min: [0, 'El stock no puede ser negativo'],
    default: 0
  },
  
  image: { 
    type: String, 
    required: [true, 'La imagen es requerida'],
    default: 'default route'
  },
  
  requiresPrescription: { 
    type: Boolean, 
    required: true,
    default: false
  },

  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

ProductSchema.index({ category: 1, price: 1 });
ProductSchema.index({ brand: 1, category: 1 });
ProductSchema.index({ name: 'text', description: 'text' });

export const ProductModel = mongoose.models.Product || mongoose.model<IProductModel>('Product', ProductSchema);
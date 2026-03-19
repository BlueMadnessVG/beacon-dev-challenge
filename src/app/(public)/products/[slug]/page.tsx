import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getSlugProductServer } from "../_actions/getSulgProduct.action";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getSlugProductServer(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Inicio
          </Link>
          <span>›</span>
          <Link href="/products" className="hover:text-blue-600 transition-colors">
            Productos
          </Link>
          <span>›</span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </nav>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
            
            <div className="space-y-4">
              <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                
                <div className="absolute bottom-4 left-4 flex flex-col gap-2">
                  {product.requiresPrescription && (
                    <span className="bg-orange-500 text-white text-xs px-3 py-1.5 rounded-full font-medium">
                      Requiere receta médica
                    </span>
                  )}
                  
                  {!product.inStock && (
                    <span className="bg-red-500 text-white text-xs px-3 py-1.5 rounded-full font-medium">
                      Agotado temporalmente
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                <p className="text-sm text-gray-500 capitalize">
                  Categoría: {product.category.replace('-', ' ')}
                </p>
              </div>

              <div className="border-t border-b border-gray-200 py-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl text-gray-600">Precio:</span>
                  <span className="text-4xl font-bold text-blue-600">
                    {product.formattedPrice}
                  </span>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  Descripción
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${
                  product.inStock ? 'bg-green-500' : 'bg-red-500'
                }`} />
                <span className="text-sm text-gray-600">
                  {product.inStock 
                    ? `En stock (${product.stock} disponibles)` 
                    : 'Producto agotado'}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  disabled={!product.inStock}
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {product.inStock ? 'Agregar al carrito' : 'Sin stock'}
                </button>
                
                <button className="flex-1 border-2 border-blue-600 text-blue-600 py-3 px-6 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                  Contactar asesor
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
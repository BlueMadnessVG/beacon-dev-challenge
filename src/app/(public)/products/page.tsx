import { getProductsServer } from './_actions/getProducts.action';
import Link from 'next/link';
import Image from 'next/image';
import { PRODUCT_CATEGORIES, ProductCategory } from '@/models/product';

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string;
    search?: string;
    page?: string;
  }>;
}

async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const page = params.page ? parseInt(params.page) : 1;

  const { products, total, pages, currentPage } = await getProductsServer({
    category: params.category as ProductCategory,
    search: params.search,
    page,
    limit: 12
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header y búsqueda */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Productos</h1>
            <p className="text-gray-600 mt-1">{total} productos disponibles</p>
          </div>
          
          <form action="/products" method="GET" className="flex gap-2 w-full sm:w-auto">
            <input
              type="text"
              name="search"
              defaultValue={params.search}
              placeholder="Buscar por nombre..."
              className="flex-1 sm:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Buscar
            </button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="flex flex-wrap gap-2">
            <Link
              href="/products"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                !params.category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Todos
            </Link>
            
            {PRODUCT_CATEGORIES.map((cat) => (
              <Link
                key={cat}
                href={`/products?category=${cat}${params.search ? `&search=${params.search}` : ''}`}
                className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                  params.category === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.replace('-', ' ')}
              </Link>
            ))}
          </div>
        </div>

        {products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                >
                  <div className="relative aspect-square bg-gray-100">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    
                    {product.requiresPrescription && (
                      <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                        Rx
                      </span>
                    )}
                    
                    {!product.inStock && (
                      <span className="absolute bottom-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        Agotado
                      </span>
                    )}
                  </div>

                  <div className="p-4">
                    <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
                    <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-blue-600">
                        {product.formattedPrice}
                      </span>
                      
                      <span className="text-sm text-gray-500 capitalize">
                        {product.category.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {pages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                {currentPage > 1 && (
                  <Link
                    href={`/products?page=${currentPage - 1}${params.category ? `&category=${params.category}` : ''}${params.search ? `&search=${params.search}` : ''}`}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Anterior
                  </Link>
                )}

                <span className="px-4 py-2">
                  Página {currentPage} de {pages}
                </span>

                {currentPage < pages && (
                  <Link
                    href={`/products?page=${currentPage + 1}${params.category ? `&category=${params.category}` : ''}${params.search ? `&search=${params.search}` : ''}`}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Siguiente
                  </Link>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No se encontraron productos</p>
            <Link href="/products" className="text-blue-600 hover:underline mt-2 inline-block">
              Ver todos los productos
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductsPage;
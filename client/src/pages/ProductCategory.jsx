import { useAppContext } from '../context/AppContext'
import { useParams } from 'react-router-dom'
import { categories,assets } from '../assets/assets'
import ProductCard from '../components/ProductCard'
import { useState, useEffect } from 'react'



const ProductCategory = () => {
    const {products} = useAppContext()
    const {category} = useParams()

    const [searchQuery, setSearchQuery] = useState('')
    const [filteredProducts, setFilteredProducts] = useState([])

    const searchCategory = categories.find((item)=>item.path.
    toLowerCase()==category)

    // const filteredProducts = products.filter((product)=>product.
    // category.toLowerCase()===category)

    useEffect(() => {
      const categoryProducts = products.filter(product =>
          Array.isArray(product.category)
              ? product.category.map(c => c.toLowerCase()).includes(category)
              : product.category.toLowerCase() === category
      )

      const searchFiltered = categoryProducts.filter(product =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )

      setFilteredProducts(searchFiltered)
    }, [products, category, searchQuery])

  return (
    <div className='mt-16'>
      {searchCategory&&(
        <div className='flex flex-col items-end w-max'>
          <p className='text-2xl font-medium'>
            {searchCategory.text.toUpperCase()}
          </p>
          <div className='w-16 h-0.5 bg-primary rounded-full'></div>
        </div>
      )}

      {/* Search input */}
      <div className="mt-5 flex justify-start mb-4">
          <div className="flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full w-[250px]">
              <input
                  onChange={(e) => setSearchQuery(e.target.value)}
                  value={searchQuery}
                  className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
                  type="text"
                  placeholder="Search products"
              />
              <img src={assets.search_icon} alt='search' className="w-4 h-4" />
          </div>
      </div>
      {filteredProducts.length >0 ?(
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4
              gap-3 md:gap-6 lg:grid-cols-5 mt-6'>
              {filteredProducts.map((product)=>(
                <ProductCard 
                  key={product._id}
                  product={product}
                />
              ))}        
        </div>
      ): (
        <div className='flex items-center justify-center h-[60vh]'>
          <p className='text-2xl font-medium text-primary'>
              No products found in this category
          </p>
        </div>
      )}
    </div>
  )
}

export default ProductCategory
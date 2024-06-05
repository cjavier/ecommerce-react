import { useState, useEffect } from 'react'
import { useParams, NavLink } from 'react-router-dom'
import { getOneItemService } from '@/Services/itemServices'
import { useAuthContext } from '@/Hook/useAuthContext'

const ItemDetail = () => {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const { isAuth } = useAuthContext()

    useEffect(() => {
        const fetchItemData = async () => {
            try {
                const response = await getOneItemService(id)
                if (response.status === 200) {
                    setProduct(response.data)
                }
            } catch (error) {
                console.log('Ocurrió un error en ItemDetail', error)
            }
        }
        fetchItemData()
    }, [id])

    if (!product) return <p>Loading...</p>

    return (
        <div className='card' style={{ width: '18rem' }}>
            <img className='card-img-top' style={{ maxHeight: '300px' }} src={product.image} alt={product.product_name} />
            <div className='card-body'>
                <h5 className='card-title'>{product.product_name}</h5>
                <p className='card-text'>{product.description}</p>
                <p className='card-text'>Price: ${product.price}</p>
                <p className='card-text'>Category: {product.category}</p>
                <p className='card-text'>Brand: {product.brand}</p>
                <p className='card-text'>SKU: {product.sku}</p>
                {isAuth ? (
                    <a href='#' className='btn btn-primary'>Comprar</a>
                ) : (
                    <NavLink to='/login' className='btn btn-secondary'>Iniciar sesión para comprar</NavLink>
                )}
            </div>
        </div>
    )
}

export default ItemDetail
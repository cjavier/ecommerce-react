import { useForm } from 'react-hook-form'
import { createItemService } from '@/Services/itemServices'
import { useNavigate } from 'react-router-dom'
import '@/styles/form.css'
import { useState } from 'react'

const CreateItem = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()
  const [message, setMessage] = useState(null)

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem('token')
      const response = await createItemService(data, token)
      if (response.status === 200) {
        setMessage('Producto creado exitosamente')
        navigate('/dashboard')
      } else {
        setMessage('Ocurrió un error al crear el producto')
      }
    } catch (error) {
      console.log('Ocurrió un error en CreateItem', error)
      setMessage('Ocurrió un error al crear el producto')
    }
  }

  return (
    <main className='form-signin w-100'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className='h3 mb-3 fw-normal'>Create New Product</h1>

        <div className='form-floating'>
          <input
            type='text'
            className='form-control'
            id='product_name'
            name='product_name'
            placeholder='Product Name'
            {...register('product_name', { required: 'Product name is required' })}
          />
          <p>{errors.product_name?.message}</p>
          <label htmlFor='product_name'>Product Name</label>
        </div>

        <div className='form-floating'>
          <input
            type='text'
            className='form-control'
            id='description'
            name='description'
            placeholder='Description'
            {...register('description', { required: 'Description is required' })}
          />
          <p>{errors.description?.message}</p>
          <label htmlFor='description'>Description</label>
        </div>

        <div className='form-floating'>
          <input
            type='number'
            className='form-control'
            id='price'
            name='price'
            placeholder='Price'
            {...register('price', { required: 'Price is required' })}
          />
          <p>{errors.price?.message}</p>
          <label htmlFor='price'>Price</label>
        </div>

        <div className='form-floating'>
          <input
            type='text'
            className='form-control'
            id='category'
            name='category'
            placeholder='Category'
            {...register('category', { required: 'Category is required' })}
          />
          <p>{errors.category?.message}</p>
          <label htmlFor='category'>Category</label>
        </div>

        <div className='form-floating'>
          <input
            type='text'
            className='form-control'
            id='brand'
            name='brand'
            placeholder='Brand'
            {...register('brand', { required: 'Brand is required' })}
          />
          <p>{errors.brand?.message}</p>
          <label htmlFor='brand'>Brand</label>
        </div>

        <div className='form-floating'>
          <input
            type='text'
            className='form-control'
            id='sku'
            name='sku'
            placeholder='SKU'
            {...register('sku', { required: 'SKU is required' })}
          />
          <p>{errors.sku?.message}</p>
          <label htmlFor='sku'>SKU</label>
        </div>

        <div className='form-floating'>
          <input
            type='text'
            className='form-control'
            id='image'
            name='image'
            placeholder='Image URL'
            {...register('image', { required: 'Image URL is required' })}
          />
          <p>{errors.image?.message}</p>
          <label htmlFor='image'>Image URL</label>
        </div>

        <button className='w-100 btn btn-lg btn-primary' type='submit'>Create Product</button>
        <p className='mt-5 mb-3 text-body-secondary'>© 2017–2024</p>
        {message && <p className="alert">{message}</p>}
      </form>
    </main>
  )
}

export default CreateItem
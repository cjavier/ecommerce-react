import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { getAllItemsService } from '@/Services/itemServices'
import { Container, Grid, Card, CardMedia, CardContent, Typography, Button } from '@mui/material'

const Home = () => {
  const [itemList, setItemList] = useState([]) // llenamos el estado de productos

  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const response = await getAllItemsService()
        if (response.status === 200) {
          setItemList(response.data)
        }
      } catch (error) {
        console.log('Ocurrió un error en Home', error)
      }
    }
    fetchItemData()
  }, [])

  return (
    <Container>
      <Typography variant="h3" component="h1" gutterBottom paddingTop={12}>
        Bienvenido al Home
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {itemList && itemList.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="300"
                image={product.image}
                alt={product.product_name}
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  {product.product_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
                <Button variant="contained" component={NavLink} to={`/item/${product.id}`}>
                  Ver Producto
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Home
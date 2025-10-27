import axios from 'axios'
import { useEffect, useState } from 'react';
import { ProductsGrid } from './ProductsGrid';
import { Header } from '../../components/Header';
import './HomePage.css';

export function HomePage({ cart }) {

  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios('api/products')
      .then((response) => {
        setProducts(response.data);
      });
  }, [])


  return (
    <>
      <title>Homepage</title>
      <Header cart={cart} />

      <div className="home-page">
        <ProductsGrid products={products} />
      </div>
    </>
  );
}
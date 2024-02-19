
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Card from './Card';
import './Home.css';
import { BsCart2 } from "react-icons/bs";
import {useSelector } from 'react-redux';

const Home = () => {
  const fName = localStorage.getItem('firstName');
   const lName= localStorage.getItem('lastName');
  const cartItems= useSelector(state => state.cart.cart)
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const [myData, setMyData] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [sortBy, setSortBy] = useState('');
 
  useEffect(() => {
    const getUserInfo = async () => {
      const { data } = await axios.get('https://dummyjson.com/products');
      setMyData(data.products);
    };
    getUserInfo();
  }, []);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const sortedData = myData.slice().sort((a, b) => {
    if (sortBy === 'hightolow') {
      return b.price - a.price;
    } else if (sortBy === 'lowtohigh') {
      return a.price - b.price;
    }
    return 0;
  });

  return (
    <div className="home">
      <div className="home-page">
        <h3>Home</h3>
       <h4> Hello {fName} {lName} !</h4>
        <button onClick={logOut}>Log Out</button>
      </div>
      <div className="home-page1">
     
        <input
          type="text"
          name="search"
          placeholder="search by name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <div>
          <label htmlFor="product-price">Sort by Price: </label>
          <select name="product-price" onChange={handleSortChange}>
            <option value="">None</option>
            <option value="hightolow">High to Low</option>
            <option value="lowtohigh">Low to High</option>
          </select>
        </div>
        <Link to="/cart"><BsCart2 size={25} color='#276ad6'/><h3>{cartItems.length}</h3></Link>
       
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', padding: '1.5rem' }}>
        {sortedData
          .filter((item) => {
            if (!searchName) {
              return true;
            }
            return item.title.toLowerCase().includes(searchName.toLowerCase());
          })
          .map((data) => (
            <Card
              key={data.id}
              id={data.id}
              title={data.title}
              image={data.images}
              discountPercentage={data.discountPercentage}
              stock={data.stock}
              price={data.price}
              description={data.description}
            />
          ))}
      </div>
    </div>
  );
};

export default Home;

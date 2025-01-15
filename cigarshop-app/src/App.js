import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import ProfilePage from './components/ProfilePage';
import Cart from './components/Cart';
import ProductDetail from './components/ProductDetail';
import BACKEND_URL from './components/Constants';
import axios from 'axios';
import './App.css';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = `${BACKEND_URL}`;

function getCookieByName(name) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.startsWith(`${name}=`)) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [cart, setCart] = useState([]);
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('loggedIn');
        if (isLoggedIn === 'true') {
            setLoggedIn(true);
        }

        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    useEffect(() => {
        if (cart.length > 0) {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }, [cart]);

    const handleLogout = async () => {
        try {
            await axios.post('/logout', {});
            setLoggedIn(false);
            localStorage.setItem('loggedIn', 'false');
            navigate('/login');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    const handleLogin = () => {
        setLoggedIn(true);
        localStorage.setItem('loggedIn', 'true');
    };

    const addToCart = (product) => {
        setCart((prevCart) => [...prevCart, product]);
    };

    const clearCart = () => {
        setCart([]);
        localStorage.setItem('cart', JSON.stringify([]));
    };

    const placeOrder = () => {
        const userCookie = getCookieByName('user');

        if (!userCookie) {
            alert('User not logged in!');
            return;
        }

        if (cart.length === 0) {
            alert('Cart is empty!');
            return;
        }

        const ordersToPlace = cart.map((item) => ({
            article: item.article,
            price: item.price,
        }));

        fetch(`${BACKEND_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userCookie,
            },
            body: JSON.stringify({ orders: ordersToPlace }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error placing order');
                }
                return response.json();
            })
            .then(() => {
                setCart([]);
                alert('Orders placed successfully!');
            })
            .catch((error) => {
                console.error(error);
                alert('Error placing order.');
            });
    };

    useEffect(() => {
        const userCookie = getCookieByName('user');

        fetch(`${BACKEND_URL}/orders`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userCookie,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setOrders(data);
            })
            .catch((error) => {
                console.error('Error fetching orders:', error);
            });
    }, []);

    return (
        <>
            <AppBar position="static" style={{ backgroundColor: '#8B4513', color: '#FFFFFF' }}>
                <Toolbar>
                    <Typography
                        variant="h6"
                        style={{ flexGrow: 1, cursor: 'pointer' }}
                        onClick={() => navigate('/')}
                    >
                        Сигарный клуб
                    </Typography>
                    {loggedIn ? (
                        <>
                            <Button color="inherit" component={Link} to="/profile">
                                Профиль
                            </Button>
                            <Button color="inherit" component={Link} to="/cart">
                                Корзина ({cart.length})
                            </Button>
                            <Button color="inherit" onClick={handleLogout}>
                                Выйти
                            </Button>
                        </>
                    ) : (
                        <Button color="inherit" component={Link} to={`/login`}>
                            Войти
                        </Button>
                    )}
                </Toolbar>
            </AppBar>

            <Container style={{ marginTop: '20px' }}>
                <Routes>
                    <Route path="/" element={<HomePage addToCart={addToCart} />} />
                    <Route path="/login" element={<LoginPage setLoggedIn={handleLogin} />} />
                    <Route path="/profile" element={<ProfilePage orders={orders} />} />
                    <Route path="/cart" element={<Cart cart={cart} placeOrder={placeOrder} clearCart={clearCart} />} />
                    <Route path="/products/:product_id" element={<ProductDetail addToCart={addToCart} />} />
                </Routes>
            </Container>
        </>
    );
}

export default App;

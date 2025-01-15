import React from 'react';
import { Container, Typography, Button, Paper, Box } from '@mui/material';

function Cart({ cart, placeOrder, clearCart }) {
    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

    return (
        <Container disableGutters style={{ marginTop: '20px', fontFamily: 'Arial, sans-serif' }}>
            <Typography variant="h4" gutterBottom style={{ color: '#8B4513' }}>
                Корзина
            </Typography>

            <Paper elevation={3} style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
                {cart.length === 0 ? (
                    <Typography style={{ fontSize: '1.2rem', textAlign: 'center', color: '#757575' }}>
                        Ваша корзина пуста
                    </Typography>
                ) : (
                    <div>
                        {cart.map((item, index) => (
                            <Box
                                key={index}
                                style={{
                                    border: '1px solid #8B4513',
                                    borderRadius: '5px',
                                    padding: '10px',
                                    marginBottom: '10px',
                                    backgroundColor: index % 2 === 0 ? '#f5f5dc' : '#ffffff',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    fontSize: '1.2rem',
                                }}
                            >
                                <Box>
                                    <Typography style={{ fontWeight: 500, fontSize: '1.2rem', color: '#6B3A0A' }}>
                                        {item.name}
                                    </Typography>
                                    <Typography style={{ color: '#757575', fontSize: '1rem' }}>
                                        Категория: {item.category}
                                    </Typography>
                                </Box>
                                <Typography style={{ marginLeft: '20px', fontSize: '1.2rem', color: '#8B4513' }}>
                                    {item.price.toFixed(2)} руб.
                                </Typography>
                            </Box>
                        ))}

                        <Box
                            style={{
                                marginTop: '20px',
                                padding: '10px',
                                border: '1px solid #8B4513',
                                borderRadius: '5px',
                                backgroundColor: '#f5f5dc',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <Typography style={{ fontSize: '1.2rem', fontWeight: 500, color: '#6B3A0A' }}>
                                Общая сумма:
                            </Typography>
                            <Typography style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#8B4513' }}>
                                {totalPrice.toFixed(2)} руб.
                            </Typography>
                        </Box>
                    </div>
                )}
                {cart.length > 0 && (
                    <div style={{ display: 'flex', gap: '10px', marginTop: '20px', justifyContent: 'center' }}>
                        <Button
                            variant="contained"
                            style={{
                                fontSize: '1.1rem',
                                padding: '10px 20px',
                                backgroundColor: '#8B4513',
                                color: '#fff',
                                '&:hover': {
                                    backgroundColor: '#6B3A0A',
                                },
                            }}
                            onClick={placeOrder}
                        >
                            Купить
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={clearCart}
                            style={{
                                fontSize: '1.1rem',
                                padding: '10px 20px',
                                borderColor: '#8B4513',
                                color: '#8B4513',
                                backgroundColor: 'white',
                                '&:hover': {
                                    backgroundColor: '#f5f5dc',
                                    borderColor: '#8B4513',
                                },
                            }}
                        >
                            Очистить корзину
                        </Button>
                    </div>
                )}
            </Paper>
        </Container>
    );
}

export default Cart;

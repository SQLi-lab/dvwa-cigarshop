import React from 'react';
import { Card, CardContent, Typography, CardMedia, CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';

function ProductCard({ product_id, name, category, stock, price, image }) {
    return (
        <Card
            style={{
                maxWidth: 300,
                margin: '10px',
                border: '1px solid #8B4513',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
        >
            <CardActionArea component={Link} to={`/products/${product_id}`}>
                <CardMedia
                    component="img"
                    height="140"
                    image={image}
                    alt={name}
                    style={{
                        objectFit: 'contain',
                        padding: '10px',
                        backgroundColor: '#f5f5dc',
                    }}
                />

                <CardContent>
                    <Typography variant="h6" component="div" style={{ color: '#8B4513', fontWeight: 'bold' }}>
                        {name}
                    </Typography>
                    <Typography variant="body2" style={{ color: '#6B3A0A' }}>
                        Категория: {category}
                    </Typography>
                    <Typography
                        variant="body2"
                        style={{ color: stock > 0 ? '#000000' : '#d32f2f', fontWeight: 500 }}
                    >
                        В наличии: {stock > 0 ? `${stock} шт.` : 'Нет в наличии'}
                    </Typography>
                    <Typography
                        variant="h6"
                        style={{
                            marginTop: '10px',
                            color: '#8B4513',
                            fontWeight: 'bold',
                        }}
                    >
                        {price} руб.
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default ProductCard;
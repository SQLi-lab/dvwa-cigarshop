import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Alert, Typography } from '@mui/material';
import BACKEND_URL from './Constants';
import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = `${BACKEND_URL}`; // Базовый URL бэкенда

function LoginPage({ setLoggedIn }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); // Для отображения ошибок
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            setError(null); // Сбрасываем ошибку перед новой попыткой входа
            const response = await axios.post('/login', {
                username,
                password,
            });

            console.log(response.data.message); // Успешный вход
            setLoggedIn(true); // Устанавливаем статус входа
            localStorage.setItem('loggedIn', 'true'); // Сохраняем статус входа
            navigate('/'); // Возвращаемся на главную страницу
        } catch (error) {
            if (error.response) {
                // Если сервер вернул ответ с ошибкой
                console.error('Ошибка:', error.response.data.message);
                setError(error.response.data.message);
            } else {
                // Если произошла сетевая ошибка или что-то другое
                console.error('Сетевая ошибка или другая проблема:', error.message);
                setError('Произошла ошибка. Попробуйте позже.');
            }
        }
    };

    return (
        <Container
            style={{
                marginTop: '50px',
                textAlign: 'center',
                maxWidth: '400px',
                padding: '20px',
                backgroundColor: '#f5f5dc',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
        >
            <Typography variant="h4" style={{ marginBottom: '20px', color: '#8B4513' }}>
                Авторизация
            </Typography>
            {error && (
                <Alert severity="error" style={{ marginBottom: '20px' }}>
                    {error}
                </Alert>
            )}
            <TextField
                label="Логин"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
                style={{ marginBottom: '20px' }}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: '#8B4513',
                        },
                        '&:hover fieldset': {
                            borderColor: '#6B3A0A',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#8B4513',
                        },
                    },
                    '& .MuiInputLabel-root': {
                        color: '#8B4513',
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: '#8B4513',
                    },
                }}
            />
            <TextField
                label="Пароль"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                style={{ marginBottom: '20px' }}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: '#8B4513',
                        },
                        '&:hover fieldset': {
                            borderColor: '#6B3A0A',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#8B4513',
                        },
                    },
                    '& .MuiInputLabel-root': {
                        color: '#8B4513',
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: '#8B4513',
                    },
                }}
            />
            <Button
                variant="contained"
                style={{
                    backgroundColor: '#8B4513',
                    color: '#fff',
                    padding: '10px 20px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
                onClick={handleLogin}
                disabled={!username || !password}
            >
                Войти
            </Button>
        </Container>
    );
}

export default LoginPage;

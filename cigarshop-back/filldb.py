import sqlite3

def populate_cigar_shop_db():
    conn = sqlite3.connect('cigar_shop.db')
    c = conn.cursor()

    # Очистка таблиц перед добавлением данных
    tables_to_clear = [
        "user_personal_info", "cigar_categories", "cigars", "orders",
        "reviews", "shipping_addresses", "payments", "favorite_cigars", "price_history", "users"
    ]
    for table in tables_to_clear:
        c.execute(f"DELETE FROM {table}")

    # Добавляем данные в таблицу users
    c.executemany('''
        INSERT INTO users (login, password, role) VALUES (?, ?, ?)
    ''', [
        ('admin', 'admin123', 'admin'),
        ('customer1', 'password1', 'customer'),
        ('customer2', 'password2', 'customer')
    ])

    # Добавляем данные в таблицу user_personal_info
    c.executemany('''
        INSERT INTO user_personal_info (login, name, birth_date, address, phone_number, secret)
        VALUES (?, ?, ?, ?, ?, ?)
    ''', [
        ('customer1', 'Alice Johnson', '1990-01-01', '123 Main St, Cityville', '555-1234', 'secret1'),
        ('customer2', 'Bob Smith', '1992-05-15', '456 Elm St, Townsville', '555-5678', 'secret2')
    ])

    # Добавляем данные в таблицу cigar_categories
    c.executemany('''
        INSERT INTO cigar_categories (category, description, secret)
        VALUES (?, ?, ?)
    ''', [
        ('Classic', 'Classic cigars from top manufacturers.', 'secret3'),
        ('Premium', 'High-quality premium cigars.', 'secret4'),
        ('Flavored', 'Cigars with unique flavors.', 'secret5')
    ])

    # Добавляем данные в таблицу cigars
    c.executemany('''
        INSERT INTO cigars (article, name, category, price, stock, length, ring_gauge, country_of_origin, released, secret)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', [
        (1001, 'Cuban Classic', 'Classic', 10.00, 50, 6.50, 42.0, 'Cuba', 1, 'secret6'),
        (1002, 'Dominican Premium', 'Premium', 15.00, 30, 7.00, 50.0, 'Dominican Republic', 1, 'secret7'),
        (1003, 'Vanilla Dream', 'Flavored', 8.00, 20, 5.50, 38.0, 'USA', 1, 'secret8')
    ])

    # Добавляем данные в таблицу orders
    c.executemany('''
        INSERT INTO orders (order_id, login, order_date, status, secret)
        VALUES (?, ?, ?, ?, ?)
    ''', [
        (1, 'customer1', '2025-01-01 10:00:00', 'completed', 'secret9'),
        (2, 'customer2', '2025-01-02 14:30:00', 'pending', 'secret10')
    ])

    # Добавляем данные в таблицу reviews
    c.executemany('''
        INSERT INTO reviews (review_id, login, article, rating, review_text, review_date, secret)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ''', [
        (1, 'customer1', 1001, 5, 'Excellent cigar with a smooth draw.', '2025-01-01 12:00:00', 'secret11'),
        (2, 'customer2', 1002, 4, 'Great taste, but a bit pricey.', '2025-01-02 15:00:00', 'secret12')
    ])

    # Добавляем данные в таблицу shipping_addresses
    c.executemany('''
        INSERT INTO shipping_addresses (address_id, login, country, city, street, postal_code, secret)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ''', [
        (1, 'customer1', 'USA', 'Cityville', '123 Main St', '12345', 'secret13'),
        (2, 'customer2', 'USA', 'Townsville', '456 Elm St', '67890', 'secret14')
    ])

    # Добавляем данные в таблицу payments
    c.executemany('''
        INSERT INTO payments (order_id, payment_method, amount, payment_status, secret)
        VALUES (?, ?, ?, ?, ?)
    ''', [
        (1, 'Credit Card', 50.00, 'Paid', 'secret15'),
        (2, 'PayPal', 30.00, 'Pending', 'secret16')
    ])

    # Добавляем данные в таблицу favorite_cigars
    c.executemany('''
        INSERT INTO favorite_cigars (login, article, added_date, secret)
        VALUES (?, ?, ?, ?)
    ''', [
        ('customer1', 1001, '2025-01-01 13:00:00', 'secret17'),
        ('customer2', 1002, '2025-01-02 16:00:00', 'secret18')
    ])

    # Добавляем данные в таблицу price_history
    c.executemany('''
        INSERT INTO price_history (history_id, cigar_article, old_price, new_price, changed_date, secret)
        VALUES (?, ?, ?, ?, ?, ?)
    ''', [
        (1, 1001, 12.00, 10.00, '2025-01-01 09:00:00', 'secret19'),
        (2, 1002, 20.00, 15.00, '2025-01-02 13:00:00', 'secret20')
    ])

    conn.commit()
    conn.close()

if __name__ == '__main__':
    populate_cigar_shop_db()

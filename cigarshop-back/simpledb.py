import sqlite3

def create_cigar_shop_db():
    conn = sqlite3.connect('cigar_shop.db')
    c = conn.cursor()

    # Таблица users
    c.execute('''
        CREATE TABLE IF NOT EXISTS users (
            login VARCHAR(100) NOT NULL PRIMARY KEY,
            password VARCHAR(100) NOT NULL,
            role VARCHAR(50) NOT NULL
        )
    ''')

    # Таблица user_personal_info
    c.execute('''
        CREATE TABLE IF NOT EXISTS user_personal_info (
            login VARCHAR(100) NOT NULL,
            name VARCHAR(100) NOT NULL,
            birth_date DATE NOT NULL,
            address TEXT NOT NULL,
            phone_number VARCHAR(50) NOT NULL,
            secret VARCHAR(40),
            PRIMARY KEY (login),
            FOREIGN KEY (login) REFERENCES users (login)
        )
    ''')

    # Таблица cigar_categories
    c.execute('''
        CREATE TABLE IF NOT EXISTS cigar_categories (
            category VARCHAR(100) NOT NULL PRIMARY KEY,
            description TEXT NOT NULL,
            secret VARCHAR(40)
        )
    ''')

    # Таблица cigars
    c.execute('''
        CREATE TABLE IF NOT EXISTS cigars (
            article BIGINT NOT NULL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            category VARCHAR(100) NOT NULL,
            price NUMERIC(10, 2) NOT NULL,
            stock INT NOT NULL,
            length NUMERIC(5, 2) NOT NULL,
            ring_gauge NUMERIC(5, 2) NOT NULL,
            country_of_origin VARCHAR(100) NOT NULL,
            released BOOLEAN NOT NULL,
            secret VARCHAR(40),
            FOREIGN KEY (category) REFERENCES cigar_categories (category)
        )
    ''')

    # Таблица orders
    c.execute('''
        CREATE TABLE IF NOT EXISTS orders (
            order_id BIGINT NOT NULL PRIMARY KEY,
            login VARCHAR(100) NOT NULL,
            order_date TIMESTAMP NOT NULL,
            status VARCHAR(50) NOT NULL,
            secret VARCHAR(40),
            FOREIGN KEY (login) REFERENCES users (login)
        )
    ''')

    # Таблица reviews
    c.execute('''
        CREATE TABLE IF NOT EXISTS reviews (
            review_id BIGINT NOT NULL PRIMARY KEY,
            login VARCHAR(100) NOT NULL,
            article BIGINT NOT NULL,
            rating INT NOT NULL,
            review_text TEXT NOT NULL,
            review_date TIMESTAMP NOT NULL,
            secret VARCHAR(40),
            FOREIGN KEY (login) REFERENCES users (login),
            FOREIGN KEY (article) REFERENCES cigars (article)
        )
    ''')

    # Таблица shipping_addresses
    c.execute('''
        CREATE TABLE IF NOT EXISTS shipping_addresses (
            address_id BIGINT NOT NULL PRIMARY KEY,
            login VARCHAR(100) NOT NULL,
            country VARCHAR(100) NOT NULL,
            city VARCHAR(100) NOT NULL,
            street VARCHAR(100) NOT NULL,
            postal_code VARCHAR(50) NOT NULL,
            secret VARCHAR(40),
            FOREIGN KEY (login) REFERENCES users (login)
        )
    ''')

    # Таблица payments
    c.execute('''
        CREATE TABLE IF NOT EXISTS payments (
            order_id BIGINT NOT NULL PRIMARY KEY,
            payment_method VARCHAR(50) NOT NULL,
            amount NUMERIC(10, 2) NOT NULL,
            payment_status VARCHAR(50) NOT NULL,
            secret VARCHAR(40),
            FOREIGN KEY (order_id) REFERENCES orders (order_id)
        )
    ''')

    # Таблица favorite_cigars
    c.execute('''
        CREATE TABLE IF NOT EXISTS favorite_cigars (
            login VARCHAR(100) NOT NULL,
            article BIGINT NOT NULL,
            added_date TIMESTAMP NOT NULL,
            secret VARCHAR(40),
            PRIMARY KEY (login, article),
            FOREIGN KEY (login) REFERENCES users (login),
            FOREIGN KEY (article) REFERENCES cigars (article)
        )
    ''')

    # Таблица price_history
    c.execute('''
        CREATE TABLE IF NOT EXISTS price_history (
            history_id BIGINT NOT NULL PRIMARY KEY,
            cigar_article BIGINT NOT NULL,
            old_price NUMERIC(10, 2) NOT NULL,
            new_price NUMERIC(10, 2) NOT NULL,
            changed_date TIMESTAMP NOT NULL,
            secret VARCHAR(40),
            FOREIGN KEY (cigar_article) REFERENCES cigars (article)
        )
    ''')

    conn.commit()
    conn.close()

if __name__ == '__main__':
    create_cigar_shop_db()

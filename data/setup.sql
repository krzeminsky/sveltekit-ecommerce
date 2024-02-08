CREATE TABLE user (
    id TEXT NOT NULL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);

CREATE TABLE session (
    id TEXT NOT NULL PRIMARY KEY,
    expires_at INTEGER NOT NULL,
    user_id TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE currency (
    code TEXT NOT NULL PRIMARY KEY,
    conversion_rate REAL NOT NULL
);

CREATE TABLE product (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price INTEGER NOT NULL,
    description TEXT NOT NULL,

    category TEXT NOT NULL,
    materials TEXT NOT NULL
);

CREATE TABLE product_variant (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    color TEXT NOT NULL,
    stock_map TEXT NOT NULL,

    FOREIGN KEY (product_id) REFERENCES product(id)
);

CREATE TABLE product_order (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    buyer TEXT NOT NULL,
    product_id INTEGER NOT NULL,
    variant_id INTEGER NOT NULL,
    shipping_adress_id INTEGER NOT NULL,

    currency TEXT NOT NULL,
    applied_conversion_rate REAL NOT NULL,
    total_price INTEGER NOT NULL,
    
    status TEXT NOT NULL,
    creation_time INTEGER NOT NULL,

    FOREIGN KEY (buyer) REFERENCES user(username),
    FOREIGN KEY (product_id) REFERENCES product(id),
    FOREIGN KEY (variant_id) REFERENCES product_variant(id),
    FOREIGN KEY (shipping_adress_id) REFERENCES shipping_adress(id)
);

CREATE TABLE shipping_adress (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    country TEXT NOT NULL,
    adress TEXT NOT NULL,
    adress_details TEXT,
    postal_code TEXT NOT NULL
);

CREATE TABLE sale (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    expires_at INTEGER NOT NULL,
    discount_map TEXT NOT NULL
);

CREATE TABLE moderator (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    ip TEXT NOT NULL UNIQUE,
    nickname TEXT NOT NULL,
    password TEXT NOT NULL
);
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

CREATE TABLE product (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price_map TEXT NOT NULL,
    
    description TEXT,
    category TEXT,
    materials TEXT,
    colors TEXT
);

CREATE TABLE product_unit (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    label TEXT NOT NULL,
    amount INTEGER NOT NULL,

    FOREIGN KEY (product_id) REFERENCES product(id)
);

CREATE TABLE product_order (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    buyer TEXT NOT NULL,
    product_id INTEGER NOT NULL,
    shipping_adress_id INTEGER NOT NULL,
    currency TEXT NOT NULL,
    total_unit_price INTEGER NOT NULL,
    status TEXT NOT NULL,
    creation_time INTEGER NOT NULL,

    FOREIGN KEY (buyer) REFERENCES user(username),
    FOREIGN KEY (product_id) REFERENCES product(id),
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
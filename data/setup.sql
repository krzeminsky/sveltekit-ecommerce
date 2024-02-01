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

CREATE TABLE item (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price_map TEXT NOT NULL,
    
    description TEXT,
    materials TEXT,
    colors TEXT,
    care_guide TEXT
);

CREATE TABLE item_unit (
    item_id INTEGER NOT NULL PRIMARY KEY,
    size TEXT NOT NULL,
    amount INTEGER NOT NULL,

    FOREIGN KEY (item_id) REFERENCES item(id)
);

CREATE TABLE item_order (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    buyer TEXT NOT NULL,
    item_id INTEGER NOT NULL,
    shipping_adress_id INTEGER NOT NULL,
    currency TEXT NOT NULL,
    total_unit_price INTEGER NOT NULL,
    status TEXT NOT NULL,

    FOREIGN KEY (buyer) REFERENCES user(username),
    FOREIGN KEY (item_id) REFERENCES item(id),
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
    discount_map TEXT NOT NULL
);
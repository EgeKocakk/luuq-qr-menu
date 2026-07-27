-- LUUQ COFFEE menü seed verisi
-- Kaynak: luuqcoffee.com/menu (bu oturumda canlı siteden çekildi).
-- Kategori ve ürün isimleri GERÇEK; fiyatlar sitede yayınlanmadığı için
-- 0 bırakıldı (işletmeden alınıp admin panelinden girilecek).

-- 17 kategori, 174 ürün

insert into public.categories (name, sort_order) values ('Espresso Kahveler', 0);
insert into public.categories (name, sort_order) values ('Ice Kahveler', 1);
insert into public.categories (name, sort_order) values ('Filtre Kahveler', 2);
insert into public.categories (name, sort_order) values ('Bitki Çayları', 3);
insert into public.categories (name, sort_order) values ('LUUQ Kokteyl', 4);
insert into public.categories (name, sort_order) values ('Bubble Tea', 5);
insert into public.categories (name, sort_order) values ('Frozen', 6);
insert into public.categories (name, sort_order) values ('Frozen Milkshake', 7);
insert into public.categories (name, sort_order) values ('Sıcak İçecekler', 8);
insert into public.categories (name, sort_order) values ('Meşrubatlar', 9);
insert into public.categories (name, sort_order) values ('Pasta & Tatlı', 10);
insert into public.categories (name, sort_order) values ('LUUQ Chocolate', 11);
insert into public.categories (name, sort_order) values ('Atıştırmalıklar', 12);
insert into public.categories (name, sort_order) values ('Paketli Ürünler', 13);
insert into public.categories (name, sort_order) values ('Termos & Seramik', 14);
insert into public.categories (name, sort_order) values ('Sandviçler', 15);
insert into public.categories (name, sort_order) values ('Ekstralar', 16);

-- Espresso Kahveler
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Espresso Kahveler'), 'Americano', 0, 0);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Espresso Kahveler'), 'Cappuccino', 0, 1);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Espresso Kahveler'), 'Cortado S', 0, 2);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Espresso Kahveler'), 'Espresso Single', 0, 3);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Espresso Kahveler'), 'Espresso Double', 0, 4);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Espresso Kahveler'), 'Flat White', 0, 5);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Espresso Kahveler'), 'Caramel Macchiato', 0, 6);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Espresso Kahveler'), 'Latte', 0, 7);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Espresso Kahveler'), 'Mocha', 0, 8);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Espresso Kahveler'), 'Oreo Latte', 0, 9);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Espresso Kahveler'), 'Ice Oreo Latte', 0, 10);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Espresso Kahveler'), 'White Mocha', 0, 11);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Espresso Kahveler'), 'Caramel Latte', 0, 12);

-- Ice Kahveler
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Ice Kahveler'), 'Aogato', 0, 0);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Ice Kahveler'), 'Ice Americano', 0, 1);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Ice Kahveler'), 'Ice Filtre Kahve', 0, 2);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Ice Kahveler'), 'Ice Flat White', 0, 3);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Ice Kahveler'), 'Ice Caramel Latte', 0, 4);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Ice Kahveler'), 'Ice Caramel Macchiato', 0, 5);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Ice Kahveler'), 'Ice Latte', 0, 6);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Ice Kahveler'), 'Ice Mocha', 0, 7);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Ice Kahveler'), 'Ice Sütlü Filtre Kahve', 0, 8);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Ice Kahveler'), 'Ice White Mocha', 0, 9);

-- Filtre Kahveler
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Filtre Kahveler'), 'Cold Brew', 0, 0);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Filtre Kahveler'), 'Colombia', 0, 1);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Filtre Kahveler'), 'Etiyopya Filtre Sütlü', 0, 2);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Filtre Kahveler'), 'Guatemala', 0, 3);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Filtre Kahveler'), 'Klasik Filtre', 0, 4);

-- Bitki Çayları
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Bitki Çayları'), 'Ahududu Limon', 0, 0);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Bitki Çayları'), 'Green Carnaval', 0, 1);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Bitki Çayları'), 'Gripsavar', 0, 2);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Bitki Çayları'), 'Limon Zencefil', 0, 3);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Bitki Çayları'), 'Madagascar', 0, 4);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Bitki Çayları'), 'Magic Of Bali', 0, 5);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Bitki Çayları'), 'Relax', 0, 6);

-- LUUQ Kokteyl
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'LUUQ Kokteyl'), 'Beach Of Luuq', 0, 0);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'LUUQ Kokteyl'), 'Butterfly Effect', 0, 1);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'LUUQ Kokteyl'), 'Caramel Aogato', 0, 2);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'LUUQ Kokteyl'), 'Casablanca', 0, 3);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'LUUQ Kokteyl'), 'Cool Lime', 0, 4);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'LUUQ Kokteyl'), 'Ginger Dragon', 0, 5);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'LUUQ Kokteyl'), 'Guava Bomb', 0, 6);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'LUUQ Kokteyl'), 'Ice Pistachio Dream', 0, 7);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'LUUQ Kokteyl'), 'Ice Matcha Latte', 0, 8);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'LUUQ Kokteyl'), 'Luuq Kuzu Kulağı Kokteyl', 0, 9);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'LUUQ Kokteyl'), 'Matcha Mix', 0, 10);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'LUUQ Kokteyl'), 'Mazagran', 0, 11);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'LUUQ Kokteyl'), 'Savaya', 0, 12);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'LUUQ Kokteyl'), 'Sweet & Sour Mix', 0, 13);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'LUUQ Kokteyl'), 'Strawberry Cool Lime', 0, 14);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'LUUQ Kokteyl'), 'Turkish Dream', 0, 15);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'LUUQ Kokteyl'), 'Waffle Juice', 0, 16);

-- Bubble Tea
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Bubble Tea'), 'Çilekli Limonata Fresh', 0, 0);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Bubble Tea'), 'Bubble Tea Jungle', 0, 1);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Bubble Tea'), 'Bubble Tea Mango', 0, 2);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Bubble Tea'), 'Naneli Limonata', 0, 3);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Bubble Tea'), 'Strawberry Bubble Tea', 0, 4);

-- Frozen
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Frozen'), 'Frozen Ananas & Portakal & Limon', 0, 0);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Frozen'), 'Frozen Yuzu & Şeftali', 0, 1);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Frozen'), 'Frozen Karpuz & Çilek', 0, 2);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Frozen'), 'Frozen Mango', 0, 3);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Frozen'), 'Frozen Orman Meyveleri', 0, 4);

-- Frozen Milkshake
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Frozen Milkshake'), 'Milkshake Beyaz Çikolata & Fındık', 0, 0);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Frozen Milkshake'), 'Milkshake Bitter & Portakal', 0, 1);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Frozen Milkshake'), 'Milkshake Cinderella', 0, 2);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Frozen Milkshake'), 'Milkshake Morocco', 0, 3);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Frozen Milkshake'), 'Milkshake Nutella', 0, 4);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Frozen Milkshake'), 'Milkshake Tafinat & Karamel & Çilek', 0, 5);

-- Sıcak İçecekler
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Sıcak İçecekler'), 'Chai Tea Latte', 0, 0);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Sıcak İçecekler'), 'Damla Sakızlı Sahlep', 0, 1);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Sıcak İçecekler'), 'Dondurma Sahlep', 0, 2);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Sıcak İçecekler'), 'Double Türk Kahvesi', 0, 3);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Sıcak İçecekler'), 'Frambuazlı Sıcak Beyaz Çikolata', 0, 4);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Sıcak İçecekler'), 'Sıcak Çikolata', 0, 5);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Sıcak İçecekler'), 'Tarçınlı Sahlep', 0, 6);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Sıcak İçecekler'), 'Türk Kahvesi', 0, 7);

-- Meşrubatlar
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Meşrubatlar'), 'Beyoğlu Klasik Gazoz', 0, 0);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Meşrubatlar'), 'Beyoğlu Reyhan Gazoz', 0, 1);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Meşrubatlar'), 'Beyoğlu Zencefil Gazoz', 0, 2);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Meşrubatlar'), 'Red Bull', 0, 3);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Meşrubatlar'), 'Soda', 0, 4);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Meşrubatlar'), 'El Gato Lime Gazoz', 0, 5);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Meşrubatlar'), 'El Gato Frambuaz Gazoz', 0, 6);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Meşrubatlar'), 'El Gato Yaban Mersini Gazoz', 0, 7);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Meşrubatlar'), 'Uludağ Premium Soda', 0, 8);

-- Pasta & Tatlı
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Pasta & Tatlı'), 'Aligo', 0, 0);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Pasta & Tatlı'), 'Ananas Mono Cheesecake', 0, 1);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Pasta & Tatlı'), 'Bella Vista Mono', 0, 2);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Pasta & Tatlı'), 'Böğürtlenli Polka Cheesecake', 0, 3);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Pasta & Tatlı'), 'Limon Mono Cheesecake', 0, 4);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Pasta & Tatlı'), 'Mono Frambuaz Cheesecake', 0, 5);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Pasta & Tatlı'), 'San Sebastian Cup', 0, 6);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Pasta & Tatlı'), 'Lotus Çikolata Dolgulu Berliner', 0, 7);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Pasta & Tatlı'), 'Çilek Rüyası Mono', 0, 8);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Pasta & Tatlı'), 'Devil''s Stick', 0, 9);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Pasta & Tatlı'), 'Elmalı Tart', 0, 10);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Pasta & Tatlı'), 'Fıstık Rüyası', 0, 11);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Pasta & Tatlı'), 'Frambuazlı Tart', 0, 12);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Pasta & Tatlı'), 'Karamellim Mono', 0, 13);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Pasta & Tatlı'), 'Latte Mono', 0, 14);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Pasta & Tatlı'), 'Lotus Mono Cheesecake', 0, 15);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Pasta & Tatlı'), 'Marlenka', 0, 16);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Pasta & Tatlı'), 'Muzlu Polka', 0, 17);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Pasta & Tatlı'), 'Red Velvet Mono', 0, 18);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Pasta & Tatlı'), 'Trio Chocolate Browni', 0, 19);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Pasta & Tatlı'), 'White Cascada', 0, 20);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Pasta & Tatlı'), 'Frambuazlı Yaban Mersinli Polka', 0, 21);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Pasta & Tatlı'), 'Yaban Mersinli Tart', 0, 22);

-- LUUQ Chocolate
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'LUUQ Chocolate'), 'Luuq Chocolate Delight', 0, 0);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'LUUQ Chocolate'), 'Luuq Chocolate Joy', 0, 1);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'LUUQ Chocolate'), 'Luuq Cream Puff', 0, 2);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'LUUQ Chocolate'), 'Luuq Crispy Dream', 0, 3);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'LUUQ Chocolate'), 'Luuq Dubai Chocolate Cup', 0, 4);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'LUUQ Chocolate'), 'Luuq White Chocolate Delight', 0, 5);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'LUUQ Chocolate'), 'Luuq Berry Tin', 0, 6);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'LUUQ Chocolate'), 'Luuq Detox Tin', 0, 7);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'LUUQ Chocolate'), 'Luuq Moroccan Mint Tin', 0, 8);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'LUUQ Chocolate'), 'Luuq Peach Orange Tin', 0, 9);

-- Atıştırmalıklar
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Atıştırmalıklar'), 'Ay Çekirdekli Çubuk Galeta', 0, 0);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Atıştırmalıklar'), 'Chia Çubuk Galeta', 0, 1);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Atıştırmalıklar'), 'K. Domatesli Çubuk Galeta', 0, 2);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Atıştırmalıklar'), 'Luuq Beyaz Çikolata & Framb. Tablet Çikolata (50gr)', 0, 3);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Atıştırmalıklar'), 'Luuq Bitter Çikolata & Portakal Tablet Çikolata (50gr)', 0, 4);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Atıştırmalıklar'), 'Luuq Sütlü Çikolata & Antep Tablet Çikolata (50gr)', 0, 5);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Atıştırmalıklar'), 'Luuq Sütlü Çikolata Bademli Tablet Çikolata (50gr)', 0, 6);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Atıştırmalıklar'), 'Luuq Çilekli Çikolata & Çilek Tablet Çikolata (50gr)', 0, 7);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Atıştırmalıklar'), 'Luuq Sütlü Çikolatalı Gofret', 0, 8);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Atıştırmalıklar'), 'Pacha Çikolatalı Bademli Kolajenli Kraker (25gr)', 0, 9);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Atıştırmalıklar'), 'Pacha Mercimekli Kolajenli Kraker (25gr)', 0, 10);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Atıştırmalıklar'), 'Pacha Nohutlu Kolajenli Kraker (25gr)', 0, 11);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Atıştırmalıklar'), 'Pacha Tarhanalı Kolajenli Kraker (25gr)', 0, 12);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Atıştırmalıklar'), 'Wefood Keçiboynuzlu Bisküvi (55gr)', 0, 13);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Atıştırmalıklar'), 'Wefood Tahinli Kraker (40gr)', 0, 14);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Atıştırmalıklar'), 'Wefood Tam Buğdaylı Bisküvi (55gr)', 0, 15);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Atıştırmalıklar'), 'Wefood Zeytinli Kekikli Kraker (40gr)', 0, 16);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Atıştırmalıklar'), 'Hello Cookie Susamlı Bardak', 0, 17);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Atıştırmalıklar'), 'Hello Cookie Çörekotlu Bardak', 0, 18);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Atıştırmalıklar'), 'Hello Cookie Mc. Fındıklı Çikolatalı Bardak (80gr)', 0, 19);

-- Paketli Ürünler
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Paketli Ürünler'), 'Luuq Espresso Kahve 250 GR', 0, 0);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Paketli Ürünler'), 'Luuq Filtre Kahve 250 GR', 0, 1);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Paketli Ürünler'), 'Luuq Türk Kahvesi 250 GR', 0, 2);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Paketli Ürünler'), 'Espresso (1 kg)', 0, 3);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Paketli Ürünler'), 'Filtre Kahve (1 kg)', 0, 4);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Paketli Ürünler'), 'Türk Kahvesi (1 kg)', 0, 5);

-- Termos & Seramik
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Termos & Seramik'), 'Seramik Demlik', 0, 0);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Termos & Seramik'), 'Seramik Double Türk Kahvesi Seti', 0, 1);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Termos & Seramik'), 'Seramik Kupa - Altlık', 0, 2);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Termos & Seramik'), 'Seramik Türk Kahvesi Seti', 0, 3);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Termos & Seramik'), 'Rose 400 Ml Termos', 0, 4);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Termos & Seramik'), 'Beyaz Ofset 350 Ml Çelik Termos', 0, 5);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Termos & Seramik'), 'Kahverengi Ofset 350 Ml Çelik Termos', 0, 6);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Termos & Seramik'), 'Siyah 500 Ml Çelik Mug Termos', 0, 7);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Termos & Seramik'), 'Haki 350 Ml Çelik Termos', 0, 8);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Termos & Seramik'), 'Krem 350 Ml Çelik Termos', 0, 9);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Termos & Seramik'), 'Yeşil 350 Ml Çelik Termos', 0, 10);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Termos & Seramik'), 'Siyah 500 Ml Çelik Termos', 0, 11);

-- Sandviçler
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Sandviçler'), 'Haşhaşlı Ciabatta', 0, 0);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Sandviçler'), 'Üçgen Panini', 0, 1);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Sandviçler'), 'Yulaflı Ciabatta', 0, 2);

-- Ekstralar
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Ekstralar'), 'Bademli Süt', 0, 0);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Ekstralar'), 'Bubble', 0, 1);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Ekstralar'), 'Balparmak (7 GR)', 0, 2);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Ekstralar'), 'Buzlu Bardak', 0, 3);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Ekstralar'), 'Callebaut Dondurma', 0, 4);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Ekstralar'), 'Ekstra Çilek (Meyve)', 0, 5);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Ekstralar'), 'Ekstra Muz (Meyve)', 0, 6);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Ekstralar'), 'Laktozsuz Süt', 0, 7);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Ekstralar'), 'Fındık Süt', 0, 8);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Ekstralar'), 'Krema', 0, 9);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Ekstralar'), 'Püre', 0, 10);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Ekstralar'), 'Shot', 0, 11);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Ekstralar'), 'Sos', 0, 12);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Ekstralar'), 'Şurup', 0, 13);
insert into public.products (category_id, name, base_price, sort_order) values ((select id from public.categories where name = 'Ekstralar'), 'Yulaf Süt', 0, 14);

-- Öne çıkanlar (imza ürünler) — menü ana sayfasında vitrin olarak gösterilir
update public.products set is_featured = true where name = 'Turkish Dream';
update public.products set is_featured = true where name = 'Guava Bomb';
update public.products set is_featured = true where name = 'San Sebastian Cup';
update public.products set is_featured = true where name = 'Luuq Dubai Chocolate Cup';
update public.products set is_featured = true where name = 'Ginger Dragon';
update public.products set is_featured = true where name = 'Flat White';

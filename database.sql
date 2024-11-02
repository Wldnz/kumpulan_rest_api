-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 02 Nov 2024 pada 06.20
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `your_database_name`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `customers`
--

CREATE TABLE `customers` (
  `customer_id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `phone` int(20) DEFAULT NULL,
  `address` varchar(120) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `customers`
--

INSERT INTO `customers` (`customer_id`, `name`, `phone`, `address`) VALUES
(1, 'Wildan', 823231, 'Jalan Mouse'),
(2, 'Izhar', 8201232, 'Jalan Kebayoran lama'),
(3, 'Alhaqq', 23231, 'Jalan Gaming'),
(4, 'Wldnz', 22323212, 'Jalan Pad'),
(5, 'WIldan Akun KE 2', 2930294, 'jalan jalan'),
(6, 'WIldan Akun KE 3', 2930294, 'jalan jalan');

-- --------------------------------------------------------

--
-- Struktur dari tabel `fish`
--

CREATE TABLE `fish` (
  `fish_id` int(11) NOT NULL,
  `fish_name` varchar(50) DEFAULT NULL,
  `price_per_kg` int(11) DEFAULT NULL,
  `stock_kg` int(11) DEFAULT NULL,
  `image_url` mediumtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `fish`
--

INSERT INTO `fish` (`fish_id`, `fish_name`, `price_per_kg`, `stock_kg`, `image_url`) VALUES
(1, 'Ikan Buntal', 35000, 40, 'https://awsimages.detik.net.id/community/media/visual/2019/12/06/967df6a8-e597-4434-ac89-5d8b0fb602b0.jpeg?w=650'),
(2, 'Ikan Lion king', 205000, 220, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuYaSaOGh-G48A8FTLfAnQgiOUja2XqY8BiciXtA8a489f0DI-wDGM_XL4LhIfjRy8iJk&usqp=CAU'),
(3, 'Ikan Gurame', 40000, 200, 'https://www.bener.desa.id/wp-content/uploads/images/manajemen-kesehatan-ikan-gurame-pencegahan-penyakit-dan-perawatan-rutin.webp'),
(4, 'Ikan Sapu - Sapu', 25000, 80, 'https://i0.wp.com/kendarinews.com/wp-content/uploads/2022/04/Ikan-Sapu-sapu-tokopedia.jpg?fit=2288%2C1200&ssl=1'),
(5, 'Ikan Mujaer', 30000, 200, 'https://remen.id/wp-content/uploads/2023/01/Ikan-Mujair.jpg'),
(6, 'Ikan Mas', 20000, 2000, 'https://awsimages.detik.net.id/community/media/visual/2021/07/15/ikan-mas-raksasa.jpeg?w=1200'),
(7, 'Ikan Lele', 20000, 121, 'https://i0.wp.com/jccnetwork.id/wp-content/uploads/2024/07/ikan-lele.jpg?fit=800%2C498&ssl=1'),
(8, 'Kepiting Alaska', 200000, 200, 'https://asset.kompas.com/crops/7WLMJ8ibJAP_ouLWyoDN-YvqodY=/0x29:1000x695/750x500/data/photo/2023/05/19/64670f888d0a3.jpg'),
(15, 'Ikan Cupang', 40000, 2000, 'https://asset.kompas.com/crops/7WLMJ8ibJAP_ouLWyoDN-YvqodY=/0x29:1000x695/750x500/data/photo/2023/05/19/64670f888d0a3.jpg'),
(23, 'Ikan Piranha', 20000, 20, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9vKcBP_oFy_jRK5a5W8jf2f_vYi0Hrhj7WA&s'),
(24, 'Ikan Piranha1', 20000, 20, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9vKcBP_oFy_jRK5a5W8jf2f_vYi0Hrhj7WA&s');

-- --------------------------------------------------------

--
-- Struktur dari tabel `sales`
--

CREATE TABLE `sales` (
  `sale_id` int(11) NOT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `fish_id` int(11) DEFAULT NULL,
  `quantity_kg` int(11) DEFAULT NULL,
  `sale_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `sales`
--

INSERT INTO `sales` (`sale_id`, `customer_id`, `fish_id`, `quantity_kg`, `sale_date`) VALUES
(1, 2, 3, 3, '2024-10-13'),
(2, 3, 2, 23, '2024-10-13'),
(3, 2, 3, 10, '2024-10-13'),
(4, 6, 24, 2, '2024-11-01');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`customer_id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indeks untuk tabel `fish`
--
ALTER TABLE `fish`
  ADD PRIMARY KEY (`fish_id`),
  ADD UNIQUE KEY `fish_name` (`fish_name`);

--
-- Indeks untuk tabel `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`sale_id`),
  ADD KEY `customer_id` (`customer_id`),
  ADD KEY `fish_id` (`fish_id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `customers`
--
ALTER TABLE `customers`
  MODIFY `customer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT untuk tabel `fish`
--
ALTER TABLE `fish`
  MODIFY `fish_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT untuk tabel `sales`
--
ALTER TABLE `sales`
  MODIFY `sale_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `sales`
--
ALTER TABLE `sales`
  ADD CONSTRAINT `sales_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`),
  ADD CONSTRAINT `sales_ibfk_2` FOREIGN KEY (`fish_id`) REFERENCES `fish` (`fish_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

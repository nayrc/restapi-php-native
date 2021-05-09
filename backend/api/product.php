<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: Application/json; charset=UTF-8");

include_once "../config.php";
include_once "../class/product.php";

$database = new Database();
$db = $database->getConnection();

$product = new Product($db);
$stmt = $product->getAll();
$countProduct = $stmt->rowCount();

if ($countProduct > 0) {
    $arr = [];
    $arr["data"] = [];
    $arr["countProduct"] = $countProduct;

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $e = [
            "id" => $id,
            "code_barang" => $code_barang,
            "nama_barang" => $nama_barang,
            "gambar_barang" => $gambar_barang,
            "harga" => $harga,
            "stok_barang" => $stok_barang,
            "deskripsi" => $deskripsi,
            "kategori" => $kategori
        ];

        array_push($arr["data"], $e);
    }

    echo json_encode($arr);
} else {
    echo json_encode([
        "message" => "Data Kosong"
    ]);
}
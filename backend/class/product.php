<?php

class Product
{
    private $conn;

    private $db_table = "barang";

    public $id, $code_barang, $nama_barang, $gambar_barang, $harga, $stok_barang, $deskripsi, $kategori;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function getAll()
    {
        $sql = "SELECT * FROM " . $this->db_table . "";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        return $stmt;
    }
}
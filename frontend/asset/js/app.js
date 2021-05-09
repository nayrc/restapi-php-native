function getAllProduct() {
    const key = "nayyrc";
    return fetch(`http://localhost:3000/api/product.php?key=${key}`)
        .then((res) => res.json())
        .then((res) => res.data);
}

let paginationElement = document.querySelector(".pagination");

let currentPage = 1;
let rows = 2;

async function ready() {
    let products = await getAllProduct();
    showProduct(products, rows, currentPage);
    setupPagination(products, rows);
    search(products);
}

let listProduct = document.querySelector(".list-product");

function showProduct(products, rowsPerPage, page) {
    let cards = "";
    page--;

    let start = rowsPerPage * page;
    let end = start + rowsPerPage;
    let paginatedItems = products.slice(start, end);

    for (let i = 0; i < paginatedItems.length; i++) {
        let p = paginatedItems[i];
        cards += cardProduct(p);
    }
    // products.forEach((p) => {
    //     cards += cardProduct(p);
    // });

    listProduct.innerHTML = cards;
}

function setupPagination(products, rowsPerPage) {
    let pageCount = Math.ceil(products.length / rowsPerPage);

    for (let i = 1; i < pageCount + 1; i++) {
        let btn = paginationButton(i, products);
        paginationElement.appendChild(btn);
    }
}

function paginationButton(page, products) {
    let button = document.createElement("button");
    button.innerText = page;

    if (currentPage == page) button.classList.add("active");

    button.addEventListener("click", () => {
        currentPage = page;
        showProduct(products, rows, currentPage);

        let currentBtn = document.querySelector(".pagination button.active");

        currentBtn.classList.remove("active");

        button.classList.add("active");
    });

    return button;
}

function cardProduct(p) {
    return ` <div class="col-md-4">
    <div class="card">
        <img src="./asset/img/${p.gambar_barang}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${p.nama_barang}</h5>
            <p class="card-text">Rp, ${p.harga}</p>
            <a href="#" class="btn btn-primary">Detail</a>
        </div>
    </div>
</div>`;
}

function search(products) {
    document.querySelector(".input-search").addEventListener("input", (event) => {
        let value = event.target.value.toLocaleLowerCase();
        let result = "";
        let title = document.querySelector(".title");

        products.filter((p) => {
            return (
                p.nama_barang.toLowerCase().includes(value)
            )
        }).forEach((p) => {
            result += cardProduct(p);
        });

        if (value) {
            if (result) {
                listProduct.innerHTML = result;
            } else {
                listProduct.innerHTML = "Product is empty";
            }
            title.innerHTML = "Search...";
        } else {
            if (result) {
                showProduct(products, rows, currentPage);
            } else {
                listProduct.innerHTML = "Product is empty";
            }
            title.innerHTML = "All Book";
        }

    });
}

ready();
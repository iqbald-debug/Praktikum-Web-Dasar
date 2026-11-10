const products = [
    {
        id: 1,
        nama: "Es Krim Cokelat",
        harga: 15000,
        kategori: "es-krim",
        icon: "🍫",
        badge: "Best Seller",
        badgeType: "hot"
    },
    {
        id: 2,
        nama: "Es Krim Strawberry",
        harga: 15000,
        kategori: "es-krim",
        icon: "🍓",
        badge: "Favorit",
        badgeType: "favorit"
    },
    {
        id: 3,
        nama: "Es Krim Vanilla",
        harga: 13000,
        kategori: "es-krim",
        icon: "🍦"
    },
    {
        id: 4,
        nama: "Es Krim Mangga",
        harga: 16000,
        kategori: "es-krim",
        icon: "🥭",
        badge: "Baru",
        badgeType: "new"
    },
    {
        id: 5,
        nama: "Sundae Cokelat",
        harga: 25000,
        kategori: "sundae",
        icon: "🍨",
        badge: "Best Seller",
        badgeType: "hot"
    },
    {
        id: 6,
        nama: "Sundae Keju",
        harga: 27000,
        kategori: "sundae",
        icon: "🧀"
    },
    {
        id: 7,
        nama: "Sundae Buah",
        harga: 28000,
        kategori: "sundae",
        icon: "🍧",
        badge: "Favorit",
        badgeType: "favorit"
    },
    {
        id: 8,
        nama: "Milkshake Cokelat",
        harga: 20000,
        kategori: "minuman",
        icon: "🥤"
    },
    {
        id: 9,
        nama: "Milkshake Strawberry",
        harga: 20000,
        kategori: "minuman",
        icon: "🥛",
        badge: "Baru",
        badgeType: "new"
    },
    {
        id: 10,
        nama: "Es Teh Manis",
        harga: 8000,
        kategori: "minuman",
        icon: "🧊"
    },
    {
        id: 11,
        nama: "Es Jeruk",
        harga: 10000,
        kategori: "minuman",
        icon: "🍊"
    },
    {
        id: 12,
        nama: "Float Ice Cream",
        harga: 22000,
        kategori: "minuman",
        icon: "🍹",
        badge: "Best Seller",
        badgeType: "hot"
    }
];
let cart = [];
let currentFilter = "all";
let searchKeyword = "";



function formatRupiah(angka) {
    return "Rp " + angka.toLocaleString("id-ID");
}


// ========================================
// RENDER PRODUK
// ========================================

function renderProduk() {

    const $grid = $("#produkGrid");

    let filteredProducts = products.filter(function (p) {

        const cocokKategori =
            currentFilter === "all" ||
            p.kategori === currentFilter;

        const cocokSearch =
            p.nama
                .toLowerCase()
                .includes(searchKeyword.toLowerCase());

        return cocokKategori && cocokSearch;
    });


    if (filteredProducts.length === 0) {

        $grid.html(`
            <div class="empty-cart">
                <i class="fas fa-search"></i>
                <p>Produk tidak ditemukan.</p>
            </div>
        `);

        return;
    }


    $grid.empty();


    filteredProducts.forEach(function (p) {

        const badgeHtml = p.badge
            ? `<div class="produk-badge ${p.badgeType}">${p.badge}</div>`
            : "";


        const card = `
            <div
                class="produk-card"
                data-id="${p.id}"
                data-kategori="${p.kategori}"
            >

                <div class="produk-image">
                    ${p.icon}
                    ${badgeHtml}
                </div>

                <div class="produk-info">

                    <div class="produk-category">
                        ${p.kategori.replace("-", " ")}
                    </div>

                    <div class="produk-name">
                        ${p.nama}
                    </div>

                    <div class="produk-bottom">

                        <div class="produk-price">
                            ${formatRupiah(p.harga)}
                        </div>

                        <button
                            class="add-cart"
                            data-id="${p.id}"
                        >
                            <i class="fas fa-plus"></i>
                        </button>

                    </div>

                </div>

            </div>
        `;

        $grid.append(card);
    });
}

$(".nav-link").on("click", function (e) {

    e.preventDefault();

    currentFilter = $(this).data("filter");

    $(".nav-link").removeClass("active");

    $(this).addClass("active");

    $(".filter-btn").removeClass("active");

    $(`.filter-btn[data-cat="${currentFilter}"]`)
        .addClass("active");

    renderProduk();
});

$(".filter-btn").on("click", function () {

    currentFilter = $(this).data("cat");

    $(".filter-btn").removeClass("active");

    $(this).addClass("active");

    $(".nav-link").removeClass("active");

    $(`.nav-link[data-filter="${currentFilter}"]`)
        .addClass("active");

    renderProduk();
});


$("#searchProduk").on("input", function () {

    searchKeyword = $(this).val();

    renderProduk();
});


$(document).on("click", ".add-cart", function () {

    const id = Number($(this).data("id"));

    const product = products.find(function (p) {
        return p.id === id;
    });


    if (!product) {
        return;
    }


    const existingItem = cart.find(function (item) {
        return item.id === id;
    });


    if (existingItem) {

        existingItem.qty++;

    } else {

        cart.push({
            id: product.id,
            nama: product.nama,
            harga: product.harga,
            icon: product.icon,
            qty: 1
        });
    }


    updateCartUI();

    showToast(`${product.nama} ditambahkan ke keranjang`);
});

function updateCartUI() {

    const $cartItems = $("#cartItems");

    $cartItems.empty();


    if (cart.length === 0) {

        $cartItems.html(`
            <div class="empty-cart">
                <i class="fas fa-shopping-basket"></i>
                <p>Keranjang masih kosong.</p>
            </div>
        `);

    } else {

        cart.forEach(function (item) {

            const itemTotal = item.harga * item.qty;

            const cartItem = `
                <div class="cart-item">

                    <div class="cart-item-image">
                        ${item.icon}
                    </div>

                    <div class="cart-item-info">

                        <div class="cart-item-name">
                            ${item.nama}
                        </div>

                        <div class="cart-item-price">
                            ${formatRupiah(itemTotal)}
                        </div>

                        <div class="cart-item-actions">

                            <div class="qty-control">

                                <button
                                    class="qty-btn qty-minus"
                                    data-id="${item.id}"
                                >
                                    -
                                </button>

                                <span class="qty-value">
                                    ${item.qty}
                                </span>

                                <button
                                    class="qty-btn qty-plus"
                                    data-id="${item.id}"
                                >
                                    +
                                </button>

                            </div>

                            <button
                                class="remove-item"
                                data-id="${item.id}"
                            >
                                Hapus
                            </button>

                        </div>

                    </div>

                </div>
            `;

            $cartItems.append(cartItem);
        });
    }


    // Total jumlah barang
    const totalQty = cart.reduce(function (sum, item) {
        return sum + item.qty;
    }, 0);


    // Total harga
    const totalHarga = cart.reduce(function (sum, item) {
        return sum + (item.harga * item.qty);
    }, 0);


    $(".cart-count").text(totalQty);

    $("#cartTotal").text(formatRupiah(totalHarga));
}


$(document).on("click", ".qty-plus", function () {

    const id = Number($(this).data("id"));

    const item = cart.find(function (item) {
        return item.id === id;
    });


    if (item) {
        item.qty++;
    }


    updateCartUI();
});

$(document).on("click", ".qty-minus", function () {

    const id = Number($(this).data("id"));

    const item = cart.find(function (item) {
        return item.id === id;
    });


    if (!item) {
        return;
    }


    item.qty--;


    if (item.qty <= 0) {

        cart = cart.filter(function (item) {
            return item.id !== id;
        });
    }


    updateCartUI();
});


$(document).on("click", ".remove-item", function () {

    const id = Number($(this).data("id"));

    cart = cart.filter(function (item) {
        return item.id !== id;
    });


    updateCartUI();

    showToast("Produk dihapus dari keranjang");
});

$("#openCart").on("click", function () {

    $("#cartSidebar").addClass("show");

    $("#cartOverlay").addClass("show");

    $("body").css("overflow", "hidden");
});


function closeCart() {

    $("#cartSidebar").removeClass("show");

    $("#cartOverlay").removeClass("show");

    $("body").css("overflow", "");
}


$("#closeCart").on("click", closeCart);

$("#cartOverlay").on("click", closeCart);

$("#checkoutBtn").on("click", function () {

    if (cart.length === 0) {

        showToast("Keranjang masih kosong");

        return;
    }


    const $button = $(this);

    $button.prop("disabled", true);

    $button.html(`
        <span>Memproses...</span>
        <i class="fas fa-spinner fa-spin"></i>
    `);


    setTimeout(function () {

        cart = [];

        updateCartUI();

        closeCart();

        $button.prop("disabled", false);

        $button.html(`
            <span>Checkout</span>
            <i class="fas fa-arrow-right"></i>
        `);

        showToast("Pesanan berhasil dibuat!");

    }, 1500);
});

let toastTimeout;


function showToast(message) {

    const $toast = $("#toast");

    $("#toastMessage").text(message);

    $toast.addClass("show");


    clearTimeout(toastTimeout);


    toastTimeout = setTimeout(function () {

        $toast.removeClass("show");

    }, 2500);
}

$("#hamburger").on("click", function () {

    $(".nav-menu").toggleClass("show");

});

$(document).ready(function () {

    renderProduk();

    updateCartUI();

});
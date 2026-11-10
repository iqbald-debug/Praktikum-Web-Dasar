const produkData = [
    {
        id: 1,
        nama: "Arabika Gayo",
        harga: 45000,
        kategori: "biji",
        icon: "☕",
        deskripsi: "Kopi Arabika Gayo dengan aroma harum dan rasa yang lembut."
    },

    {
        id: 2,
        nama: "Robusta Temanggung",
        harga: 35000,
        kategori: "biji",
        icon: "☕",
        deskripsi: "Kopi Robusta dengan rasa kuat dan aroma khas."
    },

    {
        id: 3,
        nama: "Liberika Rangsang",
        harga: 50000,
        kategori: "biji",
        icon: "☕",
        deskripsi: "Kopi Liberika dengan karakter rasa unik dari Indonesia."
    },

    {
        id: 4,
        nama: "Kopi Bubuk Nusantara",
        harga: 40000,
        kategori: "bubuk",
        icon: "🫘",
        deskripsi: "Kopi bubuk pilihan yang praktis untuk diseduh di rumah."
    },

    {
        id: 5,
        nama: "Kopi Susu Gula Aren",
        harga: 18000,
        kategori: "minuman",
        icon: "🥤",
        deskripsi: "Perpaduan kopi, susu, dan gula aren yang nikmat."
    },

    {
        id: 6,
        nama: "Americano",
        harga: 15000,
        kategori: "minuman",
        icon: "☕",
        deskripsi: "Kopi hitam dengan rasa kuat dan menyegarkan."
    }
];


/* =========================================
   CART
========================================= */

let cart = [];

let activeCategory = "semua";


/* =========================================
   FORMAT RUPIAH
========================================= */

function formatRupiah(angka) {

    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
    }).format(angka);

}


/* =========================================
   RENDER PRODUK
========================================= */

function renderProduk() {

    const keyword =
        $("#inputCari").val().toLowerCase().trim();

    let hasil = produkData.filter(function (produk) {

        const cocokKategori =
            activeCategory === "semua" ||
            produk.kategori === activeCategory;

        const cocokSearch =
            produk.nama.toLowerCase().includes(keyword) ||
            produk.deskripsi.toLowerCase().includes(keyword);

        return cocokKategori && cocokSearch;

    });


    $("#produkGrid").empty();


    if (hasil.length === 0) {

        $("#produkGrid").html(`
            <div class="empty-product">
                <h3>Produk tidak ditemukan</h3>
                <p>
                    Coba gunakan kata kunci atau kategori lain.
                </p>
            </div>
        `);

        return;
    }


    hasil.forEach(function (produk) {

        const kategoriText = {
            biji: "Biji Kopi",
            bubuk: "Kopi Bubuk",
            minuman: "Minuman"
        };


        const card = `
            <div class="product-card">

                <div class="product-image">
                    ${produk.icon}
                </div>

                <div class="product-info">

                    <span class="product-category">
                        ${kategoriText[produk.kategori]}
                    </span>

                    <h3>
                        ${produk.nama}
                    </h3>

                    <p class="product-description">
                        ${produk.deskripsi}
                    </p>

                    <div class="product-bottom">

                        <span class="product-price">
                            ${formatRupiah(produk.harga)}
                        </span>

                        <button
                            class="btn-add-cart"
                            data-id="${produk.id}">
                            + Cart
                        </button>

                    </div>

                </div>

            </div>
        `;


        $("#produkGrid").append(card);

    });

}


/* =========================================
   UPDATE CART UI
========================================= */

function updateCartUI() {

    $("#cartItems").empty();


    if (cart.length === 0) {

        $("#cartItems").html(`
            <div class="empty-cart">

                <div>🛒</div>

                <p>
                    Keranjang masih kosong.
                </p>

            </div>
        `);

        $("#cartTotal").text("Rp 0");

        $("#cartBadge").text("0");

        return;
    }


    let total = 0;

    let totalQty = 0;


    cart.forEach(function (item) {

        const subtotal =
            item.harga * item.qty;

        total += subtotal;

        totalQty += item.qty;


        const cartItem = `
            <div class="cart-item">

                <div class="cart-item-image">
                    ${item.icon}
                </div>

                <div class="cart-item-info">

                    <h4>
                        ${item.nama}
                    </h4>

                    <p>
                        ${formatRupiah(item.harga)}
                    </p>

                    <div class="qty-control">

                        <button
                            class="qty-btn"
                            data-id="${item.id}"
                            data-action="minus">
                            −
                        </button>

                        <span>
                            ${item.qty}
                        </span>

                        <button
                            class="qty-btn"
                            data-id="${item.id}"
                            data-action="plus">
                            +
                        </button>

                    </div>

                </div>

                <button
                    class="cart-item-remove"
                    data-id="${item.id}">
                    🗑
                </button>

            </div>
        `;


        $("#cartItems").append(cartItem);

    });


    $("#cartTotal").text(
        formatRupiah(total)
    );

    $("#cartBadge").text(totalQty);

}


/* =========================================
   TOAST
========================================= */

function showToast(message) {

    $("#toast")
        .text(message)
        .addClass("show");


    setTimeout(function () {

        $("#toast").removeClass("show");

    }, 2500);

}


/* =========================================
   DOCUMENT READY
========================================= */

$(document).ready(function () {


    /* -----------------------------------------
       RENDER AWAL
    ----------------------------------------- */

    renderProduk();

    updateCartUI();


    /* -----------------------------------------
       FILTER PRODUK
    ----------------------------------------- */

    $(document).on(
        "click",
        ".filter-btn",
        function () {

            $(".filter-btn")
                .removeClass("active");

            $(this)
                .addClass("active");


            activeCategory =
                $(this).data("category");


            renderProduk();

        }
    );


    /* -----------------------------------------
       SEARCH PRODUK
    ----------------------------------------- */

    $("#inputCari").on(
        "input",
        function () {

            renderProduk();

        }
    );


    /* -----------------------------------------
       TAMBAH PRODUK KE CART
    ----------------------------------------- */

    $(document).on(
        "click",
        ".btn-add-cart",
        function () {

            const id =
                Number($(this).data("id"));


            const produk =
                produkData.find(
                    item => item.id === id
                );


            const existing =
                cart.find(
                    item => item.id === id
                );


            if (existing) {

                existing.qty++;

            } else {

                cart.push({

                    ...produk,

                    qty: 1

                });

            }


            updateCartUI();

            showToast(
                produk.nama +
                " berhasil ditambahkan!"
            );

        }
    );


    /* -----------------------------------------
       BUKA CART
    ----------------------------------------- */

    $("#cartBtn").on(
        "click",
        function () {

            $("#cartSidebar")
                .addClass("open");

            $("#cartOverlay")
                .fadeIn(200);

        }
    );


    /* -----------------------------------------
       TUTUP CART
    ----------------------------------------- */

    $("#closeCart, #cartOverlay").on(
        "click",
        function () {

            $("#cartSidebar")
                .removeClass("open");

            $("#cartOverlay")
                .fadeOut(200);

        }
    );


    /* -----------------------------------------
       QTY PLUS / MINUS
    ----------------------------------------- */

    $(document).on(
        "click",
        ".qty-btn",
        function () {

            const id =
                Number($(this).data("id"));

            const action =
                $(this).data("action");


            const item =
                cart.find(
                    item => item.id === id
                );


            if (!item) {
                return;
            }


            if (action === "plus") {

                item.qty++;

            } else {

                item.qty--;

            }


            if (item.qty <= 0) {

                cart =
                    cart.filter(
                        item => item.id !== id
                    );

            }


            updateCartUI();

        }
    );


    /* -----------------------------------------
       HAPUS ITEM
    ----------------------------------------- */

    $(document).on(
        "click",
        ".cart-item-remove",
        function () {

            const id =
                Number($(this).data("id"));


            cart =
                cart.filter(
                    item => item.id !== id
                );


            updateCartUI();

            showToast(
                "Produk dihapus dari keranjang."
            );

        }
    );


    /* -----------------------------------------
       BUKA CHECKOUT
    ----------------------------------------- */

    $("#checkoutBtn").on(
        "click",
        function () {

            if (cart.length === 0) {

                showToast(
                    "Keranjang masih kosong."
                );

                return;
            }


            $("#checkoutModal")
                .addClass("show");

        }
    );


    /* -----------------------------------------
       TUTUP CHECKOUT
    ----------------------------------------- */

    $("#closeModal").on(
        "click",
        function () {

            $("#checkoutModal")
                .removeClass("show");

        }
    );


    /* -----------------------------------------
       VALIDASI NAMA
    ----------------------------------------- */

    $("#inputNama").on(
        "input",
        function () {

            const value =
                $(this).val().trim();


            if (value.length < 3) {

                $("#namaError")
                    .text(
                        "Nama minimal 3 karakter."
                    );

            } else {

                $("#namaError")
                    .text("");

            }

        }
    );


    /* -----------------------------------------
       VALIDASI WHATSAPP
    ----------------------------------------- */

    $("#inputWhatsapp").on(
        "input",
        function () {

            const value =
                $(this).val().trim();


            const valid =
                /^[0-9]{10,14}$/.test(value);


            if (!valid) {

                $("#whatsappError")
                    .text(
                        "Nomor WhatsApp harus 10-14 digit."
                    );

            } else {

                $("#whatsappError")
                    .text("");

            }

        }
    );


    /* -----------------------------------------
       VALIDASI ALAMAT
    ----------------------------------------- */

    $("#inputAlamat").on(
        "input",
        function () {

            const value =
                $(this).val().trim();


            if (value.length < 10) {

                $("#alamatError")
                    .text(
                        "Alamat minimal 10 karakter."
                    );

            } else {

                $("#alamatError")
                    .text("");

            }

        }
    );


    /* -----------------------------------------
       SUBMIT CHECKOUT
    ----------------------------------------- */

    $("#checkoutForm").on(
        "submit",
        function (e) {

            e.preventDefault();


            const nama =
                $("#inputNama").val().trim();

            const whatsapp =
                $("#inputWhatsapp").val().trim();

            const alamat =
                $("#inputAlamat").val().trim();


            let valid = true;


            /* Validasi nama */

            if (nama.length < 3) {

                $("#namaError")
                    .text(
                        "Nama minimal 3 karakter."
                    );

                valid = false;

            }


            /* Validasi WhatsApp */

            if (!/^[0-9]{10,14}$/.test(whatsapp)) {

                $("#whatsappError")
                    .text(
                        "Nomor WhatsApp harus 10-14 digit."
                    );

                valid = false;

            }


            /* Validasi alamat */

            if (alamat.length < 10) {

                $("#alamatError")
                    .text(
                        "Alamat minimal 10 karakter."
                    );

                valid = false;

            }


            if (!valid) {

                return;

            }


            /* ---------------------------------
               PESANAN BERHASIL
            --------------------------------- */

            $("#checkoutModal")
                .removeClass("show");


            $("#cartSidebar")
                .removeClass("open");

            $("#cartOverlay")
                .fadeOut(200);


            $("#successModal")
                .addClass("show");


            /* Reset */

            cart = [];

            updateCartUI();

            $("#checkoutForm")[0].reset();

            $(".error-message").text("");

        }
    );


    /* -----------------------------------------
       TUTUP SUCCESS
    ----------------------------------------- */

    $("#closeSuccess").on(
        "click",
        function () {

            $("#successModal")
                .removeClass("show");

        }
    );


    /* -----------------------------------------
       TUTUP MODAL KETIKA KLIK LUAR
    ----------------------------------------- */

    $("#checkoutModal").on(
        "click",
        function (e) {

            if (e.target === this) {

                $(this)
                    .removeClass("show");

            }

        }
    );


    $("#successModal").on(
        "click",
        function (e) {

            if (e.target === this) {

                $(this)
                    .removeClass("show");

            }

        }
    );


});
let cart = [];

    function tambahCart(nama, harga) {

        const produk = cart.find(
            item => item.nama === nama
        );

        if (produk) {

            produk.qty++;

        } else {

            cart.push({
                nama: nama,
                harga: harga,
                qty: 1
            });

        }

        updateCartUI();
    }

    function updateCartUI() {

        const cartItems = $('#cartItems');

        cartItems.html('');

        if (cart.length === 0) {

            cartItems.html(
                'Keranjang masih kosong'
            );

            $('#cartTotal').html('Rp 0');

            $('#diskonText').html('');

            return;
        }

        cart.forEach((item, index) => {

            const subtotal =
                item.harga * item.qty;

            cartItems.append(`
                <div class="cart-item">

                    <div>
                        <strong>${item.nama}</strong>
                        <br>
                        Rp ${item.harga.toLocaleString('id-ID')}
                    </div>

                    <div class="qty">

                        <button
                            onclick="kurangiQty(${index})">
                            -
                        </button>

                        ${item.qty}

                        <button
                            onclick="tambahQty(${index})">
                            +
                        </button>

                    </div>

                    <div>
                        Rp ${subtotal.toLocaleString('id-ID')}
                    </div>

                </div>
            `);

        });

        let totalHarga = cart.reduce(
            (sum, item) =>
                sum + (item.harga * item.qty),
            0
        );


        let totalSebelumDiskon = totalHarga;
        let diskon = 0;


        if (totalHarga > 100000) {

            diskon = totalHarga * 0.1;

            totalHarga -= diskon;

            $('#cartTotal').html(`
                <del>
                    Rp ${totalSebelumDiskon.toLocaleString('id-ID')}
                </del>
                <br>
                Rp ${totalHarga.toLocaleString('id-ID')}
            `);

            $('#diskonText').html(
                `Diskon 10%: Rp ${diskon.toLocaleString('id-ID')}`
            );

        } else {

            $('#cartTotal').html(
                `Rp ${totalHarga.toLocaleString('id-ID')}`
            );

            $('#diskonText').html('');

        }

    }

    function tambahQty(index) {

        cart[index].qty++;

        updateCartUI();
    }

    function kurangiQty(index) {

        cart[index].qty--;

        if (cart[index].qty <= 0) {

            cart.splice(index, 1);

        }

        updateCartUI();
    }

    function bukaModal() {

        if (cart.length === 0) {

            alert('Keranjang masih kosong!');

            return;
        }

        $('#modalPembeli').css(
            'display',
            'flex'
        );

    }


    function tutupModal() {

        $('#modalPembeli').hide();

    }

    function simpanRiwayat(total, qty) {

        const riwayat =
            JSON.parse(
                localStorage.getItem('riwayat')
            ) || [];


        riwayat.push({

            tanggal:
                new Date().toISOString(),

            total: total,

            qty: qty

        });


        localStorage.setItem(
            'riwayat',
            JSON.stringify(riwayat)
        );

    }

    $('#formPembeli').submit(function(event) {

        event.preventDefault();
        const nama =
            $('#nama').val().trim();

        const alamat =
            $('#alamat').val().trim();

        const nohp =
            $('#nohp').val().trim();


        let valid = true;


        // Reset error

        $('.error').html('');


        // VALIDASI NAMA

        if (nama === '') {

            $('#errorNama').html(
                'Nama wajib diisi'
            );

            valid = false;

        }

        if (alamat === '') {

            $('#errorAlamat').html(
                'Alamat wajib diisi'
            );

            valid = false;

        }

        if (nohp === '') {

            $('#errorNohp').html(
                'No HP wajib diisi'
            );

            valid = false;

        } else if (!/^[0-9]+$/.test(nohp)) {

            $('#errorNohp').html(
                'No HP hanya boleh berisi angka'
            );

            valid = false;

        } else if (nohp.length < 10) {

            $('#errorNohp').html(
                'No HP minimal 10 angka'
            );

            valid = false;

        }
        if (!valid) {

            return;

        }
        let totalHarga = cart.reduce(
            (sum, item) =>
                sum + (item.harga * item.qty),
            0
        );
        let diskon = 0;


        if (totalHarga > 100000) {

            diskon = totalHarga * 0.1;

            totalHarga -= diskon;

        }
        const totalQty = cart.reduce(
            (sum, item) =>
                sum + item.qty,
            0
        );
        simpanRiwayat(
            totalHarga,
            totalQty
        );


        alert(
            `Checkout berhasil!\n\n` +
            `Nama: ${nama}\n` +
            `Alamat: ${alamat}\n` +
            `No HP: ${nohp}\n\n` +
            `Total: Rp ${totalHarga.toLocaleString('id-ID')}`
        );


        cart = [];

        tutupModal();

        $('#formPembeli')[0].reset();

        updateCartUI();

        tampilkanRiwayat();

    });

    function tampilkanRiwayat() {

        const riwayat =
            JSON.parse(
                localStorage.getItem('riwayat')
            ) || [];


        const container =
            $('#riwayatContainer');


        if (riwayat.length === 0) {

            container.html(
                'Belum ada transaksi.'
            );

            return;

        }


        container.html('');


        riwayat.forEach(
            (item, index) => {

                const tanggal =
                    new Date(item.tanggal)
                    .toLocaleString('id-ID');


                container.append(`

                    <div class="riwayat-item">

                        <strong>
                            Transaksi ${index + 1}
                        </strong>

                        <br>

                        Tanggal:
                        ${tanggal}

                        <br>

                        Jumlah barang:
                        ${item.qty}

                        <br>

                        Total:
                        Rp ${item.total.toLocaleString('id-ID')}

                    </div>

                `);

            }
        );

    }

    $(document).ready(function() {

        updateCartUI();

        tampilkanRiwayat();

    });
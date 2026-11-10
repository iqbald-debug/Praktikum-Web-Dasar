$(document).ready(function () {
    $(".hero-content").hide();

    $(".hero-content").fadeIn(1500);

    $(".tab-btn").click(function () {

        let target = $(this).data("tab");
        $(".tab-btn").removeClass("active");
        $(this).addClass("active");
        $(".tab-content").hide();
        $("#" + target).fadeIn(500);

    });

    $("#promo-btn").click(function () {

        $("#promo-detail").slideToggle(500);

    });

    $(".package-card").hover(

        function () {

            $(this).animate({
                marginTop: "-10px"
            }, 200);

        },

        function () {

            $(this).animate({
                marginTop: "0px"
            }, 200);

        }

    );

    $("#booking-form").validate({

        rules: {

            nama: {
                required: true,
                minlength: 3
            },

            email: {
                required: true,
                email: true
            },

            telepon: {
                required: true,
                minlength: 10,
                maxlength: 15,
                digits: true
            },

            destinasi: {
                required: true
            },

            "paket-wisata": {
                required: true
            },

            tanggal: {
                required: true
            },

            peserta: {
                required: true,
                min: 1
            },

            pesan: {
                required: true,
                minlength: 10
            }

        },


        messages: {

            nama: {
                required: "Nama wajib diisi",
                minlength: "Nama minimal 3 karakter"
            },

            email: {
                required: "Email wajib diisi",
                email: "Masukkan email yang valid"
            },

            telepon: {
                required: "Nomor telepon wajib diisi",
                minlength: "Nomor minimal 10 digit",
                maxlength: "Nomor maksimal 15 digit",
                digits: "Nomor telepon hanya boleh berisi angka"
            },

            destinasi: {
                required: "Silakan pilih destinasi"
            },

            "paket-wisata": {
                required: "Silakan pilih paket wisata"
            },

            tanggal: {
                required: "Tanggal keberangkatan wajib diisi"
            },

            peserta: {
                required: "Jumlah peserta wajib diisi",
                min: "Minimal 1 peserta"
            },

            pesan: {
                required: "Pesan wajib diisi",
                minlength: "Pesan minimal 10 karakter"
            }

        },


        submitHandler: function (form) {

            alert(
                "Booking berhasil dikirim! Terima kasih telah memilih ExploreNusa."
            );

            form.reset();

        }

    });

});
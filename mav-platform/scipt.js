
// Daftar menu untuk setiap peran
const menuPerPeran = {
    admin: ["Dashboard", "Kelola pengguna", "Kelola layanan"],
    staf: ["Dashboard", "Layanan saya"],
    tamu: ["Daftar layanan"]
};

const pilihPeran = document.getElementById("peran");
const daftarMenu = document.getElementById("menu");

function tampilkanMenu() {
    const menu = menuPerPeran[pilihPeran.value];

    daftarMenu.innerHTML = "";

    menu.forEach(function (nama) {
        const item = document.createElement("li");
        item.textContent = nama;

        daftarMenu.appendChild(item);
    });
}

// Tampilkan menu saat peran berubah
pilihPeran.addEventListener("change", tampilkanMenu);

// Tampilkan menu saat halaman pertama dibuka
tampilkanMenu();

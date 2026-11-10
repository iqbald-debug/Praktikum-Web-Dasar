document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".js-hover");

    buttons.forEach(function (button) {

        button.addEventListener("mouseenter", function () {
            button.classList.add("is-hovered");
        });

        button.addEventListener("mouseleave", function () {
            button.classList.remove("is-hovered");
        });

    });
});
var botaoMenu = document.getElementById("botao-menu");
var menu = document.getElementById("menu-principal");

function abrirMenu() {
  menu.classList.add("aberto");
  botaoMenu.setAttribute("aria-expanded", "true");
  botaoMenu.setAttribute("aria-label", "Fechar menu");
}

function fecharMenu() {
  menu.classList.remove("aberto");
  botaoMenu.setAttribute("aria-expanded", "false");
  botaoMenu.setAttribute("aria-label", "Abrir menu");
}

botaoMenu.addEventListener("click", function () {
  if (menu.classList.contains("aberto")) {
    fecharMenu();
  } else {
    abrirMenu();
  }
});

document.addEventListener("keydown", function (evento) {
  if (evento.key === "Escape" && menu.classList.contains("aberto")) {
    fecharMenu();
    botaoMenu.focus();
  }
});

var linksDoMenu = menu.querySelectorAll("a");
for (var i = 0; i < linksDoMenu.length; i++) {
  linksDoMenu[i].addEventListener("click", fecharMenu);
}

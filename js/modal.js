var modalAberto = null;
var ultimoFoco = null;

function abrirModal(modal) {
  ultimoFoco = document.activeElement;
  modal.classList.add("aberto");
  modalAberto = modal;
  modal.querySelector(".modal-caixa a, .modal-caixa button").focus();
}

function fecharModal() {
  if (modalAberto === null) {
    return;
  }
  modalAberto.classList.remove("aberto");
  modalAberto = null;
  if (ultimoFoco) {
    ultimoFoco.focus();
  }
}

var linksModal = document.querySelectorAll('a[href^="#modal-"]');
for (var i = 0; i < linksModal.length; i++) {
  linksModal[i].addEventListener("click", function (evento) {
    evento.preventDefault();
    var id = this.getAttribute("href").slice(1);
    abrirModal(document.getElementById(id));
  });
}

var botoesFechar = document.querySelectorAll("[data-fechar]");
for (var j = 0; j < botoesFechar.length; j++) {
  botoesFechar[j].addEventListener("click", function (evento) {
    evento.preventDefault();
    fecharModal();
  });
}

document.addEventListener("keydown", function (evento) {
  if (modalAberto === null) {
    return;
  }
  if (evento.key === "Escape") {
    fecharModal();
    return;
  }
  if (evento.key === "Tab") {
    var itens = modalAberto.querySelectorAll(".modal-caixa a, .modal-caixa button");
    var primeiro = itens[0];
    var ultimo = itens[itens.length - 1];
    if (evento.shiftKey && document.activeElement === primeiro) {
      evento.preventDefault();
      ultimo.focus();
    } else if (!evento.shiftKey && document.activeElement === ultimo) {
      evento.preventDefault();
      primeiro.focus();
    }
  }
});

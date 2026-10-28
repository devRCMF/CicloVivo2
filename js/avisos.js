function mostrarToast(texto) {
  var toast = document.createElement("div");
  toast.className = "toast";
  toast.setAttribute("role", "status");

  var paragrafo = document.createElement("p");
  paragrafo.textContent = texto;
  toast.appendChild(paragrafo);

  document.body.appendChild(toast);

  setTimeout(function () {
    toast.remove();
  }, 7000);
}

var botoesToast = document.querySelectorAll("[data-toast]");
for (var i = 0; i < botoesToast.length; i++) {
  botoesToast[i].addEventListener("click", function () {
    mostrarToast(this.getAttribute("data-toast"));
  });
}

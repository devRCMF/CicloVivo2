var formulario = document.getElementById("form-cadastro");
var campoCpf = document.getElementById("cpf");
var campoTelefone = document.getElementById("telefone");
var campoCep = document.getElementById("cep");
var campoNascimento = document.getElementById("nascimento");
var resumoErros = document.getElementById("resumo-erros");
var resumoSucesso = document.getElementById("resumo-sucesso");

formulario.noValidate = true;

function somenteNumeros(texto) {
  return texto.replace(/\D/g, "");
}

function mascaraCpf(texto) {
  var n = somenteNumeros(texto).slice(0, 11);
  n = n.replace(/(\d{3})(\d)/, "$1.$2");
  n = n.replace(/(\d{3})(\d)/, "$1.$2");
  n = n.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  return n;
}

function mascaraTelefone(texto) {
  var n = somenteNumeros(texto).slice(0, 11);
  if (n.length > 10) {
    return n.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  }
  if (n.length > 6) {
    return n.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
  }
  if (n.length > 2) {
    return n.replace(/(\d{2})(\d+)/, "($1) $2");
  }
  if (n.length > 0) {
    return "(" + n;
  }
  return "";
}

function mascaraCep(texto) {
  var n = somenteNumeros(texto).slice(0, 8);
  return n.replace(/(\d{5})(\d{1,3})/, "$1-$2");
}

function cpfValido(texto) {
  var n = somenteNumeros(texto);
  if (n.length !== 11) {
    return false;
  }
  if (/^(\d)\1{10}$/.test(n)) {
    return false;
  }
  var soma = 0;
  for (var i = 0; i < 9; i++) {
    soma = soma + Number(n[i]) * (10 - i);
  }
  var digito1 = (soma * 10) % 11;
  if (digito1 === 10) {
    digito1 = 0;
  }
  if (digito1 !== Number(n[9])) {
    return false;
  }
  soma = 0;
  for (var j = 0; j < 10; j++) {
    soma = soma + Number(n[j]) * (11 - j);
  }
  var digito2 = (soma * 10) % 11;
  if (digito2 === 10) {
    digito2 = 0;
  }
  return digito2 === Number(n[10]);
}

function ajustarDataMaxima() {
  var limite = new Date();
  limite.setFullYear(limite.getFullYear() - 16);
  campoNascimento.max = limite.toISOString().split("T")[0];
}

function textoDoErro(campo) {
  var v = campo.validity;
  if (v.valueMissing) {
    if (campo.type === "checkbox" || campo.type === "radio") {
      return "Marque esta opção para continuar.";
    }
    return "Preencha este campo.";
  }
  if (v.customError) {
    return campo.validationMessage;
  }
  if (v.typeMismatch) {
    return "Digite um e-mail válido.";
  }
  if (v.tooShort) {
    return "Digite pelo menos " + campo.minLength + " caracteres.";
  }
  if (v.patternMismatch) {
    return campo.title;
  }
  if (v.rangeOverflow || v.rangeUnderflow) {
    return "Data fora do período permitido (16 anos ou mais).";
  }
  return campo.validationMessage;
}

function pegarMensagem(campo) {
  var id = "erro-" + campo.id;
  var mensagem = document.getElementById(id);
  if (mensagem === null) {
    mensagem = document.createElement("span");
    mensagem.id = id;
    mensagem.className = "erro-msg";
    var area = campo.closest(".campo");
    if (area) {
      area.appendChild(mensagem);
    } else {
      campo.closest(".opcao").insertAdjacentElement("afterend", mensagem);
    }
    var descricao = campo.getAttribute("aria-describedby");
    if (descricao) {
      campo.setAttribute("aria-describedby", descricao + " " + id);
    } else {
      campo.setAttribute("aria-describedby", id);
    }
  }
  return mensagem;
}

function validarCampo(campo) {
  if (campo.id === "cpf") {
    if (campo.value !== "" && !cpfValido(campo.value)) {
      campo.setCustomValidity("CPF inválido. Confira os números.");
    } else {
      campo.setCustomValidity("");
    }
  }

  var mensagem = pegarMensagem(campo);

  if (campo.checkValidity()) {
    campo.removeAttribute("aria-invalid");
    mensagem.textContent = "";
    if (campo.value !== "" && campo.type !== "checkbox" && campo.type !== "radio") {
      campo.classList.add("campo-ok");
    }
    return true;
  }

  campo.classList.remove("campo-ok");
  campo.setAttribute("aria-invalid", "true");
  mensagem.textContent = textoDoErro(campo);
  return false;
}

function camposDoFormulario() {
  var lista = [];
  var todos = formulario.querySelectorAll("input, select");
  for (var i = 0; i < todos.length; i++) {
    var campo = todos[i];
    if (campo.type === "radio" && campo.id !== "perfil-voluntario") {
      continue;
    }
    if (campo.required || campo.pattern || campo.type === "email") {
      lista.push(campo);
    }
  }
  return lista;
}

function limparErros() {
  var campos = camposDoFormulario();
  for (var i = 0; i < campos.length; i++) {
    campos[i].removeAttribute("aria-invalid");
    campos[i].classList.remove("campo-ok");
    campos[i].setCustomValidity("");
    var mensagem = document.getElementById("erro-" + campos[i].id);
    if (mensagem) {
      mensagem.textContent = "";
    }
  }
  resumoErros.hidden = true;
  document.getElementById("dica-cep").textContent = "Formato: 00000-000";
}

campoCpf.addEventListener("input", function () {
  campoCpf.value = mascaraCpf(campoCpf.value);
});

campoTelefone.addEventListener("input", function () {
  campoTelefone.value = mascaraTelefone(campoTelefone.value);
});

campoCep.addEventListener("input", function () {
  campoCep.value = mascaraCep(campoCep.value);
  if (campoCep.value.length === 9) {
    buscarCep(somenteNumeros(campoCep.value));
  }
});

function buscarCep(cep) {
  var dica = document.getElementById("dica-cep");
  dica.textContent = "Buscando endereço...";

  fetch("https://viacep.com.br/ws/" + cep + "/json/")
    .then(function (resposta) {
      return resposta.json();
    })
    .then(function (dados) {
      if (dados.erro) {
        dica.textContent = "CEP não encontrado. Preencha o endereço manualmente.";
        return;
      }
      document.getElementById("endereco").value = dados.logradouro;
      document.getElementById("cidade").value = dados.localidade;
      document.getElementById("estado").value = dados.uf;
      dica.textContent = "Endereço preenchido. Confira os dados.";
      document.getElementById("numero").focus();
    })
    .catch(function () {
      dica.textContent = "Não foi possível buscar o CEP. Preencha o endereço manualmente.";
    });
}

var campos = camposDoFormulario();
for (var i = 0; i < campos.length; i++) {
  campos[i].addEventListener("blur", function () {
    validarCampo(this);
  });
  campos[i].addEventListener("change", function () {
    validarCampo(this);
  });
  campos[i].addEventListener("input", function () {
    if (this.getAttribute("aria-invalid") === "true") {
      validarCampo(this);
    }
  });
}

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();
  resumoSucesso.hidden = true;

  var erros = 0;
  var primeiroComErro = null;
  var lista = camposDoFormulario();
  for (var i = 0; i < lista.length; i++) {
    if (!validarCampo(lista[i])) {
      erros++;
      if (primeiroComErro === null) {
        primeiroComErro = lista[i];
      }
    }
  }

  if (erros > 0) {
    resumoErros.textContent = "Corrija " + erros + (erros === 1 ? " campo" : " campos") + " antes de enviar.";
    resumoErros.hidden = false;
    primeiroComErro.focus();
    return;
  }

  var primeiroNome = document.getElementById("nome").value.trim().split(" ")[0];
  resumoErros.hidden = true;
  resumoSucesso.textContent = "Obrigado, " + primeiroNome + "! Seu cadastro foi enviado. Em até cinco dias úteis a equipe entra em contato.";
  resumoSucesso.hidden = false;
  mostrarToast("Cadastro enviado com sucesso.");
  formulario.reset();
  resumoSucesso.scrollIntoView();
});

formulario.addEventListener("reset", function () {
  setTimeout(limparErros, 0);
});

ajustarDataMaxima();

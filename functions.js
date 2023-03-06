function allStorage() {
  var values = [],
    keys = Object.keys(localStorage),
    i = keys.length;

  while (i--) {
    values.push(JSON.parse(localStorage.getItem(keys[i])));
  }

  return values;
}

class CaixaRegistradora {
  constructor() {
    this.estoque = [];
    this.clientes = [];
  }
  adicionarProdutoAoEstoque(codigo, nome, preço, quantidade) {
    this.estoque.push({
      codigo,
      nome,
      preço,
      quantidade,
    });
    localStorage.setItem(
      nome,
      JSON.stringify(this.estoque[this.estoque.length - 1])
    );
    this.estoque = allStorage().slice();
  }
  atualizarProduto() {
    let codigoAPesquisar = parseInt(prompt("Qual o código do produto?"));

    this.estoque.filter((produtos) => {
      if (produtos.codigo == codigoAPesquisar) {
        let açao = prompt("O que deseja atualizar? Ex: valor, quantidade");
        if (açao == "valor") {
          let decisao = parseFloat(prompt("Qual o novo valor?"));
          produtos.preço = decisao;
          localStorage.setItem(produtos.nome, JSON.stringify(produtos));
        } else if (açao == "quantidade") {
          let decisao = parseInt(prompt("Quantos produtos quer adicionar?"));
          produtos.quantidade = produtos.quantidade + decisao;
          localStorage.setItem(produtos.nome, JSON.stringify(produtos));
        }
      }
    });
  }
  iniciarAtendimento(nomeCliente) {
    this.clientes.push({ nome: nomeCliente, total: 0 });
  }
  syncEstoque() {
    this.estoque = allStorage().slice();
  }
  passarProduto(codigo, quantidadeAPassar) {
    this.estoque.filter((produtos) => {
      if (produtos.codigo == codigo) {
        if (quantidadeAPassar <= produtos.quantidade) {
          produtos.quantidade = produtos.quantidade - quantidadeAPassar;
          localStorage.setItem(produtos.nome, JSON.stringify(produtos));
          this.clientes[this.clientes.length - 1].total =
            this.clientes[this.clientes.length - 1].total +
            produtos.preço * quantidadeAPassar;
        } else {
          console.log("Quantidade insuficiente no estoque");
        }
      }
    });
  }
  verificarTotal() {
    console.log(this.clientes[this.clientes.length - 1].total);
  }
  fecharConta(dinheiro) {
    let troco = dinheiro - this.clientes[this.clientes.length - 1].total;
    window.alert(`O troco é ${troco}`);
    this.clientes[this.clientes.length - 1].total = 0;
  }
}

let atendimento = new CaixaRegistradora();
atendimento.syncEstoque();

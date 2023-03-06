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
  }
  atualizarProduto() {
    let codigoAPesquisar = parseInt(prompt("Qual o código do produto?"));

    this.estoque.filter((produtos) => {
      if (produtos.codigo == codigoAPesquisar) {
        let açao = prompt("O que deseja atualizar? Ex: valor, quantidade");
        if (açao == "valor") {
          let decisao = parseFloat(prompt("Qual o novo valor?"));
          produtos.preço = decisao;
        } else if (açao == "quantidade") {
          let decisao = parseInt(prompt("Quantos produtos quer adicionar?"));
          produtos.quantidade = produtos.quantidade + decisao;
        }
      }
    });
  }
  iniciarAtendimento(nomeCliente) {
    this.clientes.push({ nome: nomeCliente, total: 0 });
  }
  passarProduto(codigo, quantidadeAPassar) {
    this.estoque.filter((produtos) => {
      if (produtos.codigo == codigo) {
        if (quantidadeAPassar <= produtos.quantidade) {
          produtos.quantidade = produtos.quantidade - quantidadeAPassar;
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
  }
}

let atendimento = new CaixaRegistradora();

atendimento.adicionarProdutoAoEstoque(1, "Suco", 6.89, 5);
atendimento.adicionarProdutoAoEstoque(2, "Bolacha", 2.35, 5);
console.log(atendimento.estoque);
atendimento.iniciarAtendimento("joao");

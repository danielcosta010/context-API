import { useContext, useEffect } from "react";
import { CarrinhoContext } from "../context/CarrinhoContext";

export const useCarrinhoContext = () => {
  const {
    carrinho,
    setCarrinho,
    quantidade,
    setQuantidade,
    valorTotal,
    setValorTotal,
  } = useContext(CarrinhoContext);

  function mudarQuantidade(id, quantidade) {
    return carrinho.map((itemDoCarrinho) => {
      if (itemDoCarrinho.id === id) itemDoCarrinho.quantidade += quantidade;
      return itemDoCarrinho;
    });
  }

  function adicionarProduto(novoProduto) {
    const temOProduto = carrinho.some((itemDoCarrinho) => {
      return itemDoCarrinho.id === novoProduto.id;
    });
    if (!temOProduto) {
      novoProduto.quantidade = 1;
      return setCarrinho((carrinhoAnterior) => [
        ...carrinhoAnterior,
        novoProduto,
      ]);
    } else {
      const carrinhoAtualizado = mudarQuantidade(novoProduto.id, 1);
      setCarrinho([...carrinhoAtualizado]);
    }
  }

  function removerProduto(id) {
    const produto = carrinho.find((itemDoCarrinho) => itemDoCarrinho.id === id);
    const ehOUltimo = produto.quantidade === 1;
    if (ehOUltimo) {
      return setCarrinho((carrinhoAnterior) =>
        carrinhoAnterior.filter((itemDoCarrinho) => itemDoCarrinho.id !== id)
      );
    } else {
      const carrinhoAtualizado = mudarQuantidade(id, -1);
      setCarrinho([...carrinhoAtualizado]);
    }
  }

  function removerProdutoCarrinho(id) {
    const produto = carrinho.filter(
      (itemDoCarrinho) => itemDoCarrinho.id !== id
    );
    setCarrinho(produto);
  }

  useEffect(() => {
    const { totalTemp, quantidadeTemp } = carrinho.reduce((acumulador, produto) => (
      {
        totalTemp: acumulador.totalTemp + produto.quantidade * produto.preco,
        quantidadeTemp: acumulador.quantidadeTemp + produto.quantidade,
      }),
      {
        totalTemp: 0,
        quantidadeTemp: 0,
      }
    );
    setValorTotal(totalTemp);
    setQuantidade(quantidadeTemp);
  }, [carrinho])

  return {
    carrinho,
    setCarrinho,
    adicionarProduto,
    removerProduto,
    removerProdutoCarrinho,
    valorTotal,
    quantidade,
  };
};

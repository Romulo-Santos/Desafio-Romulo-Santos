class CaixaDaLanchonete {
    calcularValorDaCompra(metodoDePagamento, itens) {
        const cardapio = {
            cafe: 3.00,
            chantily: 1.50,
            suco: 6.20,
            sanduiche: 6.50,
            queijo: 2.00,
            salgado: 7.25,
            combo1: 9.50,
            combo2: 7.50
        };
        const descontoDinheiro = 0.05;
        const acrescimoCredito = 0.03;
    
        let total = 0;
        let temPrincipal = false;
        let temChantily = false;
        let temQueijo = false;

        for (const item of itens) {
            const [codigo, quantidade] = item.split(',');
    
            if (!cardapio[codigo]) {
                return 'Item inválido!';
            }
    
            if (parseInt(quantidade) === 0) {
                return 'Quantidade inválida!';
            }
    
            total += cardapio[codigo] * parseInt(quantidade);
    
            if (codigo === 'sanduiche') {
                temPrincipal = true;
            } else if (codigo === 'chantily') {
                temChantily = true;
            } else if (codigo === 'queijo') {
                temQueijo = true;
            }
        }
        if ((temChantily || temQueijo) && !temPrincipal) {
            return 'Item extra não pode ser pedido sem o principal';
        }
        if (metodoDePagamento === 'dinheiro') {
            total *= (1 - descontoDinheiro);
        } else if (metodoDePagamento === 'credito') {
            total *= (1 + acrescimoCredito);
        } else if (metodoDePagamento !== 'debito') {
            return 'Forma de pagamento inválida!';
        }
    

        if (itens.length === 0) {
            return 'Não há itens no carrinho de compra!';
        }
    
        return `R$ ${total.toFixed(2).replace('.', ',')}`;
        }
}

export { CaixaDaLanchonete };


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
        let codigosItens = {};
		
		//	Padroniza pedido, juntas os codigos em um só código e soma.
		for (const item of itens) {
            let [codigo, quantidade] = item.split(',');
			
			if (!cardapio[codigo]) {
                return 'Item inválido!';
            }
			
			quantidade = parseInt(quantidade);
    
            if (quantidade === 0) {
                return 'Quantidade inválida!';
            }
			
			codigosItens[codigo] = (codigosItens[codigo] ?? 0) + quantidade;
		}
		
		//	Valida itens extras.
		if (codigosItens.hasOwnProperty('chantily') && !codigosItens.hasOwnProperty('cafe')) {
			return 'Item extra não pode ser pedido sem o principal';
		}
		
		if (codigosItens.hasOwnProperty('queijo') && !codigosItens.hasOwnProperty('sanduiche')) {
			return 'Item extra não pode ser pedido sem o principal';
		}
		
        for (let codigo in codigosItens) {
            let quantidade = codigosItens[codigo];
            total += cardapio[codigo] * quantidade;
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


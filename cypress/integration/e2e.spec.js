/// <reference types="cypress" />

import  enderecoFaturamentoPage from "../support/page_objects/endereco.page";
const endFaturamento = require("../fixtures/dadosClientes.json")


context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        cy.visit('produtos/')
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {

        cy.adicionarProdutos('Atlas Fitness Tank', 'XS','Blue','4')   

        cy.get('.woocommerce-message > .button').click()
        cy.get('.checkout-button').click()
      
        
        //usando page objects
        enderecoFaturamentoPage.editarEnderecoFaturamento(
            endFaturamento[1].nome, 
            endFaturamento[1].sobrenome,
            endFaturamento[1].empresa,
            endFaturamento[1].pais,
            endFaturamento[1].endereco,
            endFaturamento[1].numero,
            endFaturamento[1].cidade,
            endFaturamento[1].estado,
            endFaturamento[1].cep,
            endFaturamento[1].telefone,
            endFaturamento[1].email
        )
     
        cy.get('#order_comments').type('Informacao adicional opcional')

        cy.get('#payment_method_cheque').click()

        cy.get('#terms').click()

        cy.get('#place_order').click()

        cy.get('.woocommerce-notice').should('contain','Obrigado. Seu pedido foi recebido')
        

    });
   

})
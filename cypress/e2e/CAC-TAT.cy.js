describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })
  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('#firstName').type('Eron')
    cy.get('#lastName').type('Moraes')
    cy.get('#email').type('eron.moraes7@gmail.com')
    cy.get('#open-text-area').type('Obrigado!')
    cy.get('button[type="submit"]').click()
    
    //Mensagem enviada com sucesso.
    cy.get('.success').should('be.visible')
  })
})

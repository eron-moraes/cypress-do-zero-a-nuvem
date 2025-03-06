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
    cy.contains('button', 'Enviar').click()


    //Mensagem enviada com sucesso.
    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Eron')
    cy.get('#lastName').type('Moraes')
    cy.get('#email').type('eron.moraes7@gmail,com')
    cy.get('#open-text-area').type('Obrigado!')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })
  it('campo telefone continua vazio quando preenchido com valor não-numerico', () => {
    cy.get('#phone')
      .type('abcde')
      .should('have.value', '')
  })
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Eron')
    cy.get('#lastName').type('Moraes')
    cy.get('#email').type('eron.moraes7@gmail.com')
    cy.get('#open-text-area').type('Obrigado!')
    cy.get('#phone-checkbox').click()
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })
  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('Eron')
      .should('have.value', 'Eron')
      .clear()
      .should('have.value', '')

    cy.get('#lastName')
      .type('Moraes')
      .should('have.value', 'Moraes')
      .clear()
      .should('have.value', '')

    cy.get('#email')
      .type('eron.moraes7@gmail.com')
      .should('have.value', 'eron.moraes7@gmail.com')
      .clear()
      .should('have.value', '')

    cy.get('#open-text-area')
      .type('Obrigado!')
      .should('have.value', 'Obrigado!')
      .clear()
      .should('have.value', '')

    cy.get('#phone')
      .type('1290000000')
      .should('have.value', '1290000000')
      .clear()
      .should('have.value', '')
  })
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios.', () => {
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })
  it('envia o formuário com sucesso usando um comando customizado', () => {
    // const data = {
    //   firstName: 'Eron',
    //   lastName: 'Moraes',
    //   email: 'eron.moraes7@gmail.com',
    //   text: 'Teste'
    // }
    //cy.fillMandatoryFieldsAndSubmit(data)
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')

  })
  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
    .select('YouTube')
    .should('have.value', 'youtube')
  })
  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product')
    .select('mentoria')
    .should('have.value', 'mentoria')
  })
  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product')
    .select(1)
    .should('have.value', 'blog')
  })
  it.only('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
    .check()
    .should('be.checked')
  })
})

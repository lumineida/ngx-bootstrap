import { AttrObj } from './interfaces';

export abstract class BaseComponent {
  titleSel = 'h1';
  titleLinkSel = '.content-header a';
  usageExSel = 'demo-top-section h2';
  usageExCodeSel = 'demo-top-section .prettyprint';
  abstract pageUrl: string;
  titleDefaultExample = 'Usage';

  navigateTo() {
    const bsVersionRoute = Cypress.env('bsVersion') ? `?_bsVersion=bs${Cypress.env('bsVersion')}` : '';
    cy.visit(`${ this.pageUrl }${bsVersionRoute}`);
  }

  scrollToMenu(subMenu: string) {
    cy.get('examples h3').contains(subMenu).scrollIntoView();
  }

  clickOnDemoMenu(subMenu: string) {
    cy.get('add-nav').contains('a', subMenu).click();
  }

  clickByText(parent: string, text: string) {
    cy.get(parent).contains(text).click();
  }

  dblClickByText(parent: string, text: string) {
    cy.get(parent).contains(text).dblclick();
  }

  isBtnTxtEqual(baseSelector: string, expectedBtnTxt: string, buttonIndex?: number) {
    cy.get(`${ baseSelector } button`).eq(buttonIndex ? buttonIndex : 0).invoke('text')
      .should(btnTxt => expect(btnTxt).to.equal(expectedBtnTxt));
  }

  isLabelTxtEqual(baseSelector: string, expectedLabelTxt: string, labelIndex?: number) {
    cy.get(`${baseSelector} label`).eq(labelIndex ? labelIndex : 0).invoke('text')
      .should(labelTxt => expect(labelTxt).to.equal(expectedLabelTxt));
  }

  clickOnBtn(baseSelector: string, buttonIndex?: number) {
    cy.get(`${ baseSelector } button`).eq(buttonIndex ? buttonIndex : 0).click();
  }

  dblClickOnBtn(baseSelector: string, buttonIndex?: number) {
    cy.get(`${ baseSelector } button`).eq(buttonIndex ? buttonIndex : 0).dblclick();
  }

  clickOnInput(baseSelector: string, inputIndex?: number) {
    cy.get(`${ baseSelector } input`).eq(inputIndex ? inputIndex : 0).click();
  }

  dblClickOnInput(baseSelector: string, inputIndex?: number) {
    cy.get(`${ baseSelector } input`).eq(inputIndex ? inputIndex : 0).dblclick();
  }

  hoverOnBtn(baseSelector: string, buttonIndex?: number) {
    cy.get(`${baseSelector} button`).eq(buttonIndex ? buttonIndex : 0).trigger('mouseenter');
  }

  mouseLeave(baseSelector: string, buttonIndex?: number) {
    cy.get(`${baseSelector} button`).eq(buttonIndex ? buttonIndex : 0).trigger('mouseleave');
  }

  isInputHaveAttrs(baseSelector: string, attributes: AttrObj[], inputIndex = 0) {
    cy.get(`${baseSelector} input`).eq(inputIndex)
      .then(input => {
        let i = 0;
        for (; i < attributes.length; i++) {
          expect(input).to.have.attr(attributes[i].attr, attributes[i].value);
        }
      });
  }

  isInputValueEqual(baseSelector: string, expectedTxt: string, inputIndex = 0) {
    cy.get(`${baseSelector} input`).eq(inputIndex).should('to.have.value', expectedTxt);
  }

  isInputValueContain(baseSelector: string, expectedTxt: string, inputIndex = 0) {
    cy.get(`${baseSelector} input`).eq(inputIndex).then(input => {
      expect(input.val()).to.contains(expectedTxt);
    });
  }

  clearInputAndSendKeys(baseSelector: string, dataToSend: string, inputIndex = 0) {
    cy.get(`${baseSelector} input`).eq(inputIndex).clear().type(dataToSend);
  }

  clickEnterOnInput(baseSelector: string, inputIndex = 0) {
    cy.get(`${baseSelector} input`).eq(inputIndex).type('{enter}');
  }

  isDemoContainsTxt(baseSelector: string, expectedTxt: string, expectedTxtOther?: string) {
    cy.get(`${baseSelector}`).invoke('text')
      .should(blockTxt => {
        expect(blockTxt).to.contains(expectedTxt);
        expect(blockTxt).to.contains(expectedTxtOther ? expectedTxtOther : expectedTxt);
      });
  }

  isButtonExist(baseSelector: string, buttonName: string, buttonNumber?: number) {
    cy.get(`${baseSelector} button`).eq(buttonNumber ? buttonNumber : 0).invoke('text')
      .should(btnTxt => expect(btnTxt).to.equal(buttonName));
  }

  isSelectExist(baseSelector: string, selectText: string, selectNumber = 0) {
    cy.get(`${baseSelector} select`).eq(selectNumber).invoke('text')
      .should(btnTxt => expect(btnTxt).to.contain(selectText));
  }

  selectOne(baseSelector: string, selectToChose: string, selectNumber = 0) {
    cy.get(`${baseSelector} select`).eq(selectNumber).select(selectToChose);
  }

  isPreviewExist(baseSelector: string, previewText: string, previewNumber?: number) {
    cy.get(`${baseSelector} .card.card-block`).eq(previewNumber ? previewNumber : 0).invoke('text')
      .should(btnTxt => expect(btnTxt).to.contain(previewText));
  }
}

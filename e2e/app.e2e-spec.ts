import { Angular2firebasePage } from './app.po';

describe('angular2firebase App', function() {
  let page: Angular2firebasePage;

  beforeEach(() => {
    page = new Angular2firebasePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

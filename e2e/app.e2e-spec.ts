import { BmObiClientPage } from './app.po';

describe('globi-admin-client App', () => {
  let page: BmObiClientPage;

  beforeEach(() => {
    page = new BmObiClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');

  
  });
});

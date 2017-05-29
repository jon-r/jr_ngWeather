import { JrNgweatherPage } from './app.po';

describe('jr-ngweather App', () => {
  let page: JrNgweatherPage;

  beforeEach(() => {
    page = new JrNgweatherPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

import { getCookie } from './utils'

describe('utils', () => {

  var window = {
    document: {
      something: "hi!"
    }
  };
  var document = window.document;

  test('empty cookie', () => {
    const cookie = getCookie('csrftoken');
    expect(cookie.length).toBe(0);
  });
  test('non-empty cookie', () => {
    document.cookie = 'ABCDEFG';
    const cookie = getCookie('csrftoken');
    expect(cookie.length).toBe(1);
  });
});

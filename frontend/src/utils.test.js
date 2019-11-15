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
    expect(cookie).toBe(null);
  });
  test('non-empty cookie', () => {
    document.cookie = 'ABCDEFG';
    const cookie = getCookie('csrftoken');
    expect(cookie).toBe(null);
  });
});

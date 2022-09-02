import { TrimPipe } from './trim.pipe';

describe('TrimPipe', () => {
  let instance: TrimPipe;
  beforeEach(() => {
    instance = new TrimPipe();
  });

  it('should be defined', () => {
    expect(instance).toBeDefined();
  });

  describe('isObj:', () => {
    it('pass an object, should return true', () => {
      const res = instance.isObj({});
      expect(res).toEqual(true);
    });

    it('pass a string, should return false', () => {
      const res = instance.isObj('aaa');
      expect(res).toEqual(false);
    });
  });

  describe('trim:', () => {
    it('pass an object, should trim spaces', () => {
      const res = instance.trim({ name: ' hello world  ' });
      expect(res).toEqual({ name: 'hello world' });
    });
    it('pass a nested object, should trim spaces', () => {
      const res = instance.trim({
        name: ' hello world  ',
        nested: {
          key: 'test new one     ',
        },
      });
      expect(res).toEqual({
        name: 'hello world',
        nested: {
          key: 'test new one',
        },
      });
    });
  });

  describe('transform:', () => {
    it('pass an object, should return result that has been trimmed', () => {
      const res = instance.transform(
        {
          name: '  Test name ',
          nested: { value: 'test   ' },
        },
        { type: 'query' },
      );
      expect(res).toEqual({
        name: 'Test name',
        nested: { value: 'test' },
      });
    });

    it('metadata type is not body, query: result should be the same original data', () => {
      const res = instance.transform(
        {
          name: '  Test name ',
          nested: { value: 'test   ' },
        },
        { type: 'custom' },
      );
      expect(res).toEqual({
        name: '  Test name ',
        nested: { value: 'test   ' },
      });
    });
  });
});

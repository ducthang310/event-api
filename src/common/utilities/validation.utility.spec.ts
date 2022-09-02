import { ValidationUtility } from './validation.utility';

describe('ValidationUtility', () => {
  describe('getValues:', () => {
    it('should return array of values', () => {
      const res = ValidationUtility.getValues([{ test: 'text 1' }, { name: 'text 2' }, { code: 'text 3' }]);
      expect(res).toEqual(['text 1', 'text 2', 'text 3']);
    });
  });

  describe('findProp:', () => {
    it('should return correct data', () => {
      const res = ValidationUtility.findProp(
        [
          {
            key: 'testAAA',
            msg: 'name',
          },
          {
            obj: { msg: { key: 'hello' } },
            code: 'name',
          },
        ],
        'msg',
      );
      expect(res).toEqual(['name', { key: 'hello' }]);
    });
  });

  describe('parseErrors:', () => {
    it('should return correct data', () => {
      const res = ValidationUtility.parseErrors([
        {
          key: 'testAAA',
          obj: { constraints: { key: 'name' } },
        },
        {
          obj: { constraints: { key: 'hello' } },
          code: 'name',
        },
      ] as any[]);
      expect(res).toEqual(['name', 'hello']);
    });
  });
});

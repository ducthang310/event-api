import { ValidationError } from 'class-validator';

export class ValidationUtility {
  static parseErrors(errors: ValidationError[]): any[] {
    return this.getValues(this.findProp(errors, 'constraints'));
  }

  static findProp(obj: any, key: string, result: any[] = []): any[] {
    const proto = Object.prototype;
    const ts = proto.toString;
    const hasOwn = proto.hasOwnProperty.bind(obj);

    if ('[object Array]' !== ts.call(result)) {
      result = [];
    }

    for (const i in obj) {
      if (hasOwn(i)) {
        if (i === key) {
          result.push(obj[i]);
        } else if ('[object Array]' === ts.call(obj[i]) || '[object Object]' === ts.call(obj[i])) {
          this.findProp(obj[i], key, result);
        }
      }
    }

    return result;
  }

  static getValues(arrayOfObjects: { [x: string]: string }[]): string[] {
    const result: string[] = [];
    for (const item of arrayOfObjects) {
      result.push(...Object.values(item));
    }
    return result;
  }
}

import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class TrimPipe implements PipeTransform {
  isObj(obj: any): boolean {
    return typeof obj === 'object' && obj !== null;
  }

  trim(values) {
    Object.keys(values).forEach((key) => {
      if (key !== 'password') {
        if (this.isObj(values[key])) {
          values[key] = this.trim(values[key]);
        } else {
          if (typeof values[key] === 'string') {
            values[key] = values[key].trim();
          }
        }
      }
    });
    return values;
  }

  transform(values: any, metadata: ArgumentMetadata) {
    const { type } = metadata;
    const allowedType = ['body', 'query', 'param'];
    if (allowedType.indexOf(type) !== -1) {
      if (this.isObj(values)) {
        return this.trim(values);
      }
      return values.trim();
    }
    return values;
  }
}

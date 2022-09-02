import { AllExceptionsFilter } from './all-exception.filter';
import { HttpAdapterHost } from '@nestjs/core';
import { ValidationError } from 'class-validator';
import { NotFoundException } from '@nestjs/common';

describe('AllExceptionsFilter', () => {
  const instance = new AllExceptionsFilter(new HttpAdapterHost());
  const fn = jest.fn(() => ({} as any));
  it('should be defined', () => {
    expect(instance.catch).toBeDefined();
  });

  it('catch: should throw an error', () => {
    expect(() => {
      instance.catch(new Error('test message'), {
        getArgByIndex() {
          return undefined;
        },
        getArgs() {
          return undefined;
        },
        getType() {
          return undefined;
        },
        switchToRpc() {
          return undefined;
        },
        switchToWs() {
          return undefined;
        },
        switchToHttp: () => ({ getRequest: fn, getResponse: fn, getNext: fn }),
      });
    }).toThrowError();
  });

  describe('parseMessages:', () => {
    it('if data contains message property, should return array of the message', () => {
      const res = instance.parseMessages({ message: 'test message' });
      expect(res).toEqual(['test message']);
    });

    it('if data has getMessages function, should return array of messages', () => {
      const res = instance.parseMessages({
        getMessages: () => ['test message', 'new message'],
      });
      expect(res).toEqual(['test message', 'new message']);
    });

    it('if data has getMessage function, should return array of a message', () => {
      const res = instance.parseMessages({
        getMessage: () => 'new message',
      });
      expect(res).toEqual(['new message']);
    });

    it('if data an string, should return array of the data', () => {
      const res = instance.parseMessages('test text');
      expect(res).toEqual(['test text']);
    });
  });

  describe('getStatusCode:', () => {
    it('if the error is an instance of ValidationError, should return 400', () => {
      const error = new ValidationError();
      const res = instance.getStatusCode([error]);
      expect(res).toEqual(400);
    });

    it('if the error is an instance of HttpException, should return 404', () => {
      const error = new NotFoundException('test');
      const res = instance.getStatusCode(error);
      expect(res).toEqual(404);
    });
  });

  describe('isValidationError:', () => {
    it('if the error is an instance of ValidationError, should return true', () => {
      const error = new ValidationError();
      const res = instance.isValidationError([error]);
      expect(res).toEqual(true);
    });

    it('if the error is not an instance of ValidationError, should return false', () => {
      const error = new NotFoundException();
      const res = instance.isValidationError([error]);
      expect(res).toEqual(false);
    });
  });
});

import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailValidatorService {
    validateEmail(email: string): Promise<EmailValidation> {
      return new Promise((resolve, reject) => {
        const re = /\S+@\S+\.\S+/;
        const isValid = re.test(email);
        const emailValidation = {
          isValid,
        };
        resolve(emailValidation);
      });
    }

    simpleCheck(email: string): boolean {
      const re = /\S+@\S+\.\S+/;
      return re.test(email);
    }
  }

export interface EmailValidation {
    isValid: boolean;
}

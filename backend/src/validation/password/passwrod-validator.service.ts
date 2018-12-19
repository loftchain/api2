export class PasswordValidatorService {
    validatePassword(password: string): Promise<PasswordValidation> {
      return new Promise((resolve, reject) => {
        const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/;
        const passwordIsLongEnough = password.length >= 6 && password.length <= 50;

        if (!passwordIsLongEnough || !reg.test(password)) {
          resolve({
            isValid: false,
            error: {
              message: 'Password is not long enough',
            },
          });
        }

        resolve({
          isValid: true,
        });
      });
    }
  }

export interface PasswordValidation {
    isValid: boolean;
    error?: {
      number?: number;
      message: string;
    };
}

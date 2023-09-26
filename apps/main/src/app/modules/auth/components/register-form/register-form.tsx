import { AuthenticationRequest } from '@mautomate/api-interfaces';
import { useFormControl } from '../../../ui/hook/use-form-control';
import styles from './register-form.module.scss';

export function RegisterForm() {
  return (
    <div className={styles['container']}>
      <h1>Welcome to RegisterForm!</h1>
    </div>
  );
}

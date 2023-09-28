import { FormProvider } from 'react-hook-form';
import styles from './login-form.module.scss';
import { useAuthorizationForm } from '../../hooks/use-authorization-form';
import { AuthenticationRequest } from '@mautomate/api-interfaces';
import { useFormControl } from '../../../ui/hook/use-form-control';
import { FormTextField } from '../../../ui/components/form-text-field/form-text-field';
import { requiredValidator } from '../../../ui/validator/required';
import { Button } from '../../../ui/components/button/button';
import { stringLengthValidator } from '../../../ui/validator/min-lenght';

export function LoginForm() {
  const { formMethods, handleSubmit, control } =
    useFormControl<AuthenticationRequest>({
      password: '',
      username: '',
    });
  const { submitLogin } = useAuthorizationForm();
  return (
    <div className={styles['container']}>
      <FormProvider {...formMethods}>
        <form
          onSubmit={handleSubmit(submitLogin)}
          className={styles['form-container']}
        >
          <FormTextField
            name="username"
            label="username"
            className={styles['input']}
            control={control}
            validators={[requiredValidator()]}
          />
          <FormTextField
            name="password"
            label="password"
            className={styles['input']}
            control={control}
            type="password"
            validators={[requiredValidator(), stringLengthValidator(5)]}
          />
          <Button type="submit">Login</Button>
        </form>
      </FormProvider>
    </div>
  );
}

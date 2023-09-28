import { AuthenticationRequest } from '@mautomate/api-interfaces';
import { useFormControl } from '../../../ui/hook/use-form-control';
import styles from '../login-form/login-form.module.scss';
import { FormProvider } from 'react-hook-form';
import { FormTextField } from '../../../ui/components/form-text-field/form-text-field';
import { requiredValidator } from '../../../ui/validator/required';
import { useAuthorizationForm } from '../../hooks/use-authorization-form';
import { Button } from '../../../ui/components/button/button';
import { stringLengthValidator } from '../../../ui/validator/min-lenght';

export function RegisterForm() {
  const { formMethods, handleSubmit, control } =
    useFormControl<AuthenticationRequest>({
      password: '',
      username: '',
    });
  const { submitRegistration } = useAuthorizationForm();
  return (
    <div className={styles['container']}>
      <FormProvider {...formMethods}>
        <form
          onSubmit={handleSubmit(submitRegistration)}
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
          <Button type="submit">Register</Button>
        </form>
      </FormProvider>
    </div>
  );
}

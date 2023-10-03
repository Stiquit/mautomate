import styles from './auth-screen.module.scss';
import { useState } from 'react';
import { RegisterForm } from '../register-form/register-form';
import { LoginForm } from '../login-form/login-form';
import { Button } from '../../../ui/components/button/button';
import cn from 'classnames';

import MautomateLogo from '../../../../../assets/mautomate_transparent.png';
import AuthBG from '../../../../../assets/authentication-background.jpg';
import { useAuthorizationForm } from '../../hooks/use-authorization-form';
import { Loader } from '../../../ui/components/loader/loader';
import { useRequestError } from '../../../error-handler/hooks/use-request-error';

export function AuthScreen() {
  const [isRegistering, setIsRegistering] = useState(false);
  const { loading, authorizationError } = useAuthorizationForm();
  const { clearError } = useRequestError();
  const handleClick = () => setIsRegistering((prevState) => !prevState);
  return (
    <div className={styles['container']}>
      <div className={styles['bg-container']}>
        <div className={styles['filter']}></div>
        <img src={AuthBG} alt="background" />
      </div>
      <div className={styles['content']}>
        <img
          src={MautomateLogo}
          className={styles['logo']}
          alt="Mautomate Logo"
        />
        <div className={styles['title']}>Mautomate</div>
        {loading && <Loader />}
        {!authorizationError && (
          <div className={styles['form']}>
            <div className={cn({ [styles['hidden']]: isRegistering })}></div>
            {isRegistering ? <RegisterForm /> : <LoginForm />}
          </div>
        )}
        {authorizationError && (
          <div className={styles['error-container']}>
            <div className={styles['error']}>{authorizationError}</div>
            <Button onClick={clearError}>Try again</Button>
          </div>
        )}
        <div className={styles['btn']}>
          <div className={styles['hint']}>
            {isRegistering ? 'Already have an account?' : 'Not registered yet?'}
          </div>
          <Button onClick={handleClick} variant="secondary">
            {isRegistering ? 'Sign in' : 'Sign up'}
          </Button>
        </div>
      </div>
    </div>
  );
}

import styles from './auth-screen.module.scss';
import { useState } from 'react';
import { RegisterForm } from '../register-form/register-form';
import { LoginForm } from '../login-form/login-form';
import { Button } from '../../../ui/components/button/button';
import cn from 'classnames';

import MautomateLogo from '../../../../../assets/mautomate_transparent.png';
import AuthBG from '../../../../../assets/authentication-background.jpg';

export function AuthScreen() {
  const [isRegistering, setIsRegistering] = useState(false);

  const handleClick = () => setIsRegistering((prevState) => !prevState);
  return (
    <div className={styles['container']}>
      <div className={styles['bg-container']}>
        <img src={AuthBG} alt="background" />
      </div>
      <div className={styles['content']}>
        <div className={styles['logo']}>
          <img src={MautomateLogo} alt="Mautomate Logo" />
        </div>
        <div className={styles['form']}>
          <div className={cn({ [styles['hidden']]: isRegistering })}></div>
          {isRegistering ? <RegisterForm /> : <LoginForm />}
        </div>
        <Button onClick={handleClick}>
          {isRegistering ? 'Register' : 'Login'}
        </Button>
      </div>
    </div>
  );
}

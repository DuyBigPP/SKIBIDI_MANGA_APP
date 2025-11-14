/**
 * Auth Screen - Container for Login/Register screens
 */

import React, { useState } from 'react';
import { LoginScreen } from './LoginScreen';
import { RegisterScreen } from './RegisterScreen';

interface AuthScreenProps {
  onAuthSuccess: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);

  return isLogin ? (
    <LoginScreen
      onSwitchToRegister={() => setIsLogin(false)}
      onLoginSuccess={onAuthSuccess}
    />
  ) : (
    <RegisterScreen
      onSwitchToLogin={() => setIsLogin(true)}
      onRegisterSuccess={onAuthSuccess}
    />
  );
};


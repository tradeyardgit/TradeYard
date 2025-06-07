import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

interface AuthHandlerProps {
  children: React.ReactNode;
}

const AuthHandler: React.FC<AuthHandlerProps> = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || (event === 'TOKEN_REFRESHED' && !session)) {
        // Clear any stale session data and redirect to login
        localStorage.removeItem('supabase.auth.token');
        navigate('/login');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return <>{children}</>;
};

export default AuthHandler;
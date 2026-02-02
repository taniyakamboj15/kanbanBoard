import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, loginAsGuest, logout, selectUser, selectIsAuthenticated } from '../store/reducers/authSlice';
import { AppDispatch } from '../store/store';
import { UI_TEXT } from '../constants';

export const useAuthManager = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      dispatch(login(formData));
      setIsLoginModalOpen(false);
      setFormData({ name: '', email: '' });
    }
  };

  const handleGuestLogin = () => {
    dispatch(loginAsGuest());
  };

  const handleLogout = () => {
    if (window.confirm(UI_TEXT.AUTH.LOGOUT_CONFIRM)) {
        dispatch(logout());
    }
  };

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);
  
  const updateFormData = (key: keyof typeof formData, value: string) => {
      setFormData(prev => ({ ...prev, [key]: value }));
  };

  return {
    user,
    isAuthenticated,
    isLoginModalOpen,
    formData,
    handleLogin,
    handleGuestLogin,
    handleLogout,
    openLoginModal,
    closeLoginModal,
    updateFormData,
  };
};

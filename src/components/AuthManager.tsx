import { createPortal } from 'react-dom';
import { useAuthManager } from '../hooks/useAuthManager';
import { Button } from './Button';
import { Input } from './Input';
import { UI_TEXT } from '../constants';
import { LogoutIcon } from '../assets/icons';

export const AuthManager = () => {
  const {
    user,
    isAuthenticated,
    isLoginModalOpen,
    formData,
    handleLogin,
    handleGuestLogin,
    handleLogout,
    openLoginModal,
    closeLoginModal,
    updateFormData
  } = useAuthManager();

  if (!isAuthenticated) {
    return (
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleGuestLogin}
        >
          {UI_TEXT.AUTH.GUEST_MODE}
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={openLoginModal}
        >
          {UI_TEXT.AUTH.LOGIN}
        </Button>

        {isLoginModalOpen && createPortal(
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-6 w-full max-w-md border border-gray-200 dark:border-slate-800 relative transform transition-all">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center tracking-tight">{UI_TEXT.AUTH.LOGIN}</h2>
              <form onSubmit={handleLogin} className="space-y-4">
                <Input
                  label={UI_TEXT.AUTH.NAME_LABEL}
                  value={formData.name}
                  onChange={(e) => updateFormData('name', e.target.value)}
                  placeholder={UI_TEXT.AUTH.NAME_PLACEHOLDER}
                  required
                />
                <Input
                  label={UI_TEXT.AUTH.EMAIL_LABEL}
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  placeholder={UI_TEXT.AUTH.EMAIL_PLACEHOLDER}
                  required
                />
                <div className="flex justify-end gap-2 pt-2">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={closeLoginModal}
                  >
                    {UI_TEXT.GLOBAL.CANCEL}
                  </Button>
                  <Button type="submit" variant="primary">
                    {UI_TEXT.AUTH.START_USING}
                  </Button>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex flex-col items-end">
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-200 leading-none">
          {user?.name}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400 leading-none mt-1">
          {user?.isGuest ? UI_TEXT.AUTH.GUEST_USER : user?.email}
        </span>
      </div>
      <Button
        variant="secondary"
        size="sm"
        onClick={handleLogout}
        className="text-gray-500 hover:text-red-500"
        title={UI_TEXT.AUTH.LOGOUT}
        aria-label={UI_TEXT.AUTH.LOGOUT}
      >
        <LogoutIcon className="w-5 h-5" />
      </Button>
    </div>
  );
};

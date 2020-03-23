
function useAuth() {
  return {
    isAuthenticated: document.cookie.includes('Token'),
  };
}

export default useAuth;

function useIsAuthenticated() {
  return document.cookie.includes('Token');
}

export default useIsAuthenticated;

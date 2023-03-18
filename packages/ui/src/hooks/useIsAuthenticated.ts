function useIsAuthenticated(): boolean {
  return document.cookie.includes("Token");
}

export default useIsAuthenticated;

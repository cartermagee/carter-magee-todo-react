import { useLocation } from 'react-router-dom';

export function GetTab() {
  const location = useLocation();
  function getCurrentTab() {
    if (location.pathname === '/') return 0;
    if (location.pathname === '/tags') return 1;
    if (location.pathname === '/colors') return 2;
    return 3;
  }
  return {
    currentTab: getCurrentTab(),
    location,
  };
}

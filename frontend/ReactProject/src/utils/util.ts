import { useLocation } from 'react-router-dom';
import { JwtPayload, jwtDecode } from 'jwt-decode';

interface DecodedToken extends JwtPayload {
  roles: string[];
}

export function doesURLHaveText(textToFind: string): boolean {
  const { pathname, search } = useLocation();
  const searchParams = new URLSearchParams(search);

  return textToFind?.includes(pathname) || textToFind?.includes(searchParams.get('text') as string);
}
export function isAdmin(): boolean {
  const userString = localStorage.getItem('user');

  if (userString) {
    try {
      const user = JSON.parse(userString);
      return user.roles?.includes('SYSADMIN');
    } catch (e) {
      console.error('Error parsing user from localStorage:', e);
      return false;
    }
  }

  return false;
}

export function isManager(): boolean {
  const userString = localStorage.getItem('user');
  
  if (userString) {
    try {
      const user = JSON.parse(userString);
      return user.roles?.includes('PROJECT MANAGER');
    } catch (e) {
      console.error('Error parsing user from localStorage:', e);
      return false;
    }
  }

  return false;
}

export function logout() {
  return localStorage.removeItem('token');
}
export function formatDate(dateString: any) {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
  return formattedDate;
}

export function getAccessToken() {
  return localStorage.getItem('token');
}

export function goBack() {
  return window.history.back();
}
  export function convertToSimpleDate(dateObj: Date): string {
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

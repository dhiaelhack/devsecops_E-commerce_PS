import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // ✅ On utilise la même clé que dans la Navbar : 'user'
  const userData = localStorage.getItem('user'); 

  if (userData) {
    const user = JSON.parse(userData);
    const token = user.token;

    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
  }
  return next(req);
};
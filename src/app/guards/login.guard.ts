import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage-service.service';
import { ToastrService } from 'ngx-toastr';

export const LoginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const toastrService = inject(ToastrService);
  const localStorageService = inject(LocalStorageService);
  if (localStorageService.getItem('token')) {
    return true;
  } else {
    toastrService.error('Yetki hatası', 'Bu alana gidemezsiniz!');
    router.navigate(['/login']); // Kullanıcıyı login sayfasına yönlendir
    return false;
  }
};

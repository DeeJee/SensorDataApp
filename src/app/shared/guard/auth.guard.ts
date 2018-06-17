import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, Router } from '@angular/router';
//import { Observable } from 'rxjs/Observable';

//import 'rxjs/add/operator/mapTo';
//import { UUID } from 'angular2-uuid';
//import { Observable } from 'rxjs/Observable';
import { AdalGuard } from 'adal-angular4/adal.guard';
import { AdalService } from 'adal-angular4/adal.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard extends AdalGuard {

  constructor( adalService: AdalService, private _router: Router) {
    super(adalService);
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let canActivate = super.canActivate(next, state);
    if(!canActivate){
      this._router.navigate(["/login"]);
    }
    return canActivate;
  }
}

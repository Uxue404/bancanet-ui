import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthRoleService {

  private role: string | null = null
  setRole(role: string){
    this.role = role
  }

  getRole():string |null{
    return this.role
  }
  constructor() { }
}

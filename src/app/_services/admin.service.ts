import { Comment } from '../_models/auth.interface';
import { Vacancie, BlackListItem } from '../_models/auth.interface';
import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { HttpService } from './http.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs';
import {Subject} from 'rxjs/Subject';
import { Employee, Company, Job } from '../_models/auth.interface';

@Injectable()
export class AdminService {

    constructor(private http: HttpService) {
    }

    ParamsToUrlSearchParams(params: any): string {
        const options = new URLSearchParams();
        // tslint:disable-next-line:forin
        for (const key in params) {
            const prop: any = params[key];
            if (prop) {
                if ( prop instanceof Array) {
                    for (const i in prop) {
                        if (prop[i]) {
                            options.append(key + '[]', prop[i]);
                        }
                    }
                } else {
                    options.set(key, params[key]);
                }
            }
        }
        return options.toString();
    }


    GetEmployeesList() {
        return this.http.CommonRequest(
            () => this.http.GetData('/admin_employees.json', '')
        );
    }
    ApproveEmployee(id: number) {
      return this.http.CommonRequest(
            () => this.http.PostData('/admin_employees/' + id + '/approve.json', JSON.stringify({}))
        );
    }
    DeleteEmployee(id: number) {
       return this.http.CommonRequest(
            () => this.http.PostData('/admin_employees/' + id + '/deny.json', JSON.stringify({}))
        );
    }


    GetBanList() {
        return this.http.CommonRequest(
            () => this.http.GetData('/admin_black_list.json', '')
        );
    }
    ApproveBan(id: number) {
      return this.http.CommonRequest(
            () => this.http.PostData('/admin_black_list/' + id + '/approve.json', JSON.stringify({}))
        );
    }
    DeleteBan(id: number) {
       return this.http.CommonRequest(
            () => this.http.PostData('/admin_black_list/' + id + '/deny.json', JSON.stringify({}))
        );
    }

    DeleteBanComment(id: number) {
       return this.http.CommonRequest(
            () => this.http.DeleteData('/admin_black_list_comments/' + id + '.json')
        );
    }

    DeleteEmployeeComment(id: number) {
       return this.http.CommonRequest(
            () => this.http.DeleteData('/admin_employee_comments/' + id + '.json')
        );
    }


}

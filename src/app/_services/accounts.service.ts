import { Vacancie, Comment } from './../_models/auth.interface';
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
export class AccountsService {

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

    CreateEmployee(employee: Employee) {
      return this.http.CommonRequest(
            () => this.http.PostData('/employees.json', JSON.stringify(employee))
        );
    }
    PatchEmployee(employee: Employee) {
      return this.http.CommonRequest(
            () => this.http.PatchData('/employees/' + employee.id + '.json', JSON.stringify(employee))
        );
    }
    GetEmployeeById(id: number) {
        return this.http.CommonRequest(
            () => this.http.GetData('/employees/' + id + '.json', '')
        );
    }
    AddJob(employee_id: number, job: Job) {
      return this.http.CommonRequest(
            () => this.http.PostData('/employees/' + employee_id + '/jobs.json', JSON.stringify(job))
        );
    }
    PatchJob(employee_id, job: Job) {
      return this.http.CommonRequest(
            () => this.http.PatchData('/employees/' + employee_id + '/jobs/' + job.id + '.json', JSON.stringify(job))
        );
    }

    CreateCompanies(company: Company) {
      return this.http.CommonRequest(
            () => this.http.PostData('/companies.json', JSON.stringify(company))
        );
    }
    PatchCompanies(company: Company) {
      return this.http.CommonRequest(
            () => this.http.PatchData('/companies/' + company.id + '.json', JSON.stringify(company))
        );
    }
    GetCompanyById(id: number) {
        return this.http.CommonRequest(
            () => this.http.GetData('/companies/' + id + '.json', '')
        );
    }


    GetEmployees(page: number, text?: string, experience?: number, position?: string) {
      const offset = (page - 1) * 10;
        return this.http.CommonRequest(
            () => this.http.GetData('/employees.json',
              this.ParamsToUrlSearchParams(
                {
                  limit: 10,
                  offset,
                  text: text ? text : '',
                  experience: experience ? experience : 0,
                  position: position ? position : ''
                }
              )
        ));
    }

    AddVacance(company_id: number, vacance: Vacancie) {
        return this.http.CommonRequest(
            () => this.http.PostData('/companies/' + company_id + '/vacancies.json', JSON.stringify(vacance))
        );
    }
    PatchVacance(company_id: number, vacance: Vacancie) {
        return this.http.CommonRequest(
            () => this.http.PatchData('/companies/' + company_id + '/vacancies/' + vacance.id + '.json', JSON.stringify(vacance))
        );
    }
    GetVacancies(page: number, text?: string) {
        const offset = (page - 1) * 10;
        return this.http.CommonRequest(
            () => this.http.GetData('/vacancies.json', this.ParamsToUrlSearchParams({limit: 10, offset, text: text ? text : ''}))
        );
    }
    GetVacanciesById(id: number) {
        return this.http.CommonRequest(
            () => this.http.GetData('/vacancies/' + id + '.json', '')
        );
    }

    ResponseVacancies(vacancy_id: number) {
        return this.http.CommonRequest(
            () => this.http.PostData('/vacancies/' + vacancy_id + '/vacancy_responses.json', '')
        );
    }

    GetResponseVacancies(vacancy_id: number) {
        return this.http.CommonRequest(
            () => this.http.GetData('/vacancies/' + vacancy_id + '/vacancy_responses.json', '')
        );
    }


    AddComment(id: number, comment: Comment) {
        return this.http.CommonRequest(
            () => this.http.PostData('/employees/' + id + '/employee_comments.json', JSON.stringify(comment))
        );
    }

    GetComments(id: number) {
        return this.http.CommonRequest(
            () => this.http.GetData('/employees/' + id + '/employee_comments.json', '')
        );
    }


    GetHomeVacanvies() {
      return this.http.CommonRequest(
            () => this.http.GetData('/vacancies/dashboard.json', '')
        );
    }
    GetHomeEmployees() {
      return this.http.CommonRequest(
            () => this.http.GetData('/employees/dashboard.json', '')
        );
    }


}

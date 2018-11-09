import { Vacancie } from './../_models/auth.interface';
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


    GetEmployees() {
        return this.http.CommonRequest(
            () => this.http.GetData('/employees.json', '')
        );
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
    GetVacancies() {
        return this.http.CommonRequest(
            () => this.http.GetData('/vacancies.json', '')
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


}

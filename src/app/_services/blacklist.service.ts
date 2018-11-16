import { Comment } from './../_models/auth.interface';
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
export class BlacklistService {

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

    CreateBlacklistItem(blacklist: BlackListItem) {
      return this.http.CommonRequest(
            () => this.http.PostData('/black_list.json', JSON.stringify(blacklist))
        );
    }

    GetBlacklistItem(page: number, text?: string) {
        const offset = (page - 1) * 10;
        return this.http.CommonRequest(
            () => this.http.GetData('/black_list.json', this.ParamsToUrlSearchParams({limit: 10, offset, text}))
        );
    }

    GetBlackListById(id: number) {
        return this.http.CommonRequest(
            () => this.http.GetData('/black_list/' + id + '.json', '')
        );
    }

    AddBlacklistCommentById(id: number, comment: Comment) {
        return this.http.CommonRequest(
            () => this.http.PostData('/black_list/' + id + '/black_list_comments.json', JSON.stringify(comment))
        );
    }

    GetBlacklistCommentById(id: number) {
        return this.http.CommonRequest(
            () => this.http.GetData('/black_list/' + id + '/black_list_comments.json', '')
        );
    }


}

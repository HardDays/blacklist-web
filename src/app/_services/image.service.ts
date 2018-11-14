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

@Injectable()
export class ImagesService {

    constructor(private http: HttpService) {
    }

    AddImage(user_id: number, base64: string) {
      return this.http.CommonRequest(
            () => this.http.PostData('/images.json', JSON.stringify({user_id, base64}))
        );
    }

    GetImage(id: number) {
      return this.http.GetQueryStr('/images/' + id + '.json', '');
      // return this.http.CommonRequest(
      //       () => this.http.GetData('/images/' + id + '.json', '')
      //   );
    }

    CheckImage(id: number) {
      return this.http.CommonRequest(
            () => this.http.GetData('/images/' + id + '.json', '')
        );
    }


}

import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Router, NavigationStart, NavigationEnd, NavigationError, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Observable, Subscribable } from 'rxjs/Observable';

import { GUID } from '../_models/guide.model';
import { AuthMainService } from './auth.service';
import { UserModel } from '../_models/auth.interface';
import { ImagesService } from './image.service';
import { AccountsService } from './accounts.service';

declare var $: any;

@Injectable()
export class MainService {

    public ActiveProcesses: string[] = [];
    public ActiveProcessesChanges: Subject<string[]>;

    constructor
    (
        private http: HttpService,
        private router: Router,
        public authService: AuthMainService,
        public imageService: ImagesService,
        public accService: AccountsService
    ) {

        this.authService.onAuthChange$
            .subscribe(
                (res: boolean) => {
                    if (res) {
                    } else {
                    }
                }
            );



        this.ActiveProcessesChanges = new Subject();
        this.ActiveProcessesChanges.next([]);
        this.ActiveProcessesChanges
            .subscribe(
                (val: string[]) => {
                }
            );
    }


    public WaitBeforeLoading = (fun: () => Observable<any>, success: (result?: any) => void, err?: (obj?: any) => void) => {
        const process = this.GenerateProcessID();
        fun()
            .subscribe(
                res => {
                    success(res);
                    this.DeleteProcess(process);
                },
                error => {

                    this.DeleteProcess(process);
                    if (err && typeof err === 'function') {
                        err(error);
                    }
                }
            );
    }

    private GenerateProcessID() {
        const id: string = GUID.GetNewGUID();
        this.ActiveProcesses.push(id);
        this.ActiveProcessesChanges.next(this.ActiveProcesses);
        return id;
    }

    private DeleteProcess(str: string) {
        const index = this.ActiveProcesses.findIndex(x => x === str);
        if (index !== -1) {
            this.ActiveProcesses.splice(index, 1);
        }
        this.ActiveProcessesChanges.next(this.ActiveProcesses);
    }

}

import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Router, NavigationStart, NavigationEnd, NavigationError, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Observable, Subscribable } from 'rxjs/Observable';

import { GUID } from '../_models/guide.model';
import { AuthMainService } from './auth.service';
import { UserModel } from '../_models/auth.interface';

declare var $: any;

@Injectable()
export class MainService {

    public MyUser: UserModel;
    public UserChange: Subject<UserModel>;

    public ActiveProcesses: string[] = [];
    public ActiveProcessesChanges: Subject<string[]>;

    constructor
    (
        private http: HttpService,
        private router: Router,
        public authService: AuthMainService
    ) {

        this.UserChange = new Subject();
        this.UserChange.next();


        this.authService.onAuthChange$
            .subscribe(
                (res: boolean) => {
                    if (res) {
                        this.GetMyUser();
                    } else {
                        this.UserChange.next();
                        this.router.navigate(['/system', 'tickets']);
                    }
                }
            );

        // this.settings.SettingsChange.subscribe(
        //     (res) => {
        //         console.log('settings', this.settings.GetSettings());
        //     }
        // );

        this.UserChange.subscribe(
            (val: UserModel) => {
                this.MyUser = val;
                // this.SetCurrentAccId(val.id? val.id : 0);
                // this.GetMyLogo();
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


    public GetCurrentAccId() {
        if (localStorage.getItem('activeUserId')) {
            return localStorage.getItem('activeUserId');
        }
        return null;
    }

    public SetCurrentAccId(id: number) {
        localStorage.setItem('activeUserId', id.toString());
    }

    public GetMyUser() {
        this.WaitBeforeLoading(
            () => this.authService.GetMe(),
            (res) => {
                this.MyUser = res;
                // if(this.MyUser.image_id){
                //     this.imagesService.GetImageById(this.MyUser.image_id)
                //         .subscribe((res)=>{
                //             this.MyUser.image_base64 = res.base64;
                //             this.MyUserLogo = this.MyUser.image_base64;
                //             this.MyUserLogoChange.next(this.MyUser.image_base64);
                //         })
                // }

                // if(this.MyUser)
                // {
                //         this.CurrentAccount = this.MyAccounts.find((acc) => acc.id === accId);

                // }
                this.UserChange.next(this.MyUser);
                // this.UserChange.next(this.MyAccounts);
            },
            (err) => {
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

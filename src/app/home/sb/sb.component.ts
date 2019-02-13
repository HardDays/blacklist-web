import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/_services/main.service';
import { saveAs} from 'file-saver';

declare const Buffer;

@Component({
  selector: 'app-sb',
  templateUrl: './sb.component.html',
  styleUrls: ['./sb.component.css']
})
export class SbComponent implements OnInit {

  IsAdmin = false;
  File = '';
  TemplateFile = '';

  constructor(protected service: MainService) { }

  ngOnInit() {
    if (this.service.authService.me) {
      this.IsAdmin = this.service.authService.me.is_admin;
    }
    this.service.authService.onMeChange$.subscribe(
      res => {
       this.IsAdmin = this.service.authService.me.is_admin;
      }
    );
  }

  DownloadTemplate() {
    this.service.blacklistService.GetSecurityFileTemplate()
      .subscribe(
        (res) => {
          console.log(res);
          if (res) {
              // const jsonBlob = new Blob([res], { type: 'application/javascript;charset=utf-8' });
              // saveAs(jsonBlob, 'D4W Users (' + new Date().toDateString() + ' ' + new Date().getTime() + ').json');

              this.downloadFile(res);

            }

        }
      );
  }

  downloadFile(data) {
    if (data._body) {
        let type = data._body.split(';base64,')[0].split('/')[1];
        const file = data._body.split(';base64,')[1];

        const decoded = new Buffer(file, 'base64');
        const blob = new Blob([decoded], { type: type });
        if (type === 'plain') {
          type = 'txt';
        } else if (type === 'vnd.openxmlformats-officedocument.wordprocessingml.document') {
          type = 'docx';
        }

        saveAs(blob, 'BL Template.' + type);
    }
  }

  loadFile($event: any) {
    const target = $event.target;
    const file: File = target.files[0];

    if (file.size <= 2e7) {
      this.getBase64(file);
    } else {
      this.File = '';
    }
  }

  getBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      this.File = reader.result + '';
    };
    reader.onerror = function (error) {
      console.log(`ERROR`);
    };
  }

  getBase64Template(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      this.TemplateFile = reader.result + '';
    };
    reader.onerror = function (error) {
      console.log(`ERROR`);
    };
  }

  sendFile() {
    this.service.blacklistService.AddSecurityRequest(this.service.authService.me.id, this.File)
      .subscribe(
        (res) => {
          console.log(`success`);
        }
      );
  }


  loadTemplateFile($event: any) {
    const target = $event.target;
    const file: File = target.files[0];

    if (file.size <= 2e7) {
      this.getBase64Template(file);
    } else {
      this.TemplateFile = '';
    }
  }


  sendTemplateFile() {
    this.service.blacklistService.AddSecurityFileTemplate(this.TemplateFile)
      .subscribe(
        (res) => {
          console.log(`success`);
        }
      );
  }

  getAdminRequests() {
    this.service.blacklistService.GetSecurityRequestsByAdmin()
      .subscribe(
        (res) => {
          console.log(`res = `, res);
        }
      );
  }

}

import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { range } from 'rxjs';

@Component({
  selector: 'app-pagination',
  templateUrl: './ui-pagination.component.html',
  styleUrls: ['./ui-pagination.component.scss']
})
export class UiPaginationComponent implements OnInit, OnChanges {

    @Input() allElements = 120;
  countElements = 0; // последний элемент пагинации
  @Input() selectedNumber = 3; // текущий выбранный жлемент
  @Input() countShows = 5; // сколько элементов показывать

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onChangeSelected = new EventEmitter<number>();

  rangeLeft = [];
  rangeCenter = [];
  rangeRight = [];

  constructor() { }

  ngOnInit() {
    this.countElements = Math.floor(this.allElements / 10);
    this.getRanges();
  }

  // перестроение пагинатора после загрузки страницы
  ngOnChanges() {
    this.countElements = Math.floor(this.allElements / 10);
    this.selectNumber(this.selectedNumber);
  }

  getRanges() {
    this.rangeLeft = [];
    this.rangeCenter = [];
    this.rangeRight = [];

    const countOffset = Math.ceil(this.countShows / 2);

    if (this.countElements > this.countShows) {
      for (let i = 1; i <= this.countElements; ++i) {
        if (Math.abs(i - this.selectedNumber) < countOffset) {
           this.rangeCenter.push(i);
        } else if (i === 1 && i < this.selectedNumber) {
          if (i + 1 <= this.countElements && Math.abs(i + 1 - this.selectedNumber) < countOffset) {
            this.rangeCenter.push(i);
          } else {
            this.rangeLeft.push(i);
          }
        } else if (i === this.countElements && i > this.selectedNumber) {
          if (i - 1 <= this.countElements && Math.abs(i - 1 - this.selectedNumber) < countOffset) {
            this.rangeCenter.push(i);
          } else {
            this.rangeRight.push(i);
          }
        }
      }
    } else {
      for (let i = 1; i <= this.countElements; ++i) {
        this.rangeCenter.push(i);
      }
    }
  }

  selectNumber(num: number) {
    this.selectedNumber = num;
    this.getRanges();
    this.onChangeSelected.emit(num);
  }

}

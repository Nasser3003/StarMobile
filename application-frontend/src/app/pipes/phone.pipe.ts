import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone',
  standalone: true
})
export class PhonePipe implements PipeTransform {

  transform(rawNum: string): string {
    let formattedNum: string = '';
    let areaCode: string = rawNum.slice(0,3);
    let prefix: string = rawNum.slice(3,6);
    let lineNum: string = rawNum.slice(6,10);
    let hyphen: string = '-';

    formattedNum = areaCode + hyphen + prefix + hyphen + lineNum;

    return formattedNum;
  }

}

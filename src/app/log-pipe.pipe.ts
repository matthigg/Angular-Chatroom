import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'logPipe'
})
export class LogPipePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    console.log(value);
    return null;
  }

}

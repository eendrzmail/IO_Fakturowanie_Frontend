import { Pipe, PipeTransform } from '@angular/core';
import { Kontrahent } from '../dataModels/kontrahent';

@Pipe({
  name: 'kontrahentToString'
})
export class KontrahentToStringPipe implements PipeTransform {

  transform(value: Kontrahent, ...args: Kontrahent[]): String {
    return value.nazwa;
  }

}

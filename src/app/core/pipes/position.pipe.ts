import { Pipe, PipeTransform } from '@angular/core';
import {positions} from "../dictionaries";

@Pipe({
  name: 'position'
})
export class PositionPipe implements PipeTransform {

  positions = positions;

  transform(value: number): unknown {
    const pos = positions.find(f => f.id === value);
    return pos ? pos.name : 'N/A';
  }

}

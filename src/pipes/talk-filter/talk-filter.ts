import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'talkFilter',
})
export class TalkFilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter( it => {
      return it.title.toLowerCase().includes(searchText);
    });
  }
}


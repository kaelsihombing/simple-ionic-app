import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
// import { SearchService, SearchType } from 'src/app/pages/search/search.service'

import { SearchService } from 'src/app/pages/search/search.service'

@Component({
   selector: 'app-search',
   templateUrl: './search.page.html',
   styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
   results: Observable<any>;
   searchTerm: '';
   // type: SearchType = SearchType.all;

   constructor(private searchService: SearchService) { }

   ngOnInit() {
   }

   // searchChanged() {
   //    this.results = this.searchService.searchData(this.searchTerm, this.type);
   //    console.log('My Result: ', this.results);
   // }

   searchChanged() {
      this.results = this.searchService.searchDatas(this.searchTerm);
      console.log('My Result: ', this.results);
   }
}

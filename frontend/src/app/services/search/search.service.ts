import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchQuery = new BehaviorSubject<string>('');

  setSearchQuery(query: string) {
    this.searchQuery.next(query);
  }

  getSearchQuery(): Observable<string> {
    return this.searchQuery.asObservable();
  }
}

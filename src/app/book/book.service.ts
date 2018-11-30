import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Book } from './book';
import { HttpClient } from '@angular/common/http';
import { isPlatformServer } from '@angular/common';

@Injectable()
export class BookService {
  private static BOOK_URI = 'api/book';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId,
  ) {}

  findAll(): Observable<Book> {
    const hostName = isPlatformServer(this.platformId)
      ? 'http://localhost:9000/'
      : '';

    return this.http.get<Book>(hostName + BookService.BOOK_URI);
  }
}

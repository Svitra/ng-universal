import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { BookService } from '../book.service';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { Book } from '../book';
import { of as observableOf } from 'rxjs/observable/of';
import { tap } from 'rxjs/operators';
import { isPlatformServer } from '@angular/common';

@Component({
  selector: 'app-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss'],
})
export class BookOverviewComponent implements OnInit {
  books$;

  constructor(
    private book: BookService,
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private platformId,
  ) {}

  ngOnInit() {
    const BOOKS_KEY = makeStateKey<Book[]>('books');

    if (this.transferState.hasKey(BOOKS_KEY)) {
      const books = this.transferState.get<Book[]>(BOOKS_KEY, []);
      this.transferState.remove(BOOKS_KEY);
      this.books$ = observableOf(books);
    } else {
      this.books$ = this.book.findAll().pipe(
        tap(books => {
          if (isPlatformServer(this.platformId)) {
            this.transferState.set(BOOKS_KEY, books);
          }
        }),
      );
    }
  }
}

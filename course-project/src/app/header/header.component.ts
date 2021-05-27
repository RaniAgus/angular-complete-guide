import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { DataStorageService } from '../shared/data-storage.service';

@Component
(
  { selector: 'app-header'
  , templateUrl: './header.component.html'
  , styleUrls: ['header.component.css']
  }
)
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private destroy$: Subject<boolean> = new Subject();

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService
    ) {}

  ngOnInit() {
    this.authService.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user: User) => {
        this.isAuthenticated = !!user;
      })  
    ;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }
}
import { NgModule } from '@angular/core';
import { HeroListComponent } from './hero-list/hero-list.component';
import { HeroService } from './services/hero.service';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [HeroListComponent],
  imports: [
    FormsModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
  ],
  providers: [HeroService],
  bootstrap: [],
})
export class HeroModule {}

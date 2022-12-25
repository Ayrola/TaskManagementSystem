import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero.model';
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss'],
})
export class HeroListComponent implements OnInit {
  public heroes: any;
  public heroDialog: boolean = false;
  public hero : Hero = {} as Hero;

  constructor(private heroService: HeroService) {}

  loadHeroes()
  {
    this.heroService.getAllHeroes().subscribe({
      next: (heroes: any) => {
        let parsedHeroes = heroes.map((h: any) => {
          return { ...h, powers: h.powers.map((s: any) => s.name)}
        })
        this.heroes = parsedHeroes;
      },
      error: (err) => {},
    });
  }

  ngOnInit() {
    this.loadHeroes();
  }

  

  showDialog()
  {
    this.heroDialog = true;
  }

  createHero()
  {
    this.heroService.createHero(this.hero).subscribe({
      next: (hero) =>
      {
        this.hero = {} as Hero;
        this.heroDialog = false;
        this.loadHeroes();
      },
      error: (err) =>
      {
        console.log(err);
      },
    });
    this.heroDialog = false;
  }
}

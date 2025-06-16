import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { Router,RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink,NgClass],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {
     constructor(private router: Router) {}
      isNotHomePage(): boolean {
      return this.router.url !== '/';
    }

    getNavClass(): string {
    if (this.isNotHomePage()) {
      return 'app-footer';
    } else {
      return 'home-class';
    }
  }
}

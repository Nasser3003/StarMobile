import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { MainContentComponent } from './main-content/main-content.component';
import { FooterBarComponent } from './footer-bar/footer-bar.component';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, MenuBarComponent, MainContentComponent, FooterBarComponent, HeaderComponent, FooterComponent]
})
export class AppComponent {
  title = 'angular';
}

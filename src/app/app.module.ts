import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RecipeService } from './recipe.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TruncateTextPipe } from './truncateText.pipe'

@NgModule({
  declarations: [
    AppComponent,
    TruncateTextPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule, FormsModule
  ],
  providers: [RecipeService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe';
import { Comment } from './comment';
import { RecipeService } from './recipe.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cookbookGUI';
  public recipes: Recipe[];
  public editRecipe: Recipe;
  public deleteRecipe:Recipe;
  public showMoreRecipe: Recipe;
  public showMoreComments: Comment[];

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.getRecipes();
  }

  public getRecipes(): void {
    this.recipeService.getRecipes().subscribe(
      (response: Recipe[]) => {
        this.recipes = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

  }

  public onAddRecipe(addForm: NgForm): void {
    document.getElementById("add-recipe-form").click();
    this.recipeService.addRecipe(addForm.value).subscribe(
      (response: Recipe) => {
        console.log(response);
        this.getRecipes();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onUpdateRecipe(recipe: Recipe): void {
    this.recipeService.updateRecipe(recipe).subscribe(
      (response: Recipe) => {
        console.log(response);
        this.getRecipes();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteRecipe(recipeId: number): void {
    this.recipeService.deleteRecipe(recipeId).subscribe(
      (response: void) => {
        console.log(response);
        this.getRecipes();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  public onOpenModal(recipe: Recipe, mode: string): void {
    const container = document.getElementById('main-container')
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'showMore') {
      this.showMoreRecipe = recipe;
      this.showMoreComments = recipe.comments;
      button.setAttribute('data-target', '#showMoreRecipeModal');
    }
    if (mode === 'edit') {
      this.editRecipe = recipe;
      button.setAttribute('data-target', '#updateRecipeModal');
    }
    if (mode === 'delete') {
      button.setAttribute('data-target', '#deleteRecipeModal');
      this.deleteRecipe = recipe;
    }

    container.appendChild(button);
    button.click();
  }

  public rateRecipe(recipeId: number, rating: number):(void){
    this.recipeService.rateRecipe(recipeId, rating).subscribe(
      (response: any) => {
        console.log(response);
        this.getRecipes();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}

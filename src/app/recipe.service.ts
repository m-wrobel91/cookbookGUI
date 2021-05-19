import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from './recipe';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getRecipes(): Observable<Recipe[]>{
    return this.http.get<Recipe[]>(`${this.apiServerUrl}/recipe/all`);
  }

  public addRecipe(recipe: Recipe): Observable<Recipe>{
    return this.http.post<Recipe>(`${this.apiServerUrl}/recipe/add`, recipe);
  }

  public updateRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.put<Recipe>(`${this.apiServerUrl}/recipe/update`, recipe);
  }

  public deleteRecipe(recipeId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/recipe/delete/${recipeId}`);
  }

  public rateRecipe(recipeId: number, rating: number): Observable<Vote> {
    const headers = { 'content-type': 'application/json'}  
    var vote = new Vote();
    vote.id = recipeId;
    vote.rating = rating;
    console.log(vote);
    //const body = JSON.stringify(vote);
    //console.log(body);
    //var body =JSON.stringify({ id : recipeId, rating : rating});
    //JSON.stringify(result);
    return this.http.put<Vote>(`${this.apiServerUrl}/recipe/rate`, vote);
  }
}

class Vote{
  id: number;
  rating: number;
}

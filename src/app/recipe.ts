import { Comment } from './comment';
export interface Recipe{
    id: number;
    title: string;
    preparationTimeInMinutes: number;
    cookingTimeInMinutes: number;
    content: string;
    rating: number;
    noOfVotes:number;
    imageUrl: string;
    author: string;
    comments: Comment[]
    //private LocalDateTime timestamp;

}
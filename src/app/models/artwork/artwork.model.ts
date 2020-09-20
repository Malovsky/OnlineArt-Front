import { NumberValueAccessor } from '@angular/forms';
import { User } from '../user/user.model';

export class Artwork {
    public id: string;
    public name: string;
    public price: number;
    public availability: number;
    public description: string;
    public photoArtwork: string;
    public user: User;
    public category: string;
    public subcategory: string;
    public majorColor: string;
    public isSigned: boolean;
    public hasFrame: boolean;
    public size: string;
}

export class CreateArtWorkDto {
    public userId: string;
    public name: string;
    public price: number;
    public availability: number;
    public description: string;
    public user: User;
    public category: string;
    public subcategory: string;
    public majorColor: string;
    public isSigned: boolean;
    public hasFrame: boolean;
    public size: string;
}

export class ArtworkPanierDto {
    public id: string;
    public quantity: number;
}
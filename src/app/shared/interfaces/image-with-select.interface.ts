import { AppImage } from './app-image.interface';

export interface ImageWithSelect<T extends AppImage>{
    image: T;
    selected: boolean;
}
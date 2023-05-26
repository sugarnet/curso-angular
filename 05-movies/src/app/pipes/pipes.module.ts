import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagePipe } from './image.pipe';
import { PairsPipe } from './pairs.pipe';
import { MovieImageFilterPipe } from './movie-image-filter.pipe';



@NgModule({
  declarations: [ImagePipe, PairsPipe, MovieImageFilterPipe],
  imports: [
    CommonModule
  ],
  exports: [ImagePipe, PairsPipe, MovieImageFilterPipe]
})
export class PipesModule { }

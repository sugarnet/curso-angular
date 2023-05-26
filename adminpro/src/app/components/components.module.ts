import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';

import { PipesModule } from '../pipes/pipes.module';

import { GraficoDonaComponent } from './grafico-dona/grafico-dona.component';
import { IncrementadorComponent } from './incrementador/incrementador.component';

@NgModule({
    declarations: [
        GraficoDonaComponent,
        IncrementadorComponent
    ],
    exports: [
        IncrementadorComponent,
        GraficoDonaComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ChartsModule,
        PipesModule
    ]
})
export class ComponentsModule {}
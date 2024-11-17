import { Routes } from '@angular/router'
import { HospitalComponent } from '../../intermedias2/hospital/hospital.component';
import { MedicoComponent } from 'src/app/intermedias2/medico/medico.component';
import { IncrementadorComponent } from '../../intermedias2/incrementador/incrementador.component';

export const ROUTES: Routes = [
    { path: 'hospital', component: HospitalComponent },
    { path: 'medico/:id', component: MedicoComponent },
    { path: '**', component: IncrementadorComponent }
];
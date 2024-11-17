import { MedicoComponent } from "./medico.component";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MedicoService } from './medico.service';


describe('Médico component', () => {
    let component: MedicoComponent;
    let fixture: ComponentFixture<MedicoComponent>;

    beforeEach( () => {
        TestBed.configureTestingModule({
            declarations: [ MedicoComponent ],
            providers: [ MedicoService ],
            imports: [ HttpClientModule ]
        });

        fixture = TestBed.createComponent(MedicoComponent);
        component = fixture.componentInstance;
    } );

    it('El componente debe crearse', () => {
        expect(component).toBeTruthy();
    });

    it('Debe retornar el nombre del médico', () => {
        const nombre = 'Juan';
        const resp = component.saludarMedico(nombre);

        expect(resp).toContain(nombre);
    });
});
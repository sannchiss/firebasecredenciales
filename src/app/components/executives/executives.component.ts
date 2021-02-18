import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**Importa modulo de ventana modal bootstrap */
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

/**Agregando el servicio Firebase */
import { ExecutiveFirebaseService } from '../../services/executive/executive-firebase.service';

/**
 * Agregando el modelo a la logica
 */
import { ExecutiveModel } from '../../models/executive/executive-model';

@Component({
  selector: 'app-executives',
  templateUrl: './executives.component.html',
  styleUrls: ['./executives.component.css'],
  providers: [NgbModal, NgbModalConfig],
})
export class ExecutivesComponent implements OnInit {
  config: any;

  executivesCollection: Array<ExecutiveModel> = [];

  //Declaro el tipo de formulario:FormGroup
  excutiveForm!: FormGroup;

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private firebaseServiceExecutives: ExecutiveFirebaseService
  ) {
    // personalizar los valores predeterminados de los modales utilizados por este árbol de componentes
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    console.log('Iniciando Ejecutivos');

    this.excutiveForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['none@none.com', Validators.required],
    });

    this.config = {
      itemsPerPage: 10,
      currentPage:1,
      totalItems: this.executivesCollection.length,
    }

    /**Mapear resultados/ Obtencion de datos de Firebase tabla Executives
     *
     */
    this.firebaseServiceExecutives.getExecutive().subscribe(
      (resp)=>{
        this.executivesCollection = resp.map((e:any)=>{
          return {
            id:   e.payload.doc.data().id,
            name : e.payload.doc.data().name,
            phone: e.payload.doc.data().phone,
            email: e.payload.doc.data().email
          }
        });

      }
    );


  }

  saveExecutive(): void {
    this.firebaseServiceExecutives
      .createExecutive(this.excutiveForm.value)
      .then((resp) => {
        /**
         * reset()->Limpia el formulario
         * dimissAll()->Cierra ventana modal despues de guardar
         */
        this.excutiveForm.reset;
        this.modalService.dismissAll();
      })
      .catch((error) => {
        console.log('Error: ' + error);
      });
  }

  /**Metodo Abrir ventana modal */
  open(content: any): void {
    this.modalService.open(content);
  }
}

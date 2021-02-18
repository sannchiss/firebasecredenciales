import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

/**Importa modulo de ventana modal bootstrap */
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserModel } from 'src/app/models/user/user-model';

//Agregando el servicio Firebase
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class UsersComponent implements OnInit {
  config: any;
  userCollection: Array<UserModel> = [];
  collection = {
    count: 0,
    data: Array<{
      id: number;
      name: string;
      usuario: string;
      contrasena: string;
      email: string;
    }>(),
  };

  page: number | undefined;

  userForm!: FormGroup;

  /**
   * Variable ubicar el indice en el update
   */
  idFirebaseupdate!: string;

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private firebaseService: FirebaseService
  ) {
    // personalizar los valores predeterminados de los modales utilizados por este árbol de componentes
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    //Inicializar variable
    this.idFirebaseupdate = '';
    // Se agrega el siguiente código para inicializar los datos dentro de la tabla a mostrar
    // itemPerPage: muestre 5 items por pagina
    // currentPage: la tabla comience en el item 1
    this.config = {
      itemPerPage: 10,
      currentPage: 1,
      totalItems: this.collection.data.length,
    };

    this.userForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required],
      email: ['sannchiss@gmail.com', Validators.required],
    });

    /**
     * Metodo Para Obtener los usuarios de Firebase con el metodo getUser()
     */

    /** */
    this.firebaseService.getUser().subscribe(
    (resp) => {

     this.userCollection = resp.map((e:any) => {
        return {
          id: e.payload.doc.data().id,
          name: e.payload.doc.data().name,
          usuario: e.payload.doc.data().usuario,
          contrasena: e.payload.doc.data().contrasena,
          email: e.payload.doc.data().email,
          idFirebase: e.payload.doc.id, //Obtengo el id collection de Firebase
        }
      });
      console.log(this.userCollection);


    },
    (error) => {
      console.error(error);

    }


    );




    /** */

   /* this.firebaseService.getUser().subscribe(
      (resp) => {
        //Se actualiza y Recibe los datos de firebase con el metodo pero vienen de manera distinta
        this.collection.data = resp.map((e: any) => {
          return {
            id: e.payload.doc.data().id,
            name: e.payload.doc.data().name,
            usuario: e.payload.doc.data().usuario,
            contrasena: e.payload.doc.data().contrasena,
            email: e.payload.doc.data().email,
            idFirebase: e.payload.doc.id, //Obtengo el id collection de Firebase
          }
        });
        console.log(this.collection.data);
      },
      (error) => {
        console.log(
          'Error de comunicación con Firebase, no se obtuvo el objeto: ' + error
        );
        console.error(error);
      }
    );*/

    /**-------------------Data de Prueba--------------------------- */
    for (let index = 0; index < 10; index++) {
      this.collection.data.push({
        id: index,
        name: 'nameTest' + index,
        usuario: 'usuario' + index,
        contrasena: 'contraseña' + index,
        email: 'email' + index,
      });
    }
    //console.log(this.collection.data);
  } //Fin de ngOnInit

  //Metodo Paginacion en tabla
  pageChanged(event: any) {
    this.config.currentPage = event;
  }

  //Metodo Guardar Usuario en el objeto Collection
  saveUser(): void {
    this.firebaseService
      .createUser(this.userForm.value)
      .then((resp) => {
        /**
         * reset()->Limpia el formulario
         * dimissAll()->Cierra ventana modal despues de guardar
         */
        this.userForm.reset();
        this.modalService.dismissAll();
      })
      .catch((error) => {
        console.log(
          'Error de comunicación con Firebase, no se guardó  el objeto: ' +
            error
        );
      });

    this.collection.data.push(this.userForm.value);

    console.log('Guardado');
  }

  /**Metodo de actulizar el usuario,
   * el cual es invocado desde el boton */
  /**
   * this.userForm.vale: se evalua el contenido del objeto
   */
  ModifUser() {
    if (this.idFirebaseupdate !== null) {
      this.firebaseService
        .updateUser(this.idFirebaseupdate, this.userForm.value)
        .then((resp) => {})
        .catch((error) => {
          console.error(error);
        });
    }
  }

  /** Se actualiza el userForm */
  updateUser(content: any, item: any): void {
    this.userForm.setValue({
      id: item.id,
      name: item.name,
      usuario: item.usuario,
      contrasena: item.contrasena,
      email: item.email,
    });
    this.idFirebaseupdate = item.idFirebase;
    this.modalService.open(content);
  }

  //Recibe como parametro el item de tipo any: puede recibir cualquier cosa, en pocas palabras
  //el compilador me permite hacer cualquier cosa con la variable item
  deleteUser(item: any): void {
    this.firebaseService.deleteUser(item.idFirebase);
    // this.collection.data.pop(item);
    console.log(item.idFirebase);
  }

  /**Metodo Ventana Modal */
  open(content: any) {
    this.modalService.open(content);
  }
}

Vue.component('component-materias',{
    data() {
        return {
            accion:'nuevo',
            buscar: '',
            materias: [],
            materia:{
                idMateria : '',
                codigo : '',
                nombre : '',
            }
        }
    },
    methods:{
        guardarDocente(){
            this.listar();
            if(this.accion==='nuevo'){
                this.materia.idMateria = new Date().getTime().toString(16);
                this.materias.push( JSON.parse( JSON.stringify(this.materia) ) );
            }else if(this.accion==='modificar'){
                let index = this.materias.findIndex(materia=>materia.idMateria==this.materia.idMateria);
                this.materias[index] = JSON.parse( JSON.stringify(this.materia) );
            }else if(this.accion==='borrar'){
                let index = this.materias.findIndex(materia=>materia.idMateria==this.materia.idMateria);
                this.materias.splice(index,1);
            }
            localStorage.setItem("materias", JSON.stringify(this.materias) );
            this.nuevoDocente();
        },
        borrarDocente(materia){
            if( confirm(`Quieres Borrar a ${materia.nombre}?`) ){
                this.accion='borrar';
                this.materia=materia;
                this.guardarDocente();
            }
        },
        nuevoDocente(){
            this.accion = 'nuevo';
            this.materia.idMateria = '';
            this.materia.codigo = '';
            this.materia.nombre = '';
        },
        modificarDocente(materia){
            this.accion = 'modificar';
            this.materia = materia;
        },
        listar(){
            this.materias = JSON.parse( localStorage.getItem('materias') || "[]" )
                .filter(materia=>materia.nombre.toLowerCase().indexOf(this.buscar.toLowerCase())>-1);
        }
    },
    template: `
    <div class="row">
        <div class="col-12 col-md-9">
            <div class="card">
                <div  style="font-weight: 700;"class="card-header">Registro materias</div>
                <div class="card-body">
                    <form id="frmDocente" @reset.prevent="nuevoDocente" v-on:submit.prevent="guardarDocente">
                        <div class="row p-1">
                            <div class="col-3 col-md-5">
                                <label  style="font-weight: 700;" for="txtCodigoDocente">Codigo:</label>
                            </div>
                            <div class="col-4 col-md-5">
                                <input required pattern="[0-9]{3}" 
                                    title="Ingrese un codigo de Docente de 3 digitos"
                                        v-model="materia.codigo" type="text" class="form-control" name="txtCodigoDocente" id="txtCodigoDocente">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col-3 col-md-5">
                                <label  style="font-weight: 700;" for="txtNombreDocente">Nombre:</label>
                            </div>
                            <div class="col-4 col-md-5">
                                <input required pattern="[A-Za-zÑñáéíóú ]{3,75}"
                                    v-model="materia.nombre" type="text" class="form-control" name="txtNombreDocente" id="txtNombreDocente">
                            </div>
                        </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-5">
                                    <input class="btn btn-primary" type="submit" 
                                        value="Guardar">
                                </div>
                                <div class="col-3 col-md-2">
                                    <input class="btn btn-warning" type="reset" value="Nuevo">
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div  class="col-12 col-md-12">
                <div  class="target">
                    <div  style="font-weight: 700;" class="card-header">materias Registrados</div>
                    <div class="card-body">
                        <table class="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>Buscar:</th>
                                    <th colspan="8"><input type="text" class="form-control" v-model="buscar"
                                        @keyup="listar()"
                                        placeholder="Buscar por codigo o nombre"></th>
                                </tr>
                                <tr>
                                    <th>Codigo</th>
                                    <th>Nombre</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr  style="font-weight: 700;" v-for="materia in materias" :key="materia.idMateria" @click="modificarDocente(materia)" >
                                    <td>{{ materia.codigo }}</td>
                                    <td>{{ materia.nombre }}</td>
                                    <td><button class="btn btn-danger" @click="borrarDocente(materia)">Borrar</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>   
    `
});
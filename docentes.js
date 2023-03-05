Vue.component('component-docentes',{
    data() {
        return {
            accion:'nuevo',
            buscar: '',
            docentes: [],
            docente:{
                idDocente : '',
                codigo : '',
                nombre : '',
            }
        }
    },
    methods:{
        guardarDocente(){
            this.listar();
            if(this.accion==='nuevo'){
                this.docente.idDocente = new Date().getTime().toString(16);
                this.docentes.push( JSON.parse( JSON.stringify(this.docente) ) );
            }else if(this.accion==='modificar'){
                let index = this.docentes.findIndex(docente=>docente.idDocente==this.docente.idDocente);
                this.docentes[index] = JSON.parse( JSON.stringify(this.docente) );
            }else if(this.accion==='borrar'){
                let index = this.docentes.findIndex(docente=>docente.idDocente==this.docente.idDocente);
                this.docentes.splice(index,1);
            }
            localStorage.setItem("docentes", JSON.stringify(this.docentes) );
            this.nuevoDocente();
        },
        borrarDocente(docente){
            if( confirm(`Quieres Borrar a ${docente.nombre}?`) ){
                this.accion='borrar';
                this.docente=docente;
                this.guardarDocente();
            }
        },
        nuevoDocente(){
            this.accion = 'nuevo';
            this.docente.idDocente = '';
            this.docente.codigo = '';
            this.docente.nombre = '';
        },
        modificarDocente(docente){
            this.accion = 'modificar';
            this.docente = docente;
        },
        listar(){
            this.docentes = JSON.parse( localStorage.getItem('docentes') || "[]" )
                .filter(docente=>docente.nombre.toLowerCase().indexOf(this.buscar.toLowerCase())>-1);
        }
    },
    template: `
    <div class="row">
        <div class="col-12 col-md-9">
            <div class="card">
                <div  style="font-weight: 700;"class="card-header">Registro docentes</div>
                <div class="card-body">
                    <form id="frmDocente" @reset.prevent="nuevoDocente" v-on:submit.prevent="guardarDocente">
                        <div class="row p-1">
                            <div class="col-3 col-md-5">
                                <label  style="font-weight: 700;" for="txtCodigoDocente">Codigo:</label>
                            </div>
                            <div class="col-4 col-md-5">
                                <input required pattern="[0-9]{3}" 
                                    title="Ingrese un codigo de Docente de 3 digitos"
                                        v-model="docente.codigo" type="text" class="form-control" name="txtCodigoDocente" id="txtCodigoDocente">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col-3 col-md-5">
                                <label  style="font-weight: 700;" for="txtNombreDocente">Nombre:</label>
                            </div>
                            <div class="col-4 col-md-5">
                                <input required pattern="[A-Za-zÑñáéíóú ]{3,75}"
                                    v-model="docente.nombre" type="text" class="form-control" name="txtNombreDocente" id="txtNombreDocente">
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
                    <div  style="font-weight: 700;" class="card-header">docentes Registrados</div>
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
                                <tr  style="font-weight: 700;" v-for="docente in docentes" :key="docente.idDocente" @click="modificarDocente(docente)" >
                                    <td>{{ docente.codigo }}</td>
                                    <td>{{ docente.nombre }}</td>
                                    <td><button class="btn btn-danger" @click="borrarDocente(docente)">Borrar</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>   
    `
});
(function ()
{
    'use strict';


    angular
        .module('app.e-commerce')
        .controller('ProductsController', ProductsController)


    /** @ngInject */
    function ProductsController($state, Products, DTOptionsBuilder, $mdSidenav,$timeout,$q,$mdDialog,$http)
    {
      var vm = this;

        // Data
        vm.products = Products;
        vm.toggleSidenav = toggleSidenav;
        vm.dtInstance = {};

        //Chips Data

        vm.readonly = false;
        vm.readonly = false;
        vm.selectedItem = null;
        vm.searchText = null;
        vm.querySearch = querySearch;
        vm.states = loadStates();
        vm.selectedStates = [];
        vm.autocompleteRequireMatch = true;
        vm.transformChip = transformChip;

        //Filter Variables




                //Filters

                vm.filteredProducts = vm.products;

                vm.filterMinAge = 0;
                vm.filterMaxAge = 100;

                vm.filterFemenino = false;
                vm.filterMasculino = false;

                vm.filterPrimaria = false;
                vm.filterSecundaria = false;
                vm.filterBachillerato = false;
                vm.filterLicenciatura = false;
                vm.filterPosgrado = false;

                vm.filterCasado = false;
                vm.filterSoltero = false;

                vm.filterMicro = false;
                vm.filterPequenia = false;
                vm.filterMediana = false;
                vm.filterGrande = false;

                vm.filterDonatariaAutorizadaSi = false;
                vm.filterDonatariaAutorizadaNo = false;

                vm.filterComunicacion = false;
                vm.filterAdministracion = false;
                vm.filterDireccion = false;
                vm.filterAsistenciaEmergencia = false;
                vm.filterPromocionHumana = false;
                vm.filterDesarrolloSocial = false;
                vm.filterConsejoConsultivo = false;
                vm.filterPatronato = false;

                vm.filterPatronatoConsejo = false;
                vm.filterDirectores = false;
                vm.filterDonante = false;
                vm.filterAlianza = false,
                vm.filterCoolaboradorVoluntario = false;
                vm.filterEquipoOperativo = false;

                vm.filterAccesoSalud = false;
                vm.filterEducacionVida = false,
                vm.filterEmprendimientoEconomico = false;
                vm.filterSostenibilidadAlimenticia = false;
                vm.filterVoluntariado = false;
                vm.filterFortalecimientoOrganizacion = false;
                vm.filterDonanteDeRecurso = false;
                vm.filterDonanteEnEspecie = false;

                vm.filterActividadesNinos = false;
                vm.filterActividadesDeportivas = false;
                vm.filterActividadesAdultosMayores = false;
                vm.filterServiciosDeSalud = false;
                vm.SiembraDeHortalizas = false;
                vm.AsesoriasComunidades = false;
                vm.ColectaYDonaciones = false;
                vm.filterOtro = false;

                vm.filterRespeto = false;
                vm.filterTolerancia = false;
                vm.filterHonestidad = false;

                //Excel Report Variables

                vm.fileName = "Reporte";
                vm.exportData = [];

                vm.exportData.push(["Título","Nombre","Fecha de Nacimiento","Género","Grado de Estudios",
                                    "Estado Civil","Cónyuge","Fecha de Nacimiento (Cónyuge)","Nombre de Institución",
                                    "Puesto","Tamaño de Institucón","Donataria Autorizada","Colonia","Calle","Ciudad","Municipio/Delegación",
                                    "Estado","C.P.","email","T. Casa","T.Oficina","Móvil","Web","Facebook","Twitter","Características de Contacto",
                                    "Área de Contacto","Asistente","T.Asistente","Fecha de Nacimiento (Asistente)","RFC","Dirección Fiscal"]);


                angular.forEach(vm.filteredProducts, function(v, key) {

                var fNacimiento = convertDate(v.fechaNacimiento);
                var fNacimientoConyuge = convertDate(v.fechaNacimientoConyuge);
                var fNacimientoAsistente = convertDate(v.fechaNacimientoAsistente);

                    vm.exportData.push([v.titulo,
                                        v.nombre+" "+v.apellidoPaterno+" "+v.apellidoMaterno,
                                        fNacimiento,v.genero,v.gradoDeEstudios,v.estadoCivil,
                                        v.nombreConyuge,fNacimientoConyuge,
                                        v.nombreDeInstitucion,v.puesto,v.tamanioDeInstitucion,
                                        v.donatariaAutorizada,v.colonia,v.calle,v.ciudad,
                                        v.municipio,v.estado,v.codigoPostal,v.email,
                                        v.telefonoCasa,v.telefonoOficina,v.telefonoMovil,
                                        v.web,v.facebook,v.twitter,v.areaDeContacto,
                                        v.nombreAsistente,v.telefonoAsistente,fNacimientoAsistente,
                                        v.rfc,v.direccionFiscal
                                      ]);

                  });



        //Export Excel Methods

        function updateExcelExport (){

          vm.exportData = [];
          vm.exportData.push(["Título","Nombre","Fecha de Nacimiento","Género","Grado de Estudios",
                              "Estado Civil","Cónyuge","Fecha de Nacimiento (Cónyuge)","Nombre de Institución",
                              "Puesto","Tamaño de Institucón","Donataria Autorizada","Colonia","Calle","Ciudad","Municipio/Delegación",
                              "Estado","C.P.","email","T. Casa","T.Oficina","Móvil","Web","Facebook","Twitter","Características de Contacto",
                              "Área de Contacto","Asistente","T.Asistente","Fecha de Nacimiento (Asistente)","RFC","Dirección Fiscal"]);

          angular.forEach(vm.filteredProducts, function(v, key) {

          var fNacimiento = convertDate(v.fechaNacimiento);
          var fNacimientoConyuge = convertDate(v.fechaNacimientoConyuge);
          var fNacimientoAsistente = convertDate(v.fechaNacimientoAsistente);
              vm.exportData.push([v.titulo,
                                  v.nombre+" "+v.apellidoPaterno+" "+v.apellidoMaterno,
                                  fNacimiento,v.genero,v.gradoDeEstudios,v.estadoCivil,
                                  v.nombreConyuge,fNacimientoConyuge,
                                  v.nombreDeInstitucion,v.puesto,v.tamanioDeInstitucion,
                                  v.donatariaAutorizada,v.colonia,v.calle,v.ciudad,
                                  v.municipio,v.estado,v.codigoPostal,v.email,
                                  v.telefonoCasa,v.telefonoOficina,v.telefonoMovil,
                                  v.web,v.facebook,v.twitter,v.areaDeContacto,
                                  v.nombreAsistente,v.telefonoAsistente,fNacimientoAsistente,
                                  v.rfc,v.direccionFiscal
                                ]);

            });

        }

        //Chip Methods

        function transformChip(chip) {
      // If it is an object, it's already a known chip
      if (angular.isObject(chip)) {
        return chip;
      }
      // Otherwise, create a new one
      return { name: chip, type: 'new' }
    }
    /**
     * Search for states.
     */
    function querySearch (query) {
      var results = query ? vm.states.filter(createFilterFor(query)) : [];
      return results;
    }
    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(state) {
        return (state._lowername.indexOf(lowercaseQuery) === 0)
      };
    }
    function loadStates() {
      var stateArray = [
        {
          'name': 'Ciudad de México',

        },
        {
          'name': 'Aguascalientes',
        },
        {
          'name': 'Baja California',
        },
        {
          'name': 'Baja California Sur',
        },
        {
          'name': 'Campeche',
        },
        {
          'name': 'Chiapas',
        },
        {
          'name': 'Chihuahua',
        },
        {
          'name': 'Coahuila',
        },
        {
          'name': 'Colima',
        },
        {
          'name': 'Durango',
        },
        {
          'name': 'Estado de México',
        },
        {
          'name': 'Guanajuato',
        },
        {
          'name': 'Guerrero',
        },
        {
          'name': 'Hidalgo',
        },
        {
          'name': 'Jalisco',
        },
        {
          'name': 'Michoacán',
        },
        {
          'name': 'Morelos',
        },
        {
          'name': 'Nayarit',
        },
        {
          'name': 'Neuvo León',
        },
        {
          'name': 'Oaxaca',
        },
        {
          'name': 'Puebla',
        },
        {
          'name': 'Querétaro',
        },
        {
          'name': 'Quintana Roo',
        },
        {
          'name': 'San Luis Potosí',
        },
        {
          'name': 'Sinaloa',
        },
        {
          'name': 'Sonora',
        },
        {
          'name': 'Tabasco',
        },
        {
          'name': 'Tamaulipas',
        },
        {
          'name': 'Tlaxcala',
        },
        {
          'name': 'Veracruz',
        },
        {
          'name': 'Yucatán',
        },
        {
          'name': 'Zacatecas',
        }


      ];
      return stateArray.map(function (s) {
        s._lowername = s.name.toLowerCase();
        return s;
      });
    }


        //Filter Methods

        vm.filterProducts = filterProdutcs;

        function filterProdutcs(){

          vm.filteredProducts = Products;
          filterByAge();
          if(vm.filterFemenino||vm.filterMasculino) filterByGender();
          if(vm.filterPrimaria||vm.filterSecundaria||vm.filterBachillerato||vm.filterLicenciatura||vm.filterPosgrado) filterByEducation();
          if(vm.filterCasado||vm.filterSoltero) filterByMaritalStatus();
          if(vm.filterMicro||vm.filterPequenia||vm.filterMediana||vm.filterGrande) filterByInstitutionSize();
          if(vm.filterDonatariaAutorizadaSi||vm.filterDonatariaAutorizadaNo)filterByDonation();
          if(vm.selectedStates.length > 0) filterByState();
          if (vm.filterComunicacion||vm.filterAdministracion||vm.filterDireccion||vm.filterAsistenciaEmergencia||vm.filterPromocionHumana||vm.filterDesarrolloSocial||vm.filterConsejoConsultivo||vm.filterPatronato)filterByAreaOfContact();
          if(vm.filterPatronatoConsejo||vm.filterDirectores||vm.filterDonante||vm.filterAlianza||vm.filterCoolaboradorVoluntario||vm.filterEquipoOperativo)filterbyEntityType();
          if(vm.filterAccesoSalud||vm.filterEducacionVida||vm.filterEmprendimientoEconomico||vm.filterSostenibilidadAlimenticia||vm.filterVoluntariado||vm.filterFortalecimientoOrganizacion||vm.filterDonanteDeRecurso||vm.filterDonanteEnEspecie)filterByAreaOfAction();
          if(vm.filterActividadesNinos||vm.filterActividadesDeportivas||vm.filterActividadesAdultosMayores||vm.filterServiciosDeSalud||vm.SiembraDeHortalizas||vm.AsesoriasComunidades||vm.ColectaYDonaciones||vm.filterOtro)filterByInterests();
          if(vm.filterRespeto||vm.filterTolerancia||vm.filterHonestidad)filterByValues();
          vm.dtInstance.rerender();
          updateExcelExport();
        }




        function filterByAge(){
          var temp = [];

          for (i = 0; i < Products.length; i++) {

              var age = getAge(Products[i].fechaNacimiento);

              if (age <= vm.filterMaxAge && age >= vm.filterMinAge  ){
                temp.push(Products[i]);
              }
          }
          vm.filteredProducts = temp;
        }


        function filterByGender(){
          var temp1= [];
          var temp2= [];

          for (i = 0; i < vm.filteredProducts.length; i++) {
            var tempObject = vm.filteredProducts[i];

            if(validateCheckBox(vm.filterMasculino,"Masculino",vm.filteredProducts[i].genero)){
              temp1.push(tempObject);
            }
            if(validateCheckBox(vm.filterFemenino,"Femenino",vm.filteredProducts[i].genero)){
              temp2.push(tempObject);
            }

          }
           vm.filteredProducts =  temp1.concat(temp2);
        }

        function filterByEducation(){
          var temp1= [];
          var temp2= [];
          var temp3= [];
          var temp4= [];
          var temp5= [];

            for (i = 0; i < vm.filteredProducts.length; i++) {

                var tempObject = vm.filteredProducts[i];

                if(validateCheckBox(vm.filterPrimaria,"Primaria",vm.filteredProducts[i].gradoDeEstudios)){
                  temp1.push(tempObject);
                }
                if(validateCheckBox(vm.filterSecundaria,"Secundaria",vm.filteredProducts[i].gradoDeEstudios)){
                  temp2.push(tempObject);
                }
                if(validateCheckBox(vm.filterBachillerato,"Bachillerato",vm.filteredProducts[i].gradoDeEstudios)){
                  temp3.push(tempObject);
                }
                if(validateCheckBox(vm.filterLicenciatura,"Licenciatura",vm.filteredProducts[i].gradoDeEstudios)){
                  temp4.push(tempObject);
                }
                if(validateCheckBox(vm.filterPosgrado,"Posgrado",vm.filteredProducts[i].gradoDeEstudios)){
                  temp5.push(tempObject);
                }
            }

            vm.filteredProducts =  temp1.concat(temp2,temp3,temp4,temp5);


          }

          function filterByMaritalStatus(){

            var temp1= [];
            var temp2= [];

            for (i = 0; i < vm.filteredProducts.length; i++) {
              var tempObject = vm.filteredProducts[i];

              if(validateCheckBox(vm.filterCasado,"Casado",vm.filteredProducts[i].estadoCivil)){
                temp1.push(tempObject);
              }
              if(validateCheckBox(vm.filterSoltero,"Soltero",vm.filteredProducts[i].estadoCivil)){
                temp2.push(tempObject);
              }

            }
             vm.filteredProducts =  temp1.concat(temp2);

          }

          function filterByInstitutionSize(){

            var temp1= [];
            var temp2= [];
            var temp3= [];
            var temp4= [];

            for (i = 0; i < vm.filteredProducts.length; i++) {
              var tempObject = vm.filteredProducts[i];

              if(validateCheckBox(vm.filterMicro,"Micro",vm.filteredProducts[i].tamanioDeInstitucion)){
                temp1.push(tempObject);
              }
              if(validateCheckBox(vm.filterPequenia,"Pequeña",vm.filteredProducts[i].tamanioDeInstitucion)){
                temp2.push(tempObject);
              }
              if(validateCheckBox(vm.filterMediana,"Mediana",vm.filteredProducts[i].tamanioDeInstitucion)){
                temp3.push(tempObject);
              }
              if(validateCheckBox(vm.filterGrande,"Grande",vm.filteredProducts[i].tamanioDeInstitucion)){
                temp4.push(tempObject);
              }


            }
             vm.filteredProducts =  temp1.concat(temp2,temp3,temp4);

          }

          function filterByDonation(){
            var temp1= [];
            var temp2= [];

            for (i = 0; i < vm.filteredProducts.length; i++) {
              var tempObject = vm.filteredProducts[i];

              if(validateCheckBox(vm.filterDonatariaAutorizadaSi,"Si",vm.filteredProducts[i].donatariaAutorizada)){
                temp1.push(tempObject);
              }
              if(validateCheckBox(vm.filterDonatariaAutorizadaNo,"No",vm.filteredProducts[i].donatariaAutorizada)){
                temp2.push(tempObject);
              }

            }
             vm.filteredProducts =  temp1.concat(temp2);
          }

          function filterByState(){

            var temp1 = [];

              for (i = 0; i < vm.filteredProducts.length; i++) {

                for ( var j =0; j < vm.selectedStates.length; j++){

                  if (validateCheckBox(true, vm.selectedStates[j].name, vm.filteredProducts[i].estado )){
                    temp1.push(vm.filteredProducts[i]);
                  }

                }
              }

              vm.filteredProducts =  temp1;

          }

          function filterByAreaOfContact(){

            var temp1= [];
            var temp2= [];
            var temp3= [];
            var temp4= [];
            var temp5= [];
            var temp6= [];
            var temp7= [];
            var temp8= [];

              for (var i = 0; i < vm.filteredProducts.length; i++) {

                  var tempObject = vm.filteredProducts[i];

                  if(validateCheckBox(vm.filterComunicacion,"Comunicación",vm.filteredProducts[i].areaDeContacto)){
                    temp1.push(tempObject);
                  }
                  if(validateCheckBox(vm.filterAdministracion,"Administración",vm.filteredProducts[i].areaDeContacto)){
                    temp2.push(tempObject);
                  }
                  if(validateCheckBox(vm.filterDireccion,"Dirección",vm.filteredProducts[i].areaDeContacto)){
                    temp3.push(tempObject);
                  }
                  if(validateCheckBox(vm.filterAsistenciaEmergencia,"Asistencia y Emergencia",vm.filteredProducts[i].areaDeContacto)){
                    temp4.push(tempObject);
                  }
                  if(validateCheckBox(vm.filterPromocionHumana,"Promoción Humana",vm.filteredProducts[i].areaDeContacto)){
                    temp5.push(tempObject);
                  }
                  if(validateCheckBox(vm.filterDesarrolloSocial,"Desarrollo Social",vm.filteredProducts[i].areaDeContacto)){
                    temp6.push(tempObject);
                  }
                  if(validateCheckBox(vm.filterConsejoConsultivo,"Consejo Consultivo",vm.filteredProducts[i].areaDeContacto)){
                    temp7.push(tempObject);
                  }
                  if(validateCheckBox(vm.filterAsistenciaEmergencia,"Patronato",vm.filteredProducts[i].areaDeContacto)){
                    temp8.push(tempObject);
                  }
              }

              vm.filteredProducts =  temp1.concat(temp2,temp3,temp4,temp5,temp6,temp7,temp8);
          }

          function filterbyEntityType(){

            var temp1 = [];
            var temp2 = [];
            var temp3 = [];
            var temp4 = [];
            var temp5 = [];
            var temp6 = [];



            for (i = 0; i < vm.filteredProducts.length; i++) {
              var tempArray = vm.filteredProducts[i].areasCorrespondientes;

              for(var j = 0; j < tempArray.length; j++){

                  if(validateCheckBox(vm.filterPatronatoConsejo,"Patronato/Consejo",tempArray[j])) temp1.push(vm.filteredProducts[i]);
                  if(validateCheckBox(vm.filterDirectores,"Directores",tempArray[j])) temp2.push(vm.filteredProducts[i]);
                  if(validateCheckBox(vm.filterDonante,"Donante",tempArray[j])) temp3.push(vm.filteredProducts[i]);
                  if(validateCheckBox(vm.filterAlianza,"Alianza",tempArray[j])) temp4.push(vm.filteredProducts[i]);
                  if(validateCheckBox(vm.filterCoolaboradorVoluntario,"Coolaborador y/o Voluntario",tempArray[j])) temp5.push(vm.filteredProducts[i]);
                  if(validateCheckBox(vm.filterEquipoOperativo,"Equipo Operativo",tempArray[j])) temp6.push(vm.filteredProducts[i]);
              }

            }
            var tempFinal =  temp1.concat(temp2,temp3,temp4,temp5,temp6);
            vm.filteredProducts = UniqueArraybyId(tempFinal,"id");

          }

          function filterByAreaOfAction(){

            var temp1 = [];
            var temp2 = [];
            var temp3 = [];
            var temp4 = [];
            var temp5 = [];
            var temp6 = [];
            var temp7 = [];
            var temp8 = [];




            for (i = 0; i < vm.filteredProducts.length; i++) {
              var tempArray = vm.filteredProducts[i].areasDeAccion;

              for(var j = 0; j < tempArray.length; j++){

                  if(validateCheckBox(vm.filterAccesoSalud,"Acceso a la salud",tempArray[j])) temp1.push(vm.filteredProducts[i]);
                  if(validateCheckBox(vm.filterEducacionVida,"Educación para la vida",tempArray[j])) temp2.push(vm.filteredProducts[i]);
                  if(validateCheckBox(vm.filterEmprendimientoEconomico,"Emprendimiento económico",tempArray[j])) temp3.push(vm.filteredProducts[i]);
                  if(validateCheckBox(vm.filterSostenibilidadAlimenticia,"Sostenibilidad alimenticia",tempArray[j])) temp4.push(vm.filteredProducts[i]);
                  if(validateCheckBox(vm.filterVoluntariado,"Voluntariado",tempArray[j])) temp5.push(vm.filteredProducts[i]);
                  if(validateCheckBox(vm.filterFortalecimientoOrganizacion,"Fortalecimiento a organización de sociedad civil",tempArray[j])) temp6.push(vm.filteredProducts[i]);
                  if(validateCheckBox(vm.filterDonanteDeRecurso,"Donante de Recurso",tempArray[j])) temp7.push(vm.filteredProducts[i]);
                  if(validateCheckBox(vm.filterDonanteEnEspecie,"Donante en Especie",tempArray[j])) temp8.push(vm.filteredProducts[i]);

              }

            }
            var tempFinal =  temp1.concat(temp2,temp3,temp4,temp5,temp6,temp7,temp8);
            vm.filteredProducts = UniqueArraybyId(tempFinal,"id");

          }

          function filterByInterests(){

            var temp1= [];
            var temp2= [];
            var temp3= [];
            var temp4= [];
            var temp5= [];
            var temp6= [];
            var temp7= [];
            var temp8= [];

              for (var i = 0; i < vm.filteredProducts.length; i++) {

                  var tempObject = vm.filteredProducts[i];

                  if(validateCheckBox(vm.filterActividadesNinos,"Actividades con niños",vm.filteredProducts[i].interesesExtracurriculares)){
                    temp1.push(tempObject);
                  }
                  if(validateCheckBox(vm.filterActividadesDeportivas,"Actividades deportivas",vm.filteredProducts[i].interesesExtracurriculares)){
                    temp2.push(tempObject);
                  }
                  if(validateCheckBox(vm.filterActividadesAdultosMayores,"Actividades con adultos mayores",vm.filteredProducts[i].interesesExtracurriculares)){
                    temp3.push(tempObject);
                  }
                  if(validateCheckBox(vm.filterServiciosDeSalud,"Servicios de salud",vm.filteredProducts[i].interesesExtracurriculares)){
                    temp4.push(tempObject);
                  }
                  if(validateCheckBox(vm.SiembraDeHortalizas,"Siembra de hortalizas",vm.filteredProducts[i].interesesExtracurriculares)){
                    temp5.push(tempObject);
                  }
                  if(validateCheckBox(vm.AsesoriasComunidades,"Asesorías a comunidades",vm.filteredProducts[i].interesesExtracurriculares)){
                    temp6.push(tempObject);
                  }
                  if(validateCheckBox(vm.ColectaYDonaciones,"Colecta y donaciones",vm.filteredProducts[i].interesesExtracurriculares)){
                    temp7.push(tempObject);
                  }
                  if(validateCheckBox(vm.filterOtro ,"Otro",vm.filteredProducts[i].interesesExtracurriculares)){
                    temp8.push(tempObject);
                  }
              }

              vm.filteredProducts =  temp1.concat(temp2,temp3,temp4,temp5,temp6,temp7,temp8);
          }

          function filterByValues(){

            var temp1= [];
            var temp2= [];
            var temp3= [];

            for (i = 0; i < vm.filteredProducts.length; i++) {
              var tempObject = vm.filteredProducts[i];

              if(validateCheckBox(vm.filterRespeto,"Respeto",vm.filteredProducts[i].valores)){
                temp1.push(tempObject);
              }
              if(validateCheckBox(vm.filterTolerancia,"Tolerancia",vm.filteredProducts[i].valores)){
                temp2.push(tempObject);
              }
              if(validateCheckBox(vm.filterHonestidad,"Honestidad",vm.filteredProducts[i].valores)){
                temp3.push(tempObject);
              }

            }
             vm.filteredProducts =  temp1.concat(temp2,temp3);


          }




        function validateCheckBox(booleanValue, textValue,valueToCompare){
          if (booleanValue && textValue == valueToCompare){
            return true;
          }
          return false;
        }




        function getAge(dateString) {
            var today = new Date();
            var birthDate = new Date(dateString);
            var age = today.getFullYear() - birthDate.getFullYear();
            var m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            return age;
        }





        vm.jsonToExport = [
            {
              "col1data": "1",
              "col2data": "Fight Club",
              "col3data": "Brad Pitt"
            },
            {
              "col1data": "2",
              "col2data": "Matrix (Series)",
              "col3data": "Keanu Reeves"
            },
            {
              "col1data": "3",
              "col2data": "V for Vendetta",
              "col3data": "Hugo Weaving"
            }
          ];





        function convertDate(usDate) {
          var dateParts = usDate.split(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
          return dateParts[3] + "-" + dateParts[1] + "-" + dateParts[2];
        }


        function UniqueArraybyId(collection, keyname) {
                var output = [],
                    keys = [];

                angular.forEach(collection, function(item) {
                    var key = item[keyname];
                    if(keys.indexOf(key) === -1) {
                        keys.push(key);
                        output.push(item);
                    }
                });
          return output;
        }


            vm.dtOptions = {
                dom         : 'rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
                columnDefs  : [
                    {
                        // Target the id column
                        targets: 0,
                        width  : '72px'
                    },
                    {
                        // Target the image column
                        targets   : 1,
                        filterable: false,
                        sortable  : false,
                        width     : '80px'
                    },

                    {
                        // Target the actions column
                        targets           : 7,
                        responsivePriority: 1,
                        filterable        : false,
                        sortable          : false
                    }
                ],
                initComplete: function ()
                {
                    var api = this.api(),
                        searchBox = angular.element('body').find('#e-commerce-products-search');

                    // Bind an external input as a table wide search box
                    if ( searchBox.length > 0 )
                    {
                        searchBox.on('keyup', function (event)
                        {
                            api.search(event.target.value).draw();
                        });
                    }
                },
                pagingType  : 'simple',
                lengthMenu  : [10, 20, 30, 50, 100],
                pageLength  : 20,
                scrollY     : 'auto',
                responsive  : true,

            };


        /**
         * Toggle sidenav
         *
         * @param sidenavId
         */
        function toggleSidenav(sidenavId)
        {
            $mdSidenav(sidenavId).toggle();
        }

        // Methods
        vm.gotoAddProduct = gotoAddProduct;
        vm.gotoProductDetail = gotoProductDetail;
        vm.deleteProduct = deleteProduct;

        //////////

        vm.showConfirm = function(ev, id) {
   // Appending dialog to document.body to cover sidenav in docs app
         var confirm = $mdDialog.confirm()
               .title('¿Desea borrar este registro?')
               .ariaLabel('borrar')
               .targetEvent(ev)
               .clickOutsideToClose(true)
               .parent(angular.element(document.body))
               .ok('OK')
               .cancel('CANCELAR');
         $mdDialog.show(confirm).then(function() {

           deleteProduct(id);

         }, function() {

         });
       };

        function deleteProduct(id){

          for(var i = 0; i < vm.filteredProducts.length; i++){
            console.log(id);

              if (id == vm.filteredProducts[i].id){
                $http.delete("http://localhost:8080/todos/" + id)
                vm.filteredProducts.splice(i,1);
                break;
              }

          }
          vm.dtInstance.rerender();

        }

        /**
         * Go to add product
         */
        function gotoAddProduct()
        {
            $state.go('app.e-commerce.products.add');
        }

        /**
         * Go to product detail
         *
         * @param id
         */
        function gotoProductDetail(id)
        {
            $state.go('app.e-commerce.products.detail', {id: id});
        }
    }




})();

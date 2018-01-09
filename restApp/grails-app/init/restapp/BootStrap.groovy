package restapp
import register.*

class BootStrap {

    def init = { servletContext ->

    Role admin = new Role("ROLE_ADMIN").save()
    User user = new User("user", "pass").save()
    UserRole.create(user, admin, true)

      20.times{ new Contacto(
      titulo:"Licenciado",
      nombre: "Juan",
      apellidoPaterno: "Perez",
      apellidoMaterno:"Hernandez",
      fechaNacimiento:"1/12/1990",
      genero:"Masculino",
      gradoDeEstudios:"Bachillerato",
      estadoCivil:"Casado",
      nombreConyuge:"Maria Lopez",
      fechaNacimientoConyuge:"1/12/1990",

      nombreDeInstitucion:"CCB",
      puesto:"Gerente",
      tamanioDeInstitucion: "Grande",
      donatariaAutorizada:"Si",

      colonia:"Valle Dorado",
      calle:"123",
      ciudad:"Ciudad de México",
      codigoPostal: "12344",

      nombreAsistente: "Juana María",
      telefonoAsistente: "123231",
      fechaNacimientoAsistente: "21/02/2000",

      email: "holq@gmail.com",
      telefonoCasa: "123213",
      telefonoOficina: "123231",
      telefonoMovil: "123123",

      web: "www.csdkmm.com",
      facebook: "Juan Pérez",
      twitter: "@Juan Pérez",

      caracteristicasContacto: "sadajsjnkdasnjksa",
      areaDeContacto: "jasdjsdajsida",

      rfc: "asdjoajidsjidoa",
      rfcNombre: "salksadkl",
      rfcNacimiento: "hasdjkasdsj",
      rfcHomoclave: "aijajids",
      direccionFiscal: "sadasdsad",

      areasCorrespondientes: "asda,adsads,sads",
      accionEnConjunto: "asasd",
      fechaDeAccion: "asdasdsad",
      areasDeAccion: "assdads,sadsadsda,asd",
      equipoOperativo: "sadsda",

      lugaresFrecuentados: "asdsda",
      interesesExtracurriculares: "dsasad",
      habilidades: "assasad",
      "valores": "asddsa"

      ).save()
      }
    }
    def destroy = {
    }
}

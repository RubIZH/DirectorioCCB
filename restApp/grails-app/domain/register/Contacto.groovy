package register


import grails.rest.*

@Resource(readOnly = false, formats = ['json', 'xml'])
class Contacto {

  String titulo
  String nombre
  String apellidoPaterno
  String apellidoMaterno
  String fechaNacimiento
  String genero
  String gradoDeEstudios
  String estadoCivil
  String nombreConyuge
  String fechaNacimientoConyuge

  String nombreDeInstitucion
  String puesto
  String tamanioDeInstitucion
  String donatariaAutorizada

  String colonia
  String calle
  String ciudad
  String codigoPostal

  String nombreAsistente
  String telefonoAsistente
  String fechaNacimientoAsistente

  String email
  String telefonoCasa
  String telefonoOficina
  String telefonoMovil

  String web
  String facebook
  String twitter

  String caracteristicasContacto
  String areaDeContacto

  String rfc
  String rfcNombre
  String rfcNacimiento
  String rfcHomoclave
  String direccionFiscal

  String areasCorrespondientes
  String accionEnConjunto
  String fechaDeAccion
  String areasDeAccion
  String equipoOperativo

  String lugaresFrecuentados
  String interesesExtracurriculares
  String habilidades
  String valores




}

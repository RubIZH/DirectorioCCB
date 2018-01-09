package register


import grails.rest.*
import grails.converters.*
import grails.plugin.springsecurity.annotation.Secured
import grails.rest.RestfulController

@Secured(['ROLE_ADMIN'])
class ContactoController extends RestfulController {
    static responseFormats = ['json', 'xml']
    ContactoController() {
        super(Contacto)
    }

    def allContacts() {
      respond Contacto.getAll()
    }
}

import moment from 'moment'
/*
import Religion from '@/store/models/Religion'
import Blood from '@/store/models/Blood'
import Country from '@/store/models/Country'
import Phone from '@/store/models/Phone'
*/
export default class Client {
  constructor () {
    this.id = ''
    this.email = ''
    this.firstName = ''
    this.gender = ''
    this.birthdate = null
    this.state = null
    this.twitterId = ''
    this.address = ''
    this.phone = ''
    this.credit = 0
    this.favoriteProduct = null
    this.image = null
    this.clientType = ''

    this.updated = null
    this.created = null
  }

  initWithData (data = {}) {
    this.id = data.id || ''
    this.email = data.correo || ''
    this.firstName = data.nombre || ''
    this.gender = data.genero || ''
    this.birthdate = data.fechanacimiento || ''
    this.twitterId = data['id_twitter'] || ''
    this.address = data.direccion || ''
    this.state = data['id_depto'] || ''
    this.phone = data.telefono || ''
    this.credit = data.limitecredito || 0
    this.image = data.foto || ''
    this.favoriteProduct = data['id_producto'] || ''
    this.clientType = data['id_tipocliente'] || ''

    this.updated = data.updatedAt ? moment(data.updatedAt) : null
    this.created = data.createdAt ? moment(data.createdAt) : null

    /*
    this.bornCountry = new Country()
    this.bornCountry.name = attributes['born_country'] || ''
    this.bornCountry.alpha2 = attributes['born_country_alpha2'] || ''
    */
  }

  getFullName () {
    return (this.firstName + ' ' + this.lastName).trim()
  }

  getGender () {
    if (!this.gender) {
      return ''
    }
    return (this.gender === 'female') ? 'Femenino' : 'Masculino'
  }

  getYears () {
    if (!this.birthdate) {
      return ''
    }
    return moment.duration(moment().diff(this.birthDate)).asYears().toFixed(0)
  }
}

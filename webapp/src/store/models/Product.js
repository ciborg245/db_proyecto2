import moment from 'moment'
/*
import Religion from '@/store/models/Religion'
import Blood from '@/store/models/Blood'
import Country from '@/store/models/Country'
import Phone from '@/store/models/Phone'
*/
export default class Product {
  constructor () {
    this.id = ''
    this.name = ''
    this.price = ''
    this.category = ''

    this.updated = null
    this.created = null
  }

  initWithData (data = {}) {
    this.id = data.id || ''
    this.name = data.nombre || ''
    this.price = data.precio || ''
    this.category = data.categoria || ''

    this.updated = data.updatedAt ? moment(data.updatedAt) : null
    this.created = data.createdAt ? moment(data.createdAt) : null

    /*
    this.bornCountry = new Country()
    this.bornCountry.name = attributes['born_country'] || ''
    this.bornCountry.alpha2 = attributes['born_country_alpha2'] || ''
    */
  }
}

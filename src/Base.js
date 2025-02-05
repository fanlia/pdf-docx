
export class Base {
  constructor () {
    this.data = null
    this.type = 'base'
  }

  async from () {
    console.log(`from ${this.type}`)
  }

  async to () {
    console.log(`to ${this.type}`)
  }
}


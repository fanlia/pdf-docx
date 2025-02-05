
import * as fs from 'fs'

export class Base {
  constructor () {
    this.data = {
      pages: [
        {
          content: [
            'hello world',
          ],
        },
      ],
    }
    this.type = 'base'
  }

  async from (buffer) {
    console.log(`from ${this.type}`)
  }

  async to () {
    console.log(`to ${this.type}`)
  }

  async save (name = 'output') {
    const buffer = await this.to()
    fs.writeFileSync(`${name}.${this.type}`, buffer)
  }

  async read (name = 'output') {
    const buffer = fs.readFileSync(`${name}.${this.type}`)
    return this.from(buffer)
  }
}


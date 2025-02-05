
import * as mupdfjs from 'mupdf/mupdfjs'
import PDFDocument from 'pdfkit'
import { Base } from './Base.js'

export class PDF extends Base {

  constructor () {
    super()
    this.type = 'pdf'
  }

  render_paragraph (paragraph, doc) {
    doc.text(paragraph)
  }

  render_page (page, doc) {
    page.content.forEach(paragraph => this.render_paragraph(paragraph, doc))
  }

  async to () {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument()

      this.data.pages.forEach(page => this.render_page(page, doc))

      let chunks = []

      doc.on('data', chunk => {
        chunks.push(chunk)
      })

      doc.on('end', () => {
        const buffer = Buffer.concat(chunks)
        resolve(buffer)
      })

      doc.on('error', reject)

      doc.end()
    })
  }
}


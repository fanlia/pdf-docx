
import * as mupdfjs from 'mupdf/mupdfjs'
import PDFDocument from 'pdfkit'
import { Base } from './Base.js'

export class PDF extends Base {

  constructor () {
    super()
    this.type = 'pdf'
  }

  parse_paragraph (paragraph) {
    if (paragraph.type !== 'text') {
      return
    }

    return paragraph.lines.map(line => line.text).join(' ')
  }

  parse_page (page) {
    const content = page.blocks.map(paragraph => this.parse_paragraph(paragraph)).filter(d => d)

    return {
      content,
    }
  }


  async from (buffer) {
    let document = mupdfjs.PDFDocument.openDocument(buffer, "application/pdf")
    let i = 0

    const pages = []

    while (i < document.countPages()) {
      const page = new mupdfjs.PDFPage(document, i)
      const json = page.toStructuredText("preserve-whitespace").asJSON()
      pages.push(this.parse_page(JSON.parse(json)))
      i++
    }

    this.data = {
      pages,
    }
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


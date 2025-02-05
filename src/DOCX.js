
import * as htmlparser2 from 'htmlparser2'
import mammoth from 'mammoth'
import * as docx from 'docx'
import { Base } from './Base.js'

export class DOCX extends Base {

  constructor () {
    super()
    this.type = 'docx'
  }

  async from (buffer) {
    const { value } = await mammoth.convertToHtml({ buffer })
    const dom = new htmlparser2.parseDocument(value)
    console.dir(dom, { depth: null })
  }

  render_paragraph (paragraph) {
    return new docx.Paragraph({
      children: [
        new docx.TextRun(paragraph),
      ],
    })
  }

  render_page (page) {
    const children = page.content.map(paragraph => this.render_paragraph(paragraph))
    return {
      children,
    }
  }

  async to () {
    const sections = this.data.pages.map(page => this.render_page(page))
    const doc = new docx.Document({
      sections,
    })
    return docx.Packer.toBuffer(doc)
  }
}


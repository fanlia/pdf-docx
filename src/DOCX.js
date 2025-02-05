
import * as docx from 'docx'
import { Base } from './Base.js'

export class DOCX extends Base {

  constructor () {
    super()
    this.type = 'docx'
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


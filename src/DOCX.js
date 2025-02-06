
import * as htmlparser2 from 'htmlparser2'
import mammoth from 'mammoth'
import * as docx from 'docx'
import { Base } from './Base.js'

export class DOCX extends Base {

  constructor () {
    super()
    this.type = 'docx'
  }

  parse_paragraph (paragraph) {
    if (paragraph.type !== 'text') {
      return
    }

    return paragraph.data
  }

  parse_page (page) {
    if (page.type !== 'tag' || page.name !== 'p') {
      return
    }

    const content = page.children.map(paragraph => this.parse_paragraph(paragraph)).filter(d => d)

    return {
      content,
    }
  }

  async from (buffer) {
    const { value } = await mammoth.convertToHtml({ buffer })
    const dom = new htmlparser2.parseDocument(value)
    const pages = dom.children.map(page => this.parse_page(page)).filter(d => d)
    this.data = {
      pages,
    }
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


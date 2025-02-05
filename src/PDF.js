
import * as mupdfjs from 'mupdf/mupdfjs'
import PDFDocument from 'pdfkit'
import { Base } from './Base.js'

export class PDF extends Base {

  constructor () {
    super()
    this.type = 'pdf'
  }

}


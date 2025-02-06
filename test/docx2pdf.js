
import { DOCX, PDF } from '../index.js'

const docx = new DOCX()

await docx.read()

docx.log()

const pdf = docx.convert(PDF)

await pdf.save('output-convert')


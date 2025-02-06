
import { DOCX, PDF } from '../index.js'

const pdf = new PDF()

await pdf.read()

pdf.log()

const docx = pdf.convert(DOCX)

await docx.save('output-convert')


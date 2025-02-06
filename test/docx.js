
import { DOCX } from '../index.js'

const docx = new DOCX()

docx.log()

await docx.read()

docx.log()

await docx.save()


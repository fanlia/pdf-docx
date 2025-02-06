
import { PDF } from '../index.js'

const pdf = new PDF()

pdf.log()

await pdf.read()

pdf.log()

await pdf.save()


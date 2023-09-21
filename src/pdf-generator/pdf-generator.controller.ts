import { Controller, Get, Header, Res } from '@nestjs/common';
import { PdfGeneratorService } from './pdf-generator.service';


@Controller('pdf-generator')
export class PdfGeneratorController {
  constructor(private readonly pdfGeneratorService: PdfGeneratorService) {}

  @Get('pdf')
  async generatePdf(@Res() res): Promise<void> {
    const buffer = await this.pdfGeneratorService.makePdf();
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'atachment; filename=example.pdf',
      'Content-Length': buffer.length
    })
    res.end(buffer);
  }

}

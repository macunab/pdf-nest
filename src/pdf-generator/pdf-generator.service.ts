import { Injectable } from '@nestjs/common';
import PdfPrinter from 'pdfmake';

@Injectable()
export class PdfGeneratorService {


  async makePdf(): Promise<Buffer> {

    const pdfBuffer: Buffer = await new Promise( resolve => {
      const fonts = {
        Roboto: {
          normal: 'Roboto-Regular.ttf',
          bold: 'Roboto-Medium.ttf',
          italics: 'Roboto-Italic.ttf',
          bolditalics: 'Roboto-Italic.ttf'
      },
        Helvetica: {
          normal: 'Helvetica',
          bold: 'Helvetica-Bold',
          italics: 'Helvetica-Oblique',
          bolditalics: 'Helvetica-BoldOblique'
        }
      };
      const printer = new PdfPrinter(fonts);
      const docDefinition: any = {
        content: [
          {
            columns: [
              {
                image:
                  'data:image/png;base64,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5hRGvPK67777uu985zvd97///cM37K688sruRS96UffGN76xe8tb3sJFVUf87Gc/67773e8eLoL6wAMPHO578YtffLhsxJve9Kbu7W9/++E+ANvAaM1ytOH+ELwy+cMf/tB96Utf6u68887u3//+d3/vpZ797Gd3733ve7v3ve993XOe85z+XsjnP//57qtf/Wr3q1/9qr/nUk996lO7d73rXd173vOe7tWvfnV/L4CWERqWow3bphGsqQheGeiU2Cc+8Ynua1/7Wn/POAWvj3/8493Tn/70/p7jdu7cue6Tn/xkXxv35je/ufvUpz51mEwPoG2EhuVow31RUGOOVwZf+cpXkkOXfOELXziM7qA7nJb98pe/3Nfi9PgvfvGLfQ0AgPZcMqdrUITgtdCf//zn7hvf+EZfS/etb32r+89//tPXjtc3v/nN7o9//GNfS6Pg+pOf/KSvAQDQFt/1u6wQvBb64Q9/2P3yl7/sa+l++tOfHn72mP3iF7/ovve97/W1aQheAIAtsVEvgtdCv/71r/tb0/32t7/tbx0nXWrjn//8Z1+b5uGHH+5vAQDQPka8Mllynaljv0bVv/71r/7WdH/961/7WwAAbAfBayFdImKuq6++ur91nHSNs7muu+66/hYAANtB8Froxhtv7G9Nt+Rn9+AlL3lJf2u6G264ob8FAMB2ELwW0sU851zQ83Wve133qle9qq8dp5e+9KXdO97xjr6W7pprrulOnjzZ1wAA2A6C10K6kOfp06f7Wrq3vvWti05T7oG+3fHOd76ze+5zn9vfk+bs2bPda1/72r4GAMB2ELwy0P8Q1L+ySfWBD3yge9vb3tbXjtvrX//6Q3tccUXapnjrrbdOamsAAFrCvwzKRN9Q/NznPtfdcccd/T2Xu+qqq7rbb7+9+9CHPtQ97WlP6++F6Or1+l+Xv/nNb/p7Lvfud7+7e//739+9/OUv7+8B0LK77767v+V322239bcQQhvuD8ErI12f47777jsUXeBTV2TXSM6JEye6U6dOdW94wxs4RTZCF5X9wQ9+0D3wwAPdz3/+88OV/TWJ/pWvfOVhTpxOz+qfZQMAsFUELwAAgEqY4wUAAFAJwQsAAKASghcAAEAlBC8AAIBKCF4AAACVELwAAAAqIXgBAABUQvACAACohOAFAABQCcELAACgEoIXAABAJQQvAACASgheAAAAlRC8AAAAKiF4AQAAVELwAgAAqITgBQAAUAnBCwAAoBKCFwAAQCUELwAAgEoIXgAAAJUQvAAAACoheAEAAFRC8AIAAKiE4AUAAFAJwQsAAKASghcAAEAlBC8AAIBKCF4AAACVELwAAAAqIXgBAABUQvACAACohOAFAABQCcELAACgEoIXAABAJQQvAACASgheAAAAlRC8AAAAKiF4AQAAVELwAgAAqITgBQAAUAnBCwAAoBKCFwAAQCUELwAAgEoIXgAAAJUQvAAAACoheAEAAFRC8AIAAKiE4AUAAFAJwQsAAKASghcAAEAlBC8AAIBKCF4AAACVELwAAAAqIXgBAABUQvACAACohOAFAABQCcELAACgEoIXAABAJQQvAACASgheAAAAlRC8AAAAKiF4AQAAVELwAgAAqITgBQAAUEXX/R+X1HIx/pEUGQAAAABJRU5ErkJggg==',
                width: 150,
              },
              [
                {
                  text: 'Recibo',
                  color: '#333333',
                  width: '*',
                  fontSize: 28,
                  bold: true,
                  alignment: 'right',
                  margin: [0, 0, 0, 15],
                },
                {
                  stack: [
                    {
                      columns: [
                        {
                          text: 'Recibo No.',
                          color: '#aaaaab',
                          bold: true,
                          width: '*',
                          fontSize: 12,
                          alignment: 'right',
                        },
                        {
                          text: '00001',
                          bold: true,
                          color: '#333333',
                          fontSize: 12,
                          alignment: 'right',
                          width: 100,
                        },
                      ],
                    },
                    {
                      columns: [
                        {
                          text: 'Fecha',
                          color: '#aaaaab',
                          bold: true,
                          width: '*',
                          fontSize: 12,
                          alignment: 'right',
                        },
                        {
                          text: 'June 01, 2016',
                          bold: true,
                          color: '#333333',
                          fontSize: 12,
                          alignment: 'right',
                          width: 100,
                        },
                      ],
                    },
                    {
                      columns: [
                        {
                          text: 'Estado',
                          color: '#aaaaab',
                          bold: true,
                          fontSize: 12,
                          alignment: 'right',
                          width: '*',
                        },
                        {
                          text: 'PAID',
                          bold: true,
                          fontSize: 14,
                          alignment: 'right',
                          color: 'green',
                          width: 100,
                        },
                      ],
                    },
                  ],
                },
              ],
            ],
          },
          {
            columns: [
              {
                text: 'Representante',
                color: '#aaaaab',
                bold: true,
                fontSize: 14,
                alignment: 'left',
                margin: [0, 20, 0, 5],
              },
              {
                text: 'Cliente',
                color: '#aaaaab',
                bold: true,
                fontSize: 14,
                alignment: 'left',
                margin: [0, 20, 0, 5],
              },
            ],
          },
          {
            columns: [
              {
                text: 'Your Name \n Your Company Inc.',
                bold: true,
                color: '#333333',
                alignment: 'left',
              },
              {
                text: 'Client Name \n Client Company',
                bold: true,
                color: '#333333',
                alignment: 'left',
              },
            ],
          },
          {
            columns: [
              {
                text: 'Direccion',
                color: '#aaaaab',
                bold: true,
                margin: [0, 7, 0, 3],
              },
              {
                text: 'Direccion',
                color: '#aaaaab',
                bold: true,
                margin: [0, 7, 0, 3],
              },
            ],
          },
          {
            columns: [
              {
                text: '9999 Street name 1A \n New-York City NY 00000 \n   USA',
                style: 'invoiceBillingAddress',
              },
              {
                text: '1111 Other street 25 \n New-York City NY 00000 \n   USA',
                style: 'invoiceBillingAddress',
              },
            ],
          },
          '\n\n',
          {
            width: '100%',
            alignment: 'center',
            text: 'Factura No. 123',
            bold: true,
            margin: [0, 10, 0, 10],
            fontSize: 15,
          },
          {
            layout: {
              defaultBorder: false,
              hLineWidth: function(i, node) {
                return 1;
              },
              vLineWidth: function(i, node) {
                return 1;
              },
              hLineColor: function(i, node) {
                if (i === 1 || i === 0) {
                  return '#bfdde8';
                }
                return '#eaeaea';
              },
              vLineColor: function(i, node) {
                return '#eaeaea';
              },
              hLineStyle: function(i, node) {
                // if (i === 0 || i === node.table.body.length) {
                return null;
                //}
              },
              // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
              paddingLeft: function(i, node) {
                return 10;
              },
              paddingRight: function(i, node) {
                return 10;
              },
              paddingTop: function(i, node) {
                return 2;
              },
              paddingBottom: function(i, node) {
                return 2;
              },
              fillColor: function(rowIndex, node, columnIndex) {
                return '#fff';
              },
            },
            table: {
              headerRows: 1,
              widths: ['*', 80],
              body: [
                [
                  {
                    text: 'ITEMS',
                    fillColor: '#eaf2f5',
                    border: [false, true, false, true],
                    margin: [0, 5, 0, 5],
                    textTransform: 'uppercase',
                  },
                  {
                    text: 'ITEM TOTAL',
                    border: [false, true, false, true],
                    alignment: 'right',
                    fillColor: '#eaf2f5',
                    margin: [0, 5, 0, 5],
                    textTransform: 'uppercase',
                  },
                ],
                [
                  {
                    text: 'Item 1',
                    border: [false, false, false, true],
                    margin: [0, 5, 0, 5],
                    alignment: 'left',
                  },
                  {
                    border: [false, false, false, true],
                    text: '$999.99',
                    fillColor: '#f5f5f5',
                    alignment: 'right',
                    margin: [0, 5, 0, 5],
                  },
                ],
                [
                  {
                    text: 'Item 2',
                    border: [false, false, false, true],
                    margin: [0, 5, 0, 5],
                    alignment: 'left',
                  },
                  {
                    text: '$999.99',
                    border: [false, false, false, true],
                    fillColor: '#f5f5f5',
                    alignment: 'right',
                    margin: [0, 5, 0, 5],
                  },
                ],
              ],
            },
          },
          '\n',
          '\n\n',
          {
            layout: {
              defaultBorder: false,
              hLineWidth: function(i, node) {
                return 1;
              },
              vLineWidth: function(i, node) {
                return 1;
              },
              hLineColor: function(i, node) {
                return '#eaeaea';
              },
              vLineColor: function(i, node) {
                return '#eaeaea';
              },
              hLineStyle: function(i, node) {
                // if (i === 0 || i === node.table.body.length) {
                return null;
                //}
              },
              // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
              paddingLeft: function(i, node) {
                return 10;
              },
              paddingRight: function(i, node) {
                return 10;
              },
              paddingTop: function(i, node) {
                return 3;
              },
              paddingBottom: function(i, node) {
                return 3;
              },
              fillColor: function(rowIndex, node, columnIndex) {
                return '#fff';
              },
            },
            table: {
              headerRows: 1,
              widths: ['*', 'auto'],
              body: [
                [
                  {
                    text: 'Payment Subtotal',
                    border: [false, true, false, true],
                    alignment: 'right',
                    margin: [0, 5, 0, 5],
                  },
                  {
                    border: [false, true, false, true],
                    text: '$999.99',
                    alignment: 'right',
                    fillColor: '#f5f5f5',
                    margin: [0, 5, 0, 5],
                  },
                ],
                [
                  {
                    text: 'Payment Processing Fee',
                    border: [false, false, false, true],
                    alignment: 'right',
                    margin: [0, 5, 0, 5],
                  },
                  {
                    text: '$999.99',
                    border: [false, false, false, true],
                    fillColor: '#f5f5f5',
                    alignment: 'right',
                    margin: [0, 5, 0, 5],
                  },
                ],
                [
                  {
                    text: 'Total Amount',
                    bold: true,
                    fontSize: 20,
                    alignment: 'right',
                    border: [false, false, false, true],
                    margin: [0, 5, 0, 5],
                  },
                  {
                    text: 'USD $999.99',
                    bold: true,
                    fontSize: 20,
                    alignment: 'right',
                    border: [false, false, false, true],
                    fillColor: '#f5f5f5',
                    margin: [0, 5, 0, 5],
                  },
                ],
              ],
            },
          },
          '\n\n',
          {
            text: 'NOTES',
            style: 'notesTitle',
          },
          {
            text: 'Some notes goes here \n Notes second line',
            style: 'notesText',
          },
        ],
        styles: {
          notesTitle: {
            fontSize: 10,
            bold: true,
            margin: [0, 50, 0, 3],
          },
          notesText: {
            fontSize: 10,
          },
        },
        defaultStyle: {
          columnGap: 20,
          font: 'Helvetica'
        },
      };

      const doc = printer.createPdfKitDocument(docDefinition);
      const buffer = [];
      doc.on('data', function (chunk) {
        buffer.push(chunk);
      });
      doc.on('end', () => {
        const data = Buffer.concat(buffer)
        resolve(data);
      });
      doc.end();

    });

    return pdfBuffer;
  }
}

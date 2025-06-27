// utils/pdfGenerator.js
import pdfMake from 'pdfmake/build/pdfmake'
export function generatePDFWithLogo(data, logoBase64) {
  const docDefinition = {
    content: [
      // Logo e cabeçalho
      {
        columns: [
          {
            image: logoBase64, // Base64 da imagem
            width: 100,
            height: 50
          },
          {
            text: 'EMPRESA XYZ\nRelatório Gerencial',
            style: 'headerWithLogo',
            alignment: 'right'
          }
        ]
      },
      
      // Resto do conteúdo...
    ],
    
    styles: {
      headerWithLogo: {
        fontSize: 14,
        bold: true,
        color: '#2c3e50'
      }
    }
  }
  
  return pdfMake.createPdf(docDefinition)
}
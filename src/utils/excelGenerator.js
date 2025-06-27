// utils/excelGenerator.js
import * as XLSX from 'xlsx'

export function exportAdvancedExcel(data, filename) {
  const worksheet = XLSX.utils.aoa_to_sheet(data)
  
  // Aplicar estilos (limitado no XLSX)
  const range = XLSX.utils.decode_range(worksheet['!ref'])
  
  // Formatação de células
  for (let row = range.s.r; row <= range.e.r; row++) {
    for (let col = range.s.c; col <= range.e.c; col++) {
      const cellAddress = XLSX.utils.encode_cell({ r: row, c: col })
      
      if (row === 0) {
        // Cabeçalho em negrito
        if (!worksheet[cellAddress]) continue
        worksheet[cellAddress].s = {
          font: { bold: true },
          fill: { fgColor: { rgb: "3498db" } }
        }
      }
    }
  }
  
  // Ajustar largura das colunas
  worksheet['!cols'] = [
    { width: 10 },  // ID
    { width: 30 },  // Produto
    { width: 20 },  // Vendedor
    { width: 15 },  // Valor
    { width: 12 }   // Data
  ]
  
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Dados')
  XLSX.writeFile(workbook, filename)
}
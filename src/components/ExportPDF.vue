<template>
  <div class="q-pa-md">
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">Relatório de Vendas</div>
        <div class="text-subtitle2">Visualização dos dados</div>
      </q-card-section>
      
      <q-card-section>
        <q-table
          :rows="salesData"
          :columns="columns"
          row-key="id"
          hide-pagination
          :rows-per-page-options="[0]"
        />
      </q-card-section>
    </q-card>
    
    <q-btn 
      color="red" 
      icon="picture_as_pdf" 
      label="Gerar PDF"
      @click="generatePDF"
    />
  </div>
</template>

<script>
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'

// Configurar fontes
//pdfMake.vfs = pdfFonts.pdfMake.vfs
pdfMake.vfs = pdfFonts
export default {
  name: 'ExportPDF',
  data() {
    return {
      columns: [
        { name: 'id', label: 'ID', field: 'id', align: 'left' },
        { name: 'produto', label: 'Produto', field: 'produto', align: 'left' },
        { name: 'vendedor', label: 'Vendedor', field: 'vendedor', align: 'left' },
        { name: 'valor', label: 'Valor', field: 'valor', format: val => `R$ ${val}` },
        { name: 'data', label: 'Data', field: 'data' }
      ],
      salesData: [
        { id: 1, produto: 'Notebook Dell', vendedor: 'João Silva', valor: 2500.00, data: '2024-01-15' },
        { id: 2, produto: 'Mouse Logitech', vendedor: 'Maria Santos', valor: 85.50, data: '2024-01-16' },
        { id: 3, produto: 'Teclado Mecânico', vendedor: 'Pedro Costa', valor: 350.00, data: '2024-01-17' },
        { id: 4, produto: 'Monitor 24"', vendedor: 'Ana Oliveira', valor: 800.00, data: '2024-01-18' }
      ]
    }
  },
  methods: {
    generatePDF() {
      // Preparar dados da tabela para o PDF
      const tableBody = [
        // Cabeçalho da tabela
        [
          { text: 'ID', style: 'tableHeader' },
          { text: 'Produto', style: 'tableHeader' },
          { text: 'Vendedor', style: 'tableHeader' },
          { text: 'Valor', style: 'tableHeader' },
          { text: 'Data', style: 'tableHeader' }
        ],
        // Dados da tabela
        ...this.salesData.map(row => [
          row.id.toString(),
          row.produto,
          row.vendedor,
          `R$ ${row.valor.toFixed(2)}`,
          row.data
        ])
      ]

      // Calcular total
      const total = this.salesData.reduce((sum, item) => sum + item.valor, 0)

      // Definir estrutura do PDF
      const docDefinition = {
        content: [
          // Cabeçalho
          {
            columns: [
              {
                text: 'RELATÓRIO DE VENDAS',
                style: 'header'
              },
              {
                text: `Data: ${new Date().toLocaleDateString('pt-BR')}`,
                style: 'subheader',
                alignment: 'right'
              }
            ]
          },
          
          // Linha divisória
          { text: '', margin: [0, 10, 0, 10] },
          
          // Tabela
          {
            table: {
              headerRows: 1,
              widths: ['auto', '*', '*', 'auto', 'auto'],
              body: tableBody
            },
            layout: {
              fillColor: function (rowIndex) {
                return (rowIndex % 2 === 0) ? '#f3f3f3' : null
              }
            }
          },
          
          // Total
          {
            text: `Total Geral: R$ ${total.toFixed(2)}`,
            style: 'total',
            margin: [0, 20, 0, 0]
          },
          
          // Rodapé
          {
            text: 'Relatório gerado automaticamente pelo sistema',
            style: 'footer',
            margin: [0, 30, 0, 0]
          }
        ],
        
        // Estilos
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            color: '#2c3e50'
          },
          subheader: {
            fontSize: 12,
            color: '#7f8c8d'
          },
          tableHeader: {
            bold: true,
            fontSize: 12,
            color: 'white',
            fillColor: '#3498db'
          },
          total: {
            fontSize: 14,
            bold: true,
            alignment: 'right',
            color: '#27ae60'
          },
          footer: {
            fontSize: 10,
            italics: true,
            alignment: 'center',
            color: '#95a5a6'
          }
        }
      }

      // Gerar e baixar PDF
      pdfMake.createPdf(docDefinition).download(`relatorio_vendas_${new Date().toISOString().split('T')[0]}.pdf`)
      
      this.$q.notify({
        color: 'red-4',
        textColor: 'white',
        icon: 'picture_as_pdf',
        message: 'PDF gerado com sucesso!'
      })
    }
  }
}
</script>
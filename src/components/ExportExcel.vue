<template>
  <div class="q-pa-md">
    <q-table
      title="Vendas do Mês"
      :rows="salesData"
      :columns="columns"
      row-key="id"
      class="q-mb-md"
    />
    
    <q-btn 
      color="green" 
      icon="download" 
      label="Exportar Excel"
      @click="exportToExcel"
    />
  </div>
</template>

<script>
import * as XLSX from 'xlsx'

export default {
  name: 'ExportExcel',
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
    exportToExcel() {
      // Preparar dados para o Excel
      const worksheetData = [
        // Cabeçalho
        ['ID', 'Produto', 'Vendedor', 'Valor', 'Data'],
        // Dados
        ...this.salesData.map(row => [
          row.id,
          row.produto,
          row.vendedor,
          row.valor,
          row.data
        ])
      ]

      // Criar worksheet
      const worksheet = XLSX.utils.aoa_to_sheet(worksheetData)
      
      // Criar workbook
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Vendas')

      // Exportar arquivo
      XLSX.writeFile(workbook, `vendas_${new Date().toISOString().split('T')[0]}.xlsx`)
      
      this.$q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'cloud_download',
        message: 'Excel exportado com sucesso!'
      })
    }
  }
}
</script>
<template>
  <q-page class="q-pa-md">
    <div class="text-h4 q-mb-lg text-center">
      📊 Demo: PDF e Excel no Frontend
    </div>
    
    <div class="row q-gutter-md">
      <div class="col-12 col-md-5">
        <ExportExcel />
      </div>
      
      <div class="col-12 col-md-5">
        <ExportPDF />
      </div>
    </div>
    
    <q-separator class="q-my-lg" />
    
    <div class="text-center">
      <p class="text-body1">
        ✨ Sem backend, sem complicação! ✨
      </p>
      <p class="text-caption text-grey-7">
        Geração de arquivos 100% no navegador usando Vue.js + Quasar
      </p>
    </div>
  </q-page>
</template>

<script>
import ExportExcel from 'components/ExportExcel.vue'
import ExportPDF from 'components/ExportPDF.vue'

export default {
  name: 'ExportDemo',
  components: {
    ExportExcel,
    ExportPDF
  }
}
</script>
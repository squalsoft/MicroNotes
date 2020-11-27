<template>
  <div class="notes">
    <h1>Заметка с общим доступом на чтение</h1>
    <div v-if="loading" class="loader-small"></div>
    <div v-if="text" class="note">      
      {{text}}
    </div>
    <div v-if="error" class="error">
      {{error}}
    </div>
  </div>
</template>
<script>
import {errorDetails} from "@/utils/error";

export default {
  data: function () {
    return {
      error: "",
      text: "",
      loading: true
    }
  },
  async mounted() {
    try {
      const response = await this.$axios.get("/api/notes/shared/" + this.$route.params.id);
      this.text = response.data.note.text;
      // Отображение пустой заметки
      if(!this.text) {
        this.text = " ";
      }
    } catch(err) {      
      this.error = errorDetails(err);
    } finally {
       this.loading = false;
    }
  }
}
</script>

<template>
  <div class="notes">
    <h1>Заметка с общим доступом на чтение</h1>
    <div v-if="text" class="note">      
      {{text}}
    </div>
  </div>
</template>
<script>

export default {
  data: function () {
    return {
      text: ""
    }
  },
  async mounted() {
      const response = await this.$axios.get("/api/notes/shared/" + this.$route.params.id);
      this.text = response.data.note.text;
      // Отображение пустой заметки
      if(!this.text) {
        this.text = " ";
      }    
  }
}
</script>

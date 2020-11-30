<template>
  <div class="notes">
    <h1>Мои заметки</h1>
    <div class="notes-container">      
      <input type="button" :disabled="$store.state.sys.loading"  
        @click="addNote" class="add-note" 
        title="Добавить заметку" value="+ Добавить заметку" />
      <Note v-for="note in notes" :key="note.id" :id="note.id" 
        v-model="note.text" @removed="removed"
        :shareId="note.shareId" />
      <br>  
      <input :disabled="$store.state.sys.loading"  
        type="button" @click="getNotes" class="load-more" value="Загрузить ещё" />
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import Note from '@/components/Note.vue'

export default {
  components: {
    Note
  },
  data: function () {
    return {     
      notes: [],
      showLoadMore: false
    }
  },
  async mounted() {
    await this.getNotes();
  },
  methods: {
    async getNotes() {
      const response = await this.$axios.get("/api/notes/my/" + this.notes.length);
      for(const note of response.data.notes) {
        this.notes.push(note);
      }

      this.showLoadMore = response.data.totalNotes > this.notes.length;     
    },
    removed(id) {
      // Убираем из списка
      this.notes = this.notes.filter(note => note.id !== id);    
    },   
    async addNote() {
      // Если добавилась в БД, то добавляем в коллекцию
      const response = await this.$axios.post("/api/notes/create",
      {
        text: ""
      });
      const newNoteId = response.data.noteId;
      this.notes.unshift({
        id: newNoteId,
        text: ""
      });     
    }
  }
}
</script>

<style scoped>
.notes-container {
  text-align: center;
}
.add-note {
  margin-bottom: 10px;
}
</style>
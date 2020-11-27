<template>
  <div class="notes">
    <h1>Мои заметки</h1>
    <div class="notes-container">      
      <div v-if="error" class="error">
        {{error}}
      </div>
      <input type="button" :disabled="loading" @click="addNote" class="add-note" title="Добавить заметку" value="+" />
      <Note v-for="note in notes" :key="note.id" :id="note.id" 
        v-model="note.text" @removed="removed"
        :shareId="note.shareId" />
      <br>
      <div v-if="loading" class="loader-small"></div>      
      <input v-else type="button" @click="getNotes" class="load-more" value="Загрузить ещё" />
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import Note from '@/components/Note.vue'
import {errorDetails} from "@/utils/error";

export default {
  components: {
    Note
  },
  data: function () {
    return {
      error: "",      
      loading: true,
      notes: []
    }
  },
  async mounted() {
    await this.getNotes();
  },
  methods: {
    async getNotes() {
      this.loading = true;
      try {
        const response = await this.$axios.get("/api/notes/my/" + this.notes.length);
        for(const note of response.data.notes) {
          this.notes.push(note);
        }
      } catch(err) {      
        this.error = errorDetails(err);
      } finally {
        this.loading = false;
      }
    },
    removed(id) {
      // Убираем из списка
      this.notes = this.notes.filter(note => note.id !== id);    
    },   
    async addNote() {
      // Если добавилась в БД, то добавляем в коллекцию
      this.loading = true;
      try {
        const response = await this.$axios.post("/api/notes/create",
        {
          text: ""
        });
        const newNoteId = response.data.noteId;
        this.notes.unshift({
          id: newNoteId,
          text: ""
        });
      } catch(err) {      
        this.error = errorDetails(err);
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style scoped>
.notes-container {
  text-align: center;
}
.add-note {
  border-radius: 50%;
  width: 32px;
  height: 32px;
  margin-bottom: 10px;
}
</style>
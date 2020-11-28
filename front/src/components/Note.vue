<template>
  <div class="note-component">
    <div class="note editable" role="textbox" @input="update"
        contenteditable ref="noteInput">    
    </div>        

    <input type="image" title="Удалить" @click="del" :disabled="loading" src="/delete.png" 
      height="30px" class="del-btn hidden"/> 
    <input v-if="!shareId" type="image" title="Открыть общий доступ"
      @click="share" :disabled="loading" src="/share.png" 
      height="30px" class="share-btn hidden"/>
    <div v-if="shareUrl">
      <i>Ссылка для общего доступа:</i><br>
      {{shareUrl}}
    </div>
    <div v-if="error" class="error">
      {{error}}
    </div>
  </div>
</template>

<script>
import {errorDetails} from "@/utils/error";

export default {
  props: {
    id: Number,
    value: String,
    shareId: String
  },
  data: function () {
    return {
      error: "",      
      loading: false,
      text: this.value,
      shapshotText: this.value,
      shareUrl: ""
    }
  },
  mounted() {
    this.$refs.noteInput.innerText = this.text;
    if(this.shareId) {
      this.setShareUrl(this.shareId);
    }

    // Фокус
    if(!this.text) {
      this.$refs.noteInput.focus();
    }

    // Автосохранение
    setInterval(this.checkAndSave, 1000);
  },
  methods: { 
    async checkAndSave() {
      if(this.text !== this.shapshotText) {
        this.error = "";
        this.shapshotText = this.text;
        // Сохраняем
        try {
          await this.$axios.post("/api/notes/update/" + this.id, {
              text: this.text
            });                  
        } catch(err) {      
          this.error = errorDetails(err);
        } finally {
          this.loading = false;
        }
      }
    },  
    // Обновление содержимого элемента заметки
    update(event) {            
      this.text = event.target.innerText;
    },
    setShareUrl(shareId) {
      this.shareUrl = window.location.origin + "/" +
        this.$router.resolve({ name: 'Shared', 
          params: { id: shareId } }).href;
    },
    async share() {
      // Даём общий доступ
      this.loading = true;
      this.error = "";
      try {
        const response = await this.$axios.post("/api/notes/share/" + this.id);        
        this.setShareUrl(response.data.shareId);
      } catch(err) {      
        this.error = errorDetails(err);
      } finally {
        this.loading = false;
      }     
    },
    async del() {
      // Удаляем
      this.loading = true;
      this.error = "";
      try {
        await this.$axios.post("/api/notes/delete/" + this.id);
        this.$emit("removed", this.id);
      } catch(err) {      
        this.error = errorDetails(err);
      } finally {
        this.loading = false;
      }     
    }
  },
  watch: {

  }
}
</script>

<style scoped>
.note-component {
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
  background-color: rgb(238, 238, 238);
  position: relative;  
}
.editable {
  margin-top: 15px;
  margin-bottom: 15px;
  text-align: justify;
}
.del-btn {
    position: absolute;
    left: 101%;
    top: 40px;
}
.share-btn {
  position: absolute;
  left: 101%;
  top: 0;
}
.hidden {
  visibility: hidden;
  transition-duration: 1s;
  transition-property: visibility;
}
.note-component:hover .hidden{
  visibility: visible;    
}
</style>

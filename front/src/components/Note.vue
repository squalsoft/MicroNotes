<template>
  <div class="note-component">
    <div class="note editable" role="textbox" @input="update"
        contenteditable ref="noteInput">    
    </div>        

    <input :disabled="$store.state.sys.loading"
      @click="del" src="/delete.png" 
      type="image" title="Удалить" 
      height="30px" class="del-btn hidden"/> 
    <input v-if="showShareButton" 
      :disabled="$store.state.sys.loading"
      @click="share"
      type="image" title="Открыть общий доступ"
      src="/share.png" 
      height="30px" class="share-btn hidden"/>
    <div v-if="shareUrl">
      <i>Ссылка для общего доступа:</i><br>
      {{shareUrl}}
    </div>
  </div>
</template>

<script>

export default {
  props: {
    id: Number,
    value: String,
    shareId: String
  },
  data: function () {
    return {
      text: this.value,
      shapshotText: this.value,
      shareUrl: "",
      showShareButton: true
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
        this.shapshotText = this.text;
        // Сохраняем        
        await this.$axios.post("/api/notes/update/" + this.id, {
            text: this.text
          });                         
      }
    },  
    // Обновление содержимого элемента заметки
    update(event) {            
      this.text = event.target.innerText;
    },
    setShareUrl(shareId) {
      this.showShareButton = false;
      this.shareUrl = window.location.origin + "/" +
        this.$router.resolve({ name: 'Shared', 
          params: { id: shareId } }).href;
    },
    async share() {
      // Даём общий доступ
      const response = await this.$axios.post("/api/notes/share/" + this.id);  
      this.setShareUrl(response.data.shareId);    
    },
    async del() {
      // Удаляем           
      await this.$axios.post("/api/notes/delete/" + this.id);
      this.$emit("removed", this.id);    
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

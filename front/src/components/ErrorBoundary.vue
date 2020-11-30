<template>
  <div>
    <div class="error-global" v-if="showError">{{ err }}</div>
    <slot></slot>
  </div>
</template>

<script>
// Глобальный обработчик ошибок
import {errorDetails} from "@/utils/error";

export default {
  //   props: {
  //     stopPropagation: Boolean
  //   },
  data() {
    return {
      err: "",
      vm: null,
      info: null,
      showError: false,
      timerId: null
    };
  },
  errorCaptured(err, vm, info) {
    console.log(err);
    this.err = errorDetails(err);    
    // Устанавливаем отображение ошибки на время
    this.showError = true;

    if(this.timerId) {
      // Отменяем предыдущий таймаут
      clearTimeout(this.timerId);
    }
    this.timerId = setTimeout(()=>{this.showError = false;}, 4000);

    // Системная информация
    this.vm = vm;
    this.info = info;
    // Заканчиваем обработку ошибок здесь
    // Всегда отключаем индикатор загрузки при ошибке
    this.$store.commit("sys/setLoader", false);
    return false;
  },
};
</script>

<style scoped>
</style>
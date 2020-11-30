<template>
  <div>
    <div class="error-global" v-if="$store.state.sys.err">{{ $store.state.sys.err }}</div>
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
      vm: null,
      info: null,
      timerId: null
    };
  },
  errorCaptured(err, vm, info) {
    console.log(err);
    const errMsg = errorDetails(err);   
    this.$store.commit("sys/setError", errMsg);

    // Устанавливаем отображение ошибки на время
    if(this.timerId) {
      // Отменяем предыдущий таймаут
      clearTimeout(this.timerId);
    }
    this.timerId = setTimeout(()=>{this.$store.commit("sys/setError", "");}, 5000);

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
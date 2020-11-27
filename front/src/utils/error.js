// Детализация ошибки
export function errorDetails(err) {
    let msg = "Ошибка сервера";
    if (err.response && err.response.data) {
      msg = err.response.data.message || err.response.status;
    }
    console.log(err);
    return `Ошибка: ${msg}`;
  }
  
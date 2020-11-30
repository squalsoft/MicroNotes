// Детализация ошибки
export function errorDetails(err) {
  let msg = "Ошибка. Попробуйте повторить действие.";
  if (err.message) {
    msg = "Ошибка: " + err.message;
  }
  if (err.response && err.response.data) {
    msg = "Ошибка: " + err.response.data.message || err.response.status;
  }
  console.log(err);
  return msg;
}

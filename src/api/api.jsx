//Города
export function getCities(item) {
  return fetch(`https://students.netoservices.ru/fe-diplom/routes/cities?name=${item}`)
    .then(response => response.json())
    .then(data => data);
  }

//Подписка
export function getSubcribe(email) {
  return fetch(`https://students.netoservices.ru/fe-diplom/subscribe?email=${email}`, {
    method: 'POST',
    body: ''
  })
    .then(response => response.json())
    .then(data => data);
}

//Маршруты билетов
export function getRoutes(params) {
  return fetch(`https://students.netoservices.ru/fe-diplom/routes?${params}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Ошибка ${response.status}`);
      }
      return response.json();
    })
    .then(data => data);
}

//Последние
export function getLast() {
  return fetch('https://students.netoservices.ru/fe-diplom/routes/last')
    .then(response => response.json())
    .then(data => data);
}

//Вагон схема
export function getSeats(id) {
  return fetch(`https://students.netoservices.ru/fe-diplom/routes/${id}/seats`)
    .then(response => response.json())
    .then(data => data);
}

//Отправка заказа
export function sendOrder(order) {
  return fetch('https://students.netoservices.ru/fe-diplom/order', {
    method: 'POST',
    body: order
  })
    .then(response => response.json())
    .then(data => data);
}
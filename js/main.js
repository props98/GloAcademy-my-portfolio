"use strict";

//* Функция для обработки формы
const ajaxSend = async(formData) => {
    const fetchResp = await fetch('telegram.php', { //указывает обработчик формы - telegram.php
        method: "POST", // метод отправки формы
        body: formData, // что будет внтри - содержимое формы
    });
    if (!fetchResp.ok) { // если ошибка
        // выводим статус ошибки
        throw new Error(`Ошибка по адресу ${url}, стутс ошибки ${fetchResp.status}`);
    }
    // если все хорошо возращаем ответ сервера
    return await fetchResp.text();
};

const forms = document.querySelectorAll('form'); // находим все формы
forms.forEach((form) => {   // для каждой формы
    form.addEventListener('submit', function(evt) { 
        evt.preventDefault();
        const formData = new FormData(this);
        console.log(formData);

        ajaxSend(formData) // передаем данные из формы в оброботчик
            .then((response) => { // если все ок ...
                this.innerHTML = 'Спасибо, заявку получил';
                form.reset(); // очищение формы
            })
            .catch((err) => console.error(err)); //! Если оштбка выводим в консоль
    });
});
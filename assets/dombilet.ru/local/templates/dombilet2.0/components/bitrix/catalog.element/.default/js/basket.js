window.onload = function () {
    const clearButton = document.querySelector('.cart-bottom__btn-clear');
    if (clearButton) {
        clearButton.addEventListener('click', function () {
            const dopCount = 0, dopSum = 0, count_ = 0;

            fetch("/api/controllers/basket/clear/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded", // или application/json, если сервер ожидает JSON
                },
                body: new URLSearchParams({ data: true })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'error') {
                        data.errors.forEach(item => {
                            console.log(item.message);
                        });
                    }

                    if (data.status === 'success') {
                        if (data.data && data.data.length)
                            window.ymEcommerceRemove(data.data);

                        updateCountProducts({
                            sum: 0,
                            count: 0,
                            dopCount: 0,
                            dopSum: 0
                        });

                        clearAllTickets();
                        clearSelectedAdditionalServices();
                        // location.reload();
                    }
                })
                .catch(error => {
                    console.error('Ошибка запроса:', error);
                });
        });
    }
};
function formatNumberWithSpaces(num) {return num.toString().split('.').map((part, i) => i === 0 ? part.replace(/\B(?=(\d{3})+(?!\d))/g, " ") : part).join('.');}
// BEGIN ФУНКЦИЯ ДЛЯ ИЗМЕНЕНИЯ ДАННЫХ О КОЛИЧЕСТВЕ ТОВАРОВ В КОРЗИНЕ НА СТРАНИЦЕЯ
// updateCountProducts({sum: 5, count: 7, dopCount: 1, dopSum: 10})
function updateCountProducts(dataCart) {
    // console.log(dataCart);

    const get = selector => document.querySelector(selector);
    const getAll = selector => document.querySelectorAll(selector);
    const show = el => el && (el.style.display = 'flex');
    const hide = el => el && (el.style.display = 'none');
    const setText = (el, text) => el && (el.textContent = text);
    const setHTML = (el, html) => el && (el.innerHTML = html);

    const count = dataCart.count ?? 0;
    const sum = dataCart.sum ?? 0;
    const dopCount = dataCart.dopCount ?? 0;
    const dopSum = dataCart.dopSum ?? 0;

    setText(get('#all_tickets'), `Выбрано билетов: ${count}`);
    setText(get('#all_tickets_sum'), formatNumberWithSpaces(sum - dopSum));
    setText(get('#all_dop'), `Дополнительные услуги: ${dopCount}`);
    setText(get('#all_dop_sum'), formatNumberWithSpaces(dopSum));
    setText(get('#total_sum span'), formatNumberWithSpaces(sum));

    getAll('.cart-sticker').forEach(el => setText(el, count + dopCount));

    getAll('.tickets_sum').forEach(el => (count > 0 ? show(el) : hide(el)));
    getAll('.add_sum').forEach(el => (dopCount > 0 ? show(el) : hide(el)));

    // Прячу/показываю плашку корзины
    getAll('.page__bottom-cart').forEach(el =>
        (sum > 0 || dopSum > 0) ? el.style.display = 'block' : el.style.display = 'none'
    );

    // Добавляю колчиство в плашку сверху
    getAll('.mobile_cart').forEach(el => {
        el.innerHTML = count > 0 ? count : 0;
        el.classList.toggle('active', count > 0);
    });

    // Прячу/показываю блок с данными о доп. услугах
    const dopServiceBlock = get('.bottom-cart__dop_service');
    if (dopCount > 0 && dopSum > 0) {
        setHTML(get('.bottom-cart__dop_service__price .bottom-cart__summa'), dopSum);
        setText(get('.bottom-cart__dop_service__text-count span'), dopCount);
        if (dopServiceBlock) dopServiceBlock.style.display = 'block';
    } else {
        if (dopServiceBlock) dopServiceBlock.style.display = 'none';
    }

    // Обновление формы на странице корзины
    const sumInput = get('input[name="sum"]');
    const peopleInput = get('input[name="people"]');
    if (sumInput && peopleInput) {
        sumInput.value = sum + dopCount;
        peopleInput.value = count;
        const totalEl = get('.basket__total');
        if (totalEl) totalEl.innerHTML = `ИТОГО ${sum} ₽`;
    }

    window.dispatchEvent(new CustomEvent('basket-updated'));
}

// Функция для сброса всех выделений (объединяет обе функции)
function clearAllTickets() {
    clearSelectedTickets();
    clearSelectedTicketsBySeats();
}

// Функция для очистки выбранных билетов по секторам
function clearSelectedTickets() {
    const popup = document.querySelector('#buy-ticket-popup-group');
    if (!popup) return;

    const seatsValue = popup.querySelector('.popup-group__seats-cvalue');
    const countFreeSpan = popup.querySelector('.popup-group__count-free span');
    const minusButton = popup.querySelector('.popup-group__seats-control--minus');
    const plusButton = popup.querySelector('.popup-group__seats-control--plus');
    const maxCount = Number.parseInt(popup.dataset.maxCount, 10);

    if (seatsValue) seatsValue.textContent = '0';
    if (countFreeSpan && Number.isFinite(maxCount)) countFreeSpan.textContent = maxCount;
    if (minusButton) minusButton.classList.add('disabled');
    if (plusButton && Number.isFinite(maxCount)) plusButton.classList.toggle('disabled', maxCount < 1);
}

// Функция для очистки выбранных билетов по местам
function clearSelectedTicketsBySeats() {
    // Билеты по местам на схеме
    document.querySelectorAll('g.active.selected, #mapa g.active.selected.only-selected').forEach(el => {
        el.classList.remove('selected', 'only-selected');
    });

    // Билеты по местам в списке
    document.querySelectorAll('.ticket-row_list-item.selected, .ticket-row_list-item.selected.only-selected').forEach(el => {
        el.classList.remove('selected', 'only-selected');
    });
}

function clearSelectedAdditionalServices(){

    // Сбросить data-count у контроллеров через jQuery (так как данные хранятся в jQuery)
    // Если файл на JS, но jQuery все равно подключен, используем его только для сброса данных
    $('.bottuns-above-scheme__item.bottuns-above-scheme__item--to-buy.active').data('count', 0);
        
    document.querySelectorAll('.bottuns-above-scheme__item.bottuns-above-scheme__item--to-buy.active').forEach(el => {
        el.classList.remove('active');
    });


    document.querySelectorAll('.bottuns-above-scheme__buy-count').forEach(el => {
        el.textContent = '0';
    });
}


const currentDate = new Date();

const calendar = document.getElementById("calendar");

async function generateEventCalendar(){
   
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    let dayCounter = 1;


    let response = await fetch('http://fcgoodod.beget.tech/server/allEvents');

    let {body} = await response.json();
    let events = body;
    console.log(body);

    for (let i = 0; i < 6; i++) {
        const row = document.createElement("tr");

        for (let j = 0; j < 7; j++) {
            const cell = document.createElement("td");

            if (i === 0 && j < new Date(currentYear, currentMonth, 1).getDay()) {
                // Пустые ячейки до начала месяца
                cell.textContent = "";
            } else if (dayCounter <= daysInMonth) {
                cell.textContent = `${dayCounter} ${getMonthName(currentDate)}`;
                cell.classList.add('border');

                if(events){
                    const event = events.find(e => {
                        let date = new Date(e.event_time);
                        if(date.getDate() === dayCounter){
                            
                            return e;
                        }
                        
                    });
                    if (event) {
                        cell.innerHTML = `
                            <div>
                                <span>${dayCounter} ${getMonthName(currentDate)}</span>
                                <span class="name">${event.event_name}</span>
                                <span class="small">${event.event_start}</span>
                            </div>
                        `;
                        cell.dataset.id = event.event_id;
                        cell.classList.add("has-event");
                        cell.onclick = function () {
                            openModal(event);
                        };
                    }
                }
                
                dayCounter++;
            } else {
                // Пустые ячейки после окончания месяца
                cell.textContent = "";
            }

            row.appendChild(cell);
        }

        calendar.appendChild(row);
    }
}

    // Функция открытия модального окна
    function openModal(event) {


        localStorage.setItem('event_id', event.event_id);
        const modal = document.getElementById("eventModal");
        const title = document.getElementById("eventTitle");
        title.innerHTML = `
            <div>
                <h1>${event.event_name}</h1>
                <p>Начало события: ${event.event_start}</p>
                <p>Дата: ${new Date(event.event_time).toLocaleDateString()}</p>
            </div>
        
        
        
        `;
        modal.style.display = "flex";
    }

    // Функция закрытия модального окна
    function closeModal() {
        const modal = document.getElementById("eventModal");
        modal.style.display = "none";
    }

    // Функция удаления события (здесь может быть ваш запрос к серверу для удаления)
    async function deleteEvent() {
        try{

            let formData = new FormData()
            formData.append('event_id', localStorage.getItem('event_id'));
            let response = await fetch('http://fcgoodod.beget.tech/server/deleteEvent', {
                method: 'post',
                body: formData
            })
            if(response.status !== 200){
                throw new Error('Возникла ошибка с удалением');
            }
            renderCalendar();
            alert("Событие удалено");
        }
        catch(e){
            alert(e.message);
        }
        


       
        closeModal();
    }

    // Получение названия месяца по его номеру
    function getMonthName(date) {

        let name = Intl.DateTimeFormat('ru-Ru', {
            month: 'long'
        }).format(date)


        if(name[name.length - 1] === 'ь' || name[name.length - 1] === 'й'){
            name = name.replace(/[ьй]/, 'я');
        }
        else{
            name += 'a';
        }

        return name;
    }

    async function renderCalendar(){
        calendar.innerHTML = `
        <tr>
            <th>Пн</th>
            <th>Вт</th>
            <th>Ср</th>
            <th>Чт</th>
            <th>Пт</th>
            <th>Сб</th>
            <th>Вс</th>
        </tr>
        
        `
        generateEventCalendar();
    }


window.addEventListener('DOMContentLoaded', () => {
    generateEventCalendar();
})


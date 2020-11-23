// eslint-disable-next-line strict
"use strict";

const filterByType = (
    type,
    ...values //объявление функции с параметрами type и всеми возможными параметрами в массиве values
  ) => values.filter((value) => typeof value === type), //к массиму values применяется метод filter, и в итоге мы получаем только параметры с типом type
  hideAllResponseBlocks = () => {
    //оьъявление функции hideAllResponseBlocks
    const responseBlocksArray = Array.from(
      //переменной responseBlocksArray присваивается массив объектов с классом dialog__response-block
      document.querySelectorAll("div.dialog__response-block")
    );
    responseBlocksArray.forEach((block) => (block.style.display = "none")); //каждый объект с массива responseBlocksArray принимает css стиль display: none;
  },
  showResponseBlock = (blockSelector, msgText, spanSelector) => {
    //объявление функции showResponseBlock с параметрами blockSelector, msgText, spanSelector
    hideAllResponseBlocks(); //вызывается функция hideAllResponseBlocks, со страницы исчезают все объекты с классом dialog__response-block
    document.querySelector(blockSelector).style.display = "block"; //объект с селектором, который будет передан первым параметром принимают 
                                                                  //css стиль display: block и станут видны на страницу;
    if (spanSelector) {
      //если селектор, переданный параметром spanSelector существует в DOM, то будет выполнен код в фигурных скобках
      document.querySelector(spanSelector).textContent = msgText; //селектор, переданный параметром spanSelector будет содержать текст переменно msgText
    }
  },
  showError = (
    msgText //объявление функции showError  с параметром msgText
  ) => showResponseBlock(".dialog__response-block_error", msgText, "#error"), //вызов функции showResponseBlock с тремя параметрами
  //вызывается функция hideAllResponseBlocks, со страницы исчезают все объекты с классом dialog__response-block
  //объект с селектором, .dialog__response-block_error принимает css стиль display: block и становится виден на странице;
  //если в DOM существует объект с идентификатором error, то в нем будет записан текст - msgText
  showResults = (
    msgText //объявление функции showResults  с параметром msgText
  ) => showResponseBlock(".dialog__response-block_ok", msgText, "#ok"), //вызов функции showResponseBlock с тремя параметрами
  //вызывается функция hideAllResponseBlocks, со страницы исчезают все объекты с классом dialog__response-block
  //объект с селектором, .dialog__response-block_ok принимает css стиль display: block и становится виден на странице;
  //если в DOM существует объект с идентификатором ok, то в нем будет записан текст - msgText
  showNoResults = () => showResponseBlock(" .dialog__response-block_no-results"), //объявление функции showNoResults
  // и присваивание ей значения функции showResponseBlock с параметром-классом .dialog__response-block_no-results 
  tryFilterByType = (type, values) => { //объявление функции tryFilterByType с параметрами type, values
    try {
      //выполнение инструкции в блоке try
      const valuesArray = eval(`filterByType('${type}', ${values})`).join(", "); //запуск функции filterByType,
      // которая передаёт в метод eval список параметров с типом type. eval являет собой результат выполнения последней инструкции.
      const alertMsg = valuesArray.length //alertMsg равна длине строки valuesArray
        ? `Данные с типом ${type}: ${valuesArray}` //если есть данные с определённым типом, то выведется строка из этих данных
        : `Отсутствуют данные типа ${type}`; //если данных нет, то выведется следующее сообщение;
      showResults(alertMsg); //вызов функции showResults c параметром alertMsg
    } catch (e) {
      //если происходит ошибка в блоке try, выполняется блок catch
      showError(`Ошибка: ${e}`); //вызов функции showError
    }
  };



const filterButton = document.querySelector("#filter-btn");//присваивание объекта с идентификатором filter-btn переменной filterButton

filterButton.addEventListener("click", (e) => {
  //навешивание события на объект filterButton, которое будет при клике на объект исполнять функцию
  const typeInput = document.querySelector("#type"); //присваивание объекта с идентификатором type переменной typeInput
  const dataInput = document.querySelector("#data"); //присваивание объекта с идентификатором data переменной dataInput

  if (dataInput.value === "") {
    //если в поле ввода нет символом, то будем вызван код из фигурных скобок
    dataInput.setCustomValidity("Поле не должно быть пустым!"); //  устанавливает  специальное сообщение на dataInput "Поле не должно быть пустым!"
    showNoResults(); //вызов функции showNoResults
  } else {
    dataInput.setCustomValidity(""); //  устанавливает в специальное сообщение на dataInput пустую строку
    e.preventDefault(); //запрещает браузеру выполнять стандартные действия
    tryFilterByType(typeInput.value.trim(), dataInput.value.trim()); //запуск функции tryFilterByType,
    // c параметрами, равными введённым данным typeInput и dataInput, которые предварительно обработанны методом trim(), 
    //удаляющим  пробельные символы с начала и конца строки//
  }
});

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const select = document.getElementById("cars"),
    output = document.getElementById("output");

  select.addEventListener("change", () => {
    try {
      const getCar = () =>
        new Promise((resolve, reject) => {
          const request = new XMLHttpRequest();
          request.open("GET", "./cars.json");

          request.addEventListener("readystatechange", () => {
            if (request.readyState !== 4) {
              return;
            }
            if (request.status === 200) {
              const data = JSON.parse(request.responseText);
              resolve(data);
            } else {
              reject(request.status);
            }
          });

          request.setRequestHeader("Content-type", "application/json");
          request.send();
        });
      const outputCars = (data) => {
        data.cars.forEach((item) => {
          if (item.brand === select.value) {
            const { brand, model, price } = item;
            output.innerHTML = `Тачка ${brand} ${model} <br>
                      Цена: ${price}$`;
          }
        });
      };

      getCar()
        .then(outputCars)
        .catch((error) => console.warn(`Что-то пошло не так: ${error}`));
    } catch (e) {
      console.warn(e.name);
    }
  });
});

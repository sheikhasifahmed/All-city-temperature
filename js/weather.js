const showTemp = document.getElementById("show-temp");
const inputSearch = document.getElementById("input-search");
const btnSearch = document.getElementById("btn-search");
const errorMessage = document.getElementById("err-msg");
btnSearch.addEventListener("click", function () {
  search();
});

function search() {
  if (inputSearch.value == "") {
    errorMessage.style.display = "block";
    errorMessage.innerText = `No input detected!
    Please enter a valid city name.
    Then, click the button again.`;
    showTemp.style.display = "none";
  } else {
    errorMessage.style.display = "none";

    fetch(
      `HTTPS://api.openweathermap.org/data/2.5/weather?q=${inputSearch.value}&appid=78b8f392b73647a3a7942b1c1e4b575f`
    )
      .then((res) => res.json())
      .then((data) => showData(data))
      .catch(() => {
        errorMessage.style.display = "block";
        errorMessage.innerText = `No city found by the name you inputed!
        Please enter a valid city name.
        Also, check your spelling.`;
        showTemp.style.display = "none";
        inputSearch.value = "";
      });
  }
}

function showData(data) {
  showTemp.style.display = "block";
  const cityName = document.getElementById("city-name");
  const temp = document.getElementById("temp");
  const maxTemp = document.getElementById("max-temp");
  const minTemp = document.getElementById("min-temp");
  const feelsLike = document.getElementById("feels-like");
  const humidity = document.getElementById("humidity");
  const sunrise = document.getElementById("sunrise");
  const sunset = document.getElementById("sunset");
  const status = document.getElementById("status");
  const icon = document.getElementById("icon");
  console.log(data);
  cityName.innerText = data.name;
  status.innerText = data.weather[0].main;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
  );
  sunrise.innerText = unixToLocal(data.sys.sunrise);
  sunset.innerText = unixToLocal(data.sys.sunset);
  temp.innerText = kelToCel(data.main.temp);
  feelsLike.innerText = kelToCel(data.main.feels_like);
  maxTemp.innerText = kelToCel(data.main.temp_max);
  minTemp.innerText = kelToCel(data.main.temp_min);
  humidity.innerText = data.main.humidity;
  inputSearch.value = "";
}

const kelToCel = (K) => (parseFloat(K) - 273).toFixed(2);

function unixToLocal(t) {
  const miliSeconds = t * 1000;
  const time = new Date(miliSeconds);
  const local = time.toLocaleTimeString("en-bd", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return local;
}

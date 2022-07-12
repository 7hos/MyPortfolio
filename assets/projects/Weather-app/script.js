// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// https://api.openweathermap.org/data/2.5/weather?q=London&appid=372cfd7d05fdfa9465a67fb18424aed6
// "apiKey": "372cfd7d05fdfa9465a67fb18424aed6"
// https://api.openweathermap.org/data/2.5/weather?q=London&unit=metric&appid=372cfd7d05fdfa9465a67fb18424aed6

let weather = {
    apiKey: "372cfd7d05fdfa9465a67fb18424aed6",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&units=metric&appid=" +
            this.apiKey
        )
            .then((response) => {
                if (!response.ok) {
                    alert("No weather found.");
                    throw new Error("No weather found.");
                }
                return response.json();
            })
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src =
            "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText =
            "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText =
            "Wind speed: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage =
            "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
};

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});

document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
            weather.search();
        }
    });

const citys = ["Rome", "London", "Berlin", "Paris", "Barcelona", "New York", "Istanbul", "Avon", "Cornwall", "Cumbria", "Devon", "Dorset", "Dublin", "Stockholm", "Naples", "Turin", "Venice", "Pisa", "Lisbon"];

const random = Math.floor(Math.random() * citys.length);

weather.fetchWeather(citys[random]);
<template>
  <q-page
    class="flex column"
    :class="bgClass"
  >
    <div class="col q-pt-lg q-px-md">
      <q-input
        v-model="search"
        placeholder="Search"
        dark
        borderless
        @keyup.enter="getWeatherBySearch"
      >
        <template v-slot:before>
          <q-icon
            name="my_location"
            @click="getLocation"
          />
        </template>

        <template v-slot:append>
          <q-btn
            round
            dense
            flat
            icon="search"
            @click="getWeatherBySearch"
          />
        </template>
      </q-input>
    </div>

    <template v-if="weatherData">
      <div class="col text-white text-center">
        <div class="text-h4 text-weight-light">{{ weatherData.name }}</div>
        <div class="text-h6 text-weight-light">
          {{ weatherData.weather[0].main }}
        </div>
        <div class="text-h1 text-weight-thin q-my-lg relative-position">
          <span>{{ Math.round(weatherData.main.temp) }}</span>
          <span class="text-h4 relative-position degree">&deg;C</span>
        </div>
      </div>

      <div class="col text-center">
        <img
          :src="`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`"
          alt="Bill"
        />
      </div>
    </template>
    <template v-else>
      <div class="col column text-center text-white">
        <div class="col text-h2 text-weight-thin">Quasar Weather</div>

        <q-btn
          class="col"
          flat
          @click="getLocation"
        >
          <q-icon
            left
            size="3em"
            name="my_location"
          ></q-icon>
          <div>Find My Location</div>
        </q-btn>
      </div>
    </template>

    <div class="col skyline"></div>
  </q-page>
</template>

<script>
export default {
  name: "PageIndex",
  data: function () {
    return {
      search: "",
      weatherData: null,
      latitude: null,
      longitude: null,
      apiUrl: "https://api.openweathermap.org/data/2.5/weather",
      apiKey: process.env.VUE_OPEN_WEATHER_API_KEY,
    };
  },
  computed: {
    bgClass() {
      if (this.weatherData) {
        if (this.weatherData.weather[0].icon.endsWith("n")) {
          return "bg-night";
        }
        return "bg-day";
      }
    },
  },
  methods: {
    getLocation() {
      this.$q.loading.show();

      if (this.$q.platform.is.electron) {
        this.$axios("https://freegeoip.app/json/").then((response) => {
          this.latitude = response.data.latitude;
          this.longitude = response.data.longitude;
          this.getWeatherByCoords();
        });
      } else {
        navigator.geolocation.getCurrentPosition((position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.getWeatherByCoords();
        });
      }
    },
    getWeatherByCoords() {
      this.$q.loading.show();
      this.$axios(
        `${this.apiUrl}?lat=${this.latitude}&lon=${this.longitude}&appid=${this.apiKey}&units=metric`
      ).then((response) => {
        this.weatherData = response.data;
        this.$q.loading.hide();
      });
    },
    getWeatherBySearch() {
      this.$q.loading.show();
      this.$axios(
        `${this.apiUrl}?q=${this.search}&appid=${this.apiKey}&units=metric`
      ).then((response) => {
        this.weatherData = response.data;
        this.search = "";
        this.$q.loading.hide();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.q-page {
  background: #159957; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to bottom,
    #155799,
    #159957
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to bottom,
    #155799,
    #159957
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  &.bg-night {
    background: #232526; /* fallback for old browsers */
    background: -webkit-linear-gradient(
      to bottom,
      #414345,
      #232526
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      to bottom,
      #414345,
      #232526
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }

  &.bg-day {
    background: #00b4db; /* fallback for old browsers */
    background: -webkit-linear-gradient(
      to bottom,
      #0083b0,
      #00b4db
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      to bottom,
      #0083b0,
      #00b4db
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
}

.degree {
  top: -45px;
}

.skyline {
  flex: 0 0 100px;
  background: url("../assets/skyline.png");
  background-size: contain;
  background-position: center bottom;
}
</style>
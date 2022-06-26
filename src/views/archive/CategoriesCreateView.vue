<template>
  <v-card flat>
    <v-tabs show-arrows v-model="tab">
      <v-tabs-slider></v-tabs-slider>

      <v-tab v-for="(i, index) in languages" :key="`${index}-${i}`"
        >{{ i.title }} ({{ i.code }})
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="(i, index) in languages" :key="`${index}-${i}`">
        <v-row class="mt-10">
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              v-model="categories.title[index]"
              label="Название категории"
              filled
            ></v-text-field>
          </v-col>
        </v-row>
      </v-tab-item>
    </v-tabs-items>
    <v-row class="mt-2">
      <v-col cols="12" sm="6" md="3">
        <v-btn @click="post()" color="primary" dark class="mr-3"
          >Добавить
        </v-btn>
        <v-btn>Сбросить</v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { HTTP } from "../main";

export default {
  data: () => ({
    tab: null,

    languages: [],

    categories: {
      lang: [],
      title: [],
    },
  }),

  created() {
    this.initialize();
  },

  methods: {
    post() {
      for (let key in this.languages) {
        this.categories.lang.push(this.languages[key].id);
      }
      HTTP.post("categories", this.categories)
        .then((response) => {
          console.log(response);
          this.initialize();
          this.$parent.refresh();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    initialize() {
      // get all languages
      HTTP.get("languages/activity")
        .then((response) => {
          this.languages = response.data;
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

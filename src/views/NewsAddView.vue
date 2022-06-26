<script>
export default {
  data: () => ({
    apiPath: "https://electroexpress.ru/api",
    domainPath: "https://electroexpress.ru/",

    imageMainFile: undefined,
    imageMainUrl: "",
    imageAddFile: undefined,
    imageAddUrl: "",
    imageDetailFile: undefined,
    imageDetailUrl: "",
    imageBannerFile: undefined,
    imageBannerUrl: "",

    imageGallery1File: undefined,
    imageGallery1Url: "",
    imageGallery2File: undefined,
    imageGallery2Url: "",
    imageGallery3File: undefined,
    imageGallery3Url: "",
    imageGallery4File: undefined,
    imageGallery4Url: "",

    fieldLabels: {
      id: "ID",
      title_rus: "Название (rus)",
      title_eng: "Название (eng)",
      text_preview_rus: "Текст анонса (rus)",
      text_preview_eng: "Текст анонса (eng)",
      text_full_rus: "Текст полный (rus)",
      text_full_eng: "Текст полный (eng)",
      title_add_rus: "Заголовок дополнительный (rus)",
      title_add_eng: "Заголовок дополнительный (eng)",
      subtitle_add_rus: "Подзаголовок дополнительный (rus)",
      subtitle_add_eng: "Подзаголовок дополнительный (eng)",
      photo_main: "Фотография основная",
      photo_add: "Фотография дополнительная",
      photo_detail: "Фотография для детальной",
      social: "Новость из социальной сети",
      social_link_rus: "Ссылка (rus)",
      social_link_eng: "Ссылка (eng)",
      photo_banner: "Баннер",
      gallery_title_rus: "Заголовок галереи (rus)",
      gallery_title_eng: "Заголовок галереи (eng)",
      photo_gallery_1: "Фотография для галереи 1",
      photo_gallery_2: "Фотография для галереи 2",
      photo_gallery_3: "Фотография для галереи 3",
      photo_gallery_4: "Фотография для галереи 4",
      created_at: "Дата создания",
      modified_at: "Дата изменения",
    },

    news: {
      title_rus: "",
      title_eng: "",
      text_preview_rus: "",
      text_preview_eng: "",
      text_full_rus: "",
      text_full_eng: "",
      title_add_rus: "",
      title_add_eng: "",
      subtitle_add_rus: "",
      subtitle_add_eng: "",
      photo_main: "",
      photo_add: "",
      photo_detail: "",
      social: "",
      social_link_rus: "",
      social_link_eng: "",
      photo_banner: "",
      gallery_title_rus: "",
      gallery_title_eng: "",
      photo_gallery_1: "",
      photo_gallery_2: "",
      photo_gallery_3: "",
      photo_gallery_4: "",
    },

    currentId: 0,

    loading: false,
  }),

  watch: {
    imageMainUrl() {
      this.news.imageMainUrl = this.imageMainUrl;
    },
    imageAddUrl() {
      this.news.imageAddUrl = this.imageAddUrl;
    },
    imageDetailUrl() {
      this.news.imageDetailUrl = this.imageDetailUrl;
    },
    imageBannerUrl() {
      this.news.imageBannerUrl = this.imageBannerUrl;
    },
    imageGallery1Url() {
      this.news.imageGallery1Url = this.imageGallery1Url;
    },
    imageGallery2Url() {
      this.news.imageGallery2Url = this.imageGallery2Url;
    },
    imageGallery3Url() {
      this.news.imageGallery3Url = this.imageGallery3Url;
    },
    imageGallery4Url() {
      this.news.imageGallery4Url = this.imageGallery4Url;
    },
  },

  methods: {
    onImageMainChange(file) {
      if (!file) {
        return;
      }

      const reader = new FileReader();

      reader.onload = (e) => {
        this.imageMainUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    },

    onImageAddChange(file) {
      if (!file) {
        return;
      }

      const reader = new FileReader();

      reader.onload = (e) => {
        this.imageAddUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    },

    onImageBannerChange(file) {
      if (!file) {
        return;
      }

      const reader = new FileReader();

      reader.onload = (e) => {
        this.imageBannerUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    },

    onImageDetailChange(file) {
      if (!file) {
        return;
      }

      const reader = new FileReader();

      reader.onload = (e) => {
        this.imageDetailUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    },

    onImageGallery1Change(file) {
      if (!file) {
        return;
      }

      const reader = new FileReader();

      reader.onload = (e) => {
        this.imageGallery1Url = e.target.result;
      };
      reader.readAsDataURL(file);
    },

    onImageGallery2Change(file) {
      if (!file) {
        return;
      }

      const reader = new FileReader();

      reader.onload = (e) => {
        this.imageGallery2Url = e.target.result;
      };
      reader.readAsDataURL(file);
    },

    onImageGallery3Change(file) {
      if (!file) {
        return;
      }

      const reader = new FileReader();

      reader.onload = (e) => {
        this.imageGallery3Url = e.target.result;
      };
      reader.readAsDataURL(file);
    },

    onImageGallery4Change(file) {
      if (!file) {
        return;
      }

      const reader = new FileReader();

      reader.onload = (e) => {
        this.imageGallery4Url = e.target.result;
      };
      reader.readAsDataURL(file);
    },

    postNews() {
      this.loading = true;

      this.axios
        .post(this.apiPath + "/news", this.news)
        .then((response) => {
          console.log(response);

          this.loading = false;

          this.$router.push("/news");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<template>
  <v-container>
    <v-row class="mb-7 mt-7">
      <v-btn to="/news">Назад</v-btn>
      <v-btn
        color="primary ml-5"
        :loading="loading"
        :disabled="loading"
        @click="postNews()"
        >Добавить</v-btn
      >
    </v-row>
    <v-row class="mb-7 mt-7">
      <v-col>
        <h3 class="mb-5">Добавление новости</h3>
      </v-col>
    </v-row>

    <h3 class="mb-7 mt-7">Социальная сеть</h3>
    <v-row>
      <v-checkbox
        :label="fieldLabels.social"
        v-model="news.social"
        v-bind:value="
          news.social == '1' ? (news.social = true) : (news.social = false)
        "
      ></v-checkbox>
    </v-row>
    <v-row v-if="news.social">
      <v-text-field
        :label="fieldLabels.social_link_rus"
        filled
        v-model="news.social_link_rus"
      ></v-text-field>
      <v-text-field
        class="ml-5"
        :label="fieldLabels.social_link_eng"
        filled
        v-model="news.social_link_eng"
      ></v-text-field>
    </v-row>

    <h3 class="mb-7 mt-7">Название новости (основной заголовок)</h3>
    <v-row>
      <v-text-field
        :label="fieldLabels.title_rus"
        filled
        v-model="news.title_rus"
      ></v-text-field>
      <v-text-field
        class="ml-5"
        :label="fieldLabels.title_eng"
        filled
        v-model="news.title_eng"
      ></v-text-field>
    </v-row>

    <h3 class="mb-7 mt-7">Текст новости</h3>
    <v-row>
      <v-textarea
        :label="fieldLabels.text_preview_rus"
        filled
        v-model="news.text_preview_rus"
      ></v-textarea>
      <v-textarea
        class="ml-5"
        :label="fieldLabels.text_preview_eng"
        filled
        v-model="news.text_preview_eng"
      ></v-textarea>
    </v-row>
    <v-row v-if="!news.social">
      <v-textarea
        :label="fieldLabels.text_full_rus"
        filled
        v-model="news.text_full_rus"
      ></v-textarea>
      <v-textarea
        class="ml-5"
        :label="fieldLabels.text_full_eng"
        filled
        v-model="news.text_full_eng"
      ></v-textarea>
    </v-row>

    <h3 class="mb-7 mt-7" v-if="!news.social">
      Доп.заголовки эффекта наведения (на странице списка новостей)
    </h3>
    <v-row v-if="!news.social">
      <v-text-field
        :label="fieldLabels.title_add_rus"
        filled
        v-model="news.title_add_rus"
      ></v-text-field>
      <v-text-field
        class="ml-5"
        :label="fieldLabels.title_add_eng"
        filled
        v-model="news.title_add_eng"
      ></v-text-field>
    </v-row>
    <v-row v-if="!news.social">
      <v-text-field
        :label="fieldLabels.subtitle_add_rus"
        filled
        v-model="news.subtitle_add_rus"
      ></v-text-field>
      <v-text-field
        class="ml-5"
        :label="fieldLabels.subtitle_add_eng"
        filled
        v-model="news.subtitle_add_eng"
      ></v-text-field>
    </v-row>

    <h3 class="mb-7 mt-7">Фотографии</h3>
    <v-row>
      <v-col class="col-photo-left" cols="12" sm="6" md="6">
        <v-img :src="imageMainUrl" max-height="400" contain></v-img>
        <v-file-input
          class="mt-5"
          small-chips
          truncate-length="50"
          :label="fieldLabels.photo_main"
          filled
          v-model="imageMainFile"
          @change="onImageMainChange"
        ></v-file-input>
      </v-col>
      <v-col
        class="col-photo-right"
        cols="12"
        sm="6"
        md="6"
        v-if="!news.social"
      >
        <v-img :src="imageAddUrl" max-height="400" contain></v-img>
        <v-file-input
          class="mt-5"
          small-chips
          truncate-length="50"
          :label="fieldLabels.photo_add"
          filled
          v-model="imageAddFile"
          @change="onImageAddChange"
        ></v-file-input>
      </v-col>
    </v-row>
    <v-row v-if="!news.social">
      <v-col class="col-photo-left" cols="12" sm="6" md="6">
        <v-img :src="imageDetailUrl" max-height="400" contain></v-img>
        <v-file-input
          class="mt-5"
          small-chips
          truncate-length="50"
          :label="fieldLabels.photo_detail"
          filled
          v-model="imageDetailFile"
          @change="onImageDetailChange"
        ></v-file-input>
      </v-col>
    </v-row>

    <h3 class="mb-7 mt-7" v-if="!news.social">Баннер</h3>
    <v-row v-if="!news.social">
      <v-col class="col-photo-left" cols="12" sm="6" md="6">
        <v-img :src="imageBannerUrl" max-height="400" contain></v-img>
        <v-file-input
          class="mt-5"
          small-chips
          truncate-length="50"
          :label="fieldLabels.photo_banner"
          filled
          v-model="imageBannerFile"
          @change="onImageBannerChange"
        ></v-file-input>
      </v-col>
    </v-row>

    <h3 class="mb-7 mt-7" v-if="!news.social">Заголовок галереи фотографий</h3>
    <v-row v-if="!news.social">
      <v-text-field
        :label="fieldLabels.gallery_title_rus"
        filled
        v-model="news.gallery_title_rus"
      ></v-text-field>
      <v-text-field
        class="ml-5"
        :label="fieldLabels.gallery_title_eng"
        filled
        v-model="news.gallery_title_eng"
      ></v-text-field>
    </v-row>

    <h3 class="mb-7 mt-7" v-if="!news.social">Галерея фотографий</h3>
    <v-row v-if="!news.social">
      <v-col class="col-photo-left" cols="12" sm="6" md="6">
        <v-img :src="imageGallery1Url" max-height="400" contain></v-img>
        <v-file-input
          class="mt-5"
          small-chips
          truncate-length="50"
          :label="fieldLabels.photo_gallery_1"
          filled
          v-model="imageGallery1File"
          @change="onImageGallery1Change"
        ></v-file-input>
      </v-col>
      <v-col class="col-photo-left" cols="12" sm="6" md="6">
        <v-img :src="imageGallery2Url" max-height="400" contain></v-img>
        <v-file-input
          class="mt-5"
          small-chips
          truncate-length="50"
          :label="fieldLabels.photo_gallery_2"
          filled
          v-model="imageGallery2File"
          @change="onImageGallery2Change"
        ></v-file-input>
      </v-col>
    </v-row>
    <v-row v-if="!news.social">
      <v-col class="col-photo-left" cols="12" sm="6" md="6">
        <v-img :src="imageGallery3Url" max-height="400" contain></v-img>
        <v-file-input
          class="mt-5"
          small-chips
          truncate-length="50"
          :label="fieldLabels.photo_gallery_3"
          filled
          v-model="imageGallery3File"
          @change="onImageGallery3Change"
        ></v-file-input>
      </v-col>
      <v-col class="col-photo-left" cols="12" sm="6" md="6">
        <v-img :src="imageGallery4Url" max-height="400" contain></v-img>
        <v-file-input
          class="mt-5"
          small-chips
          truncate-length="50"
          :label="fieldLabels.photo_gallery_4"
          filled
          v-model="imageGallery4File"
          @change="onImageGallery4Change"
        ></v-file-input>
      </v-col>
      <v-row class="mb-7 mt-7">
        <v-btn to="/news">Назад</v-btn>
        <v-btn
          color="primary ml-5"
          :loading="loading"
          :disabled="loading"
          @click="postNews()"
          >Добавить</v-btn
        >
      </v-row>
    </v-row>
  </v-container>
</template>

<style>
.col-photo-left {
  padding: 0 10px 0 0;
}

.col-photo-right {
  padding: 0 0 0 10px;
}

.theme--light.v-btn.v-btn--disabled.v-btn--has-bg {
  margin-left: 20px !important;
}
</style>

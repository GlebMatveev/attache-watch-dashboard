<script>
export default {
  data: () => ({
    apiPath: "https://electroexpress.ru/api",
    domainPath: "https://electroexpress.ru/",

    products: [],
    productsLoaded: false,

    categories: [],
    categoriesLoaded: false,
    categoriesItems: [],
    categoriesSelected: {},

    subcategories: [],
    subcategoriesLoaded: false,
    subcategoriesItems: [],
    subcategoriesSelected: {},

    properties: [],
    propertiesLoaded: false,

    imageMainFile: undefined,
    imageMainUrl: "",

    imageAdd1File: undefined,
    imageAdd1Url: "",
    imageAdd2File: undefined,
    imageAdd2Url: "",

    imageBackFile: undefined,
    imageBackUrl: "",

    imageGalleryBgFile: undefined,
    imageGalleryBgUrl: "",

    imageGalleryMd1File: undefined,
    imageGalleryMd1Url: "",
    imageGalleryMd2File: undefined,
    imageGalleryMd2Url: "",

    imageGallerySm1File: undefined,
    imageGallerySm1Url: "",
    imageGallerySm2File: undefined,
    imageGallerySm2Url: "",

    fieldLabels: {
      id: "ID",
      category: "Категория",
      subcategory: "Подкатегория (коллекция)",
      title_rus: "Название (rus)",
      title_eng: "Название (eng)",
      subtitle_rus: "Описание (rus)",
      subtitle_eng: "Описание (eng)",
      articul: "Артикул",
      social_link_rus: "Ссылка социальной сети",
      social_link_eng: "Ссылка социальной сети",
      price: "Цена",
      photo_main: "Фотография основная",
      photo_add_1: "Фотография дополнительная 1",
      photo_add_2: "Фотография дополнительная 2",
      photo_back: "Фотография для фона",
      photo_gallery_bg: "Фотография галереи большая",
      photo_gallery_md_1: "Фотография галереи средняя 1",
      photo_gallery_md_2: "Фотография галереи средняя 2",
      photo_gallery_sm_1: "Фотография галереи маленькая 1",
      photo_gallery_sm_2: "Фотография галереи маленькая 2",
    },

    currentId: 0,

    loading: false,
  }),

  mounted() {
    this.initialize();
  },

  watch: {
    imageMainUrl() {
      this.products[0].imageMainUrl = this.imageMainUrl;
    },
    imageAdd1Url() {
      this.products[0].imageAdd1Url = this.imageAdd1Url;
    },
    imageAdd2Url() {
      this.products[0].imageAdd2Url = this.imageAdd2Url;
    },
    imageBackUrl() {
      this.products[0].imageBackUrl = this.imageBackUrl;
    },
    imageGalleryBgUrl() {
      this.products[0].imageGalleryBgUrl = this.imageGalleryBgUrl;
    },
    imageGalleryMd1Url() {
      this.products[0].imageGalleryMd1Url = this.imageGalleryMd1Url;
    },
    imageGalleryMd2Url() {
      this.products[0].imageGalleryMd2Url = this.imageGalleryMd2Url;
    },
    imageGallerySm1Url() {
      this.products[0].imageGallerySm1Url = this.imageGallerySm1Url;
    },
    imageGallerySm2Url() {
      this.products[0].imageGallerySm2Url = this.imageGallerySm2Url;
    },

    categoriesSelected() {
      this.products[0].category_id = this.categoriesSelected.value;
    },
    subcategoriesSelected() {
      this.products[0].subcategory_id = this.subcategoriesSelected.value;
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

    onImageAdd1Change(file) {
      if (!file) {
        return;
      }

      const reader = new FileReader();

      reader.onload = (e) => {
        this.imageAdd1Url = e.target.result;
      };
      reader.readAsDataURL(file);
    },

    onImageAdd2Change(file) {
      if (!file) {
        return;
      }

      const reader = new FileReader();

      reader.onload = (e) => {
        this.imageAdd2Url = e.target.result;
      };
      reader.readAsDataURL(file);
    },

    onImageBackChange(file) {
      if (!file) {
        return;
      }

      const reader = new FileReader();

      reader.onload = (e) => {
        this.imageBackUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    },

    onImageGalleryBgChange(file) {
      if (!file) {
        return;
      }

      const reader = new FileReader();

      reader.onload = (e) => {
        this.imageGalleryBgUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    },

    onImageGalleryMd1Change(file) {
      if (!file) {
        return;
      }

      const reader = new FileReader();

      reader.onload = (e) => {
        this.imageGalleryMd1Url = e.target.result;
      };
      reader.readAsDataURL(file);
    },

    onImageGalleryMd2Change(file) {
      if (!file) {
        return;
      }

      const reader = new FileReader();

      reader.onload = (e) => {
        this.imageGalleryMd2Url = e.target.result;
      };
      reader.readAsDataURL(file);
    },

    onImageGallerySm1Change(file) {
      if (!file) {
        return;
      }

      const reader = new FileReader();

      reader.onload = (e) => {
        this.imageGallerySm1Url = e.target.result;
      };
      reader.readAsDataURL(file);
    },

    onImageGallerySm2Change(file) {
      if (!file) {
        return;
      }

      const reader = new FileReader();

      reader.onload = (e) => {
        this.imageGallerySm2Url = e.target.result;
      };
      reader.readAsDataURL(file);
    },

    initialize() {
      this.getProductsById();
      this.getAllCategories();
      this.getAllSubcategories();
      this.getAllProperties();
    },

    getAllCategories() {
      this.axios
        .get(this.apiPath + "/categories")
        .then((response) => {
          this.categories = response.data;

          this.categoriesLoaded = true;

          for (let key in this.categories) {
            this.categoriesItems.push({
              text: this.categories[key].title_rus,
              value: this.categories[key].id,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getAllSubcategories() {
      this.axios
        .get(this.apiPath + "/subcategories")
        .then((response) => {
          this.subcategories = response.data;

          this.subcategoriesLoaded = true;

          for (let key in this.subcategories) {
            this.subcategoriesItems.push({
              text: this.subcategories[key].title_rus,
              value: this.subcategories[key].id,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getAllProperties() {
      this.axios
        .get(this.apiPath + "/properties")
        .then((response) => {
          this.properties = response.data;

          this.propertiesLoaded = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    photoInitialize() {
      this.imageMainUrl = this.domainPath + this.products[0].photo_main;
      this.imageAdd1Url = this.domainPath + this.products[0].photo_add_1;
      this.imageAdd2Url = this.domainPath + this.products[0].photo_add_2;
      this.imageBackUrl = this.domainPath + this.products[0].photo_back;
      this.imageGalleryBgUrl =
        this.domainPath + this.products[0].photo_gallery_bg;
      this.imageGalleryMd1Url =
        this.domainPath + this.products[0].photo_gallery_md_1;
      this.imageGalleryMd2Url =
        this.domainPath + this.products[0].photo_gallery_md_2;
      this.imageGallerySm1Url =
        this.domainPath + this.products[0].photo_gallery_sm_1;
      this.imageGallerySm2Url =
        this.domainPath + this.products[0].photo_gallery_sm_2;
    },

    getProductsById() {
      this.axios
        .get(this.apiPath + "/products-item/" + this.$route.params.id)
        .then((response) => {
          this.products = response.data;

          this.productsLoaded = true;

          this.photoInitialize();

          this.categorySelectedInit();
          this.subcategorySelectedInit();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    categorySelectedInit() {
      this.categoriesSelected = new Object({
        text: this.products[0].category_rus,
        value: this.products[0].category_id,
      });
    },

    subcategorySelectedInit() {
      this.subcategoriesSelected = new Object({
        text: this.products[0].subcategory_rus,
        value: this.products[0].subcategory_id,
      });
    },

    putProductsById() {
      this.loading = true;

      this.axios
        .put(
          this.apiPath + "/products-item/" + this.$route.params.id,
          this.products[0]
        )
        .then((response) => {
          console.log(response);

          this.loading = false;

          this.$router.push("/products");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<template>
  <!-- <v-container v-if="productsLoaded"> -->

  <v-container>
    <v-row class="mb-7 mt-7">
      <v-btn to="/products">Назад</v-btn>
      <v-btn
        color="primary ml-5"
        :loading="loading"
        :disabled="loading"
        @click="putProductsById()"
        >Сохранить</v-btn
      >
    </v-row>
    <v-row class="mb-7 mt-7">
      <v-col>
        <h3 class="mb-5">
          Редактирование товара - {{ fieldLabels.id }}
          {{ this.$route.params.id }}
        </h3>
      </v-col>
    </v-row>

    <h3 class="mb-7 mt-7">Артикул</h3>
    <v-row>
      <v-col cols="12" sm="6" md="6">
        <v-text-field
          :label="fieldLabels.articul"
          filled
          v-model="products[0].articul"
        ></v-text-field>
      </v-col>
    </v-row>

    <h3 class="mb-7 mt-7">Категория и подкатегория</h3>
    <v-row class="mb-7 mt-7">
      <v-col cols="12" sm="6" md="6">
        <v-combobox
          filled
          :label="fieldLabels.category"
          :items="categoriesItems"
          v-model="categoriesSelected"
        ></v-combobox>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-combobox
          filled
          :label="fieldLabels.subcategory"
          :items="subcategoriesItems"
          v-model="subcategoriesSelected"
        ></v-combobox>
      </v-col>
    </v-row>

    <h3 class="mb-7 mt-7">Общие данные</h3>
    <v-row>
      <v-col cols="12" sm="6" md="6">
        <v-text-field
          :label="fieldLabels.title_rus"
          filled
          v-model="products[0].title_rus"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-text-field
          class="ml-5"
          :label="fieldLabels.title_eng"
          filled
          v-model="products[0].title_eng"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" md="6">
        <v-text-field
          :label="fieldLabels.subtitle_rus"
          filled
          v-model="products[0].subtitle_rus"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-text-field
          class="ml-5"
          :label="fieldLabels.subtitle_eng"
          filled
          v-model="products[0].subtitle_eng"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" md="6">
        <v-text-field
          :label="fieldLabels.social_link_rus"
          filled
          v-model="products[0].social_link_rus"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-text-field
          class="ml-5"
          :label="fieldLabels.social_link_eng"
          filled
          v-model="products[0].social_link_eng"
        ></v-text-field>
      </v-col>
    </v-row>

    <h3 class="mb-7 mt-7">Цена</h3>
    <v-row>
      <v-col cols="12" sm="6" md="6">
        <v-text-field
          :label="fieldLabels.price"
          filled
          v-model="products[0].price"
        ></v-text-field>
      </v-col>
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
    </v-row>

    <v-row>
      <v-col class="col-photo-left" cols="12" sm="6" md="6">
        <v-img :src="imageAdd1Url" max-height="400" contain></v-img>
        <v-file-input
          class="mt-5"
          small-chips
          truncate-length="50"
          :label="fieldLabels.photo_add_1"
          filled
          v-model="imageAdd1File"
          @change="onImageAdd1Change"
        ></v-file-input>
      </v-col>
      <v-col class="col-photo-right" cols="12" sm="6" md="6">
        <v-img :src="imageAdd2Url" max-height="400" contain></v-img>
        <v-file-input
          class="mt-5"
          small-chips
          truncate-length="50"
          :label="fieldLabels.photo_add_2"
          filled
          v-model="imageAdd2File"
          @change="onImageAdd2Change"
        ></v-file-input>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="col-photo-left" cols="12" sm="6" md="6">
        <v-img :src="imageBackUrl" max-height="400" contain></v-img>
        <v-file-input
          class="mt-5"
          small-chips
          truncate-length="50"
          :label="fieldLabels.photo_back"
          filled
          v-model="imageBackFile"
          @change="onImageBackChange"
        ></v-file-input>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="col-photo-left" cols="12" sm="6" md="6">
        <v-img :src="imageGalleryBgUrl" max-height="400" contain></v-img>
        <v-file-input
          class="mt-5"
          small-chips
          truncate-length="50"
          :label="fieldLabels.photo_gallery_bg"
          filled
          v-model="imageGalleryBgFile"
          @change="onImageGalleryBgChange"
        ></v-file-input>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="col-photo-left" cols="12" sm="6" md="6">
        <v-img :src="imageGalleryMd1Url" max-height="400" contain></v-img>
        <v-file-input
          class="mt-5"
          small-chips
          truncate-length="50"
          :label="fieldLabels.photo_gallery_md_1"
          filled
          v-model="imageGalleryMd1File"
          @change="onImageGalleryMd1Change"
        ></v-file-input>
      </v-col>
      <v-col class="col-photo-right" cols="12" sm="6" md="6">
        <v-img :src="imageGalleryMd2Url" max-height="400" contain></v-img>
        <v-file-input
          class="mt-5"
          small-chips
          truncate-length="50"
          :label="fieldLabels.photo_gallery_md_2"
          filled
          v-model="imageGalleryMd2File"
          @change="onImageGalleryMd2Change"
        ></v-file-input>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="col-photo-left" cols="12" sm="6" md="6">
        <v-img :src="imageGallerySm1Url" max-height="400" contain></v-img>
        <v-file-input
          class="mt-5"
          small-chips
          truncate-length="50"
          :label="fieldLabels.photo_gallery_sm_1"
          filled
          v-model="imageGallerySm1File"
          @change="onImageGallerySm1Change"
        ></v-file-input>
      </v-col>
      <v-col class="col-photo-right" cols="12" sm="6" md="6">
        <v-img :src="imageGallerySm2Url" max-height="400" contain></v-img>
        <v-file-input
          class="mt-5"
          small-chips
          truncate-length="50"
          :label="fieldLabels.photo_gallery_sm_2"
          filled
          v-model="imageGallerySm2File"
          @change="onImageGallerySm2Change"
        ></v-file-input>
      </v-col>
    </v-row>

    <h3 class="mb-7 mt-7">Свойства товара</h3>
    <v-row v-for="(property, index) in properties" :key="index">
      <v-col cols="12" sm="6" md="6">
        <v-text-field
          filled
          :label="property.title_rus"
          v-model="products[0][property.id + '_rus']"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-text-field
          filled
          :label="property.title_eng"
          v-model="products[0][property.id + '_eng']"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row class="mb-7 mt-7">
      <v-btn to="/products">Назад</v-btn>
      <v-btn
        color="primary ml-5"
        :loading="loading"
        :disabled="loading"
        @click="putProductsById()"
        >Сохранить</v-btn
      >
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

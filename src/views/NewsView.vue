<script>
export default {
  data: () => ({
    apiPath: "https://electroexpress.ru/api",
    news: [],
    newsLoaded: false,

    headers: [
      { text: "ID", value: "id" },
      { text: "Название (rus)", value: "title_rus" },
      { text: "Название (eng)", value: "title_eng" },
      { text: "Из социальной сети", value: "social", align: "center" },
      { text: "Дата создания", value: "created_at" },
      { text: "Дата изменения", value: "modified_at" },
      {
        text: "Правка",
        value: "actions",
        align: "center",
        sortable: false,
      },
    ],

    currentId: 0,

    dialogDelete: false,
  }),

  mounted() {
    this.initialize();
  },

  watch: {
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  methods: {
    initialize() {
      this.getAllNews();
    },

    getAllNews() {
      this.axios
        .get(this.apiPath + "/news")
        .then((response) => {
          this.news = response.data;

          this.newsLoaded = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // Delete
    deleteItem(item) {
      this.currentId = item.id;

      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.axios
        .delete(this.apiPath + "/news-item/" + this.currentId)
        .then((response) => {
          console.log(response);

          this.initialize();
        })
        .catch((error) => {
          console.log(error);
        });

      this.closeDelete();
    },

    closeDelete() {
      this.dialogDelete = false;
    },
  },
};
</script>

<template>
  <v-data-table
    :headers="headers"
    :items="news"
    sort-by="id"
    :footer-props="{
      'items-per-page-options': [50, 100, -1],
      itemsPerPageText: 'кол-во элементов',
    }"
  >
    <template v-slot:[`item.social`]="{ item }">
      <v-simple-checkbox
        v-bind:value="
          item.social == '1' ? (item.social = true) : (item.social = false)
        "
        v-on:input="
          item.social == '1' ? (item.social = true) : (item.social = false)
        "
        disabled
      ></v-simple-checkbox>
    </template>

    <template v-slot:top>
      <v-toolbar flat>
        <v-spacer></v-spacer>

        <!-- Add -->
        <v-btn color="primary" dark class="mb-2" to="/news/add">
          Добавить
        </v-btn>

        <!-- Delete -->
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Вы уверены в том, что хотите удалить элемент?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Отмена</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >ОК</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <router-link
        class="edit-link"
        :to="{
          name: 'news-edit',
          params: {
            id: item.id,
          },
        }"
      >
        <v-icon small class="mr-2"> mdi-pencil </v-icon>
      </router-link>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize()"> Обновить </v-btn>
    </template>
  </v-data-table>
</template>

<style>
.edit-link {
  text-decoration: none;
}
</style>

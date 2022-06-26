<script>
export default {
  data: () => ({
    apiPath: "https://electroexpress.ru/api",
    distributors: [],
    distributorsLoaded: false,

    headers: [
      { text: "ID", value: "id" },
      { text: "Страна (rus)", value: "country_rus" },
      { text: "Страна (eng)", value: "country_eng" },
      { text: "Город (rus)", value: "city_rus" },
      { text: "Город (eng)", value: "city_eng" },
      { text: "Адрес (rus)", value: "address_rus" },
      { text: "Адрес (eng)", value: "address_eng" },
      { text: "Телефон (rus)", value: "phone_rus" },
      { text: "Телефон (eng)", value: "phone_eng" },
      {
        text: "Правка",
        value: "actions",
        align: "center",
        sortable: false,
      },
    ],

    fieldLabels: {
      country_rus: "Страна (rus)",
      country_eng: "Страна (eng)",
      city_rus: "Город (rus)",
      city_eng: "Город (eng)",
      address_rus: "Адрес (rus)",
      address_eng: "Адрес (eng)",
      phone_rus: "Телефон (rus)",
      phone_eng: "Телефон (eng)",
    },

    currentId: 0,
    editedDistributors: {},
    inputedDistributors: [],

    addedDistributors: {},

    dialogEdit: false,
    dialogDelete: false,
    dialogAdd: false,
    editedIndex: -1,
  }),

  mounted() {
    this.initialize();
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "Создание элемента"
        : "Редактирование элемента";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  methods: {
    initialize() {
      this.getAllDistributors();
      console.log(this.distributors);
    },

    getAllDistributors() {
      this.axios
        .get(this.apiPath + "/distributors")
        .then((response) => {
          this.distributors = response.data;

          this.distributorsLoaded = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // Edit
    editItem(item) {
      this.currentId = item.id;

      for (let key in this.distributors) {
        if (this.distributors[key].id == this.currentId) {
          this.editedDistributors = Object.assign({}, this.distributors[key]);

          for (let keyAdd in this.editedDistributors) {
            if (keyAdd == "id") delete this.editedDistributors.id;
          }

          this.inputedDistributors = Object.assign({}, this.editedDistributors);
        }
      }

      this.dialogEdit = true;
    },

    closeEdit() {
      this.dialogEdit = false;
    },

    saveEdit() {
      this.axios
        .put(
          this.apiPath + "/distributors/" + this.currentId,
          this.inputedDistributors
        )
        .then((response) => {
          console.log(response);

          this.initialize();
        })
        .catch((error) => {
          console.log(error);
        });

      this.closeEdit();
    },

    // Delete
    deleteItem(item) {
      this.currentId = item.id;

      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.axios
        .delete(this.apiPath + "/distributors/" + this.currentId)
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

    // Add
    saveAdd() {
      this.axios
        .post(this.apiPath + "/distributors", this.addedDistributors)
        .then((response) => {
          console.log(response);

          this.initialize();
        })
        .catch((error) => {
          console.log(error);
        });

      this.closeAdd();
    },

    closeAdd() {
      this.dialogAdd = false;
    },
  },
};
</script>

<template>
  <v-data-table
    :headers="headers"
    :items="distributors"
    sort-by="id"
    :footer-props="{
      'items-per-page-options': [50, 100, -1],
      itemsPerPageText: 'кол-во элементов',
    }"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-spacer></v-spacer>

        <v-dialog v-model="dialogAdd" max-width="900px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              Добавить
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">Добавление элемента</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row class="mt-10">
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                    v-for="(x, index) in fieldLabels"
                    :key="`${index}-${x}`"
                  >
                    <v-text-field
                      filled
                      :label="fieldLabels[index]"
                      v-model="addedDistributors[index]"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeAdd">
                Отмена
              </v-btn>
              <v-btn color="blue darken-1" text @click="saveAdd">
                Сохранить
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- Edit -->
        <v-dialog v-model="dialogEdit" max-width="900px">
          <v-card>
            <v-card-title>
              <span class="text-h5">Редактирование элемента</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row class="mt-10">
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                    v-for="(x, index) in editedDistributors"
                    :key="`${index}-${x}`"
                  >
                    <v-text-field
                      ref="myInput"
                      :label="fieldLabels[index]"
                      v-model="inputedDistributors[index]"
                      filled
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeEdit">
                Отмена
              </v-btn>
              <v-btn color="blue darken-1" text @click="saveEdit">
                Сохранить
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

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
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize()"> Обновить </v-btn>
    </template>
  </v-data-table>
</template>

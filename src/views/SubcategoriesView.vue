<script>
export default {
  data: () => ({
    apiPath: "https://electroexpress.ru/api",
    subcategories: [],
    subcategoriesLoaded: false,

    headers: [
      { text: "ID", value: "id" },
      { text: "Название (rus)", value: "title_rus" },
      { text: "Название (eng)", value: "title_eng" },
      {
        text: "Правка",
        value: "actions",
        align: "center",
        sortable: false,
      },
    ],

    fieldLabels: {
      title_rus: "Название (rus)",
      title_eng: "Название (eng)",
    },

    currentId: 0,
    editedSubcategories: {},
    inputedSubcategories: [],

    addedSubcategories: {},

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
      this.getAllSubcategories();
    },

    getAllSubcategories() {
      this.axios
        .get(this.apiPath + "/subcategories")
        .then((response) => {
          this.subcategories = response.data;

          this.subcategoriesLoaded = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // Edit
    editItem(item) {
      this.currentId = item.id;

      for (let key in this.subcategories) {
        if (this.subcategories[key].id == this.currentId) {
          this.editedSubcategories = Object.assign({}, this.subcategories[key]);

          for (let keyAdd in this.editedSubcategories) {
            if (keyAdd == "id") delete this.editedSubcategories.id;
          }

          this.inputedSubcategories = Object.assign(
            {},
            this.editedSubcategories
          );
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
          this.apiPath + "/subcategories/" + this.currentId,
          this.inputedSubcategories
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
        .delete(this.apiPath + "/subcategories/" + this.currentId)
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
        .post(this.apiPath + "/subcategories", this.addedSubcategories)
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
    :items="subcategories"
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
                      v-model="addedSubcategories[index]"
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
                    v-for="(x, index) in editedSubcategories"
                    :key="`${index}-${x}`"
                  >
                    <v-text-field
                      ref="myInput"
                      :label="fieldLabels[index]"
                      v-model="inputedSubcategories[index]"
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

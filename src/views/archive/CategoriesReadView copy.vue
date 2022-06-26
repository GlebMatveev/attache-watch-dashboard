<template>
  <v-card flat>
    <v-tabs show-arrows v-model="tab">
      <v-tabs-slider></v-tabs-slider>
      <v-tab v-for="(i, index) in languages" :key="`${index}-${i}`"
        >{{ i.title }} ({{ i.code }})
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="(b, index) in categories" :key="`${index}-${b}`">
        <v-card>
          <v-data-table
            :headers="headers"
            :items="categories[index]"
            sort-by="id"
          >
            <template v-slot:[`item.activity`]="{ item }">
              <v-simple-checkbox
                v-bind:value="
                  item.activity == '1'
                    ? (item.activity = true)
                    : (item.activity = false)
                "
                v-on:input="
                  item.activity == '1'
                    ? (item.activity = true)
                    : (item.activity = false)
                "
                disabled
              ></v-simple-checkbox>
            </template>

            <template v-slot:top>
              <v-toolbar flat>
                <!-- <v-toolbar-title>Языки</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>

                <v-spacer></v-spacer> -->

                <v-dialog v-model="dialog" max-width="500px">
                  <!-- <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="primary"
                      dark
                      class="mb-2"
                      v-bind="attrs"
                      v-on="on"
                    >
                      Добавить
                    </v-btn>
                  </template> -->
                  <v-card>
                    <!-- <v-card-title>
                      <span class="text-h5">{{ formTitle }}</span>
                    </v-card-title> -->

                    <v-card-text>
                      <v-container>
                        <v-row class="mt-10">
                          <v-col
                            cols="12"
                            sm="6"
                            md="6"
                            v-for="(x, index) in editedCategories"
                            :key="`${index}-${x}`"
                          >
                            <v-text-field
                              v-model="editedCategories[index].title"
                              filled
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="close">
                        Отмена
                      </v-btn>
                      <v-btn color="blue darken-1" text @click="save">
                        Сохранить
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="500px">
                  <v-card>
                    <v-card-title class="text-h5"
                      >Вы уверены в том, что хотите удалить категорию? Это
                      приведёт к удалению<br />всей категории, включая
                      переводы!</v-card-title
                    >
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="closeDelete"
                        >Отмена</v-btn
                      >
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="deleteItemConfirm"
                        >ОК</v-btn
                      >
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>

            <template v-slot:[`item.actions`]="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
              </v-icon>
              <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
            </template>
            <template v-slot:no-data>
              <!-- <v-btn color="primary" @click="initialize"> Обновить </v-btn> -->
            </template>
          </v-data-table>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import { HTTP } from "../main";

export default {
  data: () => ({
    tab: null,

    categories: [],
    languages: [],

    headers: [
      { text: "ID", value: "category_id" },
      { text: "Наименование", value: "title" },
      {
        text: "Редактирование",
        value: "actions",
        align: "center",
        sortable: false,
      },
    ],

    currentId: 0,
    editedCategories: [],

    editedItem: {
      category_id: 0,
      title: "",
    },
    defaultItem: {
      category_id: 0,
      title: "",
    },

    dialog: false,
    dialogDelete: false,
    editedIndex: -1,
  }),

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

  // created() {
  //   this.initialize();
  // },

  beforeMount() {
    this.initialize();
  },

  methods: {
    initialize() {
      HTTP.get("languages/activity")
        .then((response) => {
          this.languages = response.data;

          HTTP.get("categories/lang/1/2")
            .then((response) => {
              this.categories = response.data;
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    },

    editItem(item) {
      //this.editedIndex = this.languages.indexOf(item);

      //this.editedItem = Object.assign({}, item);

      this.currentId = item.category_id;

      HTTP.get("categories/" + this.currentId)
        .then((response) => {
          this.editedCategories = response.data;

          console.log(this.editedCategories);
        })
        .catch((error) => {
          console.log(error);
        });

      this.dialog = true;
    },

    deleteItem(item) {
      //this.editedIndex = this.languages.indexOf(item);
      //this.editedItem = Object.assign({}, item);

      this.currentId = item.category_id;
      console.log(this.currentId);

      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      // this.languages.splice(this.editedIndex, 1);

      HTTP.delete("/categories/" + this.currentId)
        .then((response) => {
          console.log(response);

          this.initialize();
        })
        .catch((error) => {
          console.log(error);
        });

      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        // this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        // this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        //Object.assign(this.languages[this.editedIndex], this.editedItem);
      } else {
        for (let key in this.editedCategories) {
          HTTP.put(
            "/categories/" + this.editedCategories[key].id,
            this.editedCategories[key]
          )
            .then((response) => {
              console.log(response);

              this.initialize();
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
      this.close();
    },
  },
};
</script>

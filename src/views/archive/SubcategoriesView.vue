<template>
  <v-card flat>
    <v-tabs show-arrows v-model="tab">
      <v-tabs-slider></v-tabs-slider>
      <v-tab v-for="(i, index) in languages" :key="`${index}-${i}`"
        >{{ i.title }} ({{ i.code }})
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="(b, index) in subcategories" :key="`${index}-${b}`">
        <v-card>
          <v-data-table
            :headers="headers"
            :items="subcategories[index]"
            sort-by="id"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <!-- <v-toolbar-title>Языки</v-toolbar-title> -->
                <!-- <v-divider class="mx-4" inset vertical></v-divider> -->

                <v-spacer></v-spacer>

                <v-dialog v-model="dialogAdd" max-width="500px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="primary"
                      dark
                      class="mb-2"
                      v-bind="attrs"
                      v-on="on"
                    >
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
                          <v-col cols="12" sm="12" md="12">
                            <v-combobox
                              v-model="comboboxSelected"
                              :items="comboboxCategories"
                            ></v-combobox>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="6"
                            v-for="(x, index) in languages"
                            :key="`${index}-${x}`"
                          >
                            <v-text-field
                              filled
                              :placeholder="languages[index].code"
                              v-model="inputedSubcategories[index]"
                              @input="
                                getAddedSubcategories(
                                  index,
                                  inputedSubcategories[index],
                                  languages[index].code
                                )
                              "
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

                <v-dialog v-model="dialogEdit" max-width="500px">
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
                              v-model="editedSubcategories[index].title"
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

                <v-dialog v-model="dialogDelete" max-width="500px">
                  <v-card>
                    <v-card-title class="text-h5"
                      >Вы уверены в том, что хотите удалить подкатегорию? Это
                      приведёт к удалению<br />всей подкатегории, включая
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
    subcategories: [],
    languages: [],

    headers: [
      { text: "ID", value: "id" },
      { text: "Категория", value: "subcategory_id" },
      { text: "Наименование", value: "title" },
      {
        text: "Редактирование",
        value: "actions",
        align: "center",
        sortable: false,
      },
    ],

    currentId: 0,
    editedSubcategories: [],
    inputedSubcategories: [],
    addedSubcategories: [],

    dialogEdit: false,
    dialogDelete: false,
    dialogAdd: false,
    editedIndex: -1,

    comboboxCategories: [],
    comboboxSelected: [],
  }),

  watch: {
    categories: function () {
      this.comboboxInit();
    },

    // dialog(val) {
    //   val || this.close();
    // },
    // dialogDelete(val) {
    //   val || this.closeDelete();
    // },
  },

  beforeMount() {
    this.initialize();
  },

  methods: {
    getAddedSubcategories(index, subcat, subcatLang) {
      this.addedSubcategories[index] = new Object({
        title: subcat,
        code: subcatLang,
      });
    },
    // Инициализация
    initialize() {
      HTTP.get("languages/activity")
        .then((response) => {
          this.languages = response.data;

          HTTP.get("subcategories/lang/1/2")
            .then((response) => {
              this.subcategories = response.data;
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });

      HTTP.get("categories/lang/1")
        .then((response) => {
          this.categories = response.data;

          this.comboboxInit();

          console.log(this.categories);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    comboboxInit() {
      for (let key in this.categories) {
        key;
        this.comboboxCategories.push(
          new Object({
            text: this.categories[key].title,
            value: this.categories[key].category_id,
          })
        );
      }
    },

    // Редактирование
    editItem(item) {
      this.editedIndex = this.languages.indexOf(item);
      this.currentId = item.subcategory_id;

      HTTP.get("subcategories/" + this.currentId)
        .then((response) => {
          this.editedSubcategories = response.data;

          console.log(this.editedSubcategories);
        })
        .catch((error) => {
          console.log(error);
        });

      this.dialogEdit = true;
    },

    closeEdit() {
      this.dialogEdit = false;
    },

    saveEdit() {
      for (let key in this.editedSubcategories) {
        HTTP.put(
          "/subcategories/" + this.editedSubcategories[key].id,
          this.editedSubcategories[key]
        )
          .then((response) => {
            console.log(response);

            this.initialize();
          })
          .catch((error) => {
            console.log(error);
          });
      }

      this.closeEdit();
    },

    // Удаление
    deleteItem(item) {
      this.currentId = item.subcategory_id;

      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      HTTP.delete("/subcategories/" + this.currentId)
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

    // Добавление
    saveAdd() {
      HTTP.post(
        "/subcategories/category/" + this.comboboxSelected.value,
        this.addedSubcategories
      )
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

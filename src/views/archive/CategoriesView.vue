<template>
  <v-card flat>
    <!-- <div><b>categories:</b>{{ categories }}<br /></div>
    <div><b>languages:</b>{{ languages }}<br /></div>
    <div><b>currentId:</b>{{ currentId }}<br /></div>
    <div><b>editedCategories:</b>{{ editedCategories }}<br /></div>
    <div><b>inputedCategories:</b>{{ inputedCategories }}<br /></div>
    <div><b>addedCategories:</b>{{ addedCategories }}<br /></div>
    <div><b>editedIndex:</b>{{ editedIndex }}<br /></div> -->
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
            <!-- <template v-slot:[`item.activity`]="{ item }">
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
            </template> -->

            <template v-slot:top>
              <v-toolbar flat>
                <!-- <v-toolbar-title>Языки</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider> -->

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
                              v-model="inputedCategories[index]"
                              @input="
                                getAddedCategories(
                                  index,
                                  inputedCategories[index],
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

    inputedCategories: [],
    addedCategories: [],

    dialogEdit: false,
    dialogDelete: false,
    dialogAdd: false,
    editedIndex: -1,
  }),

  beforeMount() {
    this.initialize();
  },

  methods: {
    getAddedCategories(index, subcat, subcatLang) {
      this.addedCategories[index] = new Object({
        title: subcat,
        code: subcatLang,
      });
    },

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
      this.currentId = item.category_id;

      HTTP.get("categories/" + this.currentId)
        .then((response) => {
          this.editedCategories = response.data;

          console.log(this.editedCategories);
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

      this.closeEdit();
    },

    // Удаление
    deleteItem(item) {
      this.currentId = item.category_id;

      this.dialogDelete = true;
    },

    deleteItemConfirm() {
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

    closeDelete() {
      this.dialogDelete = false;
    },

    // Добавление
    saveAdd() {
      HTTP.post("/categories", this.addedCategories)
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

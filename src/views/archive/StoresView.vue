<template>
  <v-card flat>
    <div>
      <b>this.$store.state.counter:</b><br />
      {{ this.$store.state.counter }}
    </div>
    <div>
      <b>stores:</b><br />
      {{ stores }}
    </div>
    <div>
      <b>languages:</b><br />
      {{ languages }}
    </div>
    <div>
      <b>currentId:</b><br />
      {{ currentId }}
    </div>
    <div>
      <b>editedStores:</b><br />
      {{ editedStores }}
    </div>
    <div>
      <b>inputedStores:</b><br />
      {{ inputedStores }}
    </div>
    <div>
      <b>addedStores:</b><br />
      {{ addedStores }}
    </div>
    <v-tabs show-arrows v-model="tab">
      <v-tabs-slider></v-tabs-slider>
      <v-tab v-for="(i, index) in languages" :key="`${index}-${i}`"
        >{{ i.title }} ({{ i.code }})
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="(b, index) in stores" :key="`${index}-${b}`">
        <v-card>
          <v-data-table :headers="headers" :items="stores[index]" sort-by="id">
            <template v-slot:top>
              <v-toolbar flat>
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
                        <v-row
                          class="mt-5"
                          v-for="(x, ind) in 6"
                          :key="`${ind}-${x}`"
                        >
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
                              v-model="currentValue"
                              @input="
                                getAddedStores(
                                  ind,
                                  index,
                                  currentValue,
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
                            v-for="(x, index) in editedStores"
                            :key="`${index}-${x}`"
                          >
                            <v-text-field
                              v-model="editedStores[index].title"
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
                      >Вы уверены в том, что хотите удалить элемент? Это
                      приведёт к удалению всех связанных элементов, включая
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

    stores: [],
    languages: [],

    headers: [
      { text: "ID", value: "id" },
      { text: "ID магазина", value: "stores_id" },
      { text: "Юридическое лицо", value: "entity" },
      { text: "Город", value: "city" },
      { text: "Магазин", value: "store" },
      { text: "Адрес", value: "address" },
      { text: "Телефон", value: "phone" },
      { text: "Время работы", value: "hours" },
      {
        text: "Редактирование",
        value: "actions",
        align: "center",
        sortable: false,
      },
    ],

    currentId: 0,
    editedStores: [0][0],

    inputedStores: {},
    addedStores: [0][0],

    dialogEdit: false,
    dialogDelete: false,
    dialogAdd: false,
    editedIndex: -1,

    currentValue: "",
  }),

  beforeMount() {
    this.initialize();
  },

  methods: {
    getAddedStores(
      x,
      y,
      storeValue,
      storeCode
      // storeEntity,
      // storeCity,
      // storeStore
      // storeAddress,
      // storePhone,
      // storeHours,
      //
    ) {
      console.log(x);
      console.log(y);
      console.log(storeValue);
      console.log(storeCode);

      this.addedStores[x][y] = storeValue;

      // this.addedStores[index] = new Object({
      // entity: storeEntity,
      // city: storeCity,
      // store: storeStore,
      // code: storeCode,
      // address: storeAddress,
      // phone: storePhone,
      // hours: storeHours,
      // code: storeCode,
      // });
    },

    // Инициализация
    initialize() {
      HTTP.get("languages/activity")
        .then((response) => {
          this.languages = response.data;

          HTTP.get("stores/lang/1/2")
            .then((response) => {
              this.stores = response.data;
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // Редактирование
    editItem(item) {
      this.currentId = item.stores_id;

      HTTP.get("stores/" + this.currentId)
        .then((response) => {
          this.editedStores = response.data;

          console.log(this.editedStores);
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
      for (let key in this.editedStores) {
        HTTP.put("/stores/" + this.editedStores[key].id, this.editedStores[key])
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
      this.currentId = item.stores_id;

      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      HTTP.delete("/stores/" + this.currentId)
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
      HTTP.post("/stores", this.addedStores)
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

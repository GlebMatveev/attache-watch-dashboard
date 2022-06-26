<template>
  <v-data-table :headers="headers" :items="languages" sort-by="id">
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
        <v-divider class="mx-4" inset vertical></v-divider> -->

        <v-spacer></v-spacer>

        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              Добавить
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.title"
                      label="Название"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.code"
                      label="Код"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-checkbox
                      v-model="editedItem.activity"
                      label="Активность"
                    ></v-checkbox>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Отмена </v-btn>
              <v-btn color="blue darken-1" text @click="save">
                Сохранить
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
      <v-btn color="primary" @click="initialize"> Обновить </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import { HTTP } from "../main";

export default {
  data: () => ({
    languages: [],

    headers: [
      { text: "ID", value: "id" },
      { text: "Наименование", value: "title" },
      { text: "Код", value: "code" },
      { text: "Активность", value: "activity", align: "center" },
      { text: "Дата создания", value: "created_at" },
      { text: "Дата изменения", value: "modified_at" },
      {
        text: "Редактирование",
        value: "actions",
        align: "center",
        sortable: false,
      },
    ],

    editedItem: {
      id: "",
      title: "",
      code: "",
      activity: true,
    },
    defaultItem: {
      id: "",
      title: "",
      code: "",
      activity: true,
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

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      // get all languages
      HTTP.get("languages")
        .then((response) => {
          this.languages = response.data;
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    editItem(item) {
      this.editedIndex = this.languages.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.languages.indexOf(item);
      this.editedItem = Object.assign({}, item);

      HTTP.delete("/languages/" + item.id)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });

      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.languages.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.languages[this.editedIndex], this.editedItem);

        HTTP.put("/languages/" + this.editedItem.id, this.editedItem)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.languages.push(this.editedItem);

        HTTP.post("languages", this.editedItem)
          .then((response) => {
            console.log(response);
            this.initialize();
            this.$parent.refresh();
          })
          .catch((error) => {
            console.log(error);
          });
      }
      this.close();
    },
  },
};
</script>

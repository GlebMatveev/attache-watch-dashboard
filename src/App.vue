<template>
  <v-app id="inspire">
    <v-app-bar app color="white" flat>
      <v-container class="py-0 fill-height">
        <v-img
          alt="Avatar"
          src="../src/assets/header-logo-new.png"
          class="ml-3 mr-3"
          max-height="40"
          max-width="150"
        >
        </v-img>

        <v-spacer></v-spacer>

        <v-btn text href="https://electroexpress.ru" target="_blank">
          Перейти на сайт
        </v-btn>
      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-sheet rounded="lg">
              <v-list color="transparent">
                <!-- <v-card class="mx-auto" width="300">
                <v-list> -->
                <v-list-item link to="/">
                  <v-list-item-icon>
                    <v-icon>mdi-home</v-icon>
                  </v-list-item-icon>

                  <v-list-item-title>Главный экран</v-list-item-title>
                </v-list-item>

                <v-list-group :value="false" prepend-icon="mdi-cart">
                  <template v-slot:activator>
                    <v-list-item-title>Магазин</v-list-item-title>
                  </template>

                  <v-list-item link class="pad-left-72" disabled>
                    <v-list-item-title>Покупатели</v-list-item-title>
                  </v-list-item>

                  <v-list-item link class="pad-left-72" disabled>
                    <v-list-item-title>Заказы</v-list-item-title>
                  </v-list-item>
                </v-list-group>

                <v-list-group :value="false" prepend-icon="mdi-bookshelf">
                  <template v-slot:activator>
                    <v-list-item-title>Справочники</v-list-item-title>
                  </template>

                  <v-list-item link to="/categories" class="pad-left-72">
                    <v-list-item-title>Категории</v-list-item-title>
                  </v-list-item>

                  <v-list-item link to="/subcategories" class="pad-left-72">
                    <v-list-item-title>Подкатегории</v-list-item-title>
                  </v-list-item>

                  <v-list-item link to="/properties" class="pad-left-72">
                    <v-list-item-title>Свойства товаров</v-list-item-title>
                  </v-list-item>

                  <v-list-item link to="/products" class="pad-left-72">
                    <v-list-item-title>Товары</v-list-item-title>
                  </v-list-item>

                  <!-- <v-list-group :value="true" no-action sub-group>
                    <template v-slot:activator>
                      <v-list-item-content>
                        <v-list-item-title>
                          {{ categoriesName }}
                        </v-list-item-title>
                      </v-list-item-content>
                    </template>

                    <v-list-item
                      v-for="([title, icon, link], item) in categoriesItems"
                      :key="item"
                      link
                      :to="link"
                    >
                      <v-list-item-title v-text="title"></v-list-item-title>

                      <v-list-item-icon>
                        <v-icon v-text="icon"></v-icon>
                      </v-list-item-icon>
                    </v-list-item>
                  </v-list-group> -->
                </v-list-group>

                <v-list-group :value="false" prepend-icon="mdi-content-paste">
                  <template v-slot:activator>
                    <v-list-item-title>Контент</v-list-item-title>
                  </template>

                  <v-list-item link to="/shops" class="pad-left-72">
                    <v-list-item-title>Магазины</v-list-item-title>
                  </v-list-item>

                  <v-list-item link to="/distributors" class="pad-left-72">
                    <v-list-item-title>Дистрибьюторы</v-list-item-title>
                  </v-list-item>

                  <v-list-item link to="/news" class="pad-left-72">
                    <v-list-item-title>Новости</v-list-item-title>
                  </v-list-item>
                </v-list-group>

                <v-list-group :value="false" prepend-icon="mdi-cog-outline">
                  <template v-slot:activator>
                    <v-list-item-title>Настройки</v-list-item-title>
                  </template>

                  <v-list-item link class="pad-left-72" disabled>
                    <v-list-item-title>Пользователи</v-list-item-title>
                  </v-list-item>
                </v-list-group>
                <!-- </v-list> -->
                <!-- </v-card> -->
              </v-list>
            </v-sheet>
          </v-col>

          <v-col cols="10">
            <v-sheet
              min-height="70vh"
              rounded="lg"
              class="pl-10 pt-5 pb-5 pr-10"
            >
              <router-view></router-view>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    admins: [
      ["Management", "mdi-account-multiple-outline"],
      ["Settings", "mdi-cog-outline"],
    ],

    // categoriesName: "Категории",
    // categoriesItems: [
    //   ["Просмотр", "mdi-file-outline", "/categories/read"],
    //   ["Создание", "mdi-plus-outline", "/categories/create"],
    //   // ["Редактирование", "mdi-update", "/categories/update"],
    //   // ["Удаление", "mdi-delete", "/categories/delete"],
    // ],

    // links: ["На сайт"],
    items: [
      {
        action: "mdi-cog-outline",
        active: true,
        items: [
          { title: "Языки", link: "/languages" },
          { title: "Категории", link: "/categories" },
          { title: "HomeView", link: "/" },
          { title: "AboutView", link: "/about" },
        ],
        title: "Справочники",
      },

      // {
      //   action: "mdi-school",
      //   items: [{ title: "List Item" }],
      //   title: "Education",
      // },
    ],
  }),
};
</script>

<style>
.pad-left-72 {
  padding-left: 72px !important;
}
</style>

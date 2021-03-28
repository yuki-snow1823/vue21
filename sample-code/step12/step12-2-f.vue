<template>
  <v-app>
    <v-content>
      <v-container fluid pt-0>
        <router-view />
      </v-container>
    </v-content>
    <Footer>
      <template v-slot:foo>hoge</template>
      <template v-slot:bar>fuga</template>
    </Footer>
  </v-app>
</template>

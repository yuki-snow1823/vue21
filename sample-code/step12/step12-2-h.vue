<template>
  <v-app>
    <v-content>
      <v-container fluid pt-0>
        <router-view />
      </v-container>
    </v-content>
    <Footer>
      <template #foo="{ items }">{{ items[0].title }}</template>
      <template #bar="{ title, methodName }"
        >{{ title }} - {{ methodName }}
      </template>
    </Footer>
  </v-app>
</template>

<template>
  <div>
    <h1>ホーム</h1>
    <p><router-link to="sign-in">サインイン</router-link></p>
    <p><button @click="calendar">カレンダー</button></p>
    <p><button @click="profile">プロフィール</button></p>
    <p><button @click="share">共有</button></p>
  </div>
</template>

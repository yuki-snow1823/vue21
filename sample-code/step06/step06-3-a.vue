<template>
  <div>
    <div class="input-container">
      <form class="inputArea">
        <p>ユーザー登録</p>
        <label>ニックネーム</label>
        <input v-model="nickname" />
        <label>メールアドレス</label>
        <input v-model="email" />
      </form>
      <div class="previewArea">
        <p>プレビュー</p>
        <label>ニックネーム</label>
        <input :value="nickname" readonly />
        <label>メールアドレス</label>
        <input :value="email" readonly />
      </div>
      <div class="buttonArea">
        <button @click="saveUser">ユーザーを登録する</button>
      </div>
    </div>
    <div>
      <div class="filterArea">
        <label>リストをニックネームで絞り込む</label>
        <input v-model="nicknameFilter" />
      </div>
      <table>
        <thead>
          <th>ニックネーム</th>
          <th>メールアドレス</th>
        </thead>
        <tbody>
          <tr
            is="user-row"
            v-for="(user, index) in filteredUsers"
            :key="index"
            :user="user"
          />
        </tbody>
      </table>
      <div class="buttonWrapper">
        <button @click="displayUsers">ユーザーを表示する</button>
      </div>
    </div>
  </div>
</template>

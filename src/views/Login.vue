<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12 transparent">
          <v-card-title><span class="align-self-center">Access</span></v-card-title>
          <v-card-text>
            <v-form @submit.prevent="handleLogin" ref="loginForm">
              <v-text-field
                outlined
                prepend-inner-icon="mdi-account"
                v-model="username"
                name="login"
                placeholder="Login"
                type="text"
              ></v-text-field>
              <v-text-field
                id="password"
                outlined
                v-model="password"
                prepend-inner-icon="mdi-lock"
                name="password"
                placeholder="Password"
                type="password"
              ></v-text-field>
              <v-checkbox v-model="rememberMe" label="Remember me"></v-checkbox>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn block @click="handleLogin" @keyup:enter="handleLogin" color="transparent">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script setup lang="ts">
import axios from '@/api'
import {
  ref,
  type Ref
} from "vue";
import {useStore} from "@logue/vue2-helpers/vuex";
import router from "@/router";

const store = useStore()

const username: Ref<string> = ref('')
const password: Ref<string> = ref('')
const rememberMe: Ref<boolean> = ref(false)

const handleLogin = async () => {
  await store.dispatch('setLoading', true)
  await axios.post('/api/Security/login', {
    userCredentials: username.value,
    password: password.value,
    rememberMe: rememberMe.value
  }).then(({data}) => {
    store.commit('AuthModule/setAuthenticated', true)
    store.commit('AuthModule/setAuthToken', data.authenticationToken.token)
    store.commit('AuthModule/setRefreshToken', data.refreshToken.token)
    store.commit('AuthModule/setUser', {
      userId: data.userId,
      firstName: data.firstName,
      lastName: data.lastName,
      userName: data.userName,
      profilePicture: data.profilePicture
    })
    router.push('/')
  }).catch(err => {
    store.dispatch('setMessage', err.message)
  })
    .finally(() => {
      username.value = ''
      password.value = ''
      store.dispatch('setLoading', false)
    })
}

</script>
<style scoped>

</style>

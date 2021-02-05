<template>
  <v-app-bar app>
    <v-app-bar-nav-icon>
      <NuxtLink to="/"><AppLogo /></NuxtLink>
    </v-app-bar-nav-icon>
    <ul id="nav">
      <li><NuxtLink to="/">top</NuxtLink></li>
      <li><NuxtLink to="/gallery">gallery</NuxtLink></li>
    </ul>
  </v-app-bar>
</template>

<style scoped>
#nav {
  display: flex;
  padding: 10px;
}

#nav li {
  width: 8vw;
  text-align: center;
}

#nav li a {
  color: #000;
}
</style>

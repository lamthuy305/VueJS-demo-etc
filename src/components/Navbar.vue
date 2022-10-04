<template>
  <nav>
    <h1>Quản lý sản phẩm</h1>
    <ul class="nav-link">
      <li><a href="/">Home</a></li>
      <li><a href="/products">Products</a></li>
      <li><a href="/error404">Error</a></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Navbar"
}
</script>

<style scoped>
nav {
  background: #333;
  color: #fff;
  text-align: center;
  padding: 10px;
}

nav ul.nav-link {
  display: flex;
  justify-content: space-around;
  align-items: center;
  list-style: none;
  padding: 0;
}

nav ul.nav-link a {
  color: white;
  text-decoration: none;
}

nav ul.nav-link a:hover {
  color: rgb(83,203,250);
}

</style>
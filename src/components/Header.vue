<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark mt-4 mr-5 ml-5 bg-info">
      <a class="navbar-brand" href="#">IMGe</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarColor01"
        aria-controls="navbarColor01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarColor01">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <a class="nav-link" href="#">Özellikler</a>
          </li>

          <li class="nav-item">
            <a class="nav-link" href="#">Hakkında</a>
          </li>
        </ul>
      </div>
      <button class="btn btn-success mr-3 next-buttons">Previous</button>
      <button class="btn btn-success mr-5 next-buttons">Next</button>
    </nav>
  </div>
</template>

<style  scoped>
.navlist {
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
}
.next-buttons {
  border: 2px solid black;
}
</style>
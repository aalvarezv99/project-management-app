<template>
  <div class="d-flex justify-content-center align-items-center vh-100 background">
    <b-card class="custom-card">
      <template v-slot:header>
        <h2 class="card-title">Project Management</h2>
      </template>
      <template v-slot:default>
        <ProjectList />
      </template>
    </b-card>
  </div>
</template>

<script>
import SearchBar from '~/components/SearchBar.vue';
import ProjectList from '~/components/ProjectList.vue';

export default {
  components: {
    SearchBar,
    ProjectList,
  },
};
</script>

<style>
.custom-card {
  width: 80vw;
  height: 80vh;
  border: none;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  overflow: auto;
}

.background {
  background: rgb(15,21,38);
  background: linear-gradient(90deg, rgba(15,21,38,1) 0%, rgba(255,102,102,1) 100%);
}

.card-title {
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  padding: 0.5rem;
  border-radius: 5px;
}

@media screen and (max-width: 600px) {
  .custom-card {
    width: 100%;
    height: 90vh;
  }
}
</style>

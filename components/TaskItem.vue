<template>
  <b-list-group-item class="d-flex justify-content-between align-items-center">
    <div>
      <h5>{{ task.name }}</h5>
      <p>{{ task.description }}</p>
      <p>Status: {{ task.status }}</p>
    </div>
    <div>
      <b-button @click="$emit('delete-task', task.id)" variant="danger" class="mr-2">Delete</b-button>
      <b-button @click="$emit('edit-task', task)" variant="info">Edit</b-button>
    </div>
  </b-list-group-item>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    task: Object,
    projectId: Number,
  },
  methods: {
    ...mapActions(['deleteTask']),
    deleteTask() {
      this.deleteTask({ projectId: this.projectId, taskId: this.task.id });
    },
  },
};
</script>

<style scoped>
</style>

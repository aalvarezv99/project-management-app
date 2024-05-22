<template>
  <b-card style="max-width: 1000px">
    <div
      style="display: flex; justify-content: space-between; align-items: center"
    >
      <div>
        <b-card-title>{{ project.name }}</b-card-title>
        <b-badge :variant="getBadgeVariant(project.status)">
          Status:
          {{ project.status === "active" ? "Active" : "Inactive" }}
        </b-badge>
      </div>
      <div>
        <b-button-group>
          <b-button
            v-b-tooltip.hover
            title="Edit Project"
            variant="info"
            @click="showEditProjectForm = true"
          >
            <fa :icon="['fas', 'pencil']" />
          </b-button>
          <b-button
            v-b-tooltip.hover
            title="Delete Project"
            variant="danger"
            @click="showDeleteModal = true"
            ><fa :icon="['fas', 'trash']"
          /></b-button>
        </b-button-group>
      </div>
    </div>
    <div style="word-wrap: break-word" class="py-2">
      <b-card-text>{{ project.description }}</b-card-text>
    </div>
    <b-modal
      centered
      v-model="showEditProjectForm"
      title="Edit Project"
      hide-footer
    >
      <b-form @submit.prevent="updateProject">
        <b-form-group label="Project Name">
          <b-form-input v-model="editedProject.name" required></b-form-input>
        </b-form-group>
        <b-form-group label="Project Description">
          <b-form-textarea
            v-model="editedProject.description"
            required
            size="lg"
          ></b-form-textarea>
        </b-form-group>
        <b-form-select
          v-model="editedProject.status"
          :options="statusOptions"
        ></b-form-select>
        <b-form-group class="d-flex justify-content-end py-2">
          <b-button type="submit" variant="success">Update</b-button>
          <b-button @click="showEditProjectForm = false" variant="danger"
            >Cancel</b-button
          >
        </b-form-group>
      </b-form>
    </b-modal>
    <b-modal
      centered
      v-model="showDeleteModal"
      title="Confirm Delete"
      hide-footer
    >
      <p>Are you sure you want to delete this project?</p>
      <b-button @click="deleteProject" variant="danger">Yes, Delete</b-button>
      <b-button @click="showDeleteModal = false" variant="secondary"
        >Cancel</b-button
      >
    </b-modal>
    <TaskList :projectId="project.id" />
    <Statistics :projectId="project.id" />
  </b-card>
</template>

<script>
import TaskList from "./TaskList.vue";
import Statistics from "./Statistics.vue";

export default {
  components: {
    TaskList,
    Statistics,
  },
  props: {
    project: Object,
  },
  data() {
    return {
      showEditProjectForm: false,
      showDeleteModal: false,
      statusOptions: [
        { value: "active", text: "Active" },
        { value: "inactive", text: "Inactive" },
      ],
      editedProject: { ...this.project },
    };
  },
  methods: {
    deleteProject() {
      this.$store.dispatch("deleteProject", this.project.id);
      this.showDeleteModal = false;
    },
    updateProject() {
      const editedProjectCopy = { ...this.editedProject };
      this.$store.dispatch("editProject", editedProjectCopy);
      this.showEditProjectForm = false;
    },
    getBadgeVariant(status) {
      return status === "active" ? "success" : "secondary";
    },
  },
};
</script>

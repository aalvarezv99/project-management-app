<template>
  <div>
    <div class="p-2">
      <SearchBar @filters="handleFilters" />
    </div>

    <div class="d-flex" v-if="filteredProjects.length > 0">
      <b-button
        class="btn btn-primary ml-auto"
        @click="showAddProjectForm = true"
        variant="primary"
        >Add Project</b-button
      >
    </div>

    <b-modal
      id="modal-center"
      centered
      v-model="showAddProjectForm"
      title="Add Project"
      hide-footer
    >
      <b-form @submit.prevent="submitProject">
        <b-form-group label="Project Name">
          <b-form-input v-model="newProject.name" required></b-form-input>
        </b-form-group>
        <b-form-group label="Project Description">
          <b-form-textarea
            v-model="newProject.description"
            required
            id="textarea-large"
            size="lg"
          ></b-form-textarea>
        </b-form-group>
        <b-form-group class="d-flex justify-content-end">
          <b-button type="submit" variant="primary" class="mr-2">Add</b-button>
          <b-button @click="showAddProjectForm = false" variant="danger"
            >Cancel</b-button
          >
        </b-form-group>
      </b-form>
    </b-modal>

    <div v-if="filteredProjects.length === 0" class="empty-state">
      <p>No projects available. Click the button below to add a new project.</p>
      <b-button @click="showAddProjectForm = true" variant="primary"
        >Add Project</b-button
      >
    </div>

    <b-row v-else>
      <b-col
        v-for="project in filteredProjects"
        :key="project.id"
        cols="12"
        md="6"
        lg="4"
        class="mb-4"
      >
        <ProjectItem :project="project" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ProjectItem from "./ProjectItem.vue";
import SearchBar from "./SearchBar.vue";

export default {
  components: {
    ProjectItem,
    SearchBar,
  },
  data() {
    return {
      showAddProjectForm: false,
      newProject: {
        name: "",
        description: "",
        tasks: [],
        status: "active",
        statistics: {
          pending: 0,
          inProgress: 0,
          completed: 0,
        },
      },
      searchQuery: "",
      statusQuery: "",
    };
  },
  computed: {
    ...mapState(["projects"]),
    filteredProjects() {
      let filteredProjects = this.projects;

      if (this.searchQuery) {
        filteredProjects = filteredProjects.filter((project) =>
          project.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }

      if (this.statusQuery) {
        filteredProjects = filteredProjects.filter(
          (project) =>
            project.status.toLowerCase() === this.statusQuery.toLowerCase()
        );
      }

      return filteredProjects;
    },
  },
  methods: {
    ...mapActions(["addProject"]),
    submitProject() {
      const project = { ...this.newProject, id: Date.now() };
      this.addProject(project);
      this.showAddProjectForm = false;
      this.newProject.name = "";
      this.newProject.description = "";
      this.newProject.tasks = [];
      this.newProject.statistics = {
        pending: 0,
        inProgress: 0,
        completed: 0,
      };
    },
    handleFilters(filters) {
      this.searchQuery = filters.query;
      this.statusQuery = filters.status;
    },
  },
};
</script>

<style scoped>
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  text-align: center;
  margin-top: 20px;
}
</style>

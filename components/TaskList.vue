<template>
  <div class="accordion" role="tablist">
    <b-card no-body>
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block v-b-toggle="'accordion-task' + projectId" variant="info"
          >Tasks</b-button
        >
      </b-card-header>
      <b-collapse
        :id="'accordion-task' + projectId"
        accordion="my-accordion"
        role="tabpanel"
      >
        <b-card-body>
          <b-form-group class="d-flex justify-content-end">
            <b-button
              class="float-rigth"
              variant="primary"
              @click="openCreateModal"
              >Add Task</b-button
            >
          </b-form-group>

          <b-modal
            centered
            v-model="showTaskModal"
            :title="modalTitle"
            @hide="resetTask"
            hide-footer
          >
            <form @submit.prevent="submitTask">
              <b-form-group label="Task Name" label-for="task-name">
                <b-form-input
                  id="task-name"
                  v-model="task.name"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group label="Task Description" label-for="task-desc">
                <b-form-textarea
                  v-model="task.description"
                  required
                  size="lg"
                ></b-form-textarea>
              </b-form-group>

              <b-form-group label="Status" label-for="task-status">
                <b-form-select
                  id="task-status"
                  v-model="task.status"
                  :options="statusOptions"
                ></b-form-select>
              </b-form-group>

              <b-form-group class="d-flex justify-content-end">
                <b-button type="submit" variant="success">{{
                  isEditMode ? "Update Task" : "Add Task"
                }}</b-button>
                <b-button variant="secondary" @click="cancelTask"
                  >Cancel</b-button
                >
              </b-form-group>
            </form>
          </b-modal>

          <b-modal centered v-model="showDeleteConfirmModal" hide-footer>
            <div class="d-block text-center">
              <p>Are you sure you want to delete this task?</p>
              <b-form-group class="d-flex justify-content-end">
                <b-button variant="danger" @click="confirmDeleteTask"
                  >Yes</b-button
                >
                <b-button variant="secondary" @click="cancelDelete"
                  >No</b-button
                >
              </b-form-group>
            </div>
          </b-modal>

          <b-modal centered v-model="showViewTaskModal" hide-footer>
            <div class="task-info">
              <p>
                <strong>Task Name:</strong>
                <span>{{ task.name }}</span>
              </p>
              <div class="task-details">
                <p><strong>Description:</strong></p>
                <p>{{ task.description }}</p>
              </div>
              <div class="task-details">
                <p>
                  <strong>Status:</strong>
                  <span>{{ task.status }}</span>
                </p>
              </div>
            </div>
          </b-modal>

          <b-modal centered v-model="showEditConfirmModal" hide-footer>
            <div class="d-block text-center">
              <p>Are you sure you want to save changes to this task?</p>
              <b-form-group class="d-flex justify-content-end">
                <b-button variant="success" @click="confirmEditTask"
                  >Yes</b-button
                >
                <b-button variant="secondary" @click="cancelEditConfirm"
                  >No</b-button
                >
              </b-form-group>
            </div>
          </b-modal>

          <b-list-group>
            <b-list-group-item
              class="d-flex justify-content-between align-items-center"
              v-for="task in tasks"
              :key="task.id"
              :variant="getVariantByStatus(task.status)"
              >{{ task.name }}
              <b-button-group>
                <b-button variant="success" @click="openViewModal(task)">
                  <fa :icon="['fas', 'eye']" />
                </b-button>
                <b-button variant="info" @click="openEditModal(task)">
                  <fa :icon="['fas', 'pencil']" />
                </b-button>
                <b-button
                  variant="danger"
                  @click="openDeleteConfirmModal(task.id)"
                  ><fa :icon="['fas', 'trash']"
                /></b-button>
              </b-button-group>
            </b-list-group-item>
          </b-list-group>
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
export default {
  props: {
    projectId: Number,
  },
  data() {
    return {
      task: {
        id: null,
        name: "",
        description: "",
        status: "pending",
      },
      showTaskModal: false,
      showDeleteConfirmModal: false,
      showEditConfirmModal: false,
      isEditMode: false,
      statusOptions: [
        { value: "pending", text: "Pending", variant: "warning" },
        { value: "in progress", text: "In Progress", variant: "info" },
        { value: "completed", text: "Completed", variant: "success" },
      ],
      taskIdToDelete: null,
      showViewTaskModal: false,
    };
  },
  computed: {
    tasks() {
      return this.$store.getters.getProjectTasks(this.projectId);
    },
    modalTitle() {
      return this.isEditMode ? "Edit Task" : "Create Task";
    },
  },
  methods: {
    submitTask() {
      if (this.isEditMode) {
        this.showEditConfirmModal = true;
      } else {
        const newTask = { ...this.task, id: Date.now() };
        this.$store.dispatch("addTask", {
          projectId: this.projectId,
          task: newTask,
        });
        this.showTaskModal = false;
        this.resetTask();
      }
    },
    confirmEditTask() {
      this.$store.dispatch("editTask", {
        projectId: this.projectId,
        task: this.task,
      });
      this.showEditConfirmModal = false;
      this.showTaskModal = false;
      this.resetTask();
    },
    resetTask() {
      this.task = {
        id: null,
        name: "",
        description: "",
        status: "pending",
      };
    },
    deleteTask(taskId) {
      this.$store.dispatch("deleteTask", { projectId: this.projectId, taskId });
      this.taskIdToDelete = null;
      this.showDeleteConfirmModal = false;
    },
    openCreateModal() {
      this.isEditMode = false;
      this.showTaskModal = true;
    },
    openEditModal(task) {
      this.isEditMode = true;
      this.task = { ...task };
      this.showTaskModal = true;
    },
    openDeleteConfirmModal(taskId) {
      this.taskIdToDelete = taskId;
      this.showDeleteConfirmModal = true;
    },
    cancelTask() {
      this.showTaskModal = false;
      this.resetTask();
    },
    cancelEditConfirm() {
      this.showEditConfirmModal = false;
    },
    cancelDelete() {
      this.taskIdToDelete = null;
      this.showDeleteConfirmModal = false;
    },
    confirmDeleteTask() {
      if (this.taskIdToDelete !== null) {
        this.deleteTask(this.taskIdToDelete);
        this.resetTask();
      }
    },
    getVariantByStatus(status) {
      const statusOption = this.statusOptions.find(
        (option) => option.value === status
      );
      return statusOption ? statusOption.variant : "";
    },
    openViewModal(task) {
      this.task = { ...task };
      this.showViewTaskModal = true;
    },
  },
};
</script>

<style scoped></style>

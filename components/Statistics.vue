<template>
  <div class="accordion" role="tablist">
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button
          block
          v-b-toggle="'accordion-statistics' + projectId"
          variant="info"
          >Statistics</b-button
        >
      </b-card-header>
      <div class="d-flex justify-content-center">
        <b-collapse
          :id="'accordion-statistics' + projectId"
          accordion="my-accordion"
          role="tabpanel"
        >
          <b-card-body>
            <b-button-group vertical>
              <b-button variant="warning" class="text-white"
                >Pending: {{ projectStats.pending }}</b-button
              >
              <b-button variant="info"
                >In Progress: {{ projectStats.inProgress }}</b-button
              >
              <b-button variant="success"
                >Completed: {{ projectStats.completed }}</b-button
              >
            </b-button-group>
          </b-card-body>
        </b-collapse>
      </div>
    </b-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    projectId: Number,
  },
  computed: {
    ...mapGetters({
      stats: "projectStatistics",
    }),
    projectStats() {
      return this.stats(this.projectId);
    },
  },
};
</script>

<style scoped></style>

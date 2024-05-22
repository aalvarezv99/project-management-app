<template>
  <div>
    <div class="row filters">
      <div class="col-md-6">
        <b-input-group>
          <b-form-input
            v-model="query"
            placeholder="Search projects..."
            @input="applyFilters"
          ></b-form-input>
          <b-input-group-append>
            <b-button @click="clearSearch" variant="primary"
              >Clear</b-button
            >
          </b-input-group-append>
        </b-input-group>
      </div>
      <div class="col-md-6">
        <b-form-select
          v-model="selectedStatus"
          :options="statusOptions"
          @change="applyFilters"
        ></b-form-select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: "",
      selectedStatus: null,
      statusOptions: [
        { value: null, text: "All" },
        { value: "active", text: "Active" },
        { value: "inactive", text: "Inactive" },
      ],
    };
  },
  methods: {
    applyFilters() {
      this.$emit("filters", { query: this.query, status: this.selectedStatus });
    },
    clearSearch() {
      this.query = "";
      this.$emit("filters", { query: null, status: this.selectedStatus });
    },
  },
};
</script>

<style scoped>
.filters {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
</style>

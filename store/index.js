export const state = () => ({
  projects: [],
});

export const mutations = {
  ADD_PROJECT(state, project) {
    state.projects.push(project);
  },
  EDIT_PROJECT(state, updatedProject) {
    const index = state.projects.findIndex(p => p.id === updatedProject.id);
    if (index !== -1) {
      state.projects.splice(index, 1, updatedProject);
    }
  },
  DELETE_PROJECT(state, projectId) {
    const projectIndex = state.projects.findIndex(project => project.id === projectId);
    if (projectIndex !== -1) {
      state.projects[projectIndex].tasks.forEach(task => {
        const status = task.status;
        state.projects[projectIndex].statistics[status]--;
      });
      state.projects.splice(projectIndex, 1);
    }
  },
  ADD_TASK(state, { projectId, task }) {
    const project = state.projects.find(project => project.id === projectId);
    if (project) {
      project.tasks.push(task);
      project.statistics[task.status]++;
    }
  },
  DELETE_TASK(state, { projectId, taskId }) {
    const projectIndex = state.projects.findIndex(project => project.id === projectId);
    if (projectIndex !== -1) {
      const task = state.projects[projectIndex].tasks.find(task => task.id === taskId);
      const taskIndex = state.projects[projectIndex].tasks.findIndex(task => task.id === taskId);
      if (task) {
        state.projects[projectIndex].statistics[task.status]--;
      }
      state.projects[projectIndex].tasks.splice(taskIndex, 1);
    }
  },
  EDIT_TASK(state, { projectId, task }) {
    const project = state.projects.find(project => project.id === projectId);
    if (project) {
      const oldTask = project.tasks.find(t => t.id === task.id);
      if (oldTask) {
        project.statistics[oldTask.status]--;
        project.statistics[task.status]++;
        Object.assign(oldTask, task);
      }
    }
  },
};

export const actions = {
  addProject({ commit }, project) {
    commit('ADD_PROJECT', project);
  },
  editProject({ commit }, project) {
    commit('EDIT_PROJECT', project);
  },
  deleteProject({ commit }, projectId) {
    commit('DELETE_PROJECT', projectId);
  },
  addTask({ commit, getters }, { projectId, task }) {
    const project = getters.getProjectById(projectId);
    if (project) {
      commit('ADD_TASK', { projectId, task });
    }
  },
  editTask({ commit }, { projectId, task }) {
    commit('EDIT_TASK', { projectId, task });
  },
  deleteTask({ commit }, payload) {
    commit('DELETE_TASK', payload);
  },
};

export const getters = {
  getProjectTasks: (state) => (projectId) => {
    const project = state.projects.find(project => project.id === projectId);
    return project ? project.tasks : [];
  },
  getProjectById: (state) => (id) => {
    return state.projects.find(project => project.id === id);
  },
  projectStatistics: (state) => (id) => {
    const project = state.projects.find(p => p.id === id);
    if (!project) return { pending: 0, inProgress: 0, completed: 0 };
    return {
      pending: project.tasks.filter(task => task.status === 'pending').length,
      inProgress: project.tasks.filter(task => task.status === 'in progress').length,
      completed: project.tasks.filter(task => task.status === 'completed').length,
    };
  },
};

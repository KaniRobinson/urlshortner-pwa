export default {
  async create({ commit }, { formData }) {
    return await this.$axios.$post('/links', formData)
      .then(response => { commit('setLink', response.data); return response.data })
      .catch(error => { throw error })
  },
  async list({ commit }) {
    return await this.$axios.$get('/links')
      .then(response => { commit('setLinks', response); return response.data })
      .catch(error => { throw error })
  },
  async view({ commit }, { token }) {
    return await this.$axios.$get(`/links/${token}`)
      .then(response => { commit('setLink', response.data); return response.data })
      .catch(error => { throw error })
  },
}

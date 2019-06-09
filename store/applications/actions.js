export default {
  async create({ commit }, { formData }) {
    return await this.$axios.$post('/appliciations', formData)
      .then(response => { commit('setApplication', response.data); return response.data })
      .catch(error => { throw error })
  }
}

export default {
  async list({ commit }, { token }) {
    return await this.$axios.$get(`/visits/${token}`)
      .then(response => { commit('setVisits', response); return response })
      .catch(error => { throw error })
  },
  async analytics({ commit }, { token }) {
    return await this.$axios.$get(`/visits/${token}/analytics`)
      .then(response => { commit('setAnalytics', response); return response })
      .catch(error => { throw error })
  },
  async paginate({ commit }, options) {
    return await this.$axios.get(options.next)
      .then(response => { commit('pushVisits', response.data); return response.data })
      .catch(error => { throw error })
  },
}

export default {
  setVisits: (state, visits) => state.visits = visits,
  setAnalytics: (state, analytics) => state.analytics = analytics,
  pushVisits(state, visits) {
    state.visits.meta = visits.meta
    state.visits.links = visits.links
    state.visits.data = [].concat(...state.visits.data, ...visits.data)
  }
}

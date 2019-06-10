export default {
  setLink: (state, link) => state.link = link,
  setLinks: (state, links) => state.links = links,
  pushLinks(state, links) {
    state.links.meta = links.meta
    state.links.links = links.links
    state.links.data = [].concat(...state.links.data, ...links.data)
  }
}

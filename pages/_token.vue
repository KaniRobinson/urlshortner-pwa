<template>
  <section class="flex flex-wrap">
    <div class="w-full px-4 mb-4">
      <p class="text-sm text-gray-600 uppercase">{{ link.created_at.human }}</p>
      <p class="text-3xl uppercase font-bold">{{ link.url }}</p>
      <div class="flex items-center">
        <p class="text-blue-700 mr-2">{{ link.link }}</p>
        <button class="bg-transparent hover:bg-blue-500 text-blue-700 text-sm hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded mr-2" @click="handleCopyLink">Copy</button>
        <button class="bg-transparent hover:bg-blue-500 text-blue-700 text-sm hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded" @click="handleTestLink">Test Link</button>
      </div>
    </div>
    <div class="w-full px-4 mb-4">
      <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <line-graph :data="data" :options="options" />
      </div>
    </div>

    <div class="w-full px-4 mb-4">
      <p class="mb-4 text-xl">Link Visits <span class="text-xs">({{ visits.meta.total }})</span></p>
      <ul class="list-reset border mb-4">
        <li
          v-for="(visit,index) in visits.data"
          :key="index"
          class="w-full bg-white px-8 py-4 border-b flex flex-wrap">
          <div class="flex-1">
            <div class="flex mb-4">
              <i class="fas fa-globe mr-4 text-2xl" />
              <p class="flex-1">{{ visit.country }}</p>
            </div>
            <div class="flex mb-4">
              <i class="fas fa-wifi mr-4 text-2xl" />
              <p class="flex-1">{{ visit.ip_address }}</p>
            </div>
            <div class="flex mb-4">
              <i class="fas fa-link mr-4 text-2xl" />
              <p class="flex-1">{{ visit.refereer_url ? visit.refereer_url : 'Direct Link' }}</p>
            </div>
          </div>
          <p class="text-sm font-bold">{{ visit.created_at.human }}</p>
        </li>
      </ul>
      <button
        v-if="visits.links.next"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        @click="paginateVisits(visits.links)">Load More</button>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import LineGraph from '~/components/LineGraph.js'
export default {
  components: {
    LineGraph
  },
  async fetch({ store, params }) {
    await store.dispatch('links/view', { token: params.token })
    await store.dispatch('visits/list', { token: params.token })
  },
  async asyncData({ store, params }) {
    const analytics = await store.dispatch('visits/analytics', { token: params.token })
    return {
      data: {
        datasets: [{
          fill: true,
          backgroundColor: '#2b6cb0',
          label: 'Visits',
          data: analytics.data,
        }],
        labels: analytics.labels
      },
      options: {
        maintainAspectRatio: false,
      },
    }
  },
  computed: {
    ...mapGetters({
      link: 'links/fetchLink',
      visits: 'visits/fetchVisits',
      analytics: 'visits/fetchAnalytics',
    }),
  },
  methods: {
    ...mapActions({
      paginateVisits: 'visits/paginate',
    }),
    handleCopyLink() {
      const input = document.createElement('input')
      document.body.appendChild(input)
      input.value = this.link.link
      input.select()
      document.execCommand('copy')
      input.remove()
      alert('Copied link to clipboard')
    },
    handleTestLink() {
      const w = window.open(this.link.link, '_blank')
      w.focus()
    }
  }
}
</script>

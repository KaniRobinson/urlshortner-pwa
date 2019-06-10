<template>
  <section class="flex flex-wrap">
    <div class="w-full px-4 mb-4">
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" @submit="handleShorternUrl">
        <fieldset class="mb-4">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="name">Url</label>
          <input
            v-model="formData.url"
            :class="{'border-red-500': errors.first('url')}"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="name"
            type="text"
            placeholder="https://google.co.uk">
          <p v-if="errors.first('url')" class="text-red-500 text-xs italic mb-2">{{ errors.first('url') }}</p>
        </fieldset>
        <button
          :disabled="loading"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            <span v-if="!loading">Create Link</span>
            <i v-else class="fas fa-circle-notch fa-spin" />
          </button>
      </form>
    </div>

    <div class="w-full px-4 mb-4">
      <p class="mb-4 text-xl">Recent Links</p>
      <ul class="list-reset mb-4">
        <li
          v-for="(link,index) in links.data"
          :key="index"
          class="w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex items-center">
          <i class="fa fa-link mr-4 text-2xl" />
          <p class="font-bold mr-4 flex-1">{{ link.url }}</p>
          <button class="border-2 border-blue-500 hover:bg-blue-500 hover:text-white text-blue-500 py-1 px-2 rounded" @click="handleCopyLink(link.link)">Share Link</button>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      loading: false,
      formData: {
        url: '',
      }
    }
  },
  computed: {
    ...mapGetters({
      links: 'links/fetchLinks',
    }),
  },
  mounted() {
    this.listLinks()
  },
  methods: {
    ...mapActions({
      listLinks: 'links/list',
      createLink: 'links/create',
    }),
    handleCopyLink(link) {
      const input = document.createElement('input')
      document.body.appendChild(input)
      input.value = link
      input.select()
      document.execCommand('copy')
      input.remove()
      alert('Copied link to clipboard')
    },
    handleShorternUrl(event) {
      event.preventDefault()
      this.errors.clear()
      this.loading = true
      this.createLink({ formData: this.formData })
        .then(response => {
          this.loading = false
          this.formData.url = ''
          this.$router.push(`/${response.token}`)
        })
        .catch(error => {
            this.loading = false
            Object.keys(error.response.data.errors).forEach(field => {
              this.errors.add({ field, msg: error.response.data.errors[field][0] })
            })
        })
    }
  }
}
</script>

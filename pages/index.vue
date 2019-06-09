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
      <pre>{{ links.data }}</pre>
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

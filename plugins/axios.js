export default function ({ $axios }) {
  $axios.onRequest(() => {
    $axios.setHeader('Accept', 'application/json')
    $axios.setHeader('Content-Type', 'application/json')
  })
}

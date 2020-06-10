export default function (context) {
  if (process.client) {
    setTimeout(() => (document.querySelector('.pages-container').scrollTop = 0), 5)
  }
}

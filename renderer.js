/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */
const createItem = () => {
  const button = document.createElement('button')
  const container = document.createElement('div')
  const input = document.createElement('textarea')

  button.innerText = 'DO SCHOWKA'

  container.appendChild(input)
  container.appendChild(button)

  return {
    button,
    container,
    input
  }
}

const run = () => {
  let selectedItem
  const items = Array.from({ length: 10 }, () => createItem())

  const selectItem = (item) => {
    items.forEach(item => item.container.classList.remove('selected'))

    selectedItem = item
    selectedItem.container.classList.add('selected')
  }

  items.forEach(item => {
    document.body.appendChild(item.container)

    item.button.addEventListener('click', () => {      
      selectItem(item)
      window.electron.setClipboardText(item.input.value)
    })
  })
}

run()
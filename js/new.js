// Elements
const iframeElt = document.querySelector('#if-preview')
const selectThemeElt = document.querySelector('#select-theme')
const titleColorElt = document.querySelector('#title-color')
const toggleUrlModeElt = document.querySelector('#toggle-url-mode')
const codeUrlElt = document.querySelector('#code-url')
const codeElt = document.querySelector('#code')
const selectLangElt = document.querySelector('#select-lang')
const nameElt = document.querySelector('#name')
const outputUrlElt = document.querySelector('#output-url')

//Click and Copy url link
outputUrlElt.onclick = () => {
    const changeText = (text, modifier) => {
        const span = document.createElement('span')
        span.id = "output-url"
        span.classList.add(modifier)
        span.innerText = text

        outputUrlElt.replaceWith(span)

        setTimeout(() => {
            span.replaceWith(outputUrlElt)
        }, 2000)
    }

    navigator.clipboard.writeText(outputUrlElt.innerText)
        .then(() => {
            changeText('Copied to clipboard!', 'sucess')
        }).catch((err) => {
            changeText('No clipboard permission...', 'error')
        })
}

updatePreview()

function updatePreview() {
    var theme = selectThemeElt.value
    var titleColor = titleColorElt.value
    var codeMode = toggleUrlModeElt.checked ? "code-url" : "code"
    var code = toggleUrlModeElt.checked ? codeUrlElt.value : encodeURI(codeElt.value)
    var lang = selectLangElt.value
    var name = encodeURI(nameElt.value)

    if (titleColor.startsWith('#')) {
        titleColor = titleColor.substring(1, titleColor.length) // Remove #
    }

    const HOST = 'https://raffa064.github.io/CodeViewer' //window.location.protocol + "//" + window.location.host
    const url = HOST + `?light=${isLight(theme)}&theme=${theme}&title-color=${titleColor}&${codeMode}=${code}&lang=${lang}&name=${name}`
    iframeElt.contentWindow.location.replace(url)

    outputUrlElt.innerText = url;
}

function isLight(theme) {
    return ({
        'css-variables': true,
        'dark-plus': false,
        'dracula-soft': false,
        'dracula': false,
        'github-dark-dimmed': false,
        'github-dark': false,
        'github-light': true,
        'hc_light': false,
        'light-plus': true,
        'material-theme-darker': false,
        'material-theme-lighter': true,
        'material-theme-ocean': false,
        'material-theme-palenight': false,
        'material-theme': false,
        'min-dark': false,
        'min-light': true,
        'monokai': false,
        'nord': false,
        'one-dark-pro': false,
        'poimandres': false,
        'rose-pine-dawn': true,
        'rose-pine-moon': false,
        'rose-pine': false,
        'slack-dark': false,
        'slack-ochin': true,
        'solarized-dark': false,
        'solarized-light': true,
        'vitesse-dark': false,
        'vitesse-light': true
    })[theme]
}
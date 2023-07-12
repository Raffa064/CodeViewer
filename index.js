//URL params
const params = getUrlParams()

var theme = params['theme'] || 'github-dark'
var lang = params['lang'] || 'js'
var name = params['name'] || getNameFromUrl(params['code-url']) || 'Undefined.txt'
var code = params['code'] || `console.log('Code Viewer');`

var titleColor = params["title-color"] || "fff8"
// Window title / Page title
document.title = "CodeViewer: " + name
const fileName = document.querySelector('#file-name')
fileName.style["color"] = "#" + titleColor
fileName.innerText = name
fileName.onclick = () => {
    const url = params["code-url"]
    if (url) window.location.replace(url)
}

// Click and Copy button
const cnc = document.querySelector('#click-n-copy')
const cncIcon = document.querySelector('#cnc-icon')

cnc.onclick = () => {
    const changeIcon = (icon, modifier) => {
        cnc.classList.add(modifier)
        cncIcon.setAttribute('name', icon + '-outline')

        setTimeout(() => {
            cncIcon.setAttribute('name', 'clipboard-outline')
            cnc.classList.remove(modifier)
        }, 2000)
    }

    navigator.clipboard.writeText(code)
        .then(() => {
            changeIcon('checkmark', 'sucess')
        }).catch((err) => {
            changeIcon('close', 'error')
        })
}

fromUrl(params['code-url'], (codeFromUrl) => {
    code = codeFromUrl || decodeURI(code)
    showCode()
})

function showCode(firstTry = true) {
    // Shiki hightlighter
    shiki
        .getHighlighter({
            theme,
            langs: [lang],
        })
        .then(highlighter => {
            const htmlCode = highlighter.codeToHtml(code, { lang })
            document.getElementById('output').innerHTML = htmlCode
            addZoom(document.querySelector('pre'))
        })
        .catch(err => {
            if (firstTry) {
                theme = 'github-dark' // Try with github theme 
                showCode(false)
                return
            }

            showError('Probably unknown lenguage "' + lang + '"')
        })
}

function addZoom(elt) {
    const size = () => parseInt(window.getComputedStyle(elt).fontSize)
    const setSize = (size) => {
        elt.style.fontSize = size + 'px'
    }
    
    // Keyboard zoom
    window.addEventListener('keydown', (e) => {
        e.preventDefault()
        console.log(e.key)
        const keys = {
            "-": -1,
            "+": 1,
            "a": -1,
            "s": 1,
            "k": -1,
            "l": 1
        }
        if (keys[e.key]) setSize(size() + keys[e.key])
    })

    //Pinch zoom
    var initialDistance = 0
    var initialFontSize
    elt.addEventListener('touchstart', (e) => {
        e.preventDefault()
        if (e.touches.length == 2) {
            initialDistance = Math.hypot(
                e.touches[0].pageX - e.touches[1].pageX,
                e.touches[0].pageY - e.touches[1].pageY,
            );
            
            initialFontSize = size()
        }
    })

    elt.ontouchmove = (e) => {
        e.preventDefault()
        if (e.touches.length == 2) {
            const distance = Math.hypot(
                e.touches[0].pageX - e.touches[1].pageX,
                e.touches[0].pageY - e.touches[1].pageY,
            );
            
            const delta = distance - initialDistance;
            
            setSize(initialFontSize * delta * 0.005)
        }
    }
}

function showError(error) {
    const ld = document.querySelector("#loading")
    if (ld) {
        const errorElt = document.createElement('span')
        errorElt.id = 'error'
        errorElt.innerHTML = '<strong>ERROR:</strong> ' + error
        ld.replaceWith(errorElt)
        return
    }

    document.body.innerHTML = "ERROR: " + error
}

function getUrlParams() {
    const paramsStr = window.location.search
    const urlSplit = paramsStr.substring(1, paramsStr.length).split('&')

    const params = {}

    for (let i in urlSplit) {
        const line = urlSplit[i]
        const key = line.substring(0, line.indexOf("="))
        const value = line.substring(line.indexOf("=") + 1, line.length)

        params[key] = value
    }

    return params
}

function getNameFromUrl(url) {
    if (url == undefined) return null

    return url.substring(url.lastIndexOf("/") + 1, url.length)
}

function fromUrl(url, finishCallback) {
    if (url == undefined) {
        finishCallback(null)
        return
    }

    const text = fetch(url)
        .then(data => data.text())
        .then(text => finishCallback(text))
        .catch(() => finishCallback(null))
}
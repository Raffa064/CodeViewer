# Code Viewer

A quick code share share viewer.

To use the CodeViewer you can create your code url [from here](https://raffa064.github.io/CodeViewer/new.html), or manually write the url like:

```
https://raffa064.github.io/CodeViewer?&lt;Your params here&gt;
```

NOTE: The params must be **separated by "&"**

## Url params
| Param       | Default value                   |  Description                       |
| :---------- | :------------------------------ | :--------------------------------- |
| theme       | github-dark                     | [Shiki highlighter theme](#themes) |
| light       | false                           | Light theme flag                   |
| lang        | js                              | What is the code lenguage          |
| code        | console.log('Code Viewer');     | Code in plain text                 |
| code-url    | none                            | Url to a code file                 |
| name        | Untitled.txt / Last url segment | File name                          |
| title-color | fff8 (or 0008 when ligh mode)   | File name color (HEX)              |

NOTE: The title color is a hexadecimal value but it shouldn't contain "#"

<a name="themes"></a>
## Themes
The code highlights are provided by [Shiki Code Highlighter](https://github.com/shikijs/shiki/) and these are all the supported themes:
- css-variables
- dark-plus
- dracula-soft
- dracula
- github-dark-dimmed
- github-dark
- github-light
- hc_light
- light-plus
- material-theme-darker
- material-theme-lighter
- material-theme-ocean
- material-theme-palenight
- material-theme
- min-dark
- min-light
- monokai
- nord
- one-dark-pro
- poimandres
- rose-pine-dawn
- rose-pine-moon
- rose-pine
- slack-dark
- slack-ochin
- solarized-dark
- solarized-light
- vitesse-dark
- vitesse-light

To use anyone, inset at the end of your url params list:

```
https://raffa064.github.io/CodeViewer?&lt;Your params here&gt&theme=slack-dark;
```

## 3rd Libs
- [Shiki Code Highlighter](https://github.com/shikijs/shiki/)
- [Ionicon icon library](https://ionic.io/ionicons)
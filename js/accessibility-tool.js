document.addEventListener("DOMContentLoaded", (event) => {

    // reference about accessibilty

    // Forloh (Accessibility Menu Design)
    // https://forloh.com/

    // Accessibility Spark (Accessibility Menu Design)
    // https://accessibilityspark.com/accessibility-menu-for-website/


    // uesrSettings
    var R = {
        applier: document.getElementById('container') || document.body,
        // other configs
        feedbackColor: "brown",
        // can change value
        biggerText: [1, 1.2, 1.4, 1.6],
        lineHeight: [1, 1.2, 1.4, 1.6],
        letterSpacing: [1, 2, 3, 4],
        wordSpacing: [1, 4, 8, 16],
        brightness: [1, .75, .50, .25, 0],
        contrast: [1, .5, 2],
        grayscale: [0, .5, 1],
        saturation: [1, .5, 2],
        // do not change boolean's value 
        colorInvert: [0, 1],
        hideImage: [1, 0],
        readingGuide: [0, 1],
        readingMask: [0, 1],
        toggleTag: [0, 1],
        feedback: [0, 1],
        colorExtraction: [0, 1],
        textTree: [0, 1],
        measureTool: [0, 1],
        zIndexSearch: [0, 1],
        bigCursor: [0, 1],
        imgInspector: [0, 1],
        highlightLink: [0, 1],
        muteVoice: [0, 1],
    }

    // important variable - get all text nodes within container
    var textMemo = domTextrMemo(R.applier)
    textMemo.forEach(node => {
        const span = document.createElement('span'); // use span as text wrapper
        span.style.position = 'relative'
        node.after(span);
        span.appendChild(node);
    });
    textMemo = domTextrMemo(R.applier)
    var textWrapperMemo = domTextWrapperMemo(R.applier);


    // important variable - filters memo
    const filters = []

    // important variable - mouse position
    let px, py, cx, cy
    document.addEventListener("mousemove", e => {
        px = e.pageX
        py = e.pageY
        cx = e.clientX
        cy = e.clientY
    });

    // important event - keyboard handling
    let traverseIndex = textWrapperMemo.length - 1;
    let traverseH1 = [];
    let traverseH2 = [];
    let traverseH3 = [];
    let traverseH4 = [];
    let traverseH5 = [];
    let traverseH6 = [];
    textMemo.forEach((item, idx) => {
        if (item.parentElement.parentElement.tagName == 'H1') traverseH1.push(idx)
        if (item.parentElement.parentElement.tagName == 'H2') traverseH2.push(idx)
        if (item.parentElement.parentElement.tagName == 'H3') traverseH3.push(idx)
        if (item.parentElement.parentElement.tagName == 'H4') traverseH4.push(idx)
        if (item.parentElement.parentElement.tagName == 'H5') traverseH5.push(idx)
        if (item.parentElement.parentElement.tagName == 'H6') traverseH6.push(idx)
    })
    let traverseH1Index = traverseH1.length - 1
    let traverseH2Index = traverseH2.length - 1
    let traverseH3Index = traverseH3.length - 1
    let traverseH4Index = traverseH4.length - 1
    let traverseH5Index = traverseH5.length - 1
    let traverseH6Index = traverseH6.length - 1

    document.addEventListener("keypress", e => {
        if (e.shiftKey && e.code) {
            switch (e.code) {
                case 'KeyX': // toogle user feedeback
                    window.feedback({ target: document.getElementById('feedback') })
                    break;
                case 'KeyB': // back
                    if (--traverseIndex == -1) traverseIndex = textWrapperMemo.length - 1
                    textMemoWalk()
                    break;
                case 'KeyN': // next
                    if (++traverseIndex == textWrapperMemo.length) traverseIndex = 0
                    textMemoWalk()
                    break;
                case 'Digit1': // Heading1
                    if (++traverseH1Index == traverseH1.length) traverseH1Index = 0
                    traverseIndex = traverseH1[traverseH1Index]
                    textMemoWalk()
                    break;
                case 'Digit2': // Heading2
                    if (++traverseH2Index == traverseH2.length) traverseH2Index = 0
                    traverseIndex = traverseH2[traverseH2Index]
                    textMemoWalk()
                    break;
                case 'Digit3': // Heading3
                    if (++traverseH3Index == traverseH3.length) traverseH3Index = 0
                    traverseIndex = traverseH3[traverseH3Index]
                    textMemoWalk()
                    break;
                case 'Digit4': // Heading4
                    if (++traverseH4Index == traverseH4.length) traverseH4Index = 0
                    traverseIndex = traverseH4[traverseH4Index]
                    textMemoWalk()
                    break;
                case 'Digit5': // Heading5
                    if (++traverseH5Index == traverseH5.length) traverseH5Index = 0
                    traverseIndex = traverseH5[traverseH5Index]
                    textMemoWalk()
                    break;
                case 'Digit6': // Heading6
                    if (++traverseH6Index == traverseH6.length) traverseH6Index = 0
                    traverseIndex = traverseH6[traverseH6Index]
                    textMemoWalk()
                    break;
            }
        }

        return;

        function textMemoWalk() {
            textMemo.forEach(i => i.parentElement.style.outline = 'none')
            textMemo[traverseIndex].parentElement.style.outline = '3px solid greenyellow'
            let top = textMemo[traverseIndex].parentElement.getBoundingClientRect().top + window.scrollY - 100
            window.scrollTo({ top, behavior: "smooth" });
            say(textMemo[traverseIndex].parentElement.innerText)
        }
    })

    ////////////////////////////////////////////////////////////////////////////////////////////////

    // text font enlarge
    textWrapperMemo.forEach(node => node.fontSize = parseFloat(getComputedStyle(node).fontSize))
    window.biggerText = genStateLoopFunc(R.biggerText, value => {
        textWrapperMemo.forEach(node => node.style.fontSize = `${node.fontSize * value}px`)
    })

    // text line height enlarge
    textWrapperMemo.forEach(node => node.lineHeight = parseFloat(getComputedStyle(node).lineHeight))
    window.lineHeight = genStateLoopFunc(R.lineHeight, value => {
        textWrapperMemo.forEach(node => node.style.lineHeight = `${node.lineHeight * value}px`)
    })

    // text letter spacing enlarge
    textWrapperMemo.forEach(node => node.letterSpacing = 1)
    window.letterSpacing = genStateLoopFunc(R.letterSpacing, value => {
        textWrapperMemo.forEach(node => node.style.letterSpacing = `${node.letterSpacing * value}px`)
    })

    // text word spacing enlarge
    textWrapperMemo.forEach(node => node.wordSpacing = 1)
    window.wordSpacing = genStateLoopFunc(R.wordSpacing, value => {
        textWrapperMemo.forEach(node => node.style.wordSpacing = `${node.wordSpacing * value}px`)
    })

    // all site invert color
    window.colorInvert = genStateLoopFunc(R.colorInvert, value => {
        R.applier.style.filter = getFilterString('invert', value)
    })

    // all site brightness
    window.brightness = genStateLoopFunc(R.brightness, value => {
        R.applier.style.filter = getFilterString('brightness', value)
    })

    // all site contrast
    window.contrast = genStateLoopFunc(R.contrast, value => {
        R.applier.style.filter = getFilterString('contrast', value)
    })

    // all site contrast
    window.grayscale = genStateLoopFunc(R.grayscale, value => {
        R.applier.style.filter = getFilterString('grayscale', value)
    })

    // all site saturation
    window.saturation = genStateLoopFunc(R.saturation, value => {
        R.applier.style.filter = getFilterString('saturate', value)
    })

    // all site hide image
    window.hideImage = genStateLoopFunc(R.hideImage, value => {
        const imgs = [...R.applier.getElementsByTagName('img')]
        imgs.forEach(img => img.style.opacity = `${value}`);
        const divImgs = [...R.applier.getElementsByTagName('div')]
        divImgs.forEach(img => {
            if (!img.background && getComputedStyle(img).background.indexOf('http') > -1) {
                img.background = ' ' + getComputedStyle(img).background
                img.backgroundColor = ' ' + getComputedStyle(img).backgroundColor
            }
            if (img.background) {
                if (value == 0) {
                    img.style.background = 'transparent'
                } else {
                    img.style.background = img.background
                }
                img.style.backgroundColor = img.backgroundColor;
            }
        })
    });

    // reading guide
    window.readingGuide = genStateLoopFunc(R.readingGuide, value => {
        if (value) {
            const guide = document.createElement('div')
            guide.id = 'myGuide'
            guide.style.position = 'fixed'
            guide.style.display = 'inline-block'
            guide.style.left = cx - 250 + 'px';
            guide.style.top = cy + 'px';
            guide.style.height = '8px'
            guide.style.width = '500px'
            guide.style.backgroundColor = 'greenyellow'
            guide.style.border = '2px solid black'
            guide.style.borderRadius = '5px'
            guide.style.zIndex = '999'
            guide.style.pointerEvents = 'none'
            document.body.prepend(guide)
            const update = () => {
                guide.style.left = cx - 250 + 'px';
                guide.style.top = cy + 'px';
                document.getElementById('myGuide') && requestAnimationFrame(update)
            }
            requestAnimationFrame(update)
        } else {
            document.getElementById('myGuide').remove()
        }
    })

    // reading mask
    window.readingMask = genStateLoopFunc(R.readingMask, value => {
        if (value) {
            const guide_up = document.createElement('div')
            guide_up.id = 'myMaskGuideUp'
            guide_up.style.position = 'fixed'
            guide_up.style.display = 'block'
            guide_up.style.left = '0px'
            guide_up.style.top = '0px'
            guide_up.style.bottom = py - 100 + 'px'
            guide_up.style.width = '100%'
            guide_up.style.backgroundColor = 'rgba(0,0,0,.5)'
            guide_up.style.zIndex = '999'
            guide_up.style.pointerEvents = 'none'
            document.body.prepend(guide_up)

            const guide_down = document.createElement('div')
            guide_down.id = 'myMaskGuideDown'
            guide_down.style.position = 'fixed'
            guide_down.style.display = 'block'
            guide_down.style.left = '0px'
            guide_down.style.top = py + 100 + 'px'
            guide_down.style.bottom = '0px'
            guide_down.style.width = '100%'
            guide_down.style.backgroundColor = 'rgba(0,0,0,.5)'
            guide_down.style.zIndex = '999'
            guide_down.style.pointerEvents = 'none'
            document.body.prepend(guide_down)

            const update = () => {
                guide_up.style.bottom = `calc(100vh - ${cy - 100}px)`;
                guide_down.style.top = cy + 100 + 'px';
                document.getElementById('myMaskGuideUp') && document.getElementById('myMaskGuideDown') && requestAnimationFrame(update)
            }
            requestAnimationFrame(update)
        } else {
            document.getElementById('myMaskGuideUp').remove()
            document.getElementById('myMaskGuideDown').remove()
        }
    })


    // all site tags display
    window.toggleTag = genStateLoopFunc(R.toggleTag, value => {
        if (value) {
            textWrapperMemo.forEach(textWrapper => {
                let b = document.createElement('b');
                b.classList = 'tagDisplay'
                b.style = `
                    border: 1px solid gray;
                    background-color: yellowgreen;
                    color:white;
                    padding:2px 5px;
                    font-size:10px;
                    white-space:nowrap;
                    cursor:pointer;
                    position:absolute;
                    transform: translate(-105%, 0)
                `;
                let attrs = []
                for (const name of textWrapper.parentElement.parentElement.getAttributeNames()) {
                    const value = textWrapper.parentElement.parentElement.getAttribute(name);
                    // if (name == 'class' || name == 'style') continue
                    name.indexOf('-') == -1 && attrs.push(name + '="' + value + '"');
                }
                b.innerHTML = textWrapper.parentElement.tagName;
                b.title = textWrapper.parentElement.innerHTML;
                textWrapper.prepend(b)
            })
        } else {
            [...document.getElementsByClassName('tagDisplay')].forEach(tag => tag.remove())
        }
    })

    // display comments for user feedback
    window.feedback = genStateLoopFunc(R.feedback, value => {
        let feedbackDisplay = [...document.getElementsByClassName('feedbackDisplay')]
        if (value) {
            if (!feedbackDisplay.length) {
                textWrapperMemo.forEach(textWrapper => {
                    let b = document.createElement('b');
                    b.classList = 'feedbackDisplay'
                    b.style = `
                        background-color: transparent;
                        color:white;
                        padding:2px 0px;
                        white-space:nowrap;
                        cursor:pointer;
                        width: 100%;
                        position: relative;
                        font-size: 10px;
                    `;
                    b.innerHTML = `
                        <i class='memoToggle' style="color:white; background: yellowgreen; padding: 2px 4px;">+ 註解</i>
                        <br class='memoToggle'>
                        <textarea class='comment' style="background:rgba(255,255,255,.5); width: 100%; font-size: 14px;"></textarea>
                        <span class='commentMemo' style="color: ${R.feedbackColor}; font-size: 16px;"></span>
                    `
                    textWrapper.append(b)
                })
            }
            feedbackDisplay.forEach(item => {
                let comment = item.getElementsByClassName('comment')[0]
                let commentMemo = item.getElementsByClassName('commentMemo')[0]
                let memoToggle = [...item.getElementsByClassName('memoToggle')]
                comment.style.display = 'block'
                commentMemo.style.display = 'none'
                memoToggle.forEach(item => item.style.display = 'inline')
            })
        } else {
            feedbackDisplay.forEach(item => {
                let comment = item.getElementsByClassName('comment')[0]
                let commentMemo = item.getElementsByClassName('commentMemo')[0]
                let memoToggle = [...item.getElementsByClassName('memoToggle')]
                comment.style.display = 'none'
                commentMemo.style.display = 'inline'
                commentMemo.innerText = comment.value
                memoToggle.forEach(item => item.style.display = 'none')
            })
        }
    })

    // print screen
    window.printScreen = () => {
        document.getElementById('acc-tool').style.display = 'none';
        let tmpY = window.scrollY
        window.scrollTo({
            top: 0,
            behavior: "instant"
        });
        setTimeout(() => {
            html2canvas(document.body).then(canvas => {
                let w = window.open('', '_blank')
                w.document.write('<style>body{background:yellowgreen}</style>')
                w.document.write('<img width="100%" src="' + canvas.toDataURL() + '">')
                document.getElementById('acc-tool').style.display = '';
                window.scrollTo({
                    top: tmpY,
                    behavior: "instant"
                });
            })
        }, 1000)
    }

    // toggle fullscreen
    window.toggleFullscreen = () => {
        toggleFullScreen()
    }

    // color extraction
    window.colorExtraction = genStateLoopFunc(R.colorExtraction, value => {
        let cs = document.getElementById('siteColors')
        if (value) {
            if (!cs) {
                let all = [...R.applier.getElementsByTagName('*')];
                let colors = [];
                all.forEach(tag => {
                    let ele = getComputedStyle(tag)
                    for (const name of ele) {
                        if (ele[name].indexOf('linear-gradient') > -1) continue
                        if (ele[name].indexOf('srgb') > -1) continue
                        if (ele[name].indexOf('linearrgb') > -1) continue
                        if (ele[name].indexOf('none') > -1) continue
                        if (ele[name].indexOf('rgb') != 0) continue
                        if (ele[name].indexOf('rgb') > -1) {
                            colors.push(ele[name])
                        }
                    }
                });
                colors = colors.filter(onlyUnique)
                // popup color palette
                const div = document.createElement('div')
                div.id = "siteColors";
                div.style = `
                    display: inline-block;
                    position: fixed;
                    right: 0px;
                    width: 200px;
                    top: 0px;
                    z-index: 999;
                    background-color: #FFF;
                    border:1px solid black;
                    overflow-y: scroll;
                `;
                document.body.append(div)

                colors.forEach((c, idx) => {
                    const colorDiv = document.createElement('div')
                    colorDiv.style.backgroundColor = c
                    colorDiv.style.fontSize = '10px'
                    colorDiv.style.padding = '5px'
                    colorDiv.style.color = 'white'
                    colorDiv.style.textShadow = '#000 1px 0 10px'

                    let grayLevel = 0
                    let colorInfo = ''
                    let choose = ''
                    let shadow = ''
                    if (c.indexOf('rgb(') > -1) {
                        let [r, g, b] = c.split('rgb(')[1].split(')')[0].split(',').map(i => parseInt(i))
                        grayLevel = 0.299 * r + 0.587 * g + 0.114 * b
                        choose = grayLevel > 127 ? 'black' : 'white'
                        shadow = grayLevel > 127 ? 'white' : 'black'
                        colorInfo = c + rgbaToHex(r, g, b)
                    } else if (c.indexOf('rgba(') > -1) {
                        let [r, g, b, a] = c.split('rgba(')[1].split(')')[0].split(',').map(i => parseInt(i))
                        grayLevel = 0.299 * r + 0.587 * g + 0.114 * b
                        choose = grayLevel > 127 ? 'black' : 'white'
                        shadow = grayLevel > 127 ? 'white' : 'black'
                        grayLevel *= a
                        colorInfo = c
                    }
                    colorDiv.innerHTML = `<b style="display:inline-block;text-align:center;background-color:orange;padding:3px;border-radius:3px;border:1px solid yellow; width:35px;"> ${(idx + '').padStart(3, '0')} </b><span style="color:${(choose)}; text-shadow:${(shadow)} 1px 0 2px">&nbsp;${colorInfo}</span>`;
                    div.append(colorDiv)
                })
            }
            cs && (cs.style.display = 'inline-block')
        } else {
            cs.style.display = 'none'
        }
    })

    // text dom tree
    window.textTree = genStateLoopFunc(R.textTree, value => {
        let cs = document.getElementById('showTreePanel')
        if (value) {
            if (!cs) {
                const panel = document.createElement('div')
                panel.id = 'showTreePanel'
                panel.style = `
                    position:fixed;
                    display:inline-block;
                    border-left: 5px solid orange;
                    background-color:rgb(0,0,0,.8);
                    color:white;
                    padding:8px;
                    font-size:10px;
                    text-shadow: #000 1px 0 10px;
                    right:0px;
                    top:0px;
                    width:300px;
                    height:100%;
                    overflow-y: scroll;
                    transition: right .5s;
                    font-size: 12px;
                `;
                panel.onmouseenter = () => {
                    panel.style.right = '0px'
                }
                panel.onmouseleave = () => {
                    panel.style.right = '-290px'
                }

                let dump = ''
                let sid = 0
                textWrapperMemo.forEach(ele => {
                    sid++
                    let info = { level: 0 }
                    findParent(ele, info)
                    let len = Array(info.level).fill('-').join('')
                    let showText = ''
                    let attrs = []
                    for (const name of ele.parentElement.getAttributeNames()) {
                        const value = ele.parentElement.getAttribute(name);
                        if (name == 'class' || name == 'style') continue
                        name.indexOf('-') == -1 && attrs.push(name + '="' + value + '"');
                    }
                    let attrsStr = attrs.length ? (' ' + attrs.join(' ')) : '';
                    showText = ' ' + ele.textContent
                    ele.parentElement.classList.add('sid' + sid)
                    dump += `<span id='sid${sid}' style='text-wrap: nowrap;'><b style="color:orange;">${info.level.toString().padStart(2, '0') + len + ele.parentElement.tagName + attrsStr}</b>${showText}</span><br>`
                })
                panel.innerHTML = '<h4>Text Tree DOM</h4><hr>' + dump;
                [...panel.getElementsByTagName('span')].forEach(span => {
                    span.onclick = () => {
                        let bJump = document.getElementsByClassName(span.id)[0]
                        bJump.style.outline = '5px solid orange'
                        panel.style.opacity = '.1'
                        setTimeout(() => {
                            bJump.style.outline = 'none'
                            panel.style.opacity = '1'
                        }, 800)
                        let top = bJump.getBoundingClientRect().top + window.scrollY - 100
                        window.scrollTo({
                            top,
                            behavior: "smooth"
                        });
                    }
                    span.onmouseenter = () => {
                        span.style.color = 'yellow'
                    }
                    span.onmouseleave = () => {
                        span.style.color = 'white'
                    }
                })
                document.body.append(panel)
            }
            cs && (cs.style.display = 'inline-block')
        } else {
            cs.style.display = 'none'
        }

        return;
        function findParent(ele, info) {
            if (ele != R.applier) {
                info.level++
                return findParent(ele.parentElement, info)
            }
            return info
        }
    })

    // paint tool
    let canDraw, paintColor, paintSize;
    window.paintTool = genStateLoopFunc(R.textTree, value => {
        let cs = document.getElementById('showPainter')
        if (value) {
            if (!cs) {
                const painter = document.createElement('div')
                painter.id = 'showPainter'
                painter.style = `
                    position:fixed;
                    display:inline-block;
                    border: 5px solid rgba(0,0,0,.8);
                    padding:8px;
                    right:0px;
                    top:0px;
                    left: 0px;
                    bottom: 0px;
                    overflow-y: scroll;
                `;
                painter.innerHTML = `
                    <canvas id="painter-canvas"></canvas>
                    <div id="painter">  
                        <div id="painter-tools">
                            <button id="primary1" class="penColor" style='background:rgba(222, 49, 99, 1); transform: scale(1);'></button>
                            <button id="primary2" class="penColor" style='background:rgba(255, 127, 80, 1); transform: scale(1);'></button>
                            <button id="primary3" class="penColor" style='background:rgba(255, 191, 0, 1); transform: scale(1);'></button>
                            <button id="secondary1" class="penColor" style='background:rgba(223, 255, 0, 1); transform: scale(1);'></button>
                            <button id="secondary2" class="penColor" style='background:rgba(159, 226, 191, 1); transform: scale(1);'></button>
                            <button id="secondary3" class="penColor" style='background:rgba(64, 224, 208, 1); transform: scale(1);'></button>
                            <button id="other1" class="penColor" style='background:rgba(100, 149, 237, 1); transform: scale(1);'></button>
                            <button id="other2" class="penColor" style='background:rgba(204, 204, 255, 1); transform: scale(1);'></button>
                            <button id="size1" class="penSize" style='background:black; transform: scale(.5);'></button>
                            <button id="size2" class="penSize" style='background:black; transform: scale(.7);'></button>
                            <button id="size3" class="penSize" style='background:black; transform: scale(1);'></button>
                            <button id="erase" class="erase" style='background:black; transform: scale(1);'></button>
                        </div> 
                    </div>
                `;

                [...painter.getElementsByClassName('penColor')].forEach((pc, idx) => {
                    pc.style.width = pc.style.height = '20px'
                    pc.style.borderRadius = '100%'
                    pc.style.cursor = 'pointer'
                    pc.onclick = function () {
                        let c = getComputedStyle(this).backgroundColor
                        painter.style.border = `5px solid ${c}`
                        paintColor = c
                    }
                });

                paintSize = 5;
                [...painter.getElementsByClassName('penSize')].forEach((pc, i, arr) => {
                    pc.style.width = pc.style.height = '20px'
                    pc.style.borderRadius = '100%'
                    pc.style.cursor = 'pointer'
                    pc.onclick = function () {
                        paintSize = (i + 1) * 5
                    }
                });

                [...painter.getElementsByClassName('erase')].forEach((pc, i, arr) => {
                    pc.style.width = pc.style.height = '20px'
                    pc.style.border = '3px solid gray'
                    pc.style.backgroundColor = 'white'
                    pc.style.borderRadius = '3px'
                    pc.style.cursor = 'pointer'
                    pc.onclick = function () {
                        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
                    }
                })

                document.body.append(painter);
                [...painter.getElementsByClassName('penColor')][0].click();


                const canvas = document.getElementById('painter-canvas')
                canvas.style = `
                    display: inline-block;
                    box-sizing: border-box;
                    position: fixed;
                    left: 0px;
                    top: 0px;
                    width: 100vw;
                    height: 100vh;
                `
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                const ctx = canvas.getContext('2d')
                canvas.onmousedown = e => {
                    sx = e.clientX;
                    sy = e.clientY;
                    ctx.strokeStyle = paintColor;
                    canDraw = true
                    ctx.lineJoin = "round";
                    ctx.lineCap = "round";
                    ctx.beginPath();
                    ctx.moveTo(sx, sy)
                }
                canvas.onmousemove = e => {
                    if (!canDraw) return
                    ex = e.clientX;
                    ey = e.clientY;
                    ctx.lineWidth = paintSize;
                    ctx.lineTo(ex, ey)
                    ctx.stroke()
                    sx = ex;
                    sy = ey;
                }
                canvas.onmouseup = e => {
                    canDraw = false
                }
                window.addEventListener('resize', () => {
                    canvas.width = window.innerWidth;
                    canvas.height = window.innerHeight;
                })

            }
            cs && (cs.style.display = 'inline-block')
        } else {
            cs.style.display = 'none'
        }
    })


    // element measure Tool
    let flagInfo = false
    window.measureTool = genStateLoopFunc(R.measureTool, value => {

        if (value) {
            window.addEventListener('mouseover', handleInfo)
            flagInfo = true
        } else {
            flagInfo = false
        }

        return

        function handleInfo(event) {
            [...document.getElementsByClassName('hoverElementUnit')].forEach(el => el.remove())
            if (!flagInfo) return
            let [x, y] = [event.clientX, event.clientY]
            currentElement = document.elementFromPoint(x, y);
            const r = currentElement.getBoundingClientRect()
            const d = document.createElement('div')
            d.classList.add('hoverElementUnit')
            d.style = `
                position:absolute;
                display:inline-block;
                border: 1px solid green;
                background-color:rgb(0,255,0,.3);
                color:white;
                padding:1px 3px;
                font-size:10px;
                text-shadow: #000 1px 0 10px;
            `;
            d.style.left = r.x + window.scrollX + 'px'
            d.style.top = r.y + window.scrollY + 'px'
            d.style.width = r.width + 'px'
            d.style.height = r.height + 'px'
            d.innerHTML = `
                <div style="display:inline-block;position:absolute;left:0px;top:-1.5em;background-color:green;padding:0px 3px;">
                    ${Math.round(r.width)}x${Math.round(r.height)}
                </div>
            `;
            document.body.append(d)

            if (currentElement.parentElement) {
                const dw = document.createElement('div')
                const rw = currentElement.parentElement.getBoundingClientRect()
                dw.classList.add('hoverElementUnit')
                dw.style = `
                    position:absolute;
                    display:inline-block;
                    border: 1px solid green;
                    background-color:rgb(255,255,0,.3);
                    color:black;
                    padding:1px 3px;
                    font-size:10px;
                    text-shadow: #000 1px 0 10px;
                    pointer-events:none;
                `;
                dw.style.left = rw.x + window.scrollX + 'px'
                dw.style.top = rw.y + window.scrollY + 'px'
                dw.style.width = rw.width + 'px'
                dw.style.height = rw.height + 'px'

                let d_left = Math.abs(rw.left - r.left)
                let d_top = Math.abs(rw.top - r.top)
                let d_right = Math.abs(rw.right - r.right)
                let d_bottom = Math.abs(rw.bottom - r.bottom)

                dw.innerHTML = `
                    <div style="display:flex;align-items:start;justify-content: center;height:33.3%;font-size:10px;text-shadow: #FFF 1px 0 10px;">
                        <div class="text-align:center;width:100%;">${Math.round(d_top)}</div>
                    </div>
                    <div style="display:flex;align-items:center;height:33.3%;font-size:10px;text-shadow: #FFF 1px 0 10px;">
                        <div style="float:left;width:50%;">${Math.round(d_left)}</div>
                        <div style="float:right;width:50%;text-align:right">${Math.round(d_right)}</div>
                    </div>
                    <div style="display:flex;align-items:end;justify-content: center;height:33.3%;font-size:10px;text-shadow: #FFF 1px 0 10px;">
                        <div class="text-align:center;width:100%;">${Math.round(d_bottom)}</div>
                    </div>
                `;

                document.body.append(dw)
            }
        }
    })

    // z-index finder (查詢所有 z-index)
    window.zIndexSearch = genStateLoopFunc(R.zIndexSearch, value => {
        let box = document.getElementById('zIndexBox')
        if (value) {

            if (!box) {
                box = document.createElement('div')
                box.id = 'zIndexBox'
                box.style = `
                    display: inline-block;
                    position: fixed;
                    top: 10px;
                    right:10px;
                    background: rgb(57, 58, 71);
                    color: white;
                    z-index: 1001;
                    font-size: 12px;
                    line-height: 20px;
                    padding: 10px;
                    opacity: .92;
                `
                document.body.append(box)
            }

            box.style.display = 'inline-block';
            box.innerHTML = '';
            [...document.getElementsByTagName('*')].forEach(item => {
                const z = getComputedStyle(item).zIndex
                if (z != 'auto') {
                    item.style.outline = '5px solid purple'
                    let attrs = []
                    for (const name of item.getAttributeNames()) {
                        const value = item.getAttribute(name);
                        // if (name == 'class' || name == 'style') continue
                        if (name == 'style') continue
                        name.indexOf('-') == -1 && attrs.push(name + '="' + value + '"');
                    }
                    let tagName = item.tagName;
                    let attrsStr = attrs.length ? (' | ' + attrs.join(' ')) : '';
                    box.innerHTML += `<div><span style="color:rgba(186, 150, 235, 0.88)">${z}</span> ${tagName}${attrsStr}</div>`
                }
            })

            box.innerHTML = '<b>Current Z-index State</b><hr style="border:none; border-top:1px solid rgba(255,255,255,.5)">' + box.innerHTML;

        } else {
            box.style.display = 'none';
            [...document.getElementsByTagName('*')].forEach(item => {
                const z = getComputedStyle(item).zIndex
                if (z != 'auto') {
                    item.style.outline = ''
                }
            })
        }
    })

    // enlarge cursor
    window.bigCursor = genStateLoopFunc(R.bigCursor, value => {
        let cs = document.getElementById('bigCursor')
        if (value) {
            if (!cs) {
                let canvas = document.createElement('canvas')
                canvas.id = 'bigCursor'
                canvas.width = 200;
                canvas.height = 200;
                canvas.style = `
                    position: fixed;
                    left: 0px;
                    top: 0px;
                    pointerEvents: none;
                    z-index: 9999;
                `
                document.body.style.cursor = 'none'
                let polygon = [100, 25, 50, 150, 100, 125, 150, 150];
                let ctx = canvas.getContext('2d');
                // ctx.fillStyle = 'rgba(0,0,0,.3)'
                // ctx.fillRect(0, 0, 200, 200);
                // ctx.lineCap = ''
                // ctx.lineJoin = ''
                ctx.lineWidth = 7
                ctx.scale(.7, .7)
                ctx.translate(-82, 59)
                ctx.rotate(-45 * Math.PI / 180)
                ctx.beginPath();
                ctx.moveTo(polygon[0], polygon[1]);
                for (item = 2; item < polygon.length - 1; item += 2) {
                    ctx.lineTo(polygon[item], polygon[item + 1])
                }
                ctx.closePath();
                ctx.fillStyle = 'rgba(255,255,255,.9)'
                ctx.fill();
                ctx.stroke();
                document.body.append(canvas)
                const update = () => {
                    canvas.style.left = cx + 5 + 'px';
                    canvas.style.top = cy + 5 + 'px';
                    canvas && requestAnimationFrame(update)
                }
                requestAnimationFrame(update)
            }

        } else {
            document.body.style.cursor = ''
            document.getElementById('bigCursor').remove()
        }
    })


    // image inspector
    window.imgInspector = genStateLoopFunc(R.imgInspector, value => {
        const imgs = [...R.applier.getElementsByTagName('img')]
        const divs = [...R.applier.getElementsByTagName('div')].filter(item => getComputedStyle(item).backgroundImage.indexOf('url(') > -1)
        const allImage = [...imgs, ...divs]
        if (value) {
            allImage.forEach(item => {
                item.style.outline = '5px solid red'
                const imgURL = item.src || getComputedStyle(item).backgroundImage.split(')')[0].split('url(')[1].replace(/"/ig, '')
                item.onmouseenter = () => {
                    let rect = item.getBoundingClientRect()
                    let div = document.createElement('div')
                    div.id = 'img-inspector'
                    div.style = `
                        position:absolute;
                        display:inline-block;
                        background-color:rgba(0,0,0,0.8);
                        color:white;
                        left: ${rect.left + scrollX}px;
                        top: ${rect.top + scrollY}px;
                        font-size:12px;
                        transform: translate(-100%, 0%);
                        padding: 3px 5px;
                        border-radius: 3px;
                    `
                    div.innerHTML = 'double click image!'
                    document.body.append(div);
                }
                item.onmouseleave = () => {
                    document.getElementById('img-inspector').remove()
                }
                item.ondblclick = () => {
                    const grid = document.createElement('canvas').getContext('2d')
                    grid.canvas.width = 20;
                    grid.canvas.height = 20;
                    grid.fillStyle = '#666';
                    grid.fillRect(0, 0, 10, 10)
                    grid.fillStyle = '#AAA';
                    grid.fillRect(10, 0, 10, 10)
                    grid.fillStyle = '#AAA';
                    grid.fillRect(0, 10, 10, 10)
                    grid.fillStyle = '#666';
                    grid.fillRect(10, 10, 10, 10)
                    let val = grid.canvas.toDataURL();

                    let div = document.createElement('div')
                    div.id = 'img-viewer'
                    div.style = `
                            position:fixed;
                            background-color:rgba(0,0,0,0.8);
                            color:white;
                            left: 0px;
                            top: 0px;
                            right: 0px;
                            bottom: 0px;
                            font-size:16px;
                            padding: 10px;
                            z-index: 1002;
                        `
                    div.innerHTML = `
                            <div>
                                <div style="float:right; cursor:pointer;" onclick="document.getElementById('img-viewer').remove()">[close]</div>
                                <div>
                                    <div>Image Viewer</div>
                                    <div style="width: 100%; background:url(${val}); margin: 5px 0px; padding:5px;"><img src="${imgURL}" onload="imgInfo.innerText=this.naturalWidth+' x '+this.naturalHeight+' - ${imgURL}'"></div>
                                    <div id='imgInfo' style="width: 100%; margin: 5px 0px; padding:5px;"></div>
                                </div>
                            </div>
                        `
                    document.body.append(div);

                    const button = document.createElement('button')
                    button.innerText = 'download';
                    button.style = 'cursor:pointer;'
                    button.onclick = () => downloadImage(imgURL)
                    document.getElementById('img-viewer').append(button)
                }

            })
        } else {
            allImage.forEach(item => {
                item.style.outline = ''
                item.onmouseenter = null
                item.onmouseleave = null
                item.ondblclick = null
            })
        }
    })

    // highlight links
    window.highlightLink = genStateLoopFunc(R.highlightLink, value => {
        if (value) {
            [...R.applier.getElementsByTagName('a')].forEach(item => {
                item.highlight = [item.style.color, item.style.backgroundColor, item.style.outline].join(';')
                item.style.color = 'yellow';
                item.style.backgroundColor = 'black';
                item.style.outline = "3px solid yellow";
            });
        } else {
            [...R.applier.getElementsByTagName('a')].forEach(item => {
                let [color, backgroundColor, outline] = item.highlight.split(';')
                item.style.color = color;
                item.style.backgroundColor = backgroundColor;
                item.style.outline = outline;
            });
        }
    })

    // mute voice
    let mute = false;
    window.muteVoice = genStateLoopFunc(R.highlightLink, value => {
        if (value) {
            mute = true
        } else {
            mute = false
        }
    })

    ////////////////////////////////////////////////////////////////////////////////////////////////

    return;

    // function define bellow

    /**
     * generate filter string 
     */
    function getFilterString(filterName, value) {
        let idx = filters.findIndex(item => item.indexOf(`${filterName}(`) > -1)
        if (idx == -1) {
            filters.push(`${filterName}(${value})`)
        } else {
            filters[idx] = `${filterName}(${value})`
        }
        return filters.join(' ')
    }

    /**
     * common func - unique array
     */
    function onlyUnique(value, index, array) {
        return array.indexOf(value) === index;
    }

    /**
     * get all text wrapper element in specific id
     */
    function domTextWrapperMemo(htmlObj) {
        var nodes = []
        function traverseBody(node) {
            if (node.childNodes.length) {
                node.childNodes.forEach(child => {
                    if (child.nodeType == 1) {
                        traverseBody(child);
                    } else if (child.nodeType == 3 && child.textContent.trim().length > 1) {
                        nodes.push(child.parentElement)
                    }
                });
            }
        }
        traverseBody(htmlObj);
        nodes = nodes.filter(onlyUnique)
        return nodes;
    }

    /**
     * get all text element in specific id
     */
    function domTextrMemo(htmlObj) {
        var nodes = []
        function traverseBody(node) {
            if (node.childNodes.length) {
                node.childNodes.forEach(child => {
                    if (child.nodeType == 1) {
                        traverseBody(child);
                    } else if (child.nodeType == 3 && child.textContent.trim().length > 1) {
                        nodes.push(child)
                    }
                });
            }
        }
        traverseBody(htmlObj);
        nodes = nodes.filter(onlyUnique)
        return nodes;
    }

    /**
     * generate state loop maker
     */
    function genStateLoopFunc(valsArray, callback) {
        let idx = 0;
        return event => {
            idx++
            if (idx > valsArray.length - 1) idx = 0
            callback(valsArray[idx], idx);

            // _ _ _ index helper
            let btnHint = event.target.getElementsByTagName('div')[0]
            btnHint.innerHTML = ''
            btnHint.style.position = 'absolute'
            btnHint.style.left = '0px'
            btnHint.style.bottom = '-2px'
            btnHint.style.display = 'flex'
            btnHint.style.justifyContent = 'center'
            btnHint.style.pointerEvents = 'none'
            btnHint.style.width = '100%'
            valsArray.forEach((_, i) => {
                if (i > 0) {
                    if (i == idx) {
                        btnHint.innerHTML += `<span style='float:left; background-color:red; padding:1px 0; margin: 2px; width: calc((100% - 4px * ${valsArray.length - 1}) / ${valsArray.length});'></span>`
                    } else {
                        btnHint.innerHTML += `<span style='float:left; background-color:gray; padding:1px 0; margin: 2px; width: calc((100% - 4px * ${valsArray.length - 1}) / ${valsArray.length});'></span>`
                    }
                }
            })
            if (idx == 0) btnHint.innerHTML = ''
        }
    }

    /**
     * voice speak
     */
    function say(msg) {
        // https://gist.github.com/Eotones/d67be7262856a79a77abeeccef455ebf
        // voice navigation
        if (mute) return;
        const synth = window.speechSynthesis;
        let u = new SpeechSynthesisUtterance();
        u.lang = 'zh-TW';
        u.text = msg;
        synth.cancel()
        synth.speak(u);
    }

    /**
     * voice speak
     */
    function toggleFullScreen() {
        if (
            !document.fullscreenElement && // alternative standard method
            !document.mozFullScreenElement &&
            !document.webkitFullscreenElement &&
            !document.msFullscreenElement
        ) {
            // current working methods
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) {
                document.documentElement.msRequestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen(
                    Element.ALLOW_KEYBOARD_INPUT,
                );
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }
    }

    /**
     * hex-lize
     */
    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }
    /**
     * rgbaToHex
     */
    function rgbaToHex(r, g, b) {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }

    /**
     * download image
     */
    function downloadImage(imgURL) {
        const img = new Image
        img.crossOrigin = "anonymous"
        img.onload = () => {
            const canvas = document.createElement('canvas')
            canvas.width = img.naturalWidth
            canvas.height = img.naturalHeight
            const ctx = canvas.getContext('2d')
            ctx.drawImage(img, 0, 0)
            var fileName = imgURL.split('/').pop()
            var link = document.createElement("a")
            link.setAttribute("href", canvas.toDataURL())
            link.setAttribute("download", fileName)
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        }
        img.src = imgURL
    }
});
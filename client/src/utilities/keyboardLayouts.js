export const U = 40

const key = (label, w = 1, type = 'alpha', h = 1) => ({ label, w, h, type })
const gap = (w) => ({ gap: true, w })
const alphas = (labels) => labels.map((label) => key(label))

const NUMBER_ROW = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=']
const TOP_ROW = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']']
const HOME_ROW = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'"]
const BOTTOM_ROW = ['Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/']

const mainBlock = (escInCorner) => [
    [key(escInCorner ? 'Esc' : '`', 1, escInCorner ? 'accent' : 'alpha'), ...alphas(NUMBER_ROW), key('⌫', 2, 'mod')],
    [key('Tab', 1.5, 'mod'), ...alphas(TOP_ROW), key('\\', 1.5)],
    [key('Caps', 1.75, 'mod'), ...alphas(HOME_ROW), key('Enter', 2.25, 'accent')],
    [key('Shift', 2.25, 'mod'), ...alphas(BOTTOM_ROW), key('Shift', 2.75, 'mod')],
    [
        key('Ctrl', 1.25, 'mod'), key('Win', 1.25, 'mod'), key('Alt', 1.25, 'mod'),
        key('', 6.25, 'alpha'),
        key('Alt', 1.25, 'mod'), key('Fn', 1.25, 'mod'), key('Menu', 1.25, 'mod'), key('Ctrl', 1.25, 'mod')
    ]
]

const functionRow = [
    key('Esc', 1, 'accent'), gap(1),
    key('F1', 1, 'mod'), key('F2', 1, 'mod'), key('F3', 1, 'mod'), key('F4', 1, 'mod'), gap(0.5),
    key('F5', 1, 'mod'), key('F6', 1, 'mod'), key('F7', 1, 'mod'), key('F8', 1, 'mod'), gap(0.5),
    key('F9', 1, 'mod'), key('F10', 1, 'mod'), key('F11', 1, 'mod'), key('F12', 1, 'mod'), gap(0.25),
    key('PrtSc', 1, 'mod'), key('ScrLk', 1, 'mod'), key('Pause', 1, 'mod')
]

const navCluster = [
    [key('Ins', 1, 'mod'), key('Home', 1, 'mod'), key('PgUp', 1, 'mod')],
    [key('Del', 1, 'mod'), key('End', 1, 'mod'), key('PgDn', 1, 'mod')],
    [],
    [gap(1), key('↑', 1, 'accent')],
    [key('←', 1, 'accent'), key('↓', 1, 'accent'), key('→', 1, 'accent')]
]

const numpad = [
    [key('Num', 1, 'mod'), key('/', 1, 'mod'), key('*', 1, 'mod'), key('-', 1, 'mod')],
    [key('7'), key('8'), key('9'), key('+', 1, 'mod', 2)],
    [key('4'), key('5'), key('6')],
    [key('1'), key('2'), key('3'), key('Enter', 1, 'accent', 2)],
    [key('0', 2), key('.')]
]

const place = (rows, originX, originY) => {
    const keys = []
    rows.forEach((row, rowIndex) => {
        let x = originX
        row.forEach((item) => {
            if (!item.gap) keys.push({ ...item, x, y: originY + rowIndex })
            x += item.w
        })
    })
    return keys
}

const sixtyPercent = () => ({ width: 15, height: 5, keys: place(mainBlock(true), 0, 0) })

const sixtyFivePercent = () => {
    const rows = mainBlock(true)
    rows[0].push(key('Del', 1, 'mod'))
    rows[1].push(key('PgUp', 1, 'mod'))
    rows[2].push(key('PgDn', 1, 'mod'))
    rows[3] = [key('Shift', 2.25, 'mod'), ...alphas(BOTTOM_ROW), key('Shift', 1.75, 'mod'), key('↑', 1, 'accent'), key('End', 1, 'mod')]
    rows[4] = [
        key('Ctrl', 1.25, 'mod'), key('Win', 1.25, 'mod'), key('Alt', 1.25, 'mod'),
        key('', 6.25, 'alpha'),
        key('Alt', 1.25, 'mod'), key('Fn', 1.25, 'mod'), gap(0.5),
        key('←', 1, 'accent'), key('↓', 1, 'accent'), key('→', 1, 'accent')
    ]
    return { width: 16, height: 5, keys: place(rows, 0, 0) }
}

const tenkeyless = () => ({
    width: 18.25,
    height: 6.5,
    keys: [
        ...place([functionRow], 0, 0),
        ...place(mainBlock(false), 0, 1.5),
        ...place(navCluster, 15.25, 1.5)
    ]
})

const fullSize = () => ({
    width: 22.5,
    height: 6.5,
    keys: [
        ...place([functionRow], 0, 0),
        ...place(mainBlock(false), 0, 1.5),
        ...place(navCluster, 15.25, 1.5),
        ...place(numpad, 18.5, 1.5)
    ]
})

const LAYOUTS = {
    '60': sixtyPercent,
    '65': sixtyFivePercent,
    tkl: tenkeyless,
    full: fullSize
}

export const buildLayout = (slug) => (LAYOUTS[slug] ?? sixtyPercent)()

export const layoutWidthPercent = (slug) => Math.round((buildLayout(slug).width / fullSize().width) * 100)

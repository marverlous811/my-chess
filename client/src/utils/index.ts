import { PIECES } from "./constant"

export function isEven(num: number): boolean {
    return num % 2 === 0
}

function kingImage(piece: number): string {
    return piece > 0 ? 'https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg' : 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg'
}

function queenImage(piece: number): string {
    return piece > 0 ? 'https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg' : 'https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg'
}

function bishopImage(piece: number): string {
    return piece > 0 ? 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg' : 'https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg'
}


function rookImage(piece: number): string {
    return piece > 0 ? 'https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg' : 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg'
}

function knightImage(piece: number): string {
    return piece > 0 ? 'https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg' : 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg'
}

function pawnImage(piece: number): string {
    return piece > 0 ? 'https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg' : 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg'
}

export function fogImg() {
    return { backgroundImage: "url(https://upload.wikimedia.org/wikipedia/en/e/e5/Perlin.png)" }
}

export function backgroundImagePiece(piece: number) {
    const pieceType = Math.abs(piece)
    let iconUrl = ''
    switch (pieceType) {
        case PIECES.BISHOP:
            iconUrl = bishopImage(piece)
            break
        case PIECES.KNIGHT:
            iconUrl = knightImage(piece)
            break
        case PIECES.KING:
            iconUrl = kingImage(piece)
            break
        case PIECES.QUEEN:
            iconUrl = queenImage(piece)
            break
        case PIECES.ROOK:
            iconUrl = rookImage(piece)
            break
        case PIECES.PAWN:
            iconUrl = pawnImage(piece)
            break
        default: return {}
    }

    return { backgroundImage: "url('" + iconUrl + "')" }
}

export function convertIdxToPosition(idx = 0) {
    const x = idx % 8
    const y = (idx - x) / 8

    return { x, y }
}

export function convertPositionToIdx({ x = 0, y = 0 }) {
    return y * 8 + x
}

export function surroundPosition({ x = 0, y = 0 }): Array<number> {
    const retval = []
    if (x > 0) {
        retval.push(convertPositionToIdx({ x: x - 1, y }))
    }
    if (y < 7) {
        retval.push(convertPositionToIdx({ x, y: y + 1 }))
    }
    if (x < 7) {
        retval.push(convertPositionToIdx({ x: x + 1, y: y }))
    }
    if (y > 0) {
        retval.push(convertPositionToIdx({ x, y: y - 1 }))
    }
    if (x < 7 && y > 0) {
        retval.push(convertPositionToIdx({ x: x + 1, y: y - 1 }))
    }
    if (y > 0 && x > 0) {
        retval.push(convertPositionToIdx({ x: x - 1, y: y - 1 }))
    }
    if (x > 0 && y < 7) {
        retval.push(convertPositionToIdx({ x: x - 1, y: y + 1 }))
    }
    if (x < 7 && y < 7) {
        retval.push(convertPositionToIdx({ x: x + 1, y: y + 1 }))
    }

    return retval
}
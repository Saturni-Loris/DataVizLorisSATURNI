const couleur = (max) => {
    return Math.round(Math.random() * (max), 0);
}

export const aleatoire = (labels) => {
    let bgColor = []
    let bdColor = []

    labels.forEach(function (val) {
        let c1 = couleur(255)
        let c2 = couleur(255)
        let c3 = couleur(255)
        let tr = 0.5

        let color = 'rgba(' + [c1, c2, c3, tr].join(',') + ")"
        bgColor.push(color)
        let border = 'rgba(' + [c1, c2, c3, tr].join(',') + ")"
        bdColor.push(color)
    })
    return [bgColor, bdColor]
}
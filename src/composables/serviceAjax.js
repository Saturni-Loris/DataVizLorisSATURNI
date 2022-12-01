
export const getConso = () => {
    let rq = 'https://opendata.agenceore.fr/api/records/1.0/search/'
        + '?dataset=installations-de-production-eolien-par-commune'
        + '&q='
        + '&rows=100'
        + '&lang=FR'


    return fetch(rq)
        .then(response => {
            return response.json()
        })
        .catch(error => { throw error }
        )
}

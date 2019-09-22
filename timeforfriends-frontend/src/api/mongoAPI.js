import axios from 'axios'
const baseUrl = '/api/'

const getAll = (collection) => {
    let url = baseUrl + collection
    const request = axios.get(url)
    return request.then(response => response.data)
}

const getOne = (id, collection) => {
    let url = baseUrl + collection
    console.log(url);
    const request = axios.get(`${url}/${id}`)
    return request.then(response => response.data)
}
const populatedSearch = (item, collection) => {
    // const name = encodeURIComponent(JSON.stringify({name: item.name}))
    // let populate = encodeURIComponent(JSON.stringify([item.populate]))
    const name = item.firstName
    let url = `/search/${collection}?firstName=${name}`
    console.log(item.populate);
    // if (item.populate !== null) {
    //     url = url.concat(`&populate=${populate}`)
    // }
    console.log(url);

    const request = axios.get(url)
    return request.then(response => response.data)
}

const querySearch = (name, collection) => {
    let url = `/api/search/${collection}?firstName=${name}`
    console.log(url);

    const request = axios.get(url)
    return request.then(response => response.data)
}

const create = (newObject, collection) => {
    let url = baseUrl + collection
    const request = axios.post(url, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject, collection) => {
    let url = baseUrl + collection
    const request = axios.put(`${url}/${id}`, newObject)
    return request.then(response => response.data)
}

const deleteObject = (id, collection) => {
    let url = baseUrl + collection
    const request = axios.delete(`${url}/${id}`)
    return request.then(response => response.data)
}

// const getMapKey = () => {
//     let url = baseUrl + "map"
//     const request = axios.get(`${url}`)
//     return request.then(response => response.data)
// }

export default { getAll, getOne, create, update, deleteObject, populatedSearch, querySearch }
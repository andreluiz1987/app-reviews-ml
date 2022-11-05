import api from './api'


function save(url, body) {
    return new Promise((res, reject) => {
        api
            .post(url, body)
            .then((response) => {
                res(response)
                return response
            })
            .catch((err) => {
                reject(err);
            });
    })
}


function getAll(url) {
    return new Promise((res, reject) => {
        api
            .get(url)
            .then((response) => {
                res(response)
                return response
            })
            .catch((err) => {
                reject(err);
            });
    })
}

export { save, getAll};

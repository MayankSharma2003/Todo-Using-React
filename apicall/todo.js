
export async function saveTodo(data) {
    return new Promise((resolve, reject) => {
        fetch('http://localhost:8000/saveTodo', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        })
            .then(function (response) {
                if (response.status == 200) {
                    resolve(response);
                }
            })
            .catch(function (error) {
                reject(error);
            })
    })
}

export async function getTodos(userName) {
    return new Promise((resolve, reject) => {
        fetch('http://localhost:8000/getTodo?name=' + userName)
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                reject(error);
            });
    })
}

export async function updateCb(data) {
    return new Promise((resolve, reject) => {
        fetch('http://localhost:8000/updateCb', {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: data.id, userName : data.userName}),
        })
            .then(function (response) {
                if (response.status == 200) {
                    resolve(response);
                }
            })
            .catch(function (error) {
                reject(error);
            })
    })
}

export async function deleteTodo(data) {
    return new Promise((resolve, reject) => {
        fetch('http://localhost:8000/deleteTodo', {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: data }),
        })
            .then(function (response) {
                if (response.status == 200) {
                    resolve(response);
                }
            })
            .catch(function (error) {
                reject(error);
            })
    })
}
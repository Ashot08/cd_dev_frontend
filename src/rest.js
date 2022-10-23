
const headers = new Headers();
let root = 'https://readsvch.store';
root = 'https://training.sibcbt.ru';

export const programAPI = {

    getPrograms(data){

        // const username = 'AdminTraining';
        // const password = 'Bcy1 A3xL ne6o HvtC 8fAk nNBU';
        headers.set("Content-Type", "application/json");
        // headers.set("Authorization", "Basic " + (`${username}:${password}`).toString('base64'));

        return fetch(`${root}/wp-json/courses_dashboard/v1/cd__programs`, {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                return data;
                // Prints result from `response.json()` in getRequest
            })
            .catch(error => console.error(error))
    },

    getTree( program_id ){

        return fetch(`${root}/wp-json/courses_dashboard/v1/cd__programs/tree=${program_id}`, {
            method: 'GET',
            headers
        })
            .then(response => response.json())
            .then(data => {
                return data;
            })
            .catch(error => console.error(error))

    },

    delete( program_id ){
        headers.set("Content-Type", "application/json");
        return fetch(`${root}/wp-json/courses_dashboard/v1/cd__programs/delete`, {
            method: 'POST',
            headers,
            body: JSON.stringify({program_id})
        })
            .then(response => response.json())
            .then(data => {
                return data;
            })
            .catch(error => console.error(error))

    }

}


export const programCatAPI = {

    getCats(program_id= 3){

        return fetch(`${root}/wp-json/courses_dashboard/v1/cd__program_cat/program_id=${program_id}`, {
            method: 'GET',
            headers
        })
            .then(response => response.json())
            .then(data => {
                return data;
                // Prints result from `response.json()` in getRequest
            })
            .catch(error => console.error(error))
    },


    create( data ){
        headers.set("Content-Type", "application/json");
        return fetch(`${root}/wp-json/courses_dashboard/v1/cd__program_cat/create`, {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                return data;
            })
            .catch(error => console.error(error))

    },

    delete( cat_id ){
        headers.set("Content-Type", "application/json");
        return fetch(`${root}/wp-json/courses_dashboard/v1/cd__program_cat/delete`, {
            method: 'POST',
            headers,
            body: JSON.stringify({cat_id})
        })
            .then(response => response.json())
            .then(data => {
                return data;
            })
            .catch(error => console.error(error))

    },

    assignCategoryToProgram ( data ) {
        headers.set("Content-Type", "application/json");
        return fetch(`${root}/wp-json/courses_dashboard/v1/cd__program_cat/assign`, {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                return data;
            })
            .catch(error => console.error(error))

    }

}


export const studentAPI = {
    getStudents(program_id, page = 0, offset = 4, filters = {}){
        headers.set("Content-Type", "application/json");
        return fetch(`${root}/wp-json/courses_dashboard/v1/cd__students&program_id=${program_id}&page=${page}&offset=${offset}`, {
            method: 'POST',
            headers,
            body: JSON.stringify(filters)
        })
            .then(response => response.json())
            .then(data => {
                return data;
                // Prints result from `response.json()` in getRequest
            })
            .catch(error => console.error(error))
    },

    createStudent(data){
        headers.set("Content-Type", "application/json");
        return fetch(`${root}/wp-json/courses_dashboard/v1/cd__user&create`, {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                return data;
            })
            .catch(error => console.error(error))

    },

    getStudentsProtocol(data){
        headers.set("Content-Type", "application/json");
        return fetch(`${root}/wp-json/courses_dashboard/v1/cd__protocol&students`, {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                return data;
            })
            .catch(error => console.error(error))

    },

    getStudentsToExcel(data){
        headers.set("Content-Type", "application/json");
        return fetch(`${root}/wp-json/courses_dashboard/v1/cd__protocol&students_export`, {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                return data;
            })
            .catch(error => console.error(error))
    },

}

export const userAPI = {
    updateUser(data){
        headers.set("Content-Type", "application/json");
        return fetch(`${root}/wp-json/courses_dashboard/v1/cd__user&update`, {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                return data;
            })
            .catch(error => console.error(error))
    },

    updateUserPrograms(data){
        headers.set("Content-Type", "application/json");
        return fetch(`${root}/wp-json/courses_dashboard/v1/cd__user&update_programs`, {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                return data;
            })
            .catch(error => console.error(error))
    }

}
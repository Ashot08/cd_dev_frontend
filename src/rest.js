
const headers = new Headers();
const root = 'https://readsvch.store';
//const root = 'https://training.sibcbt.ru';

export const programAPI = {
    getPrograms(page = 0, offset = 4){

        // const username = 'AdminTraining';
        // const password = 'Bcy1 A3xL ne6o HvtC 8fAk nNBU';
        // headers.set("Content-Type", "application/json");
        // headers.set("Authorization", "Basic " + (`${username}:${password}`).toString('base64'));

        return fetch(`${root}/wp-json/courses_dashboard/v1/cd__programs&page=${page}&offset=${offset}`, {
            method: 'GET',
            headers
        })
            .then(response => response.json())
            .then(data => {
                return data;
                // Prints result from `response.json()` in getRequest
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
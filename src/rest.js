
const headers = new Headers();
const root = 'https://readsvch.store/';

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
                console.log('SUCCESS');
                return data;
                // Prints result from `response.json()` in getRequest
            })
            .catch(error => console.error(error))
    }
}

export const studentAPI = {
    getStudents(program_id, page = 0, offset = 4){

        return fetch(`${root}/wp-json/courses_dashboard/v1/cd__students&program_id=${program_id}&page=${page}&offset=${offset}`, {
            method: 'GET',
            headers
        })
            .then(response => response.json())
            .then(data => {
                console.log('SUCCESS');
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
                console.log(data);
                return data;
            })
            .catch(error => console.error(error))
    },

}
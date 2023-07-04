
const headers = new Headers();
let root = 'https://readsvch.store';
root = 'https://training.sibcbt.ru';

export const programAPI = {

    getPrograms(data){

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
        filters.program_id = program_id;
        filters.page = page;
        filters.offset = offset;

        //return fetch(`${root}/wp-json/courses_dashboard/v1/cd__students&program_id=${program_id}&page=${page}&offset=${offset}`, {
        return fetch(`${root}/wp-json/courses_dashboard/v1/cd__students&get_students`, {
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

    createStudentMass(data){
         // headers.set("Content-Type", "application/json");
         headers.set("Content-Type", "multipart/form-data");
        // headers.set("Content-Type", "");


        let fd = new FormData();
        fd.append("file", data.file_path);
        fd.append('program_id', data.program_id);

        // for(var key of fd.entries()){
        //     console.log('olonghohnson_' + key[0] + key[1])
        // }


        return fetch(`${root}/wp-json/courses_dashboard/v1/cd__user&create_mass`, {

            method: 'POST',
            headers: {
                "Content-Type": "multipart/form-data"
            },
            body: JSON.stringify(fd)
            //body: data

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
    getStudentProgress(data){
        headers.set("Content-Type", "application/json");
        return fetch(`${root}/wp-json/courses_dashboard/v1/cd__students&get_progress`, {
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
    },
    updateUsersPrograms(data){
        headers.set("Content-Type", "application/json");
        return fetch(`${root}/wp-json/courses_dashboard/v1/cd__user&mass_add_to_programs`, {
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
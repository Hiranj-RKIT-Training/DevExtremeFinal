console.log('connected'); // Log message to indicate script is running

const baseUrl = "https://67aaeba965ab088ea7e7ec5c.mockapi.io/api/users";

let store = new DevExpress.data.CustomStore({
    key: "id", // Define the key field for identifying records
    // cacheRawData: true,
    loadMode: "raw",
    errorHandler: function (error) {
        console.log(error.message); // Log any errors encountered
    },
    byKey: function (key) { // Function to fetch a single record by its key
        return $.ajax({
            method: 'GET',
            url: baseUrl + key,
        }).fail(() => { throw "Data Loading Error"; }); // Handle errors
    },
    load: function (loadOptions) { // Function to fetch all data
        console.log(loadOptions); // Log load options
        return $.ajax({
            method: 'GET',
            url: baseUrl,
        }).fail(() => { throw "Data Loading Error"; }); // Handle errors
    },
    insert: (values) => { // Function to insert a new record
        return $.ajax({
            url: baseUrl,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(values)
        });
    },
    update: (key, values) => { // Function to update a record
        return $.ajax({
            url: baseUrl + key,
            type: "PUT",
            contentType: "application/json",
            data: JSON.stringify(values)
        });
    },
    remove: (key) => { // Function to delete a record
        return $.ajax({
            url: baseUrl + key,
            type: "DELETE"
        });
    }
});

export { store };
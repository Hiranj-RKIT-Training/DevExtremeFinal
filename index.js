import { MenuItems } from "./data.js";
import { GetData, RemoveBrands  , GetBrand} from "./api.js";
import { store } from "./customstore.js";
console.log('connected');

let CheckLogin = async (formData) => {
    loader.show();
    let data = await store.load();
    let user = data.find(user => user.username === formData.username && user.password === formData.password);
    loader.hide();
    if (user) {
        DevExpress.ui.notify("Login successful", "success", 2000);
        $("#loginPopup").dxPopup("instance").hide();
        localStorage.setItem("user", user.username);
        // loginPopup.hide();
    } else {
        DevExpress.ui.notify("Invalid username or password", "error", 2000);
    }
    location.reload();
    console.log(data);
}
let isLoggedIn = () => {
    let user = localStorage.getItem("user");
    if (user) {
        return true;
    }
    return false;
}
let loader = $("#loader").dxLoadPanel({
    position: {
        my: "center",
        at: "center",
    }
}).dxLoadPanel("instance");


$(function () {
    if (isLoggedIn()) {
        GetData("trending");
    } else {
        // $("#loginPopup").dxPopup("instance").show();
    }

    $(".brandsButton").on("click", function () {
        let val = $(this).val();
        console.log(val);
        GetBrand(this);
    });
    $('#loginButton').dxButton({
        text: 'Login',
        onContentReady: function (e) {
            var button = e.component;
            // button.option("text", "Signup");
            if (isLoggedIn()) {
                button.option("visible", false);

            }

        },
        onClick: function () {
            loginPopup.show();
        }
    });
    $("#searchbar").on("change", function () {
        RemoveBrands();
        GetBrand(this);
    })
    $('#signupButton').dxButton({
        text: 'Signup',
        onContentReady: function (e) {
            var button = e.component;
            // button.option("text", "Signup");
            if (isLoggedIn()) {
                button.option("visible", false);

            }

        },
        onClick: function () {
            signupPopup.show();
        }
    });
    $("#logoutButton").dxButton({
        text: "Logout",
        onContentReady: function (e) {
            var button = e.component;
            if (!isLoggedIn()) {
                button.option("visible", false);
            }
        },
        onClick: function () {
            localStorage.removeItem("user");
            location.reload();
        }
    });
    $('#categoryMenu').dxMenu({
        dataSource: MenuItems['data']['menuCollection'],
        displayExpr: "name",
        itemTemplate: function (data, index, itemElement) {
            let item = $('<div>').text(data.name).attr("id", `menu-${data.name}`).addClass("menu-item-class");
            console.log(data.sections);
            let transformedData = [];
            let maxEntries = Math.max(...data.sections.map(s => s.entries.length));

            for (let i = 0; i < maxEntries; i++) {
                let row = {};
                data.sections.forEach(section => {
                    let entry = section.entries[i];
                    row[section.name] = entry ? `${entry.name}` : "";
                });
                transformedData.push(row);
            }
            console.log(transformedData);

            let popoverContent = $("<div>").addClass("popover-content horizontal-list").dxDataGrid({
                dataSource: transformedData,
                columns: data.sections.map(s => ({
                    dataField: s.name,
                    caption: s.name,
                    allowSorting: false,
                    encodeHtml: false
                })),

                showBorders: false,
                columnAutoWidth: true,
                allowColumnResizing: false,
                rowAlternationEnabled: false,
                onCellClick: function (e) {
                    console.log(e);
                    popover.hide();
                    GetData(e.text);
                },
            });


            let popover = $("<div>")
                .dxPopover({
                    target: item, // Attach to the menu item
                    showEvent: "dxclick", // Show on hover
                    hideEvent: "dxdblclick", // Hide when mouse leaves
                    contentTemplate: function (contentItem, index, item) {
                        contentItem.addClass("menuPopOver");

                        // console.log(data);
                        return popoverContent;
                    },
                    elementAttr: {
                        id: "popover",
                        class: "popover-class"
                    },
                    position: "bottom", // Adjust as needed
                    shading: false,


                }).dxPopover("instance");
            itemElement.append(item, popover.element());
        },
        onItemClick: function (e) {
            var item = e.itemData;


        }

    });
    let loginPopup =

        $("#loginPopup").dxPopup({
            width: 400,
            height: 300,
            title: "Login",
            visible: false,
            dragEnabled: true,
            closeOnOutsideClick: true,
            showCloseButton: true,
            onInitialized: function (e) {
                console.log("initialized")
                var popup = e.component;
                if (!isLoggedIn()) {
                    popup.option("visible", true);
                }
            },
            contentTemplate: function (contentElement) {
                let container = $('<div id="loginContainer"></div>'); // Added ID here
                container.append('<div id="loginForm"></div>');
                container.append('<div id="newUserButton"></div>');
                contentElement.append(container);

                $("#loginForm").dxForm({
                    formData: {
                        username: "",
                        password: ""
                    },
                    items: [
                        {
                            dataField: "username",
                            // label: { text: "Username" },
                            editorType: "dxTextBox",
                            editorOptions: {
                                placeholder: "Enter username"
                            }
                        },
                        {

                            dataField: "password",
                            editorType: "dxTextBox",
                            editorOptions: {
                                mode: "password",
                                placeholder: "Enter password"
                            }
                        },
                        {
                            itemType: "button",
                            horizontalAlignment: "center",
                            buttonOptions: {
                                text: "Login",
                                type: "default",
                                onClick: function () {
                                    let formData = $("#loginForm").dxForm("instance").option("formData");
                                    console.log("Login clicked", formData);
                                    CheckLogin(formData);

                                }
                            }
                        }
                    ]
                });
                $("#newUserButton").dxButton({
                    text: "New User? Register Here",
                    stylingMode: "text",
                    onClick: function () {
                        console.log("New user registration clicked");
                        loginPopup.hide();
                        signupPopup.show();
                    }
                });
            }
        }).dxPopup("instance");

    let signupPopup = $("#signupPopup").dxPopup({
        width: 400,
        height: 300,
        title: "Sign Up",
        visible: false,
        dragEnabled: true,
        closeOnOutsideClick: true,
        showCloseButton: true,
        contentTemplate: function (contentElement) {
            let container = $('<div style="display: flex; flex-direction: column; align-items: center; text-align: center; width: 100%;"></div>');
            container.append('<div id="signupForm"></div>');
            contentElement.append(container);

            $("#signupForm").dxForm({
                formData: {
                    username: "",
                    email: "",
                    password: ""
                },
                items: [
                    {
                        dataField: "username",
                        editorType: "dxTextBox",
                        editorOptions: {
                            placeholder: "Enter username"
                        }
                    },
                    {
                        dataField: "email",
                        editorType: "dxTextBox",
                        editorOptions: {
                            placeholder: "Enter email"
                        }
                    },
                    {
                        dataField: "password",
                        editorType: "dxTextBox",
                        editorOptions: {
                            mode: "password",
                            placeholder: "Enter password"
                        }
                    },
                    {
                        itemType: "button",
                        horizontalAlignment: "center",
                        buttonOptions: {
                            text: "Sign Up",
                            type: "default",
                            onClick: async function () {
                                const form = signupPopup.content().find('.dx-form').dxForm('instance');
                                const formData = form.option('formData');
                                console.log(formData);

                                loader.option("visible", true);

                                try {
                                    setTimeout(() => {

                                    }, 10000);
                                    await store.insert(formData);
                                    DevExpress.ui.notify("Sign up successful", "success", 2000);
                                } finally {
                                    loader.option("visible", false);
                                    $("#signupPopup").dxPopup("instance").hide();
                                    localStorage.setItem("user", user.username);
                                    location.reload();
                                }
                                // $("#signupPopup").dxPopup("instance").hide();
                            }
                        }
                    }
                ]
            });
        }
    }).dxPopup("instance");

});
import { CreateBox } from "./createUi.js";

const baseUrl = "https://xw7sbct9v6-1.algolianet.com/1/indexes/products/query?x-algolia-agent=Algolia%20for%20vanilla%20JavaScript%203.32.1&x-algolia-application-id=XW7SBCT9V6&x-algolia-api-key=6b5e76b49705eb9f51a06d3c82f7acee";



const headers = {
    'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36',
    "accept": "application/json",
    "accept-language": "en-US,en;q=0.9",
    "content-type": "application/x-www-form-urlencoded",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site"
}


let GetData = async (query = "trending") => {
    if(!isLoggedIn()){
    
    //    await DevExpress.ui.notify("Login is Required", "error", 2000);
        $("#loginPopup").dxPopup("instance").show();
        return;
    }
    // Clearing the Div
    document.getElementById('shoesGrid').innerHTML = "<div id = 'loader'></div>";
    console.log(query);
    let q = `{"params": "query=${query}&hitsPerPage=${48}"}`;
    //API Call
    $("#loader").dxLoadIndicator({
        visible: true,
        position: {
            of: "body",
            at: "center",
            my: "center",
        },
    });
    let response = await fetch(baseUrl, {
        method: "POST",
        headers: headers,
        body: q,
    });
    $("#loader").dxLoadIndicator("instance").option("visible", false);
    // converting data to JSON
    let data = await response.json();
    console.log(data)
    // Creating UI for each Shoe
    let shoes = data['hits'];
    // console.log(shoes);
    shoes.forEach(element => {

        let shoe = {
            name: element['name'],
            photo: element['thumbnail_url'],
            price: element['price'],
        }

        let createdUi = CreateBox(shoe);
        let shoeGrid = document.getElementById("shoesGrid");
        shoeGrid.appendChild(createdUi);

    });

}
let isLoggedIn = () => {
    let user = localStorage.getItem("user");
    if (user) {
        return true;
    }
    return false;
}
let RemoveBrands = () => {
    $('.brandsButton').each(function () {
        $(this).removeClass("seletedBrand");
    })
}

let GetBrand = (brand) => {
    //unselecting all buttons 
    let buttons = document.querySelectorAll('.brandsButton');
    buttons.forEach(button => {
        button.classList.remove('seletedBrand');
    });
    brand.classList.toggle("seletedBrand")
    console.log(brand)
    console.log(brand.value);
    // creating UI
    // Function LOC - index.js
    GetData(brand.value);
}

export { GetData, GetBrand ,RemoveBrands }
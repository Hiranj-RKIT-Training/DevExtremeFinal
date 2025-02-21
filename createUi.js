const CreateBox = (shoe) => {
    // creating shoe thumbmail
    let imgDiv = document.createElement("div");
    imgDiv.setAttribute("class", "imgDiv");
    let thumbmail = document.createElement("img");
    thumbmail.setAttribute('src', shoe.photo)
    imgDiv.appendChild(thumbmail);


    // creating shoe title
    let shoeName = document.createElement('h5')
    shoeName.appendChild(document.createTextNode(shoe.name));

    // creating shoe price
    let shoePrice = document.createElement('h4')
    shoePrice.appendChild(document.createTextNode(`\$${shoe.price}`));
    //appending in div and setting class Shoebox
    let shoeBox = document.createElement('div');
    shoeBox.classList.add("shoeBox");
    shoeBox.appendChild(imgDiv);
    shoeBox.appendChild(shoeName);
    shoeBox.appendChild(shoePrice);

    return shoeBox
}

export { CreateBox };
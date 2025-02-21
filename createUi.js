const CreateBox = (shoe) => {
    // creating shoe thumbmail
    let thumbmail = document.createElement("img");
    thumbmail.setAttribute('src', shoe.photo)

    // creating shoe title
    let shoeName = document.createElement('h5')
    shoeName.appendChild(document.createTextNode(shoe.name));

    // creating shoe price
    let shoePrice = document.createElement('h4')
    shoePrice.appendChild(document.createTextNode(`\$${shoe.price}`));
    //appending in div and setting class Shoebox
    let shoeBox = document.createElement('div');
    shoeBox.classList.add("shoeBox");
    shoeBox.appendChild(thumbmail);
    shoeBox.appendChild(shoeName);
    shoeBox.appendChild(shoePrice);

    return shoeBox
}

export { CreateBox };
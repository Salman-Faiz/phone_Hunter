// data load can be done using fetch******
// ***************************************
// fetch('https://openapi.programming-hero.com/api/phones?search=iphone')
//       .then(response => response.json())
//       .then(json => console.log(json));

// async ,await function to load data

const loadPhone = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/phones?search=iphone');
    const data = await response.json();
    // console.log(data.data);
    const phones = data.data;
    // console.log(phone);
    displayPhone(phones);
}
loadPhone();

const displayPhone =phones =>{

    // console.log(phones);
    // get the container
    const phoneDiv = document.getElementById('phone-container');
    phones.forEach(phone => {
        // console.log(phone);
        // create the child element
        const phoneDetails =document.createElement('div');
        phoneDetails.classList =`card w-96 bg-base-100 shadow-xl`
        // set innerHtml
        phoneDetails.innerHTML = `<figure class="px-10 pt-10">
        <img src="${phone.image}" alt="" class="rounded-xl" />
      </figure>
      <div class="card-body items-center text-center">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p>${phone.slug}</p>
        <div class="card-actions">
          <button class="btn btn-primary">Buy Now</button>
        </div>
      </div>
        `
        // appendChild
        phoneDiv.appendChild(phoneDetails);

    });
   
}
// data load can be done using fetch******
// ***************************************
// fetch('https://openapi.programming-hero.com/api/phones?search=iphone')
//       .then(response => response.json())
//       .then(json => console.log(json));

// async ,await function to load data

const loadPhone = async (searchText='13', isShowAll) => {
  // hard coded api url
  // const response = await fetch('https://openapi.programming-hero.com/api/phones?search=iphone');

  const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
  const data = await response.json();
  console.log(data.data);
  const phones = data.data;
  // console.log(phone);
  displayPhone(phones, isShowAll);


}
loadPhone();

const displayPhone = (phones, isShowAll) => {

  // console.log(phones);
  // get the container
  const phoneDiv = document.getElementById('phone-container');
  // clear phone container cards before adding new cards
  phoneDiv.textContent = "";


  const showAllContainer = document.getElementById('showAll');
  // hide show all btn conditions
  if (phones.length > 6 && !isShowAll) {
    showAllContainer.classList.remove('hidden');

  }
  else {
    showAllContainer.classList.add('hidden');
  }
  console.log(isShowAll, "is show all")


  // showing display limit 6 if showall btn not clicked.
  if (!isShowAll) {
    phones = phones.slice(0, 6);
  }

  phones.forEach(phone => {
    // console.log(phone);
    //********** */ create the child element
    const phoneDetails = document.createElement('div');
    phoneDetails.classList = `card bg-base-100 shadow-xl`
    //********** */ set innerHtml
    phoneDetails.innerHTML = `<figure class="px-10 pt-10">
        <img src="${phone.image}" alt="" class="rounded-xl" />
      </figure>
      <div class="card-body items-center text-center">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p>${phone.slug}</p>
        <div class="card-actions">
          <button onclick="showDetails('${phone.slug}')" class="btn btn-primary">Show details</button>
        </div>
      </div>
        `
    //********** appendChild
    phoneDiv.appendChild(phoneDetails);


  });
  // ********** to remove the loading spinner.. after getting all data
  loadingSpinner(false);

}
//********** on click event handler.SEARCH. @@@@@@@@

const searchPhones = (isShowAll) => {
  loadingSpinner(true);
  const searchData = document.getElementById('Search_field');
  const searchValue = searchData.value;
  // console.log(searchValue);
  loadPhone(searchValue, isShowAll);
  // searchData.value = '';
}
//********** loading-spinner added
const loadingSpinner = (isLoading) => {
  const loading = document.getElementById('loading-spinner');

  if (isLoading === true) {
    loading.classList.remove('hidden');
  }
  else {
    loading.classList.add('hidden');
  }

}

// show all button !!!!!NOT RECOMMENDED
const showAllElements = () => {
  // console.log('clickedd')
  searchPhones(true);


}

// show details modal

showDetails = async (id) => {
  console.log('details clicked', id)
  const response = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
  const data = await response.json();
  const phone = data.data;
  console.log(phone);
  showDetailsEachPhone(phone);
}

const showDetailsEachPhone = (phone) => {

  showDetailsModal.showModal();
  const phoneImage = document.getElementById('phoneImage');
  phoneImage.innerHTML = `
  <img src=${phone.image} class="rounded-xl mx-auto" />
  `
  const phoneName = document.getElementById('phoneName');
  phoneName.innerHTML = `<span class="font-bold">${phone.name}</span>`
  const showModalContainer = document.getElementById('showModalContainer');
              showModalContainer.innerHTML = `
            <p><span class="font-semibold">Today or any day that phone may ring and bring good news. </span> </p>
            <h3 ><span class="font-bold">Storage:</span> ${phone.mainFeatures.storage}</h3>
            <h3 ><span class="font-bold">display size:</span> ${phone.mainFeatures.displaySize}</h3>
            <h3 ><span class="font-bold">chipSet:</span> ${phone.mainFeatures.chipSet}</h3>
            <h3 ><span class="font-bold">Memory:</span> ${phone.mainFeatures.memory}</h3>
            <h3 ><span class="font-bold">Slug:</span> ${phone.slug}</h3>
            <h3 ><span class="font-bold">Release Date:</span> ${phone.releaseDate}</h3>
            <h3 ><span class="font-bold">Brand:</span> ${phone.brand}</h3>
            <h3 ><span class="font-bold">GPS:</span> ${phone.others.GPS}</h3>
            `

}










const loadPhones = async(searchText, dataLimit) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}

const displayPhones = (phones, dataLimit) =>{
    console.log(phones);
    const phoneContainer = document.getElementById('phone-container')
    phoneContainer.innerText = ''

    const showAllBTN = document.getElementById('show-all');

    if(dataLimit && phones.length > 10){
        phones = phones.slice(0,10)
        
        showAllBTN.classList.remove('d-none')
    }
    else{
        showAllBTN.classList.add('d-none')
    }

    // No phone found
    const noPhone = document.getElementById('no-phone')
    if(phones.length === 0){
        noPhone.classList.remove('d-none');
    }
    else{
        noPhone.classList.add('d-none');
    }

    phones.forEach(phone => {
        const phoneDiv = document.createElement('div')
        phoneDiv.classList.add('col')
        phoneDiv.innerHTML=`
        <div class="card h-100">
            <img src="${phone.image}" class="card-img-top p-4" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <button onclick="loadPhoneDetails('${phone.slug}')" type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#phoneModal">Show Details</button>
            </div>
        </div>
        `
        phoneContainer.appendChild(phoneDiv)

    });
    loadingSpinner(false)
}


const processData = (dataLimit) =>{
    loadingSpinner(true);

    const inputField = document.getElementById('input-field')
    const searchText = inputField.value;
    loadPhones(searchText, dataLimit)
}  


document.getElementById('btn-search').addEventListener('click', function(){
    processData(10)
})

document.getElementById('input-field').addEventListener('keypress', function(event){
    if(event.key === 'Enter'){
        processData(10)
    }
})

document.getElementById('btn-show-all').addEventListener('click', function(){
    processData()
})

const loadingSpinner = isLoading =>{
    const loadingField = document.getElementById('Loading')
    if(isLoading){
        loadingField.classList.remove('d-none')
    }
    else{
        loadingField.classList.add('d-none')
    }
}

const loadPhoneDetails = async id =>{
    const url =`https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url)
    const data = await res.json()
    displayPhoneDetails(data.data)
}
const displayPhoneDetails = phone =>{
    console.log(phone);
    const modalTitle = document.getElementById('phoneModalLabel')
    modalTitle.innerText = phone.name
    const phoneDetails = document.getElementById('phone-details')
    phoneDetails.innerHTML = `
    <img src="${phone.image}" class="card-img-top p-4" alt="...">
    <h5>${phone.mainFeatures.memory}</h5>
    <h5>${phone.mainFeatures.displaySize}</h5>
    <h5>${phone.mainFeatures.chipSet}</h5>
    <p>${phone.releaseDate} </p>
    `
}


loadPhones('as')
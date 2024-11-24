
const ad = document.querySelector("#ad");
const gtallbutton = document.querySelector("#gtallbutton");
const gtbutton = document.querySelector("#gtbutton");
const delbutton = document.querySelector("#delbutton");
const fetchdata = document.querySelector('#fetchdata');

const ids = [];


ad.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.querySelector("#adtitle").value;
  const des = document.querySelector("#ades").value;
  const adseller = document.querySelector("#adseller").value;
  const adprice = document.querySelector("#adprice").value;

  const response = await fetch('/listing', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: title,
      description: des,
      seller: adseller,
      price: adprice
    })
  })

  const data = await response.json();
  ids.push(data.data.productId);
  alert('Item added to the list');
  updateUI()
})

function updateUI() {

  const idlist = document.querySelectorAll(".productids");
  idlist.innerHTML = ''
  idlist.forEach(idom => {
    idom.innerHTML = "";
    ids.forEach(id => {
      idom.innerHTML += `${id} -- `
    })
  })

}

gtallbutton.addEventListener('submit', async (e) => {
  e.preventDefault();
  const response = await fetch('/listing');
  const data = await response.json();

  fetchdata.innerHTML = "View console for the response";
  console.log(data);
})

gtbutton.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = document.querySelector('#gtsid').value;
  const response = await fetch(`/listing/${id}`)
  const data = await response.json();
  console.log(data);
  document.querySelector("#gtsp").innerHTML = "View console for response";
})

delbutton.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = document.querySelector('#delid').value;
  const response = await fetch(`/listing/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id
    })
  })
  updateUI();
  document.querySelector("#delp").innerHTML = "Item deleted successfully";
})
const api=async function(){
const response=await fetch("https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json")
const apiData=await response.json()
const data=apiData.product

// Assigning data received from api to variables
let vendor=data.vendor
let description=data.description
let title=data.title
let comparisonPrice=data.compare_at_price
let price=data.price 
let numberCompare=parseInt(comparisonPrice.slice(1))
let numberPrice=parseInt(price.slice(1))
let discount=Math.round(((numberCompare-numberPrice)/numberCompare)*100)
let colors=data.options[0].values
let coloursArr=colors.map(each=>({...each,"selected":false}))
console.log("AR",coloursArr)
let sizes=data.options[1].values 

// Accessing the Elements from DOM
let count=1
let sizeSelected=""
let imagesSection1=document.getElementById("images-section1")
let vendorEl=document.getElementById("vendor")
let titleEl=document.getElementById("title")
let comparisonPriceEl=document.getElementById("comparison-price")
let priceEl=document.getElementById("price")
let discountEl=document.getElementById("discount")
let minusButtonEl=document.getElementById("minus-button")
let plusButtonEl=document.getElementById("plus-button")
let addToCartButtonEl=document.getElementById("cart")
let messageContainerEl=document.getElementById("message")
let messageEl=document.getElementById("message")
let countEl=document.getElementById("count")
let sizeSectionEl=document.getElementById("size-section")
let descriptionEl=document.getElementById("description")
descriptionEl.innerHTML=description
vendorEl.textContent=vendor
titleEl.textContent=title
comparisonPriceEl.textContent=comparisonPrice+".00"
priceEl.textContent=price+".00"
discountEl.textContent=discount+"% Off"


// Rendering the Quantity selection section
countEl.textContent=count
minusButtonEl.addEventListener('click',()=>{
  if(countEl.textContent>0){
count-=1}
countEl.textContent=count
})

plusButtonEl.addEventListener('click',()=>{
count+=1
countEl.textContent=count
})
addToCartButtonEl.addEventListener('click',()=>{
messageContainerEl.style.display="block"
if(colorSelected!=="" && sizeSelected!==""){
  const items=count<=1?"Item":"Items"
messageEl.textContent=`${count} ${items} of ${title} with Color ${colorSelected} and Size ${sizeSelected} added to cart`
}
else{
  messageEl.textContent="Please select Color and Size"
}
})


// Rendering the size selection section
sizes.forEach((option, index) => {
  const radioDiv=document.createElement('div')
  radioDiv.classList.add('radioDiv')
  radioDiv.style.backgroundColor="#F3F3F3"
  radioDiv.style.marginRight="10px"
  radioDiv.style.padding="0 10px"
  radioDiv.style.borderRadius="10px"
  radioDiv.style.marginBottom="10px"
  radioDiv.style.display="flex"
  radioDiv.style.alignItems="center"
  const input = document.createElement('input');
  input.type = 'radio';
  input.name = 'option';
  input.value = option;
  input.id = `option${index + 1}`;

  const label = document.createElement('label');
  label.textContent = option;
  label.htmlFor = `option${index + 1}`;
  radioDiv.appendChild(input);
  radioDiv.appendChild(label);
  sizeSectionEl.appendChild(radioDiv)
  });

  sizeSectionEl.addEventListener('change',(e)=>{
    sizeSelected=e.target.value 
    console.log(sizeSelected);
  })


// Rendering the color selection section
  const colorSectionEl = document.getElementById('color-section');
  let colorSelected=""
  coloursArr.forEach((option, index) => {
    const buttonEl = document.createElement('button');  
    let eachColor=Object.entries(option) 
    buttonEl.id = `option${index + 1}`;
    buttonEl.style.backgroundColor=eachColor[0][1]
    buttonEl.style.marginRight="10px"
    buttonEl.className = 'color'
    console.log("EEE",eachColor[1][1]);
    colorSectionEl.appendChild(buttonEl);
    buttonEl.addEventListener('click',(e)=>{
      colorSelected=eachColor[0][0]
      coloursArr=coloursArr.map(each=>{
        if(each==option){
          return {...each,selected:!each.selected}
        }
        return {...each}
      })
      e.target.textContent="\u2713"
    })
  });
}

const bannerImageEl = document.getElementById("bannerImage")

const changeImage = (event) =>{
  bannerImageEl.setAttribute("src", event.target.src)
}


api();





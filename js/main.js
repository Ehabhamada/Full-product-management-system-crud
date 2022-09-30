let title=document.getElementById("title")
let price=document.getElementById("price")
let tax=document.getElementById("tax")
let ads=document.getElementById("ads")
let discont=document.getElementById("discont")
let total=document.getElementById("total")
let count=document.getElementById("count")
let category=document.getElementById("category")
let submit=document.getElementById("submit")
let errordata=document.getElementById("errordata")

let mood = "create";
let tmp ;


//get total
function gettotal(){
    if (price.value !="") {
        let result = (+price.value + +tax.value + +ads.value)- +discont.value;
        total.textContent =result
        total.style.background ="#4CAF50"
    }else{
        total.textContent =""
        total.style.background ="#e91e63"
    }
}

//creat product
let datapro;
if(localStorage.product!=null){
    datapro=JSON.parse(localStorage.product)
}else{
    datapro=[];
};

submit.onclick =function(){
let newpro={
title: title.value.toLowerCase(),
price: price.value,
tax: tax.value,
ads: ads.value,
dis: discont.value,
total:total.textContent,
count:count.value,
category:category.value.toLowerCase()
}

if(title.value != "" && price.value != "" && category.value != "" ){
    
if (mood === "create") {
    //count
if (newpro.count > 1 ) {
    for (let i = 0; i < newpro.count; i++) {
        datapro.push(newpro);
    }
}else{
    datapro.push(newpro);
}
}else{
    datapro[tmp] = newpro;
    mood="create"
    submit.textContent="create";
    count.style.display="block";

}
cleardata()



}else{
    
if(title.value == ""){
    errordata.textContent=" enter the title"
}
else if(price.value == ""){
    errordata.textContent=" enter the price"
}
else if(category.value == ""){
    errordata.textContent=" enter the category"
}else{
    errordata.textContent="";
}
}

//save in localStorage
localStorage.setItem("product",JSON.stringify(datapro))


showdata()
}

//clear inputs
function cleardata() {
    title.value ="";
    price.value ="";
    tax.value ="";
    ads.value ="";
    discont.value ="";
    category.value ="";
    count.value ="";
    total.textContent ="";
    errordata.textContent ="";
}


//Read
function showdata() {
    gettotal()
    let table="";
    for(let i=0;i<datapro.length;i++) {
        table += `
                     <tr>
                        <td>${i+1}</td>
                        <td>${datapro[i].title}</td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].tax}</td>
                        <td>${datapro[i].ads}</td>
                        <td>${datapro[i].dis}</td>
                        <td>${datapro[i].total}</td>
                        <td>${datapro[i].category}</td>
                        <td><button onclick="updatedata(${i})"  id="update">update</button></td>
                        <td><button onclick="deletedata(${i})"  id="delete">delete</button></td>
                    </tr>
        
        `
        
    };
    document.getElementById("tbody").innerHTML=table;

        let btndel= document.getElementById("deleteall");
        if (datapro.length > 0) {
            btndel.innerHTML=`
            <button onclick="deleteAll()" id="delete">delete all (${datapro.length})</button>
            `
        }else{
            btndel.innerHTML='';
        }
}

showdata()

//delete data
function deletedata(i) {
    datapro.splice(i,1);
    localStorage.product= JSON.stringify(datapro);
    showdata()
}


function deleteAll(){
  datapro.splice(0);
  localStorage.clear();
  showdata()
}
//update data
function updatedata(i){
 title.value =datapro[i].title;
 price.value =datapro[i].price;
 tax.value =datapro[i].tax;
 ads.value =datapro[i].ads;
 discont.value =datapro[i].dis;
 category.value =datapro[i].category;
 gettotal()
 count.style.display="none"
 submit.textContent="update"
 mood = "update"
 tmp=i
 scroll({
    top:0,
    behavior:"smooth",
 })
}
//searrch Mood
let searchMood="Title";
function getseachMood(id) {
    let search = document.getElementById("search")
    if (id == "searchTitle") {
        searchMood="Title"
    }else{
        searchMood="Category"
    }
    search.focus();
    search.value="";
    search.placeholder ="Search By " + searchMood;
    showdata()
}

//searsh in data
function searchdata(value) {
    let table ="";
    datapro.forEach((el , i)=> {
        if (searchMood == "Title") {
       if ( el.title.includes(value.toLowerCase())) {
        table += `
        <tr>
           <td>${i+1}</td>
           <td>${datapro[i].title}</td>
           <td>${datapro[i].price}</td>
           <td>${datapro[i].tax}</td>
           <td>${datapro[i].ads}</td>
           <td>${datapro[i].dis}</td>
           <td>${datapro[i].total}</td>
           <td>${datapro[i].category}</td>
           <td><button onclick="updatedata(${i})"  id="update">update</button></td>
           <td><button onclick="deletedata(${i})"  id="delete">delete</button></td>
       </tr>

`


}

}else{
    if ( el.category.includes(value.toLowerCase())) {
        table += `
        <tr>
           <td>${i+1}</td>
           <td>${el.title}</td>
           <td>${el.price}</td>
           <td>${el.tax}</td>
           <td>${el.ads}</td>
           <td>${el.dis}</td>
           <td>${el.total}</td>
           <td>${el.category}</td>
           <td><button onclick="updatedata(${i})"  id="update">update</button></td>
           <td><button onclick="deletedata(${i})"  id="delete">delete</button></td>
       </tr>

`


}
}
});
document.getElementById("tbody").innerHTML=table;

}
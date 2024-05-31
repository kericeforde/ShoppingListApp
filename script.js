import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref,push,onValue,remove } from 
"https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const appSettings={
    databaseURL:"https://playground-858e3-default-rtdb.firebaseio.com/"}

const app= initializeApp(appSettings)
const database=getDatabase(app)
const cartDB=ref(database,"items")



const shop=document.getElementById("shoppingList")
const val= document.getElementById("input")
const button=document.getElementById("button")


onValue(cartDB,function (snapshot){
    if (snapshot.exists()){
    let arr= Object.entries( snapshot.val())
    clearShoppingList()


    for(let i=0;i<arr.length;i++){
        let currentEntry=arr[i]
        //let currentID=arr[i][0]
        //let currentVal=arr[i][1]
        addToList(currentEntry)
    }}
    else{
        shop.innerHTML="No items here...yet"
    
    }
} )
 

button.addEventListener("click",function(){
     let item= val.value
     clearInput()
     
    push(cartDB,item)
  
    console.log("added to database")})

function clearInput(){
    val.value=""
}

function addToList(item){
    let itemID=item[0]
    let itemVAL=item[1]

    const newItem=document.createElement("li")
    newItem.textContent=itemVAL
    shop.appendChild(newItem)

    newItem.addEventListener("dblclick",function(){
         let locationInDB= ref(database,`items/${itemID}`)
         remove(locationInDB)
    })
}

function clearShoppingList()
{  shop.innerHTML=""  }     


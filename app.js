import { collection, addDoc , getDocs } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js"; 
import { db } from "./firebaseconfig.js";

const form = document.querySelector("#form")
const input = document.querySelector("#todo")
const description = document.querySelector("#textarea")
const div = document.querySelector(".container")


const allTodo = [] //global array 
//firebase function to get data from firstore db when reloading the screen
async function getData(){
  const querySnapshot = await getDocs(collection(db, "todos")); //yahan par todos ka naam is liye kyun ke isi collection se main ne data store karaya tha or ab main isko keh raha hoon mujhy wahi wala data lakar dedo
  querySnapshot.forEach((doc) => {
  allTodo.push(doc.data()) //yahan par main ne yeh kaam kara hai jo bhi data reload karne ke baad meray pass araha tha usko main ne aik global array main push karadiya or uske baad usko screen par render kardiya
});
  //renderData func called to render data on screen
  renderData() //render data ke func ko foreach() wale function se bahar call karna warna data multiples render hoyega
  console.log(allTodo);
}

getData()


//function for renderData
function renderData(){
  allTodo.map(item=>{
    div.innerHTML += `<div class="children">
            Title: ${item.title}<br>
            Description: ${item.description}
        </div>`
  })
}


form.addEventListener("submit" ,async (event) =>{ //yahan mujhy isko async function banana para kyun ke hamne neeche await use kiya hai because of try/catch
    event.preventDefault()
    console.log(input.value);
    console.log(description.value);
    //firebase function for adding data
    try {
        const docRef = await addDoc(collection(db, "todos"), {
          title: input.value,
          description: description.value,
        });
        console.log("Document written with ID: ", docRef.id); //data add hogaya hai tou uski doc id mil jayegi 
      } catch (e) {
        console.error("Error adding document: ", e); //error miljayega agar koi error aya touu
      }
      
});

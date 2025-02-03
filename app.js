import { collection, addDoc , getDocs , Timestamp , query, orderBy ,doc, deleteDoc , updateDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js"; 
import { db } from "./firebaseconfig.js";

const form = document.querySelector("#form")
const input = document.querySelector("#todo")
const description = document.querySelector("#textarea")
const div = document.querySelector(".container")
const div2 = document.querySelector(".parent")



const allTodo = [] //global array 
//firebase function to get data from firstore db when reloading the screen
async function getData(){
  const q = query(collection(db, "todos"), orderBy("Date", "desc"));
  const querySnapshot = await getDocs(q); //yahan par todos ka naam is liye kyun ke isi collection se main ne data store karaya tha or ab main isko keh raha hoon mujhy wahi wala data lakar dedo
  querySnapshot.forEach((doc) => {
  // console.log(doc.id, doc.data());
  allTodo.push({...doc.data() , id:doc.id}) //yahan par main ne yeh kaam kara hai jo bhi data reload karne ke baad meray pass araha tha usko main ne aik global array main push karadiya or uske baad usko screen par render kardiya
});
  //renderData func called to render data on screen
  console.log(allTodo);
  renderData(allTodo) //render data ke func ko foreach() wale function se bahar call karna warna data multiples render hoyega
  
}

getData()


//function for renderData
function renderData(){
  div.innerHTML = ""
  allTodo.map((item)=>{
    div.innerHTML += `<div class="children">
            Title: ${item.title}<br>
            Description: ${item.description}<br><br>
            <button class= "deleteBtn">Delete</button>
            <button class= "edit">Edit</button>
        </div>`
  })
  const deleteBtn = document.querySelectorAll('.deleteBtn')
  const editBtn = document.querySelectorAll(".edit")


deleteBtn.forEach((item , index) => {
  item.addEventListener('click', async (event) => {
    console.log("btn clicked");
    // console.log(allTodo[index]);
    await deleteDoc(doc(db, "todos", allTodo[index].id));
    console.log('todo deleted...');
    allTodo.splice(index, 1)
    renderData(allTodo)
  })
})

editBtn.forEach((item, index) => {
  item.addEventListener('click', async (event) => {
    console.log("edit clicked");
    console.log(allTodo[index]);
    const updatedTitle = prompt("Enter updated title")
    const updatedDescription = prompt("Enter updated Description")
    const todoRef = doc(db, "todos", allTodo[index].id);
    await updateDoc(todoRef, {
      title: updatedTitle,
      description: updatedDescription
    });
    console.log('todo updated successfully');
    allTodo[index].title = updatedTitle
    allTodo[index].description = updatedDescription
    renderData(allTodo)
  })
})
}


form.addEventListener("submit" ,async (event) =>{ //yahan mujhy isko async function banana para kyun ke hamne neeche await use kiya hai because of try/catch
    event.preventDefault()
    console.log(input.value); 
    console.log(description.value);
    renderData()
   //firebase function for adding data
    try {
        const docRef = await addDoc(collection(db, "todos"), {
          title: input.value,
          description: description.value,
          Date: Timestamp.fromDate(new Date()), //current date will also save in db
        });
        console.log("Document written with ID: ", docRef.id); //data add hogaya hai tou uski doc id mil jayegi
         allTodo.unshift({
          title: input.value,
          description: description.value,
          Date: Timestamp.fromDate(new Date()),
          id: docRef.id,
        })
        console.log(allTodo);
        renderData(allTodo)
        } catch (e) {
        console.error("Error adding document: ", e); //error miljayega agar koi error aya touu
      }
      input.value = ""
      description.value = ""
});

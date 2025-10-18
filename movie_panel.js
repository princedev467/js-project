let update = null;

let cdata = null;
const handlemovie = async () => {
  console.log("no");

  event.preventDefault();
  const mname = document.getElementById("mname").value;
  const description = document.getElementById("description").value;
  const cinema = document.getElementById("cinema_list").value;

  const movie_poster = document.getElementById('image')?.files[0]?.name;

  console.log(cinema);

  const ci = document.getElementById('file_image')?.src;
  console.log(movie_poster, ci);

  const arr = ci.split("/");

  console.log(arr, arr.length - 1);



  let formerr = false;


  if (mname === '') {
    document.getElementById("mnameErr").innerHTML = "please enter your name"
  } else {
    let nameRegex = /^[a-zA-Z ]+$/;
    if (nameRegex.test(mname)) {
      document.getElementById("mnameErr").innerHTML = "";
    } else {
      document.getElementById("mnameErr").innerHTML = "please enter a valid name";
      formerr = true;
    }
  }

  if (!formerr) {
    let obj = {

      movie_name: mname,
      movie_description: description,
      Cinema_id: cinema,
      movie_poster: movie_poster ? movie_poster : arr[arr.length - 1]
    }

    console.log(obj);
    if (update === null) {
      try {
        const responce = await fetch('http://localhost:3000/movie', {
          method: "POST",
          body: JSON.stringify(obj),
          headers: {
            "Content-Type": "application/json"
          }
        });
        const data = await responce.json();
        console.log(data);


      } catch (error) {
        console.log(error);

      }
    } else {
      try {
        const responce = await fetch(`http://localhost:3000/movie/${update}`, {
          method: "PUT",
          body: JSON.stringify(obj),
          headers: {
            "Content-Type": "application/json"
          }
        });

        const data = await responce.json();
        console.log(data);
      } catch (error) {
        console.log(error);

      }
    }

  }


}

const handleChange = () => {
  const ci = document.getElementById("image").files[0].name;

  document.getElementById('file_image').src = 'image/movie/' + ci;

}
const listmovie = async () => {
  try {
    const responce = await fetch('http://localhost:3000/movie');
    const data = await responce.json();
    console.log(data);

    let print = `
        <div class="table-responsive">
        <table class="table table-bordered table-striped table-hover align-middle">
          <thead class="table-dark">
            <tr>

              <th>Movie Poster</th>
              <th>Movie Name</th>
              <th>Description</th>
              <th>CINEMA_Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>`
      ;


      console.log(cdata);
      
  
    data.map((v, i) => {

    let  cinema_obj = cdata.find((v1, i1) => v1.id === v.Cinema_id);
console.log(cinema_obj?.cinema_name);

             
                 
      print = print + `
        <tr>
              <td>
               <img src="image/movie/${v.movie_poster}"  width="50px" height="50px" >
               </td> 
              <td>${v.movie_name}</td>
              <td>${v.movie_description}</td>
              <td>
                ${cinema_obj?.cinema_name}
              </td>
              
                 <td> 
                <a class="btn btn-danger btn-sm me-2" onclick="handledel('${v.id}')"><i class="fa-solid fa-trash"></i></a>
                 <a class="btn btn-primary btn-sm me-2" onclick="handleedit('${v.id}')"><i class="fa-solid fa-pen"></i></a>
          
                 </td>
            </tr>
      `

    });
    print = print + ` </table>`;

    document.getElementById('disp').innerHTML = print;

  } catch (error) {
    console.log(error);

  }
}

const handledel = async (id) => {

  console.log(id);
  try {
    const responce = await fetch(`http://localhost:3000/movie/${id}`, {
      method: "DELETE"
    });

    const data = await responce.json();
    console.log(data);


  } catch (error) {
    console.log(error);

  }


}
const handleedit = async (id) => {
  console.log(id);
  const responce = await fetch(`http://localhost:3000/movie`);
  const data = await responce.json()

  console.log(data);

  const obj = data.find(v => v.id === id);
  console.log(obj);

  document.getElementById('mname').value = obj.movie_name;
  document.getElementById('description').value = obj.movie_description;
  document.getElementById('file_image').src = 'image/movie/' + obj.movie_poster;


  update = id;




}

const handlecinema = async () => {

  try {
    const responce = await fetch(`http://localhost:3000/cinema`);
    const data = await responce.json();

    console.log(data);

    cdata = data;

    console.log(cdata);


    let print = `
     <option value="0"># Select Cinema List #</option>
      
`
    data.map((v, i) => {
      print = print + `
      <option value="${v.id}">${v.cinema_name}</option>
           
     `;


    })



    document.getElementById('cinema_list').innerHTML = print;

  } catch (error) {
    console.log(error);
  }

}


window.onload = handlecinema()

window.onload = listmovie
const movieform = document.getElementById('movieform');
movieform.addEventListener("submit", handlemovie)
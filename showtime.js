let update = null;

let cdata = null;

let mdata = null;

let movie_id = null;

let cinema_id = null;

const handleSubmit = async () => {
  event.preventDefault();

  const cinema = document.getElementById("cinema_list").value;
  const movie = document.getElementById("movie_list").value;

  console.log(cinema, movie);

  console.log(mdata);

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

const handlemovie = async () => {
  try {
    const responce = await fetch(`http://localhost:3000/movie`);
    const data = await responce.json();

    console.log(data);

    mdata = data;

    console.log(cdata);


    let print = `
     <option value="0"># Select Movie List #</option>
      
        `;

    data.map((v, i) => {
      print = print + `
      <option value="${v.id}">${v.movie_name}</option>
           
     `;
    })
    document.getElementById('movie_list').innerHTML = print;
  } catch (error) {
    console.log(error);
  }
}

const handlechange = async () => {
  try {

    const cinema = document.getElementById("cinema_list").value;

    console.log(cinema);

    cinema_id = cinema;
    const responce = await fetch('http://localhost:3000/movie');
    const data = await responce.json();
    console.log(data);

    const tdata = data.filter((v, i) => v.Cinema_id === cinema);
    console.log(tdata);
    let print = `
       <option value="0"># Select Cinema List #</option>
      
      `
    tdata.map((v, i) => {
      print = print + `
      <option value="${v.id}">${v.movie_name}</option>
           
     `;
    })

    document.getElementById('movie_list').innerHTML = print;

  } catch (error) {
    console.log(error);

  }
}

const handleTime = async () => {
  const cinema = document.getElementById("cinema_list").value;
  const movie = document.getElementById("movie_list").value;

  const start = document.getElementById('start_date').value;
  const end = document.getElementById('end_date').value

  console.log(start);
  console.log(end);


  const handlechange = async () => {
    try {

      const cinema = document.getElementById("cinema_list").value;

      console.log(cinema);

      const responce = await fetch('http://localhost:3000/movie');
      const data = await responce.json();
      console.log(data);

      const tdata = data.filter((v, i) => v.Cinema_id === cinema);
      console.log(tdata);
      let print = `
       <option value="0"># Select Cinema List #</option>
      
      `
      tdata.map((v, i) => {
        print = print + `
      <option value="${v.id}">${v.movie_name}</option>
           
     `;
      })

      document.getElementById('movie_list').innerHTML = print;

    } catch (error) {
      console.log(error);

    }
  }

  let obj = {
    time_start: start,
    time_end: end,
    Cinema_id: cinema_id,
    Movie_id: movie

  }


  console.log(obj);
  if (update === null) {
    try {
      const responce = await fetch('http://localhost:3000/time', {
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
      const responce = await fetch(`http://localhost:3000/time/${update}`, {
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

const timelist = async () => {
  try {
    const responce = await fetch('http://localhost:3000/time');
    const data = await responce.json();
    console.log(data);

    let print = `
      <div class="table-responsive">
        <table class="table table-bordered table-striped table-hover align-middle">
          <thead class="table-dark">
            <tr>

             <th>Cinema_Name</th>
             <th>Movie_Name
             </th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
    `

          data.map(v => {

            let cinema_obj = cdata.find((v1, i1) => v1.id === v.Cinema_id);
            console.log(cinema_obj?.cinema_name);
console.log(cinema_obj.id);

 let Movie_obj = mdata.find((v2, i1) => v2.Cinema_id === cinema_obj.id);
            console.log(Movie_obj?.movie_name);

            print = print + `
            <tr>
            <td>${cinema_obj?.cinema_name}</td>
            <td>${Movie_obj?.movie_name}</td>
              <td>${v.time_start}</td>
              <td>${v.time_end}</td>
              <td> 
                <a class="btn btn-danger btn-sm me-2" onclick="handledel('${v.id}')"><i class="fa-solid fa-trash"></i></a>
                <a class="btn btn-primary btn-sm me-2" onclick="handleedit('${v.id}')"><i class="fa-solid fa-pen"></i></a>
              </td>
          </tr>
            `
          });

          print = print + `</table>`;

          document.getElementById('disp').innerHTML = print;

  } catch (error) {
    console.log(error);

  }
}
const handledel = async (id) => {
  console.log(id);

  try {
    const responce = await fetch(`http://localhost:3000/time/${id}`, {
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
  const responce = await fetch(`http://localhost:3000/time`);
  const data = await responce.json()

  console.log(data);

  const obj = data.find(v => v.id === id);
  console.log(obj);

  document.getElementById('start_date').value = obj.time_start;
  document.getElementById('end_date').value = obj.time_end;

  document.getElementById('cinema_list').value=obj.Cinema_id;
  document.getElementById('movie_list').value=obj. Movie_id;
  

  update = id;
}


window.onload = function () {
  handlemovie();
  handlecinema();
  timelist();
  handlelist();
};

const Time_admin = document.getElementById('Time_admin');
Time_admin.addEventListener("submit", function () {
  handleTime();
  handleSubmit();

});


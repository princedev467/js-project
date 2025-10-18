let update = null;
const handleSubmit = async () => {
  console.log("heloo");
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const mobile = document.getElementById("mobile").value;
  const address = document.getElementById("address").value;
  const cinema_img = document.getElementById("image")?.files[0]?.name;

  const ci = document.getElementById('file_image')?.src;


  console.log(cinema_img, ci);

  const arr = ci.split("/");

  console.log(arr, arr.length - 1);


  let formerr = false;


  if (name === '') {
    document.getElementById("nameErr").innerHTML = "please enter your name"
  } else {
    let nameRegex = /^[a-zA-Z ]+$/;
    if (nameRegex.test(name)) {
      document.getElementById("nameErr").innerHTML = "";
    } else {
      document.getElementById("nameErr").innerHTML = "please enter a valid name";
      formerr = true;
    }
  }

  if (email === '') {
    document.getElementById("emailErr").innerHTML = "please enter your email"
    formerr = true;
  } else {
    let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,30}$/;
    if (emailRegex.test(email)) {
      document.getElementById("emailErr").innerHTML = "";
    } else {
      document.getElementById("emailErr").innerHTML = "please enter a valid email";
    }
  }

  if (mobile === '') {
    document.getElementById("mobileErr").innerHTML = "please enter your mobile-no";
    formerr = true;
  } else {

    if (isNaN(mobile) || mobile.length !== 10) {
      document.getElementById("mobileErr").innerHTML = "please enter a valid phone no";
      formerr = true;
    } else {
      document.getElementById("mobileErr").innerHTML = "";
    }
  }

  if (!formerr) {
    let obj = {
      cinema_name: name,
      cinema_email: email,
      cinema_mobile: mobile,
      cinema_address: address,
      cinema_img: cinema_img ? cinema_img : arr[arr.length - 1]
    }

    console.log(obj);

    if (update === null) {
      try {
        const responce = await fetch('http://localhost:3000/cinema', {
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
        const responce = await fetch(`http://localhost:3000/cinema/${update}`, {
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
const listcinema = async () => {
  try {
    const responce = await fetch('http://localhost:3000/cinema');
    const data = await responce.json();
    console.log(data);

    let print = `
        <div class="table-responsive">
        <table class="table table-bordered table-striped table-hover align-middle">
          <thead class="table-dark">
            <tr>
            <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>`
      ;

    data.map((v, i) => {
      print = print + `
        <tr>
               <td>
<img src="image/client/${v.cinema_img}" width="50px" height="50px">
</td>
              <td>${v.cinema_name}</td>
              <td>${v.cinema_email}</td>
              <td>${v.cinema_mobile}</td>
              <td>${v.cinema_address}</td>
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

const handleChange = () => {
  const ci = document.getElementById("image").files[0].name;

  document.getElementById('file_image').src = 'image/client/' + ci;

}
const handledel = async (id) => {

  console.log(id);
  try {
    const responce = await fetch(`http://localhost:3000/cinema/${id}`, {
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
  const responce = await fetch(`http://localhost:3000/cinema`);

  const data = await responce.json();

  console.log(data);

  const obj = data.find(v => v.id === id);
  console.log(obj);

  document.getElementById('name').value = obj.cinema_name;
  document.getElementById('email').value = obj.cinema_email;
  document.getElementById('mobile').value = obj.cinema_mobile;
  document.getElementById('address').value = obj.cinema_address;
  document.getElementById('file_image').src = 'image/client/' + obj.cinema_img;


  update = id;


}
window.onload = listcinema
const cinemaform = document.getElementById('cinemaform');
cinemaform.addEventListener("submit", handleSubmit);


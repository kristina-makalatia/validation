//practice - post
let mainWraperPost = document.getElementById("post-wraperBlock");
let postOverlay = document.getElementById("overlay");
let overlayContent = document.getElementById("postcontent");
let overlayClose = document.getElementById("close");
let postAdd = document.getElementById("add");
let addOverlay = document.getElementById("postoverlayAdd");
let form = document.getElementById("form");
let input = document.getElementById("title");

// ჩვენი მთავარი ფუნქცია, რომლის საშუალებით ვასრულებთ ajax მოთხვონას სერვერზე
function ajax(url, callback) {
  let requistPost = new XMLHttpRequest();
  requistPost.open("GET", url);
  requistPost.addEventListener("load", function () {
    // let response = requistPost.responseText;
    // let dataResponse = JSON.parse(response);
    let dataResponse = JSON.parse(requistPost.responseText);
    callback(dataResponse);
  });
  requistPost.send();
}

// ამ ფუქნციის საშუალებით ვქმნით სათაიტაოდ თითოეულის პოსტის დივს
function createPostRenderLogic(item) {
  const divWraper = document.createElement("div");
  divWraper.classList.add("posts");
  divWraper.setAttribute("data-id", item.id);

  const h3Post = document.createElement("h3");
  h3Post.innerText = item.id;

  const h2Post = document.createElement("h2");
  h2Post.innerText = item.title;

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete This Post";
  deleteButton.setAttribute("data-id", item.id);

  divWraper.appendChild(h3Post);
  divWraper.appendChild(h2Post);
  divWraper.appendChild(deleteButton);

  //რა პრობლემაც გვქონდა ლექციაზე, უბრალოდ ეს კოდი აიტანეთ divwraper ქლიქამდე ან divwraper-ის
  // p ტეგის შექმნა გაიტანეთ ცალკე ფუქნციაში;
  deleteButton.addEventListener("click", function (event) {
    event.stopPropagation();
    const id = event.target.getAttribute("data-id");
    let url = `https://jsonplaceholder.typicode.com/posts/${id}`;
    fetch(url, {
      method: "DELETE",
    }).then(() => divWraper.remove());
  });

  divWraper.addEventListener("click", function (event) {
    const id = event.target.getAttribute("data-id");
    postOverlay.classList.add("activeOverlay");
    let url = `https://jsonplaceholder.typicode.com/posts/${id}`;
    ajax(url, function () {
      let p = document.createElement("p");
      p.innerText = item.body;
      overlayContent.appendChild(p);
    });
  });

  mainWraperPost.appendChild(divWraper);
}

// postis damateba
postAdd.addEventListener("click", function () {
  addOverlay.classList.add("activeAdd");
  input.value = " ";
});

form.addEventListener("submit", function (event) {
  event.preventDefault();
  let fromData = {
    title: event.target[0].value,
  };

  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(fromData),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((newPost) => {
      createPostRenderLogic(newPost);
      addOverlay.classList.remove("activeAdd");
    });
});

// დავუხარვთ პოპაპს
overlayClose.addEventListener("click", function () {
  postOverlay.classList.remove("activeOverlay");
  overlayContent.innerHTML = " ";
});

// აქ ვიძახებთ ჩვენს მთავარ ajax ფუნქციას
ajax("https://jsonplaceholder.typicode.com/posts", function (dataResponse) {
  dataResponse.forEach((item) => {
    createPostRenderLogic(item);
  });
});

// JSON.parse()
// JSON.stringify()

// slider
let data = [
  {
    id: 1,
    imageUrl:
      "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
    title: "slide title 1",
  },
  {
    id: 2,
    imageUrl:
      "https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg",
    title: "slide title 2",
  },
  {
    id: 3,
    imageUrl:
      "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
    title: "slide title 3",
  },
  {
    id: 4,
    imageUrl:
      "https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg",
    title: "slide title 4",
  },
];

const arrowLeft = document.getElementById("arrowLeft");
const arrowRight = document.getElementById("arrowRight");
const sliderContent = document.getElementById("slider-content");
let dotsChildElement = document.getElementsByClassName("child");
let sliderIndex = 0;

function createDivTag(item) {
  const divtag = document.createElement("div");
  divtag.classList.add("slide");

  return divtag;
}

function createImgTag(item) {
  // const tagImage = document.createElement("img");
  // tagImage.setAttribute("src", item.imageUrl);
  // tagImage.setAttribute("alt", item.title);
  // tagImage.classList.add('image-slider');
  // return tagImage;

  const bgImage = document.createElement("div");
  bgImage.style.backgroundImage = `url(${item.imageUrl})`;
  bgImage.classList.add("bg-image");

  return bgImage;
}

function createH3Tag(item) {
  const h3title = document.createElement("h3");
  h3title.innerText = item.title;

  return h3title;
}

function createDots() {
  const dots = document.createElement("div");
  dots.classList.add("dots-parent");

  data.forEach((element) => {
    const childDot = document.createElement("div");
    childDot.classList.add("child");
    childDot.setAttribute("data-id", element.id - 1);
    dots.appendChild(childDot);

    childDot.addEventListener("click", function (event) {
      let id = event.target.getAttribute("data-id");
      sliderIndex = id;
      setSlide();
    });
  });

  return dots;
}

function setSlide() {
  sliderContent.innerHTML = " ";
  const slideItem = createDivTag(data[sliderIndex]);
  const imgTag = createImgTag(data[sliderIndex]);
  const titleSlider = createH3Tag(data[sliderIndex]);
  const dots = createDots();

  slideItem.appendChild(imgTag);
  slideItem.appendChild(titleSlider);
  sliderContent.appendChild(slideItem);
  sliderContent.appendChild(dots);

  currentDotActive();
}

function currentDotActive() {
  dotsChildElement[sliderIndex].classList.add("activeDot");
}
function arrowLeftClick() {
  if (sliderIndex == 0) {
    sliderIndex = data.length - 1;
    setSlide();
    return;
  }
  sliderIndex -= 1;
  // sliderIndex --;
  setSlide();
}
function arrowRightClick() {
  if (sliderIndex == data.length - 1) {
    sliderIndex = 0;
    setSlide();
    return;
  }
  sliderIndex += 1;
  // sliderIndex --;
  setSlide();
}

arrowLeft.addEventListener("click", arrowLeftClick);
arrowRight.addEventListener("click", arrowRightClick);

// setInterval( () => {
//   arrowRightClick();
// }, 2000);

setSlide();

// validation
let RegistrationForm = document.getElementById("registration-form");

RegistrationForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let errors = {};

  console.log(event.target);
  let formElement = event.target;

  //username
  let usernameValue = document.getElementById("username").value;
  // let usernameValue = document.querySelector('[name = "myusername"]').value;

  if (usernameValue == " ") {
    errors.myusername = "Username field can not be empty";
  }
  if (usernameValue.length < 5) {
    errors.myusername = "Username must be more then 5 characters";
  }

  //password
  let password1 = document.getElementById("passw").value;
  let password2 = document.getElementById("passw2").value;

  if (password1 == "") {
    errors.mypassword = "Password field can not be empty";
  }

  if (password1 != password2) {
    errors.mypassword2 = "Passwords do not match";
  }

  // radio
  let age = false;

  formElement.querySelectorAll('[name = "age"]').forEach((item) => {
    if (item.checked) {
      age = true;
    }
  });
  if (!age) {
    errors.age = "Please select your age";
  }

  //checkbox
  let agree = document.getElementById("agree").checked;

  if (!agree) {
    errors.agree = "You must agree our terms and conditions";
  }

  console.log(errors);

  formElement.querySelectorAll(".error-text").forEach((item) => {
    item.innerHTML = " ";
  });

  for (let item in errors) {
    // console.log(item);
    let spanError = document.getElementById("error_" + item);

    if (spanError) {
      spanError.textContent = errors[item];
    }
  }

  if (Object.keys(errors).length == 0) {
    formElement.submit();
  }
});

// let errors = {
//   age: "Please select your age",
//   agree: "You must agree our terms and conditions",
//   mypassword: "Password field can not be empty",
//   myusername: "Username must be more then 5 characters",
// };

// show hdie password
let passwordField = document.getElementById("showHide");
let toggleIcon = document.getElementById("toggleIcon");

toggleIcon.addEventListener("click", function () {
  if (passwordField.type == "password") {
    passwordField.setAttribute("type", "text");
    toggleIcon.classList.remove("fa-eye");
    toggleIcon.classList.add("fa-eye-slash");
  } else {
    passwordField.setAttribute("type", "password");
    toggleIcon.classList.remove("fa-eye-slash");
    toggleIcon.classList.add("fa-eye");
  }
});

//emailregex

let emailField = document.getElementById("myemail");
// let emailField = document.querySelector('name = ["emailField"]');

emailField.addEventListener("keydown", function () {
  let emailValue = document.getElementById("myemail").value;
  let text = document.getElementById("text");
  let pattern =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (emailValue.match(pattern)) {
    emailField.style.border = "2px solid green";
    text.innerText = "Your email is valid";
    text.style.color = "green";
  } else {
    emailField.style.border = "2px solid red";
    text.innerText = "Your email is invalid";
    text.style.color = "red";
  }
});

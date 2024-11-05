'use strict'; //Burger menu

var hamburger = document.getElementById('hamburger');
var burgerMenu = document.getElementById('burger-menu');
hamburger.addEventListener('click', function () {
  hamburger.classList.toggle('active');
  burgerMenu.classList.toggle('active');
});
var closeBtns = document.querySelectorAll("#burger-menu a");
closeBtns.forEach(function (link) {
  link.addEventListener("click", function (e) {
    burgerMenu.classList.remove("active");
    hamburger.classList.remove("active");
  });
});
/*Slider*/

document.addEventListener('DOMContentLoaded', function () {
  // Splide initialization code here
  new Splide('#my-slider', {
    type: 'loop',
    perPage: 1,
    autoplay: true
  }).mount();
}); // FAQ Accordion 

var box = document.querySelectorAll('.box');
box.forEach(function (item) {
  item.addEventListener('click', function () {
    var answer = this.querySelector('.answer');
    var icon = this.querySelector('.icon');

    if (answer) {
      answer.classList.toggle('display-answer');
    }

    if (icon) {
      if (icon.src.includes("images/icons/down-arrow.svg")) {
        icon.src = "images/icons/up-arrow.svg";
      } else {
        icon.src = "images/icons/down-arrow.svg";
      }
    }
  });
}); //Smooth Scrolling

function smoothScroll() {
  var links = document.querySelectorAll('a:link');
  links.forEach(function (link) {
    link.addEventListener('click', function (e) {
      var href = link.getAttribute("href");

      if (href === "#") {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      } else if (href.startsWith("#")) {
        e.preventDefault();
        var section = document.querySelector(href);

        if (section) {
          section.scrollIntoView({
            behavior: "smooth"
          });
        }
      }
    });
  });
}

smoothScroll(); //Form Validation

document.addEventListener('DOMContentLoaded', function () {
  // Check if we are on index.html
  var submitbtn = document.querySelector('.btn-submit');
  var closeWindow = document.querySelector('.close');
  var approveForm = document.querySelector('.approve-window');
  var wrapper = document.querySelector('.wrapper'); // Form validation function

  function formValidation() {
    var userName = document.getElementById('fname').value.trim();
    var userEmail = document.getElementById('email').value.trim();
    var userMessage = document.getElementById('message').value.trim();
    var errorMessages = [];
    var validateName = /^[A-Z][a-zA-Z'-]+(?:\s[A-Z][a-zA-Z'-]+)*$/;
    var validateEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!validateEmail.test(userEmail)) {
      errorMessages.push('Please Enter Valid Email');
    }

    if (!validateName.test(userName)) {
      errorMessages.push('Please Enter Valid Name');
    }

    if (userMessage.length <= 10) {
      errorMessages.push('Message must be more than 10 characters');
    }

    if (errorMessages.length > 0) {
      alert(errorMessages.join('\n'));
      return false;
    }

    return true;
  } // Submit button event listener


  if (submitbtn) {
    submitbtn.addEventListener('click', function (e) {
      e.preventDefault();

      if (formValidation()) {
        document.querySelector('.form').reset();
        approveForm.classList.remove('hidden');
        wrapper.classList.remove('hidden');
        wrapper.style.display = 'block';
      }
    });
  } // Close modal function


  function closeModal() {
    approveForm.classList.add('hidden');
    wrapper.classList.add('hidden');
    wrapper.style.display = 'none';
  } // Close button event listener


  if (closeWindow) {
    closeWindow.addEventListener('click', closeModal);
  } // Click outside modal to close


  window.addEventListener('click', function (event) {
    if (event.target === wrapper) {
      closeModal();
    }
  }); // Escape key to close modal

  window.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      closeModal();
    }
  });
}); //Fetching

function getUserData() {
  var response, getData, userBoxes;
  return regeneratorRuntime.async(function getUserData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(fetch("https://reqres.in/api/users?page=1"));

        case 3:
          response = _context.sent;

          if (response.ok) {
            _context.next = 6;
            break;
          }

          throw new Error("Something went wrong");

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap(response.json());

        case 8:
          getData = _context.sent;
          userBoxes = document.querySelectorAll(".user-box");
          userBoxes.forEach(function (userBox, index) {
            if (index < getData.data.length) {
              // Update the image
              var img = document.createElement("img");
              img.src = getData.data[index].avatar;
              img.alt = "".concat(getData.data[index].first_name, " ").concat(getData.data[index].last_name);
              img.style.borderRadius = "50%";
              img.style.width = "40%";
              img.style.height = "auto";
              img.style.marginRight = "10px";
              var userInfoDiv = document.createElement("div");
              userInfoDiv.classList.add("user-info");
              var name = document.createElement("p");
              name.className = "user-name";
              name.style.fontSize = "16px";
              name.style.marginTop = "24px";
              name.style.fontWeight = "600";
              name.style.color = "white";
              name.textContent = "".concat(getData.data[index].first_name, " ").concat(getData.data[index].last_name);
              userInfoDiv.appendChild(img);
              userInfoDiv.appendChild(name);
              userInfoDiv.style.display = "flex";
              userInfoDiv.style.flexDirection = "column";
              userInfoDiv.style.alignItems = "center";
              userBox.appendChild(userInfoDiv);
            }
          });
          _context.next = 16;
          break;

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](0);
          console.log('There was a problem with the fetch operation:', _context.t0);

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 13]]);
}

getUserData();
document.addEventListener('DOMContentLoaded', function () {
  var searchInput = document.querySelector('.search');
  var resultsDiv = document.querySelector('.result-box');
  var errorMessage = document.querySelector('.error-message');
  var products = Array.from(document.querySelectorAll('.shop-card'));
  var cardBoxes = document.querySelector('.card-clothes'); // Assuming this is where cards are shown

  var detailInfo = document.querySelectorAll('.detail-info'); // Search functionality

  var searchProducts = function searchProducts() {
    var query = searchInput.value.toLowerCase();
    resultsDiv.innerHTML = ''; // Clear previous results

    var found = false; // Show all products if no query

    if (query === '') {
      products.forEach(function (product) {
        product.style.display = 'block'; // Show all products
      });
      errorMessage.style.display = 'none';
      return;
    }

    products.forEach(function (product) {
      var productNameElement = product.querySelector('.product');

      if (productNameElement) {
        var productName = productNameElement.textContent.toLowerCase();
        console.log("Checking product: ".concat(productName));

        if (productName.includes(query)) {
          product.style.display = 'block'; // Show product that matches

          found = true;
        } else {
          product.style.display = 'none'; // Hide non-matching products
        }
      }
    });

    if (!found) {
      errorMessage.textContent = 'Nothing was found. Want to explore other categories?';
      errorMessage.style.display = 'block';
    } else {
      errorMessage.style.display = 'none';
    }
  };

  searchInput.addEventListener('input', searchProducts);
  products.forEach(function (card, index) {
    card.addEventListener('click', function () {
      products.forEach(function (card) {
        card.style.display = 'none';
      }); // Display the corresponding detail information

      var cardInfo = detailInfo[index];

      if (cardInfo) {
        cardInfo.style.display = 'grid';
        cardBoxes.style.gridTemplateColumns = '1fr';
      }
    });
  });
});
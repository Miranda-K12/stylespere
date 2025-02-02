'use strict';
//Burger menu
const hamburger = document.getElementById('hamburger');
const burgerMenu = document.getElementById('burger-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    burgerMenu.classList.toggle('active'); 
});

const closeBtns = document.querySelectorAll("#burger-menu a"); 
closeBtns.forEach(function(link) {
    link.addEventListener("click", function(e) {
        burgerMenu.classList.remove("active"); 
        hamburger.classList.remove("active");  
    });
});

/*Slider*/
 document.addEventListener('DOMContentLoaded', () => {
    
        // Splide initialization code here
        new Splide('#my-slider', {
            type       : 'loop',
            perPage    : 1,
            autoplay   : true,
        }).mount();
 });

// FAQ Accordion 
const box = document.querySelectorAll('.box');
  box.forEach(function (item) {
    item.addEventListener('click', function () {
        const answer = this.querySelector('.answer');
        const icon = this.querySelector('.icon');
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
});

//Smooth Scrolling
function smoothScroll() {
    const links = document.querySelectorAll('a:link'); 
    links.forEach(function (link) {
        link.addEventListener('click', function (e) {
            const href = link.getAttribute("href"); 
            if (href === "#") {
                e.preventDefault(); 
                window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                });
            } 
            else if (href.startsWith("#")) {
                e.preventDefault();
                const section = document.querySelector(href); 
                if (section) { 
                    section.scrollIntoView({
                        behavior: "smooth" 
                    });
                }
            }
        });
    });
}
smoothScroll();

//Form Validation
document.addEventListener('DOMContentLoaded', () => {
    // Check if we are on index.html
   
        const submitbtn = document.querySelector('.btn-submit');
        const closeWindow = document.querySelector('.close');
        const approveForm = document.querySelector('.approve-window');
        const wrapper = document.querySelector('.wrapper');

        // Form validation function
        function formValidation() {
            const userName = document.getElementById('fname').value.trim();
            const userEmail = document.getElementById('email').value.trim();
            const userMessage = document.getElementById('message').value.trim();
            const errorMessages = [];
            const validateName = /^[A-Z][a-zA-Z'-]+(?:\s[A-Z][a-zA-Z'-]+)*$/;
            const validateEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

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
        }

        // Submit button event listener
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
        }

        // Close modal function
        function closeModal() {
            approveForm.classList.add('hidden');
            wrapper.classList.add('hidden');
            wrapper.style.display = 'none'; 
        }
        // Close button event listener
        if (closeWindow) {
            closeWindow.addEventListener('click', closeModal);
        }
        // Click outside modal to close
        window.addEventListener('click', function (event) {
            if (event.target === wrapper) { 
                closeModal();
            }
        });
        // Escape key to close modal
        window.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                closeModal();
            }
        });
});

//Fetching
async function getUserData() {
    try {
        const response = await fetch("https://reqres.in/api/users?page=1");
        if (!response.ok) {
            throw new Error("Something went wrong");
        }
        const getData = await response.json();
        const userBoxes = document.querySelectorAll(".user-box");

        userBoxes.forEach((userBox, index) => {
            if (index < getData.data.length) {
                // Update the image
                const img = document.createElement("img");
                img.src = getData.data[index].avatar; 
                img.alt = `${getData.data[index].first_name} ${getData.data[index].last_name}`; 
                img.style.borderRadius = "50%"; 
                img.style.width = "40%"; 
                img.style.height = "auto"; 
                img.style.marginRight = "10px"; 
                const userInfoDiv = document.createElement("div");
                userInfoDiv.classList.add("user-info");
                const name = document.createElement("p");
                name.className = "user-name";
                name.style.fontSize = "16px";
                name.style.marginTop = "24px";
                name.style.fontWeight = "600";
                name.style.color = "white";
                name.textContent = `${getData.data[index].first_name} ${getData.data[index].last_name}`;
                userInfoDiv.appendChild(img);
                userInfoDiv.appendChild(name);
                userInfoDiv.style.display = "flex";
                userInfoDiv.style.flexDirection = "column";
                userInfoDiv.style.alignItems = "center";
                userBox.appendChild(userInfoDiv);
            }
        });
    } catch (error) {
        console.log('There was a problem with the fetch operation:', error);
    }
}
getUserData();
document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.querySelector('.search'); 
    const resultsDiv = document.querySelector('.result-box'); 
    const errorMessage = document.querySelector('.error-message'); 
    const products = Array.from(document.querySelectorAll('.shop-card')); 
    const cardBoxes = document.querySelector('.card-clothes'); // Assuming this is where cards are shown
    const detailInfo = document.querySelectorAll('.detail-info'); 

    // Search functionality
    const searchProducts = () => {
        const query = searchInput.value.toLowerCase();
        resultsDiv.innerHTML = ''; // Clear previous results
        let found = false;

        // Show all products if no query
        if (query === '') {
            products.forEach(product => {
                product.style.display = 'block'; // Show all products
            });
            errorMessage.style.display = 'none'; 
            return;
        }

        products.forEach(product => {
            const productNameElement = product.querySelector('.product'); 

            if (productNameElement) {
                const productName = productNameElement.textContent.toLowerCase();
                console.log(`Checking product: ${productName}`);

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

    products.forEach((card, index) => {
        card.addEventListener('click', () => {
            products.forEach(card => {
                card.style.display = 'none';
            });

            // Display the corresponding detail information
            const cardInfo = detailInfo[index];
            if (cardInfo) {
                cardInfo.style.display = 'grid';
                cardBoxes.style.gridTemplateColumns = '1fr'; 
            }
        });
    });
});

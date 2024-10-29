'use strict';
const shopCards = document.querySelectorAll('.shop-card');
const detailInfo = document.querySelectorAll('.detail-info');
const cardBoxes = document.querySelector('.card-clothes');

shopCards.forEach((card, index) => {
  card.addEventListener('click', () => {
   shopCards.forEach(card => {
     card.style.display = 'none';
    });
  const cardInfo = detailInfo[index];
  if (cardInfo) {
    cardInfo.style.display = 'grid';
    cardBoxes.style.gridTemplateColumns = '1fr'; 

    }
  });
});
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
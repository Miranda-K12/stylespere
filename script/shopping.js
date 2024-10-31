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

//Shopping Functional

//Choose Size
let selectedSize = '';
document.querySelectorAll('.size').forEach(sizeItem => {
  sizeItem.addEventListener('click', () => {
    document.querySelectorAll('.size').forEach(item => item.classList.remove('selected'));
    sizeItem.classList.add('selected');
    selectedSize = sizeItem.getAttribute('data-size');
  });
});

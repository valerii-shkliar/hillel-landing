const overlay = document.querySelector('body .overlay');
const modalContainer = document.querySelector('body .advent-calendar .modal-container');
const houseContainer = document.querySelector('body .advent-calendar .house-container');
const buyBookBtn = document.querySelector(
  'body .advent-calendar .modal-container .btn-container .buy-book-btn'
);
const ACTIVE_CLASS = 'active';

buyBookBtn.addEventListener('click', onBuyBookBtnClick);
houseContainer.addEventListener('click', onHouseContainerClick);

function onBuyBookBtnClick() {
  overlay.classList.remove(ACTIVE_CLASS);
  modalContainer.classList.remove(ACTIVE_CLASS);
}

function onHouseContainerClick(e) {
  const itemNumber = e.target.getAttribute('item-number');
}

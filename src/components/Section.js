export default class Section {
  constructor({ renderer }, container) {
    this._renderer = renderer;
    this._container = container;
  }
   renderItems(data) {
    data.reverse().forEach((item) => {
      this._renderer(item);
    });
  }
  
   setItem(element) {
    this._container.prepend(element);
  }

  // const loadCard = (element, cards) => {
  //   cards.forEach((card) => {
  //     // const displayLikes = card.likes.length; // количество лайков
  //     const isOwner = card.owner._id === user.id; // Определить владельца карты (true/false)
  //     const isLiked = card.likes.some(like => like._id === user.id) // если хотя бы один эл true, то выполняется
  //     gallery.append(createCard(card, isOwner, isLiked));
  //   })
  // }
 } 
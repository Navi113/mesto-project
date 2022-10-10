export default class Section {
  constructor({
    renderer
  }, container) {
    this._renderer = renderer; // Инструкция для вставки
    this._container = container; // Контейнер для вставки
  }
  renderItems(data) {
    data.reverse().forEach((item) => {
      this._renderer(item);
    });
  }

  setItem(element) {
    this._container.prepend(element);
  }
}
export default class Section {
	constructor({renderer}, sectionElement) {
       this._renderer = renderer;
       this._sectionElement = sectionElement;
    }

  // отрисовать все элементы
  renderItems(items) {
      items.forEach((item) => {
        this._renderer(item);
      })
  }

  // вставить элемент в секцию (галерею)
  addItem(element) {
      this._sectionElement.prepend(element);
  }
}

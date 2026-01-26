class ScrollToTop {
  constructor({
    selector = '.scroll-to-top',
    offset = 300, // show button after this scroll in "px"
    showOnScrollUp = true, // show on scroll up
  } = {}) {
    this.button = document.querySelector(selector);
    if (!this.button) return;
    this.offset = offset;
    this.showOnScrollUp = showOnScrollUp;
    this.lastY = window.scrollY;
    this.visible = false;
    this._onScroll = this._onScroll.bind(this);
    this._onClick = this._onClick.bind(this);
    this.init();
  }

  init() {
    window.addEventListener('scroll', this._onScroll, { passive: true });
    this.button.addEventListener('click', this._onClick);
    // if you want - hide the button when loading when at the top
    this._updateVisibility();
  }

  _onScroll() {
    const currentY = window.scrollY;
    const scrollingUp = currentY < this.lastY;
    this.lastY = currentY;

    if (currentY < this.offset) {
      this._hide();
      return;
    }

    if (!this.showOnScrollUp) {
      this._show();
      return;
    }

    if (scrollingUp) this._show();
    else this._hide();
  }

  _show() {
    if (this.visible) return;
    this.visible = true;
    this.button.classList.add('scroll-to-top--visible');
  }

  _hide() {
    if (!this.visible) return;
    this.visible = false;
    this.button.classList.remove('scroll-to-top--visible');
  }

  _onClick(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // useful for initial rendering
  _updateVisibility() {
    if (window.scrollY >= this.offset) this._show();
    else this._hide();
  }
}

// Initialization — called automatically
document.addEventListener('DOMContentLoaded', () => {
  new ScrollToTop(); // options can be passed: { offset: 500, showOnScrollUp: false }
});

export default {
  init() {
    // JavaScript to be fired on all pages
  },
  finalize() {
    // JavaScript to be fired on all pages, after page specific JS is fired

    //header hamburger nav
      $('.first-button').on('click', () => $('.animated-icon1').toggleClass('open'));
      $('.second-button').on('click', () => $('.animated-icon2').toggleClass('open'));
      $('.third-button').on('click', () => $('.animated-icon3').toggleClass('open'));
  },
};

import Barba from 'barba.js';
import { TimelineMax, TweenMax, Power2 } from 'gsap/TweenMax';

export default {
  init() {
    // JavaScript to be fired on all pages

    var FadeTransition = Barba.BaseTransition.extend({
      start: function() {
        /**
         * This function is automatically called as soon the Transition starts
         * this.newContainerLoading is a Promise for the loading of the new container
         * (Barba.js also comes with an handy Promise polyfill!)
         */
    
        // As soon the loading is finished and the old page is faded out, let's fade the new page
        Promise
          .all([this.newContainerLoading, this.fadeOut()])
          .then(this.fadeIn.bind(this));
      },
    
      fadeOut: function() {
        /**
         * this.oldContainer is the HTMLElement of the old Container
         */
        $(this.oldContainer).css({ position: 'relative' })
        return $(this.oldContainer).animate({ left: '3000px', opacity: 0 }, 400, 'swing').promise();
      },
    
      fadeIn: function() {
        /**
         * this.newContainer is the HTMLElement of the new Container
         * At this stage newContainer is on the DOM (inside our #barba-container and with visibility: hidden)
         * Please note, newContainer is available just after newContainerLoading is resolved!
         */
        $(window).scrollTop(0);
        var _this = this;
        var $el = $(this.newContainer);
    
        $(this.oldContainer).hide();
    
        // $el.css({
        //   visibility : 'visible',
        //   position: 'relative',
        //   left: '-3000px',
        //   opacity: 0,
        // });

        // header hamburger nav 
        if( $('.animated-icon1').hasClass('open') ) $('.first-button').trigger('click');

        let tl = new TimelineMax({});
        tl
        .set( $el, { visibility: 'visible', position: 'relative', left: '-3000px', opacity: 0 })
        .set(['.chi_sono.lista-servizi', '.chi_sono.mia-foto', '.work', '.single_works.thumbnail-img', '.contatti.lista-contatti div'], { x: '2000px', autoAlpha: 0 })
        .to( $el, 0.6, { left: '0px', opacity: 1 } )
        .set($el, { position: 'static' })
        .from( ['.title', '.chi_sono.title-servizi', '.content', '.chi_sono.lista-servizi'], 0.6, { left: '-100%' })
        .from( ['.chi_sono.title-span','.chi_sono.title-servizi-span', '.works.title-span'], 1, { left: '-100%' }, '+=1')
        .to(['.chi_sono.lista-servizi', '.chi_sono.mia-foto', '.single_works.thumbnail-img'], 0.6, { x: '0', autoAlpha: 1 }, '-=2')
        .staggerTo('.work', 0.5, { x: '0', autoAlpha: 1, ease: Power2.easeOut }, 0.2, '-=2')
        .staggerTo('.contatti.lista-contatti div', 0.5, { x: '0', autoAlpha: 1, ease: Power2.easeOut }, 0.2, '-=2')
        .set( $el, { onComplete: () => _this.done() } );
      },
    });
    
    /**
     * Next step, you have to tell Barba to use the new Transition
     */
    
    Barba.Pjax.getTransition = function() {
      /**
       * Here you can use your own logic!
       * For example you can use different Transition based on the current page or link...
       */
    
      return FadeTransition;
    };

    // Update body classes by replacing the barba.js internal function
    // See: https://github.com/luruke/barba.js/issues/49#issuecomment-237966009
    var originalFn = Barba.Pjax.Dom.parseResponse;
    Barba.Pjax.Dom.parseResponse = function(response) {
        // Because jQuery will strip <body> when parsing a HTML DOM, change
        // <body> to <notbody>, then we can grab the classes assigned to it
        // See: http://stackoverflow.com/a/14423412/4081305
        response = response.replace(/(<\/?)body( .+?)?>/gi, '$1notbody$2>', response);
        // Get the classes on the <notbody> element
        var bodyClasses = $(response).filter('notbody').attr('class');
        // Apply the classes to the current body
        $('body').attr('class', bodyClasses);
        // Call the original barba.js function
        return originalFn.apply(Barba.Pjax.Dom, arguments);
    };

  },
  finalize() {
    // JavaScript to be fired on all pages, after page specific JS is fired

    const isScrolledIntoView = (elem) => {
      var docViewTop = $(window).scrollTop();
      var docViewBottom = docViewTop + $(window).height();
      var elemTop = $(elem).offset().top;
      var elemBottom = elemTop + $(elem).height();
      // trigger before reaching element
      if( window.innerHeight < 1200 ) 
        return (((elemBottom - 700) <= docViewBottom) && ((elemTop - 700) >= docViewTop));
      else return (((elemBottom - 1300) <= docViewBottom) && ((elemTop - 1300) >= docViewTop));
    }

    //social sharing button disabled on all pages but posts
    $('#dpsp-floating-sidebar').css('visibility','hidden');

    //language switcher
    if( $('html').attr('lang') == 'it-IT' ) {
      $('.menu-item-wpml-ls-2-it').css('display','none');
      $('.menu-item-wpml-ls-2-en').css('display','inline');
    } else {
      $('.menu-item-wpml-ls-2-en').css('display','none');
      $('.menu-item-wpml-ls-2-it').css('display','inline');
    }

    //tap on search
    $('li.search-form').on('click tap',() => $(this).trigger('hover'));

    Barba.Dispatcher.on('newPageReady', () => {
      
      // current menu item 
      $('li.current_page_item').removeClass('current_page_item current-menu-item');

      //stylized-checkbox on comments
      if($('.comment-form-cookies-consent')) $('.comment-form-cookies-consent').append('<label class="fake-checkbox"></label>')
       
      //home
      let curr = $('body').attr('class').trim().toLowerCase().split(' ');
      for( let i = 0; i < curr.length; i++ ) {
        if( curr[i] == 'home' ){
          $('li.menu-item-home').addClass('current_page_item current-menu-item');
          break
        }
        //enable social sharing button on posts
        else if( curr[i] == 'single-post-data' ){
          $('#dpsp-floating-sidebar').css('visibility','visible');
        }
        else {
          // works archive page fix bug
          let splitUrl = window.location.href.split('/')
          let title = splitUrl[splitUrl.length - 2];
          $('li a[href*="'+ title +'"]').parent().addClass('current_page_item current-menu-item');
        }
        $('li a[href*="'+ curr[i] +'"]').parent().addClass('current_page_item current-menu-item');
      }
    });
    //header hamburger nav
    $('.first-button').on('click tap', () => $('.animated-icon1').toggleClass('open'));

    // animate page elements
    $(window).scroll( () => {
      if( (isScrolledIntoView( $('.title-wrapper') ) === true) && !($('.title-wrapper').hasClass('animated')) ){ 
        TweenMax.fromTo('.title-wrapper', 1, { x: '-500px' }, { x: '0px' });
        $('.title-wrapper').addClass('animated');
      }
      if( (isScrolledIntoView( $('.chi_sono.title-servizi-wrapper') ) === true) && !($('.chi_sono.title-servizi-wrapper').hasClass('animated')) ){
        TweenMax.fromTo('.chi_sono.title-servizi-wrapper', 1, { x: '500px' }, { x: '0px' });
        $('.chi_sono.title-servizi-wrapper').addClass('animated');
      }
      if( (isScrolledIntoView( $('.content p') ) === true) && !($('.content p').hasClass('animated')) ){ 
        TweenMax.fromTo('.content p', 1, { x: '500px' }, { x: '0px' });
        $('.content p').addClass('animated');
      }
      if( (isScrolledIntoView( $('.content .mia-foto') ) === true) && !($('.content .mia-foto').hasClass('animated')) ){ 
        TweenMax.fromTo('.content .mia-foto', 1, { x: '-500px' }, { x: '0px' });
        $('.content .mia-foto').addClass('animated');
      }
      if( (isScrolledIntoView( $('.chi_sono.lista-servizi') ) === true) && !($('.chi_sono.lista-servizi').hasClass('animated')) ){ 
        TweenMax.fromTo('.chi_sono.lista-servizi', 1, { x: '-500px' }, { x: '0px' });
        $('.chi_sono.lista-servizi').addClass('animated');
      }
    });
  },
};

import Barba from 'barba.js';

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
        return $(this.oldContainer).animate({ left: '3000px' }, 400, 'swing').promise();
      },
    
      fadeIn: function() {
        /**
         * this.newContainer is the HTMLElement of the new Container
         * At this stage newContainer is on the DOM (inside our #barba-container and with visibility: hidden)
         * Please note, newContainer is available just after newContainerLoading is resolved!
         */
    
        var _this = this;
        var $el = $(this.newContainer);
    
        $(this.oldContainer).hide();
    
        $el.css({
          visibility : 'visible',
          position: 'relative',
          left: '-3000px',
        });
    
        $el.animate({ left: 0 }, 400, 'swing', () => {
          /**
           * Do not forget to call .done() as soon your transition is finished!
           * .done() will automatically remove from the DOM the old Container
           */
          $(this.newContainer).css({ position: 'static' });
          _this.done();
        });
      }
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

    Barba.Dispatcher.on('newPageReady', () => {
      $('li.current_page_item').removeClass('current_page_item current-menu-item');
      let curr = $('body').attr('class').trim().toLowerCase().split(' ');
      for( let i = 0; i < curr.length; i++ ) {
        if( curr[i] == 'home' ){
          $('li.menu-item-home').addClass('current_page_item current-menu-item')
          //header home style
          const margin = $('html').attr('margin');
          $('header').css({ 
            'position': 'absolute', 
            'left': 0, 
            'top': margin, 
            'background-color': 'transparent', 
          });
          break
        }
        $('header').css({ 
          'position': 'static',  
          'background-color': 'inherit', 
        });
        $('li a[href*="'+ curr[i] +'"]').parent().addClass('current_page_item current-menu-item') 
      }
    });

    //header hamburger nav
    $('.first-button').on('click', () => $('.animated-icon1').toggleClass('open'));
    $('.second-button').on('click', () => $('.animated-icon2').toggleClass('open'));
    $('.third-button').on('click', () => $('.animated-icon3').toggleClass('open'));
  },
};

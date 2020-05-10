document.addEventListener("DOMContentLoaded", ready());

function ready() {

    var popup = (function () {
        return function (selector) {
            var _trigers = document.querySelectorAll(selector);
    
            function popupOpen(elem) {
                var _modal = document.querySelector(elem);
    
                if (_modal.querySelector('.popup__close')) {
                    _modal.querySelector('.popup__close').addEventListener('click', function () {
                        popupClose(elem);
                    });
                }
    
                _modal.addEventListener('click', function (e) {
                    if (e.target.classList.contains('popup')) {
                        popupClose(elem);                 
                    }                
                });
    
                _modal.classList.add('popup--open');
    
                return true;
            }
    
            function popupClose (elem) {
                var _modal = document.querySelector(elem);
    
                _modal.classList.remove('popup--open');   
    
                return true;
            }
    
            for (var i = 0; i < _trigers.length; i++) {
               _trigers[i].addEventListener('click', function (e) {
                   e.preventDefault();
                   var id = this.getAttribute('href');             
                   
                   popupOpen(id);                
               });
            }
    
            return {
                open(id) {
                    popupOpen(id);
                },
                close(id) {
                    popupClose(id);
                }
            }
        }
    }());
    
    //Forms
    function submitHandler(e){    
        e.preventDefault();
        var self = this;
        fetch("mail.php", {
            method: "POST",
            body: new FormData(self)
        }).then(function() {
            if (document.querySelector('.popup--open')) {
                var id ='#' + document.querySelector('.popup--open').getAttribute('id');       
                popupContacts.close(id);
            }
            popupContacts.open("#popup-success-massage");
            //alert('Спасибо, скоро наши специалисты свяжутся с вами');
            self.reset();
        })
        .catch(function(error) { console.log(error); });
    } 

    document.querySelectorAll('.form').forEach(function(element) {
        element.addEventListener('submit', submitHandler);
    });

    //Popups
    if (document.querySelector('.popup-trigger') != null) {
        popupContacts = popup('.popup-trigger');        
    }

    if (document.querySelector('.faq__accordion') != null) {
        faqTab = accordion('.faq__accordion');
    }

    //Sliders 
    if (document.querySelector('.feedback__slider')) {
        var feedbackSlider = new Glide('.feedback__slider', {
            type: 'slider',
            focusAt: 0,
            animationDuration: 1000,
            perView: 1,
            touchRatio: 1,
			perTouch: 1,
			breakpoints: {
				991: {
				  perView: 2
				},
				767: {
				  perView: 1
				}
			  }
        });
        feedbackSlider.mount();
    }
    
  
	
	//Tabs
	var i = 0;

	document.querySelectorAll('.service-card__link').forEach(el => {
		el.closest('.service-card').setAttribute('data-index', i);
		i++;

		el.closest('.service-card').addEventListener('click', function (e) {
			e.preventDefault();
			
            var parent = this.closest('.service-card');
            
            if(parent.classList.contains('service-card--active')) {
                parent.classList.remove('service-card--active');

                if(document.querySelector('.tabs__item--active')) {
                    document.querySelector('.tabs__item--active').classList.remove('tabs__item--active');
                }

                return true;
            }

            if(document.querySelector('.service-card--active')) {
				document.querySelector('.service-card--active').classList.remove('service-card--active');
			}

			parent.classList.toggle('service-card--active');
            var index = parent.getAttribute('data-index');
            

			if(document.querySelector('.tabs__item--active')) {
				document.querySelector('.tabs__item--active').classList.remove('tabs__item--active');
			}

			document.querySelector('.tabs__item[data-index="' + index + '"]').classList.toggle('tabs__item--active');
		});
	});

    i = 0;

	document.querySelectorAll('.tabs__item').forEach(el  => {
		el.setAttribute('data-index', i);
		i++;
    });

    document.querySelectorAll('.tabs-trigger__container').forEach(el => {
        i = 0;
        el.querySelectorAll('.tabs-trigger').forEach(tg => {
            tg.setAttribute('data-index', i);
            i++;
        });
    });

      //Scroll

    function scrollCallback() {
        console.log('scrolled');
    }

    try {
        var linkNav = document.querySelectorAll('[href^="#"]'),
        speed = 0.8; 
    
        for (var i = 0; i < linkNav.length; i++) {
        linkNav[i].addEventListener('click', function(e) {

            e.preventDefault();
            
            var w = window.pageYOffset,
                hash = this.href.replace(/[^#]*(.*)/, '$1'),
                offset = 0;

            if (hash == '#') {
                return false;
            }
            
            if(this.classList.contains('tabs-trigger') && !this.classList.contains('tabs-trigger--bottom')) {
                var index = this.getAttribute('data-index');
                
                if(this.closest('.tabs-trigger__container').classList.contains('tabs-trigger__container--speed')) {
                    speed = 0.3;
                }

                if(document.querySelector('.service-card--active')) {
                    document.querySelector('.service-card--active').classList.remove('service-card--active');
                }

                if(document.querySelector('.tabs__item--active')) {
                    document.querySelector('.tabs__item--active').classList.remove('tabs__item--active');
                }
                
                document.querySelector('.service-card[data-index="' + index + '"]').classList.toggle('service-card--active');
                document.querySelector('.tabs__item[data-index="' + index + '"]').classList.toggle('tabs__item--active');
                
            } else if (this.classList.contains('tabs-trigger--bottom') && this.classList.contains('tabs-trigger--bottom')) {
                offset = document.querySelector('.services').offsetHeight;
                speed = 0.3;
                var index = this.getAttribute('data-index');

                if(document.querySelector('.service-card--active')) {
                    document.querySelector('.service-card--active').classList.remove('service-card--active');
                }

                if(document.querySelector('.tabs__item--active')) {
                    document.querySelector('.tabs__item--active').classList.remove('tabs__item--active');
                }
                
                function scrollCallback() {
                    document.querySelector('.service-card[data-index="' + index + '"]').classList.toggle('service-card--active');
                    document.querySelector('.tabs__item[data-index="' + index + '"]').classList.toggle('tabs__item--active');
                }

            } else if (hash == '#tabs' && !document.querySelector('.tabs__item--active')) {
                return false;
            }
                
            t = document.querySelector(hash).getBoundingClientRect().top - offset,
                start = null;             
            requestAnimationFrame(step);

            function step(time) {
                if (start === null) start = time;
                var progress = time - start,
                    r = (t < 0 ? Math.max(w - progress/speed, w + t) : Math.min(w + progress/speed, w + t));
                
                window.scrollTo(0,r);
                                
                if (r != w + t) {
                    requestAnimationFrame(step);
                } else {
                    scrollCallback();
                    location.hash = hash;
                }
            }
        }, false);
    }
    } catch (error) {
        console.log(error);
    }
    
    //Menu
    if (document.querySelector('.nav__button')) {
        document.querySelector('.nav__button').addEventListener('click', function (e) {
            e.preventDefault();
    
            this.classList.toggle('nav__button--active');
            document.querySelector('.nav__list').classList.toggle('nav__list--active');
        })
    }    


    if (document.querySelector(".feedback__more")) {
        var feedbackBlock = document.querySelector(".feedback__block")
        var feedbackMore = document.querySelector(".feedback__more")
        var feedbackItem = feedbackBlock.querySelectorAll('.feedback__item')
        feedbackMore.addEventListener("click", function() {
            var index
            feedbackItem.forEach((element) => {
                var styled = element.style.display
                if(styled === "block") {
                    element.style.display = "none"
                    index = Number(element.dataset.taindex)
                }
            });
            if (index >= feedbackItem.length-1) {
                index = -1
            }
            feedbackItem[index+1].style.display = "block"
            feedbackItem[index+2].style.display = "block"
        })

    }

    var homeMask = IMask(
        document.getElementById('home-input'), {
          mask: '+{7}(000)000-00-00'
    });

    var popupMask = IMask(
        document.getElementById('popup-input'), {
            mask: '+{7}(000)000-00-00'
    });
    
}

var popupContacts;
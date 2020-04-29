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

		el.addEventListener('click', function (e) {
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
    
    //Menu
    if (document.querySelector('.nav__button')) {
        document.querySelector('.nav__button').addEventListener('click', function (e) {
            e.preventDefault();
    
            this.classList.toggle('nav__button--active');
            document.querySelector('.nav__list').classList.toggle('nav__list--active');
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
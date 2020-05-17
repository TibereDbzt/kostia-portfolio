import $ from 'jquery';
import Swup from 'swup';
import SwupSlideTheme from '@swup/slide-theme';
import 'normalize.css';
import '../styles/main.sass';
import './vimeo.js';

new Swup({plugins: [new SwupSlideTheme()]});

const activePageMenu = () => {
  $('.menu__item > a').click( (event) => {
    $('.menu__item').removeClass('menu__item--active');
    $(event.currentTarget).parent('.menu__item').addClass('menu__item--active');
  });
}

const switchLanguage = () => {
  const english = $('body').hasClass('english');
  
  $('#langage-btn').click( () => {
    const active_url = window.location.pathname.slice(1);
    english ? location.href = active_url.slice(3) : location.href = `en_${active_url}`;
  });
};

const popupVimeo = () => {
  $('#vimeo-controls, #vimeo, #video-demo').click( () => {
    $('#vimeo').toggleClass('visibility');
  });
};

const mobileMenu = () => {
  $('#menu-icon, #close-icon').click( () => {
    $('#mobile-menu').toggleClass('open');
  });
};
  
document.addEventListener('DOMContentLoaded', () => {
  activePageMenu();
  switchLanguage();
  popupVimeo();
  mobileMenu();
});

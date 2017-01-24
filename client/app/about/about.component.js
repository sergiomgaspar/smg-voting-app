'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './about.routes';

export class AboutComponent {
  
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }

  frontEndTech =[
    { techName:"HTML5",
      description: "Hypertext Markup Language revision 5 (HTML5) is a markup language for the structure and presentation of World Wide Web contents. HTML5 supports the traditional HTML and XHTML-style syntax and other new features in its markup. It is the standard programming language for describing the contents and appearance of Web pages.",
      url: "https://www.w3.org/TR/html5/",
      image:"assets/images/html5.png",
      alt_image: "HTML5 Logo"
    },
    { techName:"SASS",
      description: "Sass (Syntactically Awesome Style Sheets) is a scripting language that is interpreted into Cascading Style Sheets (CSS). ",
      url: "http://sass-lang.com/",
      image:"assets/images/sass.png",
      alt_image: "SASS Logo"
    },
    { techName:"AngularJS",
      description: "AngularJS is a complete JavaScript-based open-source front-end web application framework mainly maintained by Google and targetting the development of SPA (Single Page Applications).The AngularJS framework works by first reading the HTML page, which has embedded into it additional custom tag attributes. Angular interprets those attributes as directives to bind input or output parts of the page to a model that is represented by standard JavaScript variables. The values of those JavaScript variables can be manually set within the code, or retrieved from static or dynamic JSON resources.",
      url: "https://angular.io/",
      image:"assets/images/angularjs.png",
      alt_image: "Angular Logo"
    },
    { techName:"Bootstrap",
      description: "Bootstrap is a free and open-source front-end web framework for designing websites and web applications. It contains HTML- and CSS-based design templates for typography, forms, buttons, navigation and other interface components, as well as optional JavaScript extensions. Unlike many web frameworks, it concerns itself with front-end development only.",
      url: "http://getbootstrap.com/",
      image:"assets/images/boostrap.png",
      alt_image: "Bootstrap Logo"
    }
    ];

}

export default angular.module('smgVotingAppApp.about', [uiRouter])
  .config(routes)
  .component('about', {
    template: require('./about.html'),
    controller: AboutComponent
  })
  .name;

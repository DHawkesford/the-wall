# ![A simple illustration of a brick wall.](./front-end/public/favicon.png) The Wall

View the website [here](https://the-wall-dan-blake.netlify.app/).

The Wall is an app for encouraging users to keep active by giving them a fun goal to focus on during their walk, run, cycle, etc.

Each day, a new theme appears at the top of the page, such as 'Nature' or 'Statues'. The idea being that during the user's exercise, they try to find and photograph something that matches that day's theme. They can then submit their photo to the website, view other users' posts, and vote on their favourites.

## Contents

1. [Purpose](#purpose)

2. [Tech stack](#tech-stack)

3. [Features & lessons learned](#features--lessons-learned)

    - [Markdown anchors](#markdown-anchors)
    - [Sticky navbar](#sticky-navbar)
    - [Hamburger menu](#hamburger-menu)
    - [Image modal](#image-modal)
    - [Loading animation](#loading-animation)
    - [Getting images in different sizes, to increase performance](#getting-images-in-different-sizes-to-increase-performance)
    - [Counting 'likes' (i.e. tracking favourites)](#counting-likes-ie-tracking-favourites)

4. [Future plans](#future-plans)

5. [Acknowledgements](#acknowledgements)

## Purpose

With this project, the app itself (a photography sharing / fitness motivator website) was not hugely important. My goal with this project was to try to create commonly used features from scratch, in order to better understand how they work. For example, I've implemented hamburger menus in past projects by importing them from component libraries such as MUI, but I wanted to try writing such a menu myself.   

In the [*Features & lessons learned*](#features--lessons-learned) section below, I've detailed the features I've been able to add to the app so far, how they were implemented, any difficulties I ran into, any useful links to resources I found helpful when trying to implement the feature, and any takeaways for the future.

[Back to top](#-the-wall)

## Tech stack

Front-end: React (CRA)

Back-end: Node/Express

[Back to top](#-the-wall)

## Features & lessons learned:

#### Markdown anchors:

- I wanted to include a 'Back to top' link after each section in this README, and in GitHub flavoured markdown this would usually be done here with:

        # The Wall
        .
        .
        .
        [Back to top](#the-wall)

    However (as you can check in the raw markdown) I've included an image in the main header, so the anchor above wouldn't work in this case, and it was difficult to determine what the anchor needed to be. 
- It turns out GitHub has a tool for showing you what the anchor should be. Simply open the README file in GitHub, hover over the header you want to link to, and a hyperlink icon will appear. Then hover over the icon, and you'll see the correct anchor tag in the URL in the status bar (at least in Chrome):

    ![A screenshot summarising the above step.](./markdown_anchors.png)

- This shows the anchor to use here was:

        # ![A simple illustration of a brick wall.](./front-end/public/favicon.png) The Wall
        .
        .
        .
        [Back to top](#-the-wall)

- A takeaway from this: markdown files don't always look or behave the same in VS Code as they do in GitHub! Header links may not work in the VS Code README preview, but will still work fine in GitHub. 
- Props to [@Cavitedev](https://github.com/Cavitedev) for his answer [here](https://gist.github.com/asabaylus/3071099?permalink_comment_id=3528884#gistcomment-3528884)

[Back to top](#-the-wall)

---

#### Sticky navbar:

- The app is designed for users to scroll down the page to see more photos, so it made sense to include a sticky navbar for quick access
- It turns out there are many ways to do this, but I think the simplest way (and sufficient in this case) was to style the `nav` and `main` tags as follows:

        nav {
            position: fixed;
            height: 40px;
        }

        main {
            margin-top: 40px;
        }

    This was made easy due to the HTML structure of the app:

        <div class="App">
            <nav>..</nav>
            <main>..</main>
        </div>

- A takeaway I had from looking into this was that when you understand how other developers have implemented a feature previously, it's not too difficult to adapt it for your project, and to account for any changes that may be desirable or needed. For example, the W3Schools guide below uses JS, but I was able to implement this here just with CSS.
- [W3Schools HowTo Sticky/Affix Navbar](https://www.w3schools.com/howto/howto_js_navbar_sticky.asp)

[Back to top](#-the-wall)

---

#### Hamburger menu:

- Similar to the sticky navbar I added a hamburger menu that is fixed in place. Its visibility depends on its classes, which are toggled using state. 
- The main 'new thing' I was trying here was to figure out how to make the menu close when a user clicks outside of it 
- I did this by adding a 'click' event listener to the document, and checking which CSS selectors the event occured closest to (i.e. if it wasn't closest to the hamburger-menu class, then that should cause the menu to become hidden). 
- This involved learning about event bubbling, event target selectors, and the closest() method of the event target object
- I later learned that in some cases it may be preferable to conditionally render something rather than simply using CSS to toggle its visibility. However for something that may be toggled often, the CSS route may have less cost. From Vue's docs: "*Generally speaking, v-if has higher toggle costs while v-show has higher initial render costs. So prefer v-show if you need to toggle something very often, and prefer v-if if the condition is unlikely to change at runtime.*"
- [W3Schools HowTo Mobile Navigation Menu](https://www.w3schools.com/howto/howto_js_mobile_navbar.asp)
- [MDN Web Docs Using CSS Transitions](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions)
- [DelftStack Slide in From Left Transition in CSS](https://www.delftstack.com/howto/css/slide-in-from-left-transition-in-css/)
- [Conditionally rendering vs toggling visiblity with CSS](https://stackoverflow.com/questions/56229860/conditionally-rendering-markup-jsx-vs-css-display-none-which-is-better-p)
- [Vue Docs v-if vs v-show](https://vuejs.org/guide/essentials/conditional.html#v-if-vs-v-show)
- [Techstacker closing a modal when users click outside it](https://techstacker.com/close-modal-click-outside-vanilla-javascript/)
- [How to close modals on clicking outside](https://stackoverflow.com/questions/37573608/how-to-make-modal-close-on-click-outside#:~:text=Another%20way%20to%20dismiss%20the,nature%20of%20the%20javascript%20events.&text=clicking%20on%20.,modal%2Droot%20%2D%3E%20body%20.)

[Back to top](#-the-wall)

---

#### Image modal:

- 

[Back to top](#-the-wall)

---

#### Loading animation:

-

[Back to top](#-the-wall)

---

#### Getting images in different sizes, to increase performance:

- 

[Back to top](#-the-wall)

---

#### Counting 'likes' (i.e. tracking favourites):

-

[Back to top](#-the-wall)

## Future plans

- Each image has a counter for how many users have 'starred' (favourited) it. I would like to figure out the best way to make this a live figure. I could imagine that sending a fetch request to the server every few seconds would be a possible solution. 
- Create a button that appears in the bottom-right corner that returns a user to the top of the page. The button should not appear if they had not scrolled down the page at all
- Incorporate lazy loading of the images, or pagination, or some such alternative to reduce the initial page load time 
- Create a page for showing the user's favourited images

[Back to top](#-the-wall)

## Acknowledgements

### Icons:
- Star icon (light and dark) by [Hilmy Abiyyu Asad](https://freeicons.io/profile/75801) on [freeicons.io](https://freeicons.io)
- Zoom-in icon (magnifying glass) by [Raj Dev](https://freeicons.io/profile/714) on [freeicons.io](https://freeicons.io)
- [Hamburger menu button icon (light and dark)](https://icons8.com/icon/JTddWDKbAzgl/menu) by [Icons8](https://icons8.com)
- ['Submit a photo' icon](https://www.flaticon.com/free-icons/picture) by [mim_studio - Flaticon](https://www.flaticon.com/authors/mim-studio)
- Info icon by [Raj Dev](https://freeicons.io/profile/714) on [freeicons.io](https://freeicons.io)
- [Photographer icon](https://www.flaticon.com/free-icons/photographer) by [Eucalyp - Flaticon](https://www.flaticon.com/authors/eucalyp) 
- [Close menu icons (light and dark)](https://www.flaticon.com/free-icons/close) by [Tanah Basah - Flaticon](https://www.flaticon.com/authors/tanah-basah)
- [Log out icon](https://www.flaticon.com/free-icons/logout) by [Freepik - Flaticon](https://www.flaticon.com/authors/freepik)
- [Log in icon](https://www.flaticon.com/free-icons/entrance) by [Freepik - Flaticon](https://www.flaticon.com/authors/freepik)
- Favicon by [www.wishforge.games](https://freeicons.io/profile/2257) on [freeicons.io](https://freeicons.io)

[Back to top](#-the-wall)

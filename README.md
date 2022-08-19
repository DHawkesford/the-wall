# ![A simple illustration of a brick wall.](./front-end/public/favicon.png) The Wall

View the website [here](https://the-wall-dan-blake.netlify.app/).

The Wall is an app for encouraging users to keep active by giving them a fun goal to focus on during their walk, run, cycle, etc.

Each day, a new theme appears at the top of the page, such as 'Nature' or 'Statues'. The idea being that during the user's exercise, they try to find and photograph something that matches that day's theme. They can then submit their photo to the website, view other users' posts, and vote on their favourites.

---

## Contents
<!-- 
why you created it
how it works
 -->
1. [Purpose](#purpose)

2. [Tech stack](#tech-stack)

3. [Features & lessons learned](#features--lessons-learned)

4. [Future plans](#future-plans)

5. [Acknowledgements](#acknowledgements)

---

## Purpose

With this project, the app itself (a photography sharing / fitness motivator website) was not hugely important. My goal with this project was to try to create commonly used features from scratch, in order to better understand how they work. For example, I had often implemented hamburger menus in past projects by importing them from component libraries such as MUI, but I wanted to try writing such a menu myself.   

In the [*Features & lessons learned*](#features--lessons-learned) section below, I've detailed the features I've been able to add to the app so far, how they were implemented, any difficulties I ran into, any useful links to resources I found helpful when trying to implement the feature, and any takeaways for the future.

[Back to top](#)

---

## Tech stack

Front-end: React (CRA)

Back-end: Node/Express

[Back to top](#)

---

## Features & lessons learned:

### Sticky navbar

- 

### Hamburger menu

- 

### Image modal

- 

### Loading animation

-

### Getting images in different sizes, to increase performance

- 

### Counting 'likes' (i.e. tracking favourites)

-

[Back to top](#)

---

## Future plans

- Each image has a counter for how many users have 'starred' (favourited) it. I would like to figure out the best way to make this a live figure. I could imagine that sending a fetch request to the server every few seconds would be a possible solution. 
- Create a button that appears in the bottom-right corner that returns a user to the top of the page. The button should not appear if they had not scrolled down the page at all
- Incorporate lazy loading of the images, or pagination, or some such alternative to reduce the initial page load time 
- Create a page for showing the user's favourited images

[Back to top](#)

---

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

[Back to top](#)
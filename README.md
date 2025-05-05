<h1>Type Match</h1>

An interactive web game where you have to choose a Pokémon matchup that is the most efefctive against the randomly picked opponent.

<section id="#contents"></section>
<h2> Table of contents</h2>
<ul>
  <li><a href="#Implementation">Implementation</a> </li>
  <li><a href="#Setup">How to setup</a></li>
  <li><a href="#Use">How To Play</a> </li>
  <li><a href="#Credits">Credits</a> </li>
</ul>

</section>

<section id="Implementation">
  <h2>Implementation</h2>
  <p>This project is written in HTML, CSS aided by <a href="https://getbootstrap.com">Bootstrap</a> and JavaScript using the <a href="https://axios-http.com/docs/intro">axios</a> library to contact the <a href="https://pokeapi.co">Pokeapi</a>, This project was primarily done to test my understanding of web development and in particular API useage.</p>
  <p>API calls are made to get pokémon data used within the game, axios ensures that this is handled smoothly</p>
  <p>This projext may be updated to use better aproaches to web development, using a modern framework as my understanding develops</p>
</section>

<section id="Setup"> 
  <h2>Setup</h2>
  <p>The Web application is currently being hosted on github pages, but if you want to host a version for yourself simply just clone the repository and run the index.html file</p>
</section>

<section id="Use">
  <h2>How To Play</h2>
  <p> On viewing the web app, instructions are at the bottom of the page on how to play. There will be a pokémon on screen with it's types visible. Simply type a pokemon name into the search-assisted input box that you believe is a good matchup, if it is you will be declared a winner and have the option to play again, if not you can keep trying until you win</p>
  <p> A matchup is classified as good if and only if all the chosen pokémon's types are super-effective to that of the generated pokémon's</p>
</section>

<section id="Credits">
  <h2>Credits</h2>
  <p>The Web app itself was written soley by me as a personal project<p>
  <p>Thank you to the team at <a href="https://pokeapi.co">Pokeapi</a> for providing a free to use - comprehensive api </p>
</section>

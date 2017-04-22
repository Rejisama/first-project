

/******************* LIGHTBOX **********************/
//1. Make an overlay.
var $overlay = $('<div id="overlay"></div>');    

//2. Add an image to the overlay:
var $image = $("<img>");
$overlay.append($image);

//3. Make a caption:
var $caption = $("<p></p>");

//4. Add the overlay.
$("body").append($overlay);

//5. Add the caption to the overlay after the image loads.
$overlay.append($caption);

//6. Capture the click event on a link to an image.
$(".gallery li a").click(function(event) {
  
  //add preventDefault() because the default behavior of the browser is to bring the image to another page when clicking the link.
  event.preventDefault();
  
  // Get the value of the image "href" and store it in a variable. "href" is an attribute (attr) of the element "a" in HTML.
  var imageLocation = $(this).attr("href");   
  
  // Update overlay with the image linked in the link.
  // set the image's src into the href. (another way of using the .attr property.
  $image.attr("src", imageLocation);
  
  // Show the overlay.
  $overlay.show();
  
  
  // Get every child's alt attribute and set caption.
  // "img" is a child of #imageGallery a (this). 
  // use .children so that it will target every child img's alt attr. if not, it will only get the first.
  var captionText = $(this).children("img").attr("title");
  $caption.text(captionText).css("width", ($image.width()));
        $window.resize(function resize(){
            if ($window.width() < 768) {
                $caption.css("width", ($image.width()*0.5));
            }
    });
 });


//7. Hide the overlay.
$overlay.click( function() {
  $overlay.hide();
});

//unbind small href:
$(".gallery li small a").unbind('click').click();


/******************* NAV ICON MENU **********************/

var $navicon = $(".nav-icon");
var $window = $(window);
var $navbar = $(".navbar");
var $nav = $(".navbar-nav");

function changeIcon() {
    $navicon.children().addClass("change");
}

function hasChangeClass() {
    if ($navicon.children().hasClass("change")) {
        return true;
    }
}

function showExpanded() {
    $nav.addClass("nav-expanded");
    $(".nav-expanded").toggle();
}

$navicon.click("slow", function() {
    if (!hasChangeClass()) {
        changeIcon();
        showExpanded();
    } else {
        $navicon.children().removeClass("change");
        $nav.removeClass("nav-expanded");
        $nav.hide();
    }
});

function dropdownEvents() {
    var $dropdownlink = $(".dropdown-toggle");
    $dropdownlink.hover(function() {
        $(this).css("color", "white");
    });
    $dropdownlink.mouseleave(function() {
        $(this).css("color", "hsla(212, 87%, 82%, 1)");
    });
}
dropdownEvents();

/******************* SEARCH ICON MENU **********************/

var $searchbutton = $(".search-button");
var $searchbox = $("#searchbox");

function changeSearchImage() {
    $searchbutton.addClass("changeSrc");
}

function hasChangeSrcClass() {
    if ($searchbutton.hasClass("changeSrc")) {
        return true;
    }
}

$searchbutton.click("slow", function() {
    if (!hasChangeSrcClass()) {
        changeSearchImage();
        $searchbutton.attr("src", "../img/x-icon.png")
        $searchbox.show();
    } else {
        $searchbutton.removeClass("changeSrc");
        $searchbutton.attr("src", "../img/search-icon.png")
        $searchbox.hide();
    }
});

/*********** RESPONSIVE ****************/

function h1Size() {
    var $bodyWidth = $("body").width() / 18 + "px";
    $("h1").css('fontSize', $bodyWidth);
}
$(window).on("resize", h1Size);
$(document).ready(h1Size);


/*********** Window Loading ****************/



function windowSizeEvent() {
    if ($(window).width() < 768) {
            $navicon.show();
            $nav.hide(); 
            $searchbutton.show();
            $searchbox.hide();
            $("#searchbox").addClass("mobile-searchbox");
            $("nav .form-inline button").addClass("mobile-searchbutton");
        } else {
            $nav.show();
            $navicon.hide();
            $nav.removeClass("nav-expanded");  
            $searchbutton.hide();
            $searchbox.show();
            $("#searchbox").removeClass("mobile-searchbox");
            $("nav .form-inline button").removeClass("mobile-searchbutton");
        }
}

$window.load(function() {
    windowSizeEvent();         
});

$window.ready(function(){
    windowSizeEvent(); 
}); 

/*********** Window Resize ****************/

$window.resize(function(){
        windowSizeEvent();
});

/*********** List Circles ****************/

var $circle = $(".circles li");
var $alphabetLink = $(".alphabet-links a");
var $placeLink = $(".alphabet-column li a");
var safeColors = ['00','33','66','99','cc','ff'];
var rand = function() {
    return Math.floor(Math.random()*6);
};
var randomColor = function() {
    var r = safeColors[rand()];
    var g = safeColors[rand()];
    var b = safeColors[rand()];
    return "#"+r+g+b;
};

var changeColor = function() {
    $circle.each(function() {
            $(this).css('background-color',randomColor());
        });
};

var initialColor = function() {
    $circle.each(function() {
            $(this).css('background-color','hsla(212, 87%, 52%, 1)');
        });
};


$alphabetLink.hover(function() {
  changeColor();
});

$placeLink.hover(function() {
  changeColor();
});

$alphabetLink.mouseout(function() {
  initialColor();
});

$placeLink.mouseout(function() {
  initialColor();
});

/**************** QUIZ APP ******************************/

function Question(text, choices, answer, imageSrc) {
  this.text = text;
  this.choices = choices;
  this.answer = answer;
  this.imageSrc = imageSrc;
}

Question.prototype.isCorrectAnswer = function(choice) {
  return this.answer === choice;
};

function Quiz(questions) {
  this.score = 0;
  this.questions = questions;
  this.currentQuestionIndex = 0;
}

Quiz.prototype.guess = function(answer) {
  if(this.getCurrentQuestion().isCorrectAnswer(answer)) {
    document.getElementById("revealAnswer").innerHTML = "Correct";
    document.getElementById("revealAnswer").style.fontWeight = "bold";
    document.getElementById("revealAnswer").style.color = "green";
    this.score++;
  } else {
    document.getElementById("revealAnswer").innerHTML = "Wrong";
    document.getElementById("revealAnswer").style.fontWeight = "bold";
    document.getElementById("revealAnswer").style.color = "red";
  }
  this.currentQuestionIndex++;
};

Quiz.prototype.getCurrentQuestion = function() {
  return this.questions[this.currentQuestionIndex];
};

Quiz.prototype.hasEnded = function() {
  return this.currentQuestionIndex >= this.questions.length;
}

//Create Questions
var questionSet = [
    new Question("True or False: Mount Rushmore features the heads of four US presidents: George Washington, Thomas Jefferson, Theodore Roosevelt and Donald Trump.<br>", ["True", "False"], "False", "../img/north-america/mount-rushmore.jpg"),
    new Question("Central Park is found in which city?<br>", ["New York City", "Mexico City"], "New York City", "../img/north-america/central-park.jpg"),
    new Question("True or False: Chichen Itza was built by the Maya people.<br>", ["True", "False"], "True", "../img/north-america/chichen-itza.jpg"),
    new Question("Pikes Peak was named after which American explorer?<br>", ["Zebulon Pike", "Rosamund Pike"], "Zebulon Pike", "../img/north-america/pikes-peak.jpg"),
    new Question("Manu del Desierto is found in which continent?<br>", ["North America", "South America"], "South America", "../img/south-america/mano-del-desierto.jpg"),
    new Question("Name the statue shown below: <br>", ["Christ the Redeemer Statue", "Statue of Liberty"], "Christ the Redeemer Statue", "../img/south-america/christ-redeemer.jpg"),
    new Question("The scientist who studied the species in Galapagos Island was?<br>", ["Albert Einstein", "Charles Darwin"], "Charles Darwin", "../img/south-america/galapagos.jpg"),
    new Question("The Serengeti National Park is found in which country?<br>", ["Romania", "Tanzania"], "Tanzania", "../img/africa/serengeti.jpg"),
    new Question("True or False: Mount Kilimanjaro has 5 volcanic cones.<br>", ["True", "False"], "False", "../img/africa/mount-kilimanjaro.jpg"),
    new Question("The Amphitheatre in Drakensberg is found in which country?<br>", ["South Africa", "Germany"], "South Africa", "../img/africa/amphitheatre-drakensberg.jpg"),
    new Question("Name the UNESCO World Heritage Site shown below: <br>", ["Great Zimbabwe Ruins", "Temple of Seti I"], "Great Zimbabwe Ruins", "../img/africa/great-zimbabwe.jpg"),
    new Question("Which statue is the oldest known one in Egypt?<br>", ["Axum Obelisk", "The Great Sphinx"], "The Great Sphinx", "../img/africa/great-sphinx.jpg"),
    new Question("Which of the following is Islam's most sacred mosque?<br>", ["Al-Masjid al-Haram", "Great Mosque of Samarra"], "Al-Masjid al-Haram", "../img/asia/Middle East/kaaba.jpg"),
    new Question("The Dome of the Rock is located in which city?<br>", ["Jerusalem", "Damascus"], "Jerusalem", "../img/asia/Middle East/dome-rock.jpg"),
    new Question("Name the megatall skyscraper shown below.<br>", ["Burj Khalifa", "Wiz Khalifa"], "Burj Khalifa", "../img/asia/Middle East/burj-khalifa.jpg"),
    new Question("Which lake did Jesus perform miracles according to the Bible?<br>", ["Lake Tahoe", "Sea of Galilee"], "Sea of Galilee", "../img/asia/Middle East/galilee-sea.jpg"),
    new Question("True or False: Palm Jumeirah is found in Abu Dhabi.<br>", ["True", "False"], "False", "../img/asia/Middle East/palm-jumeirah.jpg"),
    new Question("The statue shown below is named after which emperor?<br>", ["Genghis Khan", "Chaka Khan"], "Genghis Khan", "../img/asia/Central Asia/genghis-khan-statue.jpg"),
    new Question("Name the mausoleum that has been considered as the jewel of Muslim art in India.<br>", ["Akshardham", "Taj Mahal"], "Taj Mahal", "../img/asia/South Asia/taj-mahal.jpg"),
    new Question("The Elephanta Caves have rock sculptures dedicated to the Hindu god: <br>", ["Shiva", "Zeus"], "Shiva", "../img/asia/South Asia/elephanta-caves.jpg"),
];

//make array of questions:
var questions = [];

//remove duplicate questions:
function in_array(array, el) {
   for(var i = 0 ; i < array.length; i++) 
       if(array[i] == el) return true;
   return false;
}

//add unique questions to array:
function get_rand(array) { 
    var randomQuestion = array[Math.floor(Math.random()*array.length)];
    if(!in_array(questions, randomQuestion)) {
       questions.push(randomQuestion);
    }   
}

//make 10 unique questions:
while (questions.length < 10) {
    get_rand(questionSet);
}


//Create Quiz
var quiz = new Quiz(questions);



var QuizUI = {
  
  displayNext: function() {
    if(quiz.hasEnded()) {
      this.displayScore();

    } else {
      this.displayQuestion();
      this.displayChoices();
      this.displayProgress();
      this.nextHandler();
      hideNext();
      hideAnswer(); 
    }
  },
  
  displayQuestion: function() {
    this.populateIdWithHTML("question", quiz.getCurrentQuestion().text);
    this.addSrc("question", quiz.getCurrentQuestion().imageSrc);
  },
  
  displayChoices: function() {
    var choices = quiz.getCurrentQuestion().choices;
    
    for(var i = 0; i < choices.length; i++) {
      this.populateIdWithHTML("choice" + i, choices[i]);
      this.guessHandler("choice" + i, choices[i]);
    }
  },
  
  displayScore: function() {
    var gameOverHTML = "";
    gameOverHTML += "<h2>Game Over!<br>Your score is: " + quiz.score + ".</h2>";
    if (quiz.score === questions.length) {
        gameOverHTML += "<br><b>You got a perfect score. You are awesome!</b>";
    } else {
        gameOverHTML += "<br><b>Good try. Just a little bit more reading.</b>";
    }
    gameOverHTML += "<br><br><br><button><a href='quiz.html'>Try Again</a></button>";
    this.populateIdWithHTML("quiz", gameOverHTML);
    
  },
  
  populateIdWithHTML: function(id, text) {
    var element = document.getElementById(id);
    element.innerHTML = text;
  },

  addSrc: function(id, imageSrc) {
      var element = document.getElementById(id);
      var imageHTML = document.createElement("img");
      imageHTML.src = imageSrc;
      
      if(window.innerWidth < 768) {
        imageHTML.style.height = '200px';
        imageHTML.style.width = '250px';
      } else {
        imageHTML.style.height = '300px';
        imageHTML.style.width = '400px'; 
      }

      imageHTML.style.marginTop = '50px';
      element.appendChild(imageHTML);
  },
  
  guessHandler: function(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
      quiz.guess(guess);
        showAnswer();
        showNext();
    }
  },
  
  displayProgress: function() {
    var currentQuestionNumber = quiz.currentQuestionIndex + 1;
    this.populateIdWithHTML("progress", "Question " + currentQuestionNumber + " of " + quiz.questions.length);
  },
    
    nextHandler: function() {
        var nextButton = document.getElementById("nextButton");
        nextButton.onclick = function() {
            QuizUI.displayNext();
        }
    }
  
};


hideQuiz();

function hideQuiz() {
    document.getElementById("quizContent").style.display = 'none';
}
function showQuiz() {
    document.getElementById("quizContent").style.display = 'block';
}
function hidetryAgain() {
    document.getElementById("tryAgain").style.display = 'none';
}
function showtryAgain() {
    document.getElementById("tryAgain").style.display = 'block';
}
function hideAnswer() {
    document.getElementById("revealAnswer").style.display = 'none';
}
function showAnswer() {
    document.getElementById("revealAnswer").style.display = 'block';
}
function hideNext() {
    document.getElementById("nextButton").style.display = 'none';
}
function showNext() {
    document.getElementById("nextButton").style.display = 'block';
}



var quizStartButton = document.getElementById("quizStartButton");

quizStartButton.onclick = function() {
    document.getElementById("quizIntro").style.display = 'none';
    showQuiz();
    QuizUI.displayNext();
}


/********************** quiz app end **********************************/





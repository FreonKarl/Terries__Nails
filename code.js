//Variable definitions and declarations:
var hamMenu = document.querySelector("#hamburger-menu");
var menuBox = document.querySelector("#menu-box");
var menuBoxContents = document.querySelectorAll("#menu-box li");
var body = document.querySelector("body");
var bodyIsClicked = false;
var menuBoxIsClicked = false;
var hamMenuIsClicked = false;
var menuBoxContentsAreClicked = false;




//Function definitions:

//animates appearance of the menuBox
function bringMenuBox(){
    //make menuBox opacity zero
    menuBox.style.opacity = "0";

    //set menuBox display to block
    menuBox.style.display = "block";

    //gradually increase opacity to maximum
    opacityInterval = setInterval(function(){
        opacity = getComputedStyle(menuBox).getPropertyValue("opacity");
        opacity = parseFloat(opacity);
        opacity += 0.1;
        menuBox.style.opacity = String(opacity);
        //stop opacity increase at maximum opacity
        if(opacity >= 1){
            clearInterval(opacityInterval);
        }
    }, 100)
}

//animates disappearance of the menuBox
function removeMenuBox(){
    var menuBoxLeft = getComputedStyle(menuBox).getPropertyValue("left")
    var menuBoxWidth = getComputedStyle(menuBox).getPropertyValue("width");

    //converting width and left values to floats
    menuBoxWidth = parseFloat(menuBoxWidth)
    menuBoxLeft = parseFloat(menuBoxLeft)

    //storing original position and size of menuBox
    var menuBoxOriginalLeft = menuBoxLeft
    var menuBoxOriginalWidth = menuBoxWidth
    //slide menuBox to the right until it disappears
    var intervalId = setInterval(function() {
        menuBoxWidth -=10
        menuBoxLeft += 10;
        menuBox.style.width = menuBoxWidth + "px"
        menuBox.style.left = menuBoxLeft + "px";
        if(menuBoxWidth <= 0){
            clearInterval(intervalId);

            //restores menuBox original position after disappearance
            menuBox.style.display = "none";
            menuBox.style.width = menuBoxOriginalWidth + "px"
            menuBox.style.left = menuBoxOriginalLeft + "px";
        }

    }, 10);
    
}

//controls the display of menuBox by
//hamMenu clicks, clicks outside the
//menuBox and hamMenuContents clicks
function menuBoxDisplayOnClicks(){

    //for clicks outside menuBox,turn off display
    //and enable scrolling
    if(!menuBoxIsClicked && !hamMenuIsClicked){
    removeMenuBox()
    //if scrolling is disabled, enable it
    if(body.classList.contains("no-scroll")){
        body.classList.remove("no-scroll");
    }
     
    }  
    
    //for clicks on hamMenu, toggle menuBox display
    if(hamMenuIsClicked){
        if(menuBox.style.display == "none"){
            //menuBox.style.display = "block";
            bringMenuBox();
        }
        else{
            removeMenuBox();
            //enable scrolling if disabled
            if(body.classList.contains("no-scroll")){
                body.classList.remove("no-scroll")
            }
        }
    }
    
    //for menuBoxContents click, turn off menuBox display
    if(menuBoxContentsAreClicked){
        removeMenuBox();
        //enable scrolling if disabled
        if(body.classList.contains("no-scroll")){
            body.classList.remove("no-scroll")
        }
    }
    
    hamMenuIsClicked = false;
    bodyIsClicked = false;
    menuBoxIsClicked = false;
    menuBoxContentsAreClicked = false;
}

//Give values to the "...IsClicked" and
//"...AreClicked" variables
function hamMenuClickEvaluator(){
    hamMenuIsClicked = true;
}

function bodyClickEvaluator(){
    bodyIsClicked = true;
}

function menuBoxClickEvaluator(){
    menuBoxIsClicked =true;
}

function menuBoxContentsClickEvaluator(){
    menuBoxContentsAreClicked = true;
}

//prevents scrolls when menuBox is displayed 
function scrollControl(){
    //if menuBox is displayed
    if(getComputedStyle(menuBox).getPropertyValue("display") != "none"){
        //disable scrolling
        body.classList.add("no-scroll")
        console.log("here")
    }
}


//Event listeners:

hamMenu.addEventListener("click", hamMenuClickEvaluator);

for(var i = 0; i < menuBoxContents.length; i++){
    menuBoxContents[i].addEventListener("click", menuBoxContentsClickEvaluator);
}

body.addEventListener("click", bodyClickEvaluator);
body.addEventListener("click", menuBoxDisplayOnClicks);
document.addEventListener("scroll", scrollControl);

menuBox.addEventListener("click", menuBoxClickEvaluator);




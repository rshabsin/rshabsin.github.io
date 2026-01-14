
function newWin(winName, urlLoc, x, y, w, h, s) 
{ 
  _info = "toolbar=no";
  _info += ",location=no";
  _info += ",directories=no";
  _info += ",status=no";
  _info += ",menubar=no";
  _info += ",scrollbars=" + s;
  _info += ",resizable=no";
  _info += ",left=" + x;
  _info += ",top=" + y; 
  _info += ",width=" + w;
  _info += ",height=" + h;
  DispWin=window.open(urlLoc, winName, _info).window.focus()
} 

var urlPrefix = "images/";
var thumbnailUrlSuffix = "-tn.jpg";
var largeImageSuffix = ".jpg";

function Image (url, caption, missingThumbnail) {
  this.url = url;
  this.caption = caption;
  if (missingThumbnail) {
    this.missingThumbnail = true;
  }
}
  
function displayLink (url)
  {
  if (url.indexOf("images/") >= 0)  // replaces displayAbsoluteLink below. 12/11/25
    document.images.slide.src = url;
  else
    document.images.slide.src = urlPrefix + url + largeImageSuffix;

  document.getElementById("supplementalBackLink").style.visibility = "visible";
  }
  
function displayAbsoluteLink (url)
  {
  document.images.slide.src = url;
  document.getElementById("supplementalBackLink").style.visibility = "visible";
  }
  
var whichImage = 0;
var cells = 5;  // number of thumbnails along the bottom
var highlightedImage = Math.floor(cells/2);

function goTo(offset) {
  slideTo(whichImage + offset);
}
  
function slideImage(right) {
  if (right) slideTo(whichImage + 1);
  else slideTo(whichImage - 1);
}

function slideTo(newImageIndex) {
  if (newImageIndex < 0) {
    whichImage = 0;
    return;
  }

  if ((newImageIndex >= images.length) && (newImageIndex != 999)){  // added the && (newImageIndex != 999) to allow 999 to go to the end
    whichImage = images.length - 1;;
    return;
  }
    
  if (newImageIndex == 999)             // added to allow 999 to go to the end
    newImageIndex = images.length - 1; 

  whichImage = newImageIndex;

  if (0 == whichImage)                 
    document.getElementById('left').style.visibility = 'hidden';
  else 
    document.getElementById('left').style.visibility = 'visible';

  if (images.length - 1 == whichImage)       
    document.getElementById('right').style.visibility = 'hidden';
  else 
    document.getElementById('right').style.visibility = 'visible';
 
  for (var i = 0; i < cells; i++) {
    var offset = i - highlightedImage;
    var index = whichImage + offset;
    var img = document.getElementsByClassName("thumbnailImage")[i];
    if (index > -1 && index < images.length) {
      var image = images[index];
      var suffix = thumbnailUrlSuffix;
      if (image.missingThumbnail) {
        suffix = largeImageSuffix;
      }
      img.src = urlPrefix + image.url + suffix;
      img.className = "thumbnailImage";
      img.title = stripHtml(image.caption); 
		      
    } else {
      img.src = "";
      img.className = "thumbnailImage hiddenImageSlot";
    }
  }
			      
  document.getElementById("supplementalBackLink").style.visibility = "hidden";
  document.images.slide.src = urlPrefix + images[whichImage].url + largeImageSuffix;
  var textContainer = document.getElementById("text");
  textContainer.innerHTML = images[whichImage].caption;
//  document.images.slide.title = textContainer.innerText;  // this line displays the text when the main image is hovered  
                                                            // over, which I (Rick) don't like, hence, it's commented out
															// 7/6/24
  return;
}
			      
function displayMainImage() { // allows double-clicking main image to display it in a new tab.
//  var image = urlPrefix + images[whichImage].url + largeImageSuffix;
  var image = document.images.slide.src; // use this in case a linked image 
                                         // is being displayed in the main image window
  window.open(image,'_blank');
}

function stripHtml(html) {
  var tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}
			     
			      
function init() {
  slideTo(0);
}

function processKeyInput(e) {
  if (e.keyCode == '37') {
    slideImage(false);
  } else if (e.keyCode == '39') {
    slideImage(true);
  }
}

// added 1/19/2020 so userAgent regex can be updated for all using apps
function checkAgent(url)  // from https://stackoverflow.com/questions/6666907/how-to-detect-a-mobile-device-with-javascript and 
                          // https://stackoverflow.com/questions/7561315/alternative-to-body-onload-init. With this, onload=init() 
                          // is still needed despite the fact that there is no init() function (and it apparently MUST be called
                          // init().)
  { 
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|Mobile|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) 
    {
    document.location.href = url;
    }
  } 
  
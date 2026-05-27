
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

function imageWindow(windowName, urlLoc, width = 800, height = 600) // implemented 1/16/24 
  { 
  newWin(windowName, urlLoc, ((Math.round(window.screen.width / 2)) - (Math.round(width / 2))),
                             (((Math.round(window.screen.height / 2)) - (Math.round(height / 2)) - 40)), width, height, 1);
  } 

function videoWindow(windowName, urlLoc, width = 800, height = 600) // some pages used this instead of image window
  { 
  newWin(windowName, urlLoc, ((Math.round(window.screen.width / 2)) - (Math.round(width / 2))),
                             (((Math.round(window.screen.height / 2)) - (Math.round(height / 2)) - 40)), width, height, 1);
  } 
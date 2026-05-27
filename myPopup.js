// needed for popup-new.css
// <div class="popup" onmouseover="myPopup('myPopupx')" onmouseout="myPopup('myPopupx')";><sup><font size=-1"
//   color=green>note</font></sup><span class="popuptext" id="myPopupx">popup text</span></div>
function myPopup(popupid) 
  {
  var popup = document.getElementById(popupid);
  popup.classList.toggle("show");
  }
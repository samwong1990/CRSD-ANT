/* This is the compatibility layer between elm and CRSD.
 * My code will be in elm-lang, and reuse CRSD code through ports (see ports in elm)
 */
var adapter = Elm.worker(Elm.Adapter, { input: "" });

function triggerKeyboardEvent(el, keyCode)
{
  var eventObj = document.createEventObject ?
      document.createEventObject() : document.createEvent("Events");

  if(eventObj.initEvent){
    eventObj.initEvent("keydown", true, true);
  }

  eventObj.keyCode = keyCode;
  eventObj.which = keyCode;

  el.dispatchEvent ? el.dispatchEvent(eventObj) : el.fireEvent("onkeydown", eventObj);

}

adapter.ports.triggerEvent.subscribe(function(eventName) {
    switch (eventName) {
        case "sendLeftKeyDown":
            triggerKeyboardEvent(document, 37);
            console.log("leftKeyDown");
            break;
        case "sendRightKeyDown":
            triggerKeyboardEvent(document.body, 39);
            console.log("rightKeyDown");
            break;
        default:
            console.log("huh?");
    }
});

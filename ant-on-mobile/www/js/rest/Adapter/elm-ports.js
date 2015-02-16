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

function getPastTrials(){
    return pastTrials = JSON.parse(window.localStorage.getItem("pastTrials")) || [];
}

function appendTrial(trial){
    trial.createdAt = (new Date()).toISOString();
    var pastTrials = getPastTrials();
    pastTrials.push(trial);
    window.localStorage.setItem("pastTrials", JSON.stringify(pastTrials));
}

function saveTrial(setupData, data){
    var summary = generateSummary(setupData,data);
    var rawData = generateData(setupData,data);
    var trial = {
        summary: summary,
        rawData: rawData
    };
    appendTrial(trial);
}

function emailTrial(){
    var trials = getPastTrials();
    var attachments = [];
    for(var i=0; i<trials.length; i++) {
        var trial = trials[i];
        var filename = trial.createdAt;

        function tob64(str){
            var aMyUTF8Input = strToUTF8Arr(str);
            var sMyBase64 = base64EncArr(aMyUTF8Input);
            return sMyBase64;
        }

        var base64encodedSummary = "base64:" + filename + " summary.csv//" + tob64(dataCSV(trial.summary, '\n'));
        attachments.push(base64encodedSummary);
        var base64encodedRaw = "base64:" + filename + " raw.csv//" + tob64(dataCSV(trial.rawData, '\n'));
        attachments.push(base64encodedRaw);
    };
    window.plugin.email.open({
        to:          ['s@mwong.hk'], // contains all the email addresses for TO field
        cc:          [], // contains all the email addresses for CC field
        bcc:         [], // contains all the email addresses for BCC field
        attachments: attachments, // contains all full paths to the files you want to attach
        subject:    'ant trial data', // represents the subject of the email
        body:       'ant trial data attached as csv files', // represents the email body (could be HTML code, in this case set isHtml to true)
        isHtml:    false // indicats if the body is HTML or plain text
    });
    console.log("email should open. attached " + JSON.stringify(attachments));
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
        case "sendEscKeyDown":
            triggerKeyboardEvent(document.body, 27);
            console.log("rightKeyDown");
            break;
        default:
            console.log("huh?");
    }
});

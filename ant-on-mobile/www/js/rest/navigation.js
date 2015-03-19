var softwareVersion = '0.1';

var id;
var age;
var gender;
var sessionNumber;
var studyID;
var targetType;
var monitorSize;

var ppi;
var frameWidth;
var frameHeight;
var frameMarginHeight;
var targetWidth;
var targetHeight;
var spacing;

var viewStack = [];

var setupData = [];
var resultsData = [];
var testBlock = 0;

var dataSource = {};

function getInputData() {
	id = document.getElementById('ID').value;
	age = document.getElementById('age').value;
	for (var i=0; i < document.form.gender.length; i++) {
	   if (document.form.gender[i].checked) {
	      gender = document.form.gender[i].value;
	   }
	}
	sessionNumber = document.getElementById('sessionNumber').value;
	studyID = document.getElementById('studyID').value;
	groupID = document.getElementById('groupID').value;
	targetType = document.getElementById('targetType').value;
	monitorSize = document.getElementById('monitorSize').value;
    var numberOfTests = document.getElementById('numberOfTests').value;
    var numberOfQuestions = document.getElementById('numberOfQuestions').value;
    dataSource.getNumberOfTests = function(){
        return numberOfTests;
    };
    dataSource.getNumberOfQuestions = function(){
        return numberOfQuestions;
    };
	ppi = calculatePPI();
	setupData = [id, age, gender, sessionNumber, studyID, groupID, targetType, new Date(), 'endDate', monitorSize, ppi];
	setupDisplay();
    document.getElementById("numberOfTestBlocks").innerHTML = dataSource.getNumberOfTests();
}

function calculatePPI() {
	screenWidth = screen.width;
	screenHeight = screen.height;
	aspectRatio = screenWidth/screenHeight;
	return ((screenWidth/(monitorSize))*(Math.sqrt(1 + (1/(aspectRatio*aspectRatio)))));
}

function submitForm() {
	getInputData();
	pushView('instructionPage1');	
}

function pushView(viewID) {
	if (viewStack.length > 0) {
        viewStack[viewStack.length - 1].style.visibility = "hidden";
        $(viewStack[viewStack.length - 1]).removeClass('show');
        viewStack[viewStack.length - 1].className += viewStack[viewStack.length - 1].className ? ' hidden' : 'hidden';
    }
	view = document.getElementById(viewID);
	view.style.visibility = "visible";
    view.className += view.className ? ' show' : 'show';
    $(view).removeClass('hidden');
	viewStack.push(view);
}

function popView() {
    var lastview = viewStack.pop();
	lastview.style.visibility = "hidden";
    $(lastview).removeClass('show');
    lastview.className += lastview.className ? ' hidden' : 'hidden';

    viewStack[viewStack.length - 1].style.visibility = "visible";
    $(viewStack[viewStack.length - 1]).removeClass('hidden');
    viewStack[viewStack.length - 1].className += viewStack[viewStack.length - 1].className ? ' show' : 'show';

}

function areYouReady() {
	document.getElementById('attribution').style.visibility = 'hidden';
	if(confirm('Are you ready to begin?')) {
		document.getElementById('practiceFeedbackUP').style.visibility='visible';
		document.getElementById('practiceFeedbackDOWN').style.visibility='visible';
		startTest(testBlock, trialSet());
	}
}

function testCallback(block, data) {
    console.log(" dataSource.getNumberOfTests()=" + dataSource.getNumberOfTests() + "testCallback testBlock=" + testBlock);
	resultsData[block] = data;
	document.getElementById('practiceFeedbackUP').style.visibility='hidden';
	document.getElementById('practiceFeedbackDOWN').style.visibility='hidden';
	if (testBlock < dataSource.getNumberOfTests()) {
        console.log("testCallback case 0");
		testBlock++;
        console.log("testBlock="+testBlock+", testBlock%2="+(testBlock%2));
		if (testBlock>0){ // Cheap trick to avoid prompting for practice round
            console.log("testCallback case 1");
            alert('Are you ready to start Test#' + testBlock + '?');
        }
		startTest(testBlock, trialSet());
	} else {
        console.log("case 2");
		popView();
        // record trial automatically.
        saveTrial(setupData, resultsData);
		pushView('exportPage');
		generateExportLink(resultsData);
		testBlock = 0;
	}
}
'use strict';

describe('persist test results', function() {
    beforeEach(function(){
        window.localStorage.clear();
    });
    it('should be empty at first', function() {
        expect(window.localStorage.length).toEqual(0);
    });
    it('should return empty list at first', function() {
        expect(getPastTrials()).toEqual([]);
    });

    it('should add new trial', function(){
        var trialData = {
            summary: "summary data",
            rawData: "raw data"
        };
        appendTrial(trialData);
        expect(getPastTrials()).toContain(jasmine.objectContaining(trialData));
        expect(getPastTrials().length).toBe(1);
        expect(getPastTrials()[0].createdAt).toBeDefined();
    });

    it('should be able to add many new trials', function(){
        for(var i=0; i<=100; i++){
            var trialData = {
                summary: "summary data" + i,
                rawData: "raw data" + i
            };
            appendTrial(trialData);
            var pastTrials = getPastTrials();
            expect(pastTrials).toContain(jasmine.objectContaining(trialData));
            expect(pastTrials.length).toBe(i+1);
            expect(pastTrials[i].createdAt).toBeDefined();
        }
    });

    it('should save some data when the save trial button is clicked', function(){
        var sampleTrialData = [[[4,"incongruent","DOWN","DOWN","R","L",409,426,39,null,"2015-02-12T01:58:40.291Z","2015-02-12T01:58:41.204Z"],[1,"congruent","UP",0,"L","L",960,72,39,null,"2015-02-12T01:58:43.792Z","2015-02-12T01:58:45.256Z"],[4,"congruent","UP","UP","L","L",497,331,39,null,"2015-02-12T01:58:47.294Z","2015-02-12T01:58:48.295Z"],[3,"incongruent","UP",0,"R","L",768,196,39,null,"2015-02-12T01:58:50.796Z","2015-02-12T01:58:52.069Z"]],[[4,"incongruent","DOWN","DOWN","R","L",812,193,39,1,"2015-02-12T01:58:55.267Z","2015-02-12T01:58:56.584Z"],[3,"incongruent","DOWN",0,"L","R",551,212,39,0,"2015-02-12T01:58:58.768Z","2015-02-12T01:58:59.824Z"],[4,"congruent","UP","UP","R","R",748,213,39,1,"2015-02-12T01:59:02.270Z","2015-02-12T01:59:03.523Z"]]];
        var sampleSetupData = ["userinputid","123","M","userinputsessionid","userinputstudyid","userinputgroupid","Arrow","2015-02-12T01:58:38.281Z","2015-02-12T01:59:05.060Z","17",99.88921198648168];
        saveTrial(sampleSetupData, sampleTrialData);
        expect(getPastTrials().length).toBe(1);
        expect(getPastTrials()[0].createdAt).toBeDefined();
    });
});

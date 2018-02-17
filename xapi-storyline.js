///Roland Barrera
///roland@thirdstring.com
///https://github.com/rolandbarrera/xAPI-Storyline




/// SCORM GET USER NAME AND Studen ID ///

// var player = GetPlayer();
// var myName  = lmsAPI.GetStudentName();
// var array  = myName.split(',');
// var newName = array[1] + ' ' + array[0];
// player.SetVar("newName", newName);
// var studentID  = lmsAPI.GetStudentID();
// player.SetVar("studentID", studentID);

/// END SCORM GET USER NAME AND Studen ID ///


/// Send xAPI Statement ///
function sendStatements(verb, verbIRI, objectIRI) {
    var lrs
try {
    lrs = new TinCan.LRS(
  {
            endpoint: player.GetVar("lrsendPoint"), 
            username: player.GetVar("lrsuserName"),
            password: player.GetVar("lrspassWord"),
            allowFail: false
        }
    );
}
catch (ex) {
    console.log("Failed to setup LRS object: " + ex);
    // TODO: do something with error, can't communicate with LRS
}
var statement = new TinCan.Statement(
    {
    "actor": {
        "name": player.GetVar("newName"),
        "mbox": 'mailto:'+player.GetVar("emailAddress"),
        "account": {
                "name": player.GetVar("studentID"),
                "homePage": "https://yoursite.com"
        },
        "objectType": "Agent"
    },
    "verb": {
        "id": verbIRI,
        "display": {
            "en-US": verb
        }
    },
     "object": {
        "id": objectIRI,
        "definition": {
            "name": {
                "en-US": player.GetVar("objectName"),
            },
            "type": "http://adlnet.gov/expapi/activities/module"
        },
        "objectType": "Activity"
    }
}
);
lrs.saveStatement(
    statement,
    {
        callback: function (err, xhr) {
            if (err !== null) {
                if (xhr !== null) {
                    console.log("Failed to save statement: " + xhr.responseText + " (" + xhr.status + ")");
                    return;
                }
                console.log("Failed to save statement: " + err);
                return;
            }
            console.log("Statement saved");
        }
    }
);
}
/// END Send xAPI Statement ///

/// Recieve xAPI Statement ///

function getStatements(verbIRI) {
    var tincan = new  TinCan({
    recordStores: [{
            endpoint: player.GetVar("lrsendPoint"), 
            username: player.GetVar("lrsuserName"),
            password: player.GetVar("lrspassWord"),
            allowFail: false
        }]
});
var container =  document.getElementById('response');
var user = new TinCan.Agent({'mbox' : 'mailto:'+player.GetVar("emailAddress"),})

tincan.getStatements({
    //sendActor: true,
    'params' : {
        'agent' : user,
        'limit' : 20,
        'verb' : {
            'id' : verbIRI
        } 
    },
    'callback': function (err, result) {
        if (result.statements.length > 0) {
            statementFound = true;
            console.log("found");
        }
        var retrievedStatements = (parseMyData(result));
        player.SetVar("retrievedStatements", retrievedStatements);  
    }
});
parseMyData = function(result) {
            var statements = result.statements;
            var output = '';
            var name,verb,mbox,id;
            for(var i=0;i<statements.length;i++){
                // check the statement for a usable name value
                // (priority = actor.name, actor.mbox, actor.account.name)
                if(statements[i].actor.name != null && statements[i].actor.name != "") {
                    name = statements[i].actor.name
                }
                // check the statement for a usable verb value
                // (priority = verb.display['en-US'], verb.id)
                try{
                    verb = statements[i].verb.display['en-US'];
                }catch(e){
                    verb = statements[i].verb.id;
                }
                // check the activity for a usable value
                // (priority = definition.name['en-US'], id)
                try{
                    mbox = statements[i].actor.mbox;
                }catch(e){
                    mbox = statements[i].actor.mbox;
                }
                try{
                    id = statements[i].id;
                }catch(e){
                    id = statements[i].id;
                }
                output +=   name + ' -- ' + verb + ' -- ' + 
                            mbox + ' -- '+ id +' <br> '
                           
            }
            return output;
        }
}
/// END Recieve xAPI Statement ///
/**
* Draper activityLogger
*
* The purpose of this module is allow XDATA Developers to easily add a logging
* mechanism into their own modules for the purposes of recording the behaviors
* of the analysists using their tools.
*
* @author Draper Laboratory
* @date 2014
*/
function activityLogger() {	
  var draperLog = {version: "0.1.0"}; // semver

  var muteUserActivityLogging = false;
  var muteSystemActivityLogging = false;
  var logToConsole = false;
  var testing = false;
  var workflowCodingVersion = '1.0'

  /**
  * Workflow Codes
  */
	draperLog.WF_OTHER       = 0;
	draperLog.WF_PLAN        = 1;
	draperLog.WF_SEARCH      = 2;
	draperLog.WF_EXAMINE     = 3;
	draperLog.WF_MARSHAL     = 4;
	draperLog.WF_REASON      = 5;
	draperLog.WF_COLLABORATE = 6;
	draperLog.WF_REPORT      = 7;
	

	/**
	* Registers this component with Draper's logging server.  The server creates
	* a unique session_id, that is then used in subsequent logging messages.  This 
	* is a blocking ajax call to ensure logged messages are tagged correctly.
	* @todo investigate the use of promises, instead of the blocking call.
	*
	* @method registerActivityLogger
	* @param {String} url the url of Draper's Logging Server
	* @param {String} componentName the name of this component
	* @param {String} componentVersion the version of this component
	*/
	draperLog.registerActivityLogger = function(url, componentName, componentVersion) {

		draperLog.url = url;
		draperLog.componentName = componentName;
		draperLog.componentVersion = componentVersion;

		if (!testing) {
			$.ajax({
				url: draperLog.url + '/register',
				async: false,
				dataType: 'json',
				success: function(a) {
					if (logToConsole) {
						console.log('DRAPER LOG: Session successfully registered', a);
					}
					draperLog.sessionID = a.session_id;
					draperLog.clientHostname = a.client_ip;
				},
				error: function(){
					console.error('DRAPER LOG: Could not register session with Drapers server!')
				}
			});
		} else {

			if (logToConsole) {
				console.log('DRAPER LOG: (TESTING) Session successfully registered');
			}
			draperLog.sessionID = 'test_session'
			draperLog.clientHostname = 'test_client';
		}

		classListener();

		return draperLog;
	}

	/**
	* Create USER activity message.   
	*
	* @method logUserActivity
	* @param {String} actionDescription a description of the activity in natural language.
	* @param {String} userActivity a more generalized one word description of the current activity. 
	* @param {Integer} userWorkflowState an integer representing one of the enumerated states above.
	* @param {JSON} softwareMetadata any arbitrary JSON that may support this activity
	*/
	draperLog.logUserActivity = function (actionDescription, userActivity, userWorkflowState, softwareMetadata) {	    

	    if(!muteUserActivityLogging) {
	    	msg = {
	    		type: 'USERACTION',
	    		parms: {
	    			desc: actionDescription,
						activity: userActivity,
						wf_state: userWorkflowState,
						wf_version: workflowCodingVersion 
	    		},
	    		meta: softwareMetadata
	    	}
	    	sendMessage(msg);         
	    }
	}

	/**
	* Create SYSTEM activity message.  
	*
	* @method logSystemActivity
	* @param {String} actionDescription a description of the activity in natural language.
	* @param {JSON} softwareMetadata any arbitrary JSON that may support this activity
	*/
	draperLog.logSystemActivity = function (actionDescription, softwareMetadata) {	    
               
	    if(!muteSystemActivityLogging) {
	    	msg = {
	    		type: 'SYSACTION',
	    		parms: {
	    			desc: actionDescription,	          
	    		},
	    		meta: softwareMetadata
	    	}
	    	sendMessage(msg);         
	    }
	}

	/**
	* Set Session Cookie on Client. NOT YET IMPLEMENTED.
	*/
	function setCookie(cname,cvalue,exdays)	{
		var d = new Date();
		d.setTime(d.getTime()+(exdays*24*60*60*1000));
		var expires = "expires="+d.toGMTString();
		document.cookie = cname + "=" + cvalue + "; " + expires;
	}

	/**
	* Send activity message to Draper's logging server.  This function uses Jquery's ajax
	* function to send the created message to draper's server.  
	*
	* @method sendMessage
	* @param {JSON} msg the JSON message.
	*/
	function sendMessage(msg) {
		msg.timestamp = new Date().toJSON();
		msg.client = draperLog.clientHostname;
		msg.component = {name: draperLog.componentName, version: draperLog.componentVersion};
		msg.sessionID = draperLog.sessionID;
		msg.impLanguage = 'JavaScript';
		msg.apiVersion = draperLog.version;

		if (logToConsole) {
			console.log('DRAPER LOG: Sending message to Draper server', msg);
		}
		if (!testing) {
			$.ajax({
				url: draperLog.url + '/send_log',
				type: 'POST',
				dataType: 'json',
				data: msg,
				success: function(a) {
					if (logToConsole) {
						console.log('DRAPER LOG: message received!');
					}
				},
				error: function(){
					console.error('DRAPER LOG: could not send activity log to Draper server!')
				}
			});
		} else {
			if (logToConsole) {
				console.log('DRAPER LOG: (TESTING) message received!');
			}
		}
	}

	/**
	* When set to true, logs messages to browser console.
	*
	* @method echo
	* @param {Boolean} set to true to log to console
	*/
	draperLog.echo = function(d) {
    if (!arguments.length) return logToConsole;
    logToConsole = d;
    return draperLog;
  };

  /**
	* Accepts an array of Strings telling logger to mute those type of messages.
	* Possible values are 'SYS' and 'USER'.  These messages will not be sent to
	* server. 
	*
	* @method mute
	* @param {Array} array of strings of messages to mute.
	*/
  draperLog.mute = function(d) {
  	d.forEach(function(d) {
  		if(d == 'USER') muteUserActivityLogging = true;
  		if(d == 'SYS') muteSystemActivityLogging = true;
  	});  	
    return draperLog;
  };

  /**
	* When set to true, no connection will be made against logging server.
	*
	* @method testing
	* @param {Boolean} set to true to disable all connection to logging server
	*/
  draperLog.testing = function(d) {
  	if (!arguments.length) return testing;
    testing = d;
    return draperLog;
  };   

	return draperLog;
}
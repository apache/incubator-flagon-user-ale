---
layout: base
title: Creating pages
prev_section: drafts
next_section: variables
permalink: /restful_api/
---
<h1 class="page-header">RESTful API</h1>

<!-- <div class="row">
  <div class="col-md-12 navbar-example">
    <ul class="nav nav-pills">
      <li><a href="#json">RESTful API</a></li>
      <li><a href="#json">JSON</a></li>
    </ul>
  </div>
</div> -->
<p>
  This section describes the REST interface so that a developer may develop custom messages to POST to the logging server.  Libraries have already been developed in JavaScript and handle the creation and sending of these messages.  These helper libraries can be found on Github <a href="https://github.com/draperlaboratory/User-ALE/tree/master/helper-libs">here</a>
</p>

<div class="alert alert-info" role="alert">
 A client tool that wishes to use the User-ALE library requires the use of a running logging server. Please contact the Draper team for the URL of this server.
</div>

<p>
  Currently, there is one endpoint, <code>/send_msg</code>, that accepts JSON messages via an HTTP POST request method.  The API expects to receive either a User Action or a System Action, each of which are described in more detail below.
</p>

<h4>User Action</h4>

<div class="step" style="margin-left: 20px;">
  <p>A user action message attempts to describe the activity the User was meaning to perform.  This activity is described at 3 levels of specificity:
    <ul>
      <li><b>Activity Description:</b> this a natural language description of the activity being performed and provides the most specific description of what the user was doing.</li>
      <li><b>Activity Code:</b> this is a coded description of the activity and attempts to summarize the action into a 1-4 word code that can ideally be generalized across various tools.</li>
      <li><b>Activity Workflow Code:</b> this is the least specific description of the activity and is used to provided meaningful correlations across various tools.
      </li>
    </ul>
  </p>

  <p>
    Activities should fall into 1 of 6 model based activity workflow states, each of which are described in more detail at the following links:
    <ul class="wfCodes">
      <li class="badge wf_define light"><a href="define.html">Define Problem</a></li>
      <li class="badge wf_getdata light"><a href="getdata.html">Get Data</a></li>
      <li class="badge wf_explore light"><a href="explore.html">Explore</a></li>
      <li class="badge wf_create light"><a href="create.html">Create View</a></li>
      <li class="badge wf_enrich light"><a href="enrich.html">Enrich Data</a></li>
      <li class="badge wf_transform light"><a href="transform.html">Transform Data</a></li>
      <li class="badge wf_other light"><a href="other.html">Other</a></li>
    </ul>
  </p>

  <h5>Example JSON Message</h5>
  {% highlight json %}
{
  "type" : "USERACTION",
  "parms" : {
    "desc" : "National Average added to Chart",
    "activity" : "summerizeData",
    "wf_state" : "4",
    "wf_version" : "1.0"
  },
  "timestamp" : "2014-01-23T16:13:52.503Z",
  "client" : "172.16.3.43",
  "component" : {
  "name" : "KitwareHospitalCosts",
  "version" : "0.1"
  },
  "sessionID" : "52e13fadf361151349000002",
  "impLanguage" : "JavaScript",
  "apiVersion" : "0.2.0"
}
  {% endhighlight %}
</div>

<h4 id="sys-action">System Action</h4>

<div class="step" style="margin-left: 20px;">
  <p>A system action message attempts to describe actions that were being performed by the system, either independently of the user, or as a cascading effect of past user actions. The system action message only requires a description, but may need more structure in future implementations.
  </p>

  <h5>Example JSON Message</h5>
    {% highlight json %}
{
  "type" : "SYSACTION",
  "parms" : {
    "desc" : "Kitware Twitter Browsing - updateGraph executed"
  },
  "timestamp" : "2014-02-21T16:21:43.151Z",
  "client" : "172.16.3.43",
  "component" : {
    "name" : "Kitware_Twitter_Browsing",
    "version" : "0.1"
  },
  "sessionID" : "53077d2f22c173f256000027",
  "impLanguage" : "JavaScript",
  "apiVersion" : "0.2.0"
}
  {% endhighlight %}
</div>

<h4>JSON Message Field Descriptions</h4>
<div class="step" style="margin-left: 20px;">
  <ul>
    <li><b>type:</b> either <code>SYSACTION</code> or <code>USERACTION</code></li>
    <li><b>parms:</b>
      <ul>
        <li><b>desc:</b> description of action. (both <code>SYSACTION</code> or <code>USERACTION</code>)</li>
        <li><b>activity:</b> user action activity code (<code>USERACTION</code> only)</li>
        <li><b>wf_state:</b> user action activity workflow state (<code>USERACTION</code> only)</li>
        <li><b>wf_version:</b> user action activity workflow state version(<code>USERACTION</code> only)</li>
      </ul>
    </li>
    <li><b>timestamp:</b> ISO datetime of message.</li>
    <li><b>client:</b> an identifier to describe to user or terminal sending this message.</li>
    <li><b>component:</b>
      <ul>
        <li><b>name:</b> name of the tool sending logs</li>
        <li><b>version:</b> tool version</li>
      </ul>
    </li>
    <li><b>sessionID:</b> a GUID used to group logs together by session.</li>
    <li><b>impLanguage:</b> the programming language used to create the message.</li>
    <li><b>apiVersion:</b> the logging API version used for this message.</li>
  </ul>
</div>
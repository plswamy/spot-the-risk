<!DOCTYPE html>
<html lang="en">
<%@ page import="java.util.*" %>
<%@page import="com.cmsedge.sos.model.*"%>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=windows-1252">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Spot the risk - Admin</title>
    	<script src="assets/support/lib/jquery-3.2.0.js"></script>
        <script src="assets/support/lib/jquery-ui.min.js"></script>
        <script src="assets/support/lib/bootstrap.min.js"></script>
        <script src="assets/support/lib/bootstrap-select.min.js"></script>
        <link href="assets/support/lib/bootstrap.min.css" rel="stylesheet">
        <link href="assets/support/lib/bootstrap-select.min.css" rel="stylesheet">
        <link href="assets/support/lib/font-awesome.min.css" rel="stylesheet">
        <link href="assets/support/lib/jquery-ui.min.css" rel="stylesheet">
        <link href="assets/support/css/site.css" rel="stylesheet">
    <script type="text/javascript">
    	var allPages=[], allQuestions=[];
    	<%
    		List<Question> questionList = (List<Question>) request.getAttribute("questions");
    		List<Page> pageList = (List<Page>) request.getAttribute("pages");
    		for(Question question: questionList) {
    			String qcontentStr = question.getContent()!=null ? question.getContent().replaceAll("'", "\\\\'") : null;
				String qresponseStr = question.getResponse()!=null ? question.getResponse().replaceAll("'", "\\\\'") : null;
    	%>
    			var qansobj = [];
    	<%
    			for(Answer answer: question.getAnswers()) {
    				String acontentStr = answer.getContent()!=null ? answer.getContent().replaceAll("'", "\\\\'") : null;
    				String aresponseStr = answer.getResponse()!=null ? answer.getResponse().replaceAll("'", "\\\\'") : null; 
    	%>
    			var ansobj = {
    				id: '<%= answer.getId() %>',
    				questionid: '<%= answer.getQuestion_id() %>',
    				content: '<%= acontentStr %>',
    				response: '<%= aresponseStr %>',
    				iscorrect: '<%= answer.getIs_correct() %>',
    				siteid: '<%= answer.getSiteId() %>'
    			};
    			qansobj.push(ansobj);
    	<%
    			}
    	%>
    		var qobj = {
    				id: '<%= question.getId()%>',
    				content: '<%= qcontentStr %>',
    				response: '<%= qresponseStr %>',
    				siteid: '<%= question.getSiteId() %>',
    				answerlist: qansobj
    		};
    		allQuestions.push(qobj);
    	<%
    		}
    		for(Page sospage: pageList) {
    	%>
    		var info=[],leaderboard=[],link=[];
    		<%
    			for(Info info: sospage.getInfo()){
    				String textStr = info.getText()!=null ? info.getText().replaceAll("'", "\\\\'") : null;
    		%>
    			var infoobj = {
    					id: '<%= info.getId() %>',
    					textid: '<%= info.getTextId()%>',
    					text: '<%= textStr %>',
    					pageid: '<%= info.getPageId() %>'
    			};
    			info.push(infoobj);
    		<%
    			}
    		if(sospage.getLeaderboardTable()!=null) {
				for(Leaderboard lboard: sospage.getLeaderboardTable()){
			%>
				var lboardobj = {
						id: '<%= lboard.getId() %>',
						name: '<%= lboard.getName() %>',
						score: '<%= lboard.getScore() %>'
				};
				leaderboard.push(lboardobj);
			<%
				}
    		}
				for(Link link: sospage.getLinks()){
					%>
						var linkobj = {
								id: '<%= link.getId() %>',
								title: '<%= link.getTitle() %>',
								linktext: '<%= link.getTitle() %>',
								linksrc: '<%= link.getLinkSrc() %>',
								target: '<%= link.getTarget() %>',
								pageid: '<%= link.getPageId() %>'
						};
						link.push(linkobj);
					<%
						}
					String heading3Str = sospage.getHeading3() != null ? sospage.getHeading3().replaceAll("'", "\\\\'") : null;
					%>
				var pageobj = {
					id: '<%= sospage.getId() %>',
					pagename: '<%= sospage.getPageName() %>',
					title: '<%= sospage.getTitle() %>',
					pagetitle: '<%= sospage.getPageTitle() %>',
					heading1: '<%= sospage.getHeading1() %>',
					heading2B: '<%= sospage.getHeading2Black() %>',
					heading2w: '<%= sospage.getHeading2White() %>',
					heading3: '<%= heading3Str %>',
					sitid: '<%= sospage.getSiteId() %>',
					status: '<%= sospage.getStatus() %>',
					infos: info,
					leaderboards: leaderboard,
					links: link
				};
				allPages.push(pageobj);
    	<%
    		}
    	%>
    </script>
</head>
<body class="sos-dark-theme">
	<div class="sos-admin-logo-wrapper">
      <div id="logo" class="sos-admin-logo"></div>
    </div>
    
    
    <form name="localeForm" id="localeForm" method="get" action="admin" onsubmit="" >
            <div class="admin-locale-wrapper">
                
                <div style="sos-admin-first-form">
                    
                    
                    <a style="cursor: pointer;top: 20px;position: relative;display: inline-block;" data-toggle="modal" data-target="#myModalNorm">Create new site</a>
                    <!--button class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModalNorm">Launch Normal Form</button-->

                    <div class="modal fade" id="myModalNorm" tabindex="1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <!-- Modal Header -->
                                <div class="modal-header">
                                    <button type="button" class="close" 
                                       data-dismiss="modal">
                                           <span aria-hidden="true">&times;</span>
                                           <span class="sr-only">Close</span>
                                    </button>
                                    <h4 class="modal-title" id="myModalLabel">
                                        Create new site
                                    </h4>
                                </div>
                                
                                <!-- Modal Body -->
                                <div class="modal-body">                                    
                                    <form role="form">
                                      <div class="form-group">
                                        <label for="exampleInputEmail1">Enter site name: </label>
                                        <br />
                                        <input type="text" class="form-control sos-admin-new-site-input" id="sos-admin-new-site-input" placeholder="Enter site name"/>
                                      </div>
                                    </form>
                                </div>
                                
                                <!-- Modal Footer -->
                                <div class="modal-footer">
                                    <!--button type="button" class="btn btn-default"
                                            data-dismiss="modal">
                                                Close
                                    </button-->
                                    <button type="button" class="btn btn-primary" onClick="javascript: createSite();">
                                        Create!
                                    </button>
                                </div>
                            </div>
                        </div>
                        </div>
                        
                    <input class="admin-lang form-control hidden" name="language" id="language" type="text" value="master" />
                   <select id="sos-lang-select" class="selectpicker sos-admin-select" onchange="javascript: updateLocaleData();">
						<option value="master" >master</option>
                    </select>  
                    <button style="display: inline-block; width: 58px; float: right;" id="sos-admin-lang-submit" class="btn btn-primary admin-lang-btn col-lg-4 col-md-6 col-sm-12 col-xs-12" onclick="javascript: return getLocaleData();">Go!</button>
                    
                </div>
            </div>
        </form>
    
    
    
	<!-- insert header -->
	<form name="adminForm" id="adminForm" method="post" enctype="multipart/form-data" action="admin" onsubmit="javascript: gatherInfo();" >
		<input type="hidden" id="sos-labels"  name="labels" value="" />
	    <input type="hidden" id="sos-questions"  name="questions" value="" />
	    <input type="hidden" id="sos-edited-questions"  name="editedquestions" value="" />
	    <input type="hidden" id="sos-deleted-questions"  name="deletedquestions" value="" />
	    <input type="hidden" id="sos-answers"  name="answers" value="" />
	    <input type="hidden" id="sos-edited-answers"  name="editedanswers" value="" />
	    <input type="hidden" id="sos-deleted-answers"  name="deletedanswers" value="" />
		 <div id="item_panels">
	     	<h3 class="plan_header">Pages</h3>        
                <div class="" >
                    <ul class="nav nav-tabs sos-page-tabs">
						<%
							for(Page sospage: pageList) {
							%>
					    <li><a data-toggle="tab" href="#sos-page-<%= sospage.getPageName() %>"><%= sospage.getPageName().toUpperCase() %></a></li>
						<%
						}
						%>
					  </ul>
					  <div class="tab-content">
			<%
				for(Page sospage: pageList) {
				String heading3Str = sospage.getHeading3() != null ? sospage.getHeading3().replaceAll("'", "\\\\'") : null;
			%>
		    <div id="sos-page-<%= sospage.getPageName() %>" class="tab-pane fade in active">
		      <!-- <h3>HOME</h3> -->
		      <table class="table table-striped table-bordered table-hover">
				<tr>
					<th>ID</th>
					<td>
					<span class="sos-page-label"><%= sospage.getId() %></span>
					<input class="sos-id sos-id" type="hidden"  value="<%= sospage.getId() %>"></td>															
				</tr>
				<tr>
					<th>Page Name</th>
					<td>
					   <input type="text" class="form-control sos-input-page-<%= sospage.getId() %>"  value="<%= sospage.getPageName() %>" disabled >
					</td>
				</tr>
				<tr>
					<th>Page Title</th>
					<td>
					   <input type="text" class="form-control sos-input-page-<%= sospage.getId() %>" value="<%= sospage.getPageTitle() %>" disabled >
					</td>
				</tr>
				<tr>
					<th>Header Title</th>					
					<td>
					   <input type="text" class="form-control sos-input-page-<%= sospage.getId() %>"  value="<%= sospage.getTitle() %>" disabled >
					</td>				
				</tr>
				<tr>
					<th>Heading 1</th>
					<td>
					   <input type="text" class="form-control sos-input-page-<%= sospage.getId() %>"  value="<%= sospage.getHeading1() %>" disabled >
					</td>
				</tr>
				<tr>
					<th>Heading 2</th>
					<td>
					   <input type="text" class="form-control sos-input-page-<%= sospage.getId() %>" value="<%= sospage.getHeading2Black() %>" disabled >
					   <%
					   String h2w=sospage.getHeading2White();
					   if( h2w != null && h2w != ""){ 
					   //System.out.println("H2W"+sospage.getHeading2White());
					   %>
					   <input type="text" class="form-control sos-input-page-<%= sospage.getId() %>" value="<%= sospage.getHeading2White() %>" disabled >
					   <%} %>
					</td>
				</tr>
				<tr>
					<th>Heading 3</th>
					<td>
					   <input type="text" class="form-control sos-input-page-<%= sospage.getId() %>" value="<%= heading3Str %>" disabled >
					</td>
				</tr>
				<% for (Info info : sospage.getInfo())
				{
					String textStr = info.getText()!=null ? info.getText().replaceAll("'", "\\\\'") : null;
				%>
				<tr>
					<th>Info <%= info.getTextId() %></th>
					<td>
					   <input type="text" class="form-control sos-input-page-<%= sospage.getId() %>" value="<%= textStr %>" disabled >
					</td>
				</tr>
				<%} %>
				<% 
					int linkId=1;
				for (Link link : sospage.getLinks())
				{
					//String textStr = link.getText()!=null ? info.getText().replaceAll("'", "\\\\'") : null;
				%>
				<tr>
					<td>Link <%= linkId %></td>
					<td>
					   <input type="text" class="form-control sos-input-page-link-<%= linkId %>" value="<%= link.getTitle() %>" disabled >
					   <input type="text" class="form-control sos-input-page-link-<%= linkId %>" value="<%= link.getLinkText() %>" disabled >
					   <input type="text" class="form-control sos-input-page-link-<%= linkId %>" value="<%= link.getLinkSrc() %>" disabled >
					</td>
				</tr>
				<%
				linkId++;
				} %>
				<tr>
					<th>Status</th>
					<td>
					   <input type="text" class="form-control sos-input-page-<%= sospage.getId() %>" value="<%= sospage.getStatus() %>" disabled >
					</td>
				</tr>
				<tr>
				<td>
				<i title="Edit" class="sos-edit-icon fa fa-pencil fa-lg editItem-<%= sospage.getId() %>" id="editItem-<%= sospage.getId() %>" data-type="page" ></i>
				</td>
  				<td>
  				<i title="Delete" class="sos-delete-icon fa fa-trash-o fa-lg deleteItem-<%= sospage.getId() %>" id="deleteItem-<%= sospage.getId() %>" data-type="page" onclick="FieldView.deleteField(<%= sospage.getId() %>)"></i>
				</td>
				
				</tr>
			  </table>
		    </div>
		    <%
			}
			%>
  		</div>
				  
                </div>
	        
	        <h3 class="do_header">Questions</h3>
	        <div class="">
	        <div class="modal fade myModalNorm" id="myQuestionModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <!-- Modal Header -->
                                <div class="modal-header">
                                    <button type="button" class="close" 
                                       data-dismiss="modal">
                                           <span aria-hidden="true">&times;</span>
                                           <span class="sr-only">Close</span>
                                    </button>
                                    <h4 class="modal-title" id="myModalLabel">
                                        Enter Question details
                                    </h4>
                                </div>
                                
                                <!-- Modal Body -->
                                <div class="modal-body">                                    
                                    <form name="questionEditForm" id="questionEditForm" method="post" action="admin" role="form">
                                      <div class="form-group">
										<table class="table table-striped table-bordered">
										<tr>
											<td>Id</td>
											<td><span class="sos-id-label" id="sos-qsn-modal-id"></span>
											<input class="sos-id sos-qsn-modal-id" name="qsn-id" id="id" type="hidden"  value=""></td>
										</tr>
										<tr>
											<td>Content</td>
											<td>
											<textarea class="form-control admin-textarea sos-input " id="qns-modal-content" name="content" placeholder="Enter Question"></textarea></td>
										</tr>
										<tr>
											<td>Response</td>
											<td>
											<textarea class="form-control admin-textarea sos-input" name="response" id="qns-modal-response" placeholder="Enter Response"></textarea></td>
										</tr>
										<tr>
											<td>Option 1</td>
											<td>
											<textarea class="form-control admin-textarea sos-input" name="answer_1" id="qns-modal-answer_1" placeholder="Enter Option 1"></textarea></td>
										</tr>
										<tr>
											<td>Option 2</td>
											<td>
											<textarea class="form-control admin-textarea sos-input" name="answer_2" id="qns-modal-answer_2" placeholder="Enter Option 2"></textarea></td>
										</tr>
										<tr>
											<td>Option 3</td>
											<td>
											<textarea class="form-control admin-textarea sos-input" name="answer_3" id="qns-modal-answer_3" placeholder="Enter Option 3"></textarea></td>
										</tr>
										<tr>
											<td>Option 4</td>
											<td>
											<textarea class="form-control admin-textarea sos-input" name="answer_4" id="qns-modal-answer_4" placeholder="Enter Option 4"></textarea></td>
										</tr>
										<tr>
											<td>Correct Option</td>
											<td>
											<span class="col-sm-3"><input type="radio" class="sos-input" name="isCorrect" id="qns-modal-isCorrect-1" value="1">Option 1</span>
											<span class="col-sm-3"><input type="radio" class="sos-input" name="isCorrect" id="qns-modal-isCorrect-2" value="2">Option 2</span>
											<span class="col-sm-3"><input type="radio" class="sos-input" name="isCorrect" id="qns-modal-isCorrect-3" value="3">Option 3</span>
											<span class="col-sm-3"><input type="radio" class="sos-input" name="isCorrect" id="qns-modal-isCorrect-4" value="4">Option 4</span>
											</td>
										</tr>
										<tr>
											<td>Image</td>
											<td>
											<input type="file" class="form-control sos-input-file" name="qsnImage"  id="qsn-modal-img"></td>
										</tr>
										
                                        </table>
                                      </div>
                                    </form>
                                </div>
                                
                                <!-- Modal Footer -->
                                <div class="modal-footer">
                                    <!--button type="button" class="btn btn-default"
                                            data-dismiss="modal">
                                                Close
                                    </button-->
                                    <button type="button" id="questionSubBtn" class="btn btn-primary" onClick="javascript: ;">
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                        </div>
	        <table id="plan" class="table table-striped table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Content</th>
                                <th>Response</th>
                                <th>Image</th>
                                <th>Answers</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        <%
                        for(Question question: questionList) {
                        	String qcontentStr = question.getContent()!=null ? question.getContent().replaceAll("'", "\\\\'") : null;
            				String qresponseStr = null;
                        %>
                        <tr id="row-qsn-<%= question.getId() %>" class="row-readonly">
						<td><span class="sos-id-label"><%= question.getId() %></span>
						<input class="sos-id sos-question-id-<%= question.getId() %>" type="hidden"  value="<%= question.getId() %>"></td>
						<td>
						   <input type="text" class="form-control sos-input qsn-input-content-<%= question.getId() %>"  value="<%= qcontentStr %>" disabled >
						</td>							
						<td>
						<%
							int optionId=1;
						for(Answer answer : question.getAnswers()){
							qresponseStr = answer.getResponse()!=null ? answer.getResponse().replaceAll("'", "\\\\'") : null;
							String answerStr = answer.getContent()!=null ? answer.getContent().replaceAll("'", "\\\\'") : null;
							String crct = answer.getIs_correct();
							int isCorrect = Integer.valueOf(crct);
							System.out.println(crct+" "+isCorrect);
						%>
						   <input type="text" class="form-control sos-input qsn-input-answer-<%= question.getId() %>-<%= optionId %>" value="<%= answerStr%>" disabled >
						   <%
						   if(isCorrect == 1){ %>
							 <i class="glyphicon glyphicon-ok hidden"></i> 
							 <input type="text" class="hidden qsn-input-iscorrect-<%= question.getId() %>" value="<%=optionId %>" disabled > 
						   <%}
						   %>
						   <br>
						   <%
						   	optionId++;
							} %>
						</td>												
						
						<td>
							<input type="text" class="form-control sos-input qsn-input-response-<%= question.getId() %>" name="response-<%= question.getId() %>" value="<%= qresponseStr%>" disabled>
						</td>
						<td>
							<img src="assets/img/question_images/q<%= question.getId() %>.jpg" id="sos-img-<%= question.getId() %>" class="img_size">
						   <input type="file" class="form-control hidden sos-input-file-<%= question.getId() %>" value="assets/img/question_images/q<%= question.getId() %>.jpg" disabled >
						</td>
						<td>
						<i title="Edit" class="sos-edit-icon fa fa-pencil fa-lg editQsn-<%= question.getId() %>" id="editQsn-<%= question.getId() %>" data-type="question" onclick="javascript: editQuetion(<%= question.getId() %>);"></i>
          				<i title="Delete" class="sos-delete-icon fa fa-trash-o fa-lg deleteItem-<%= question.getId() %>" id="deleteItem-<%= question.getId() %>" data-type="question" onclick="javascript: deleteQuetion(<%= question.getId() %>);"></i>
						</td>
						</tr>
						
                                                                  
                        <%} %>
                        </tbody>
                    </table>
                    <div class="btn-section">
                        <a class="btn btn-default pull-left" id="addQsnBtn">Add Question</a>
                    </div>
	        
	        </div>
	        <h3 class="check_header">Labels</h3>
	        <div>
	        	
	        </div>
	     </div>
	     <div class="admin-locale-submit">
	        <button class="btn btn-primary admin-lang-btn" onclick="">Save</button>
	     </div>
	</form>
<!-- insert footer -->
<script src="assets/js/admin.js"></script>
<script>
		
</script>
</body>
</html>
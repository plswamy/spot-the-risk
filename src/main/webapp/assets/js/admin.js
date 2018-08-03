  $(function () {

          $("#item_panels").accordion({
			  hide: true,
              heightStyle: "content",
              collapsible: true,
              active: false,
              icons: true,
              activate: function (event, ui) {
                  var scrollTop = $("#item_panels").scrollTop();
                  var top = $(ui.newHeader).offset().top;
                  $("#item_panels").scrollTop(scrollTop + top - 200);
              },
              beforeActivate: function (event, ui) {
                  // The accordion believes a panel is being opened
                  if (ui.newHeader[0]) {
                      var currHeader = ui.newHeader;
                      var currContent = currHeader.next('.ui-accordion-content');
                      // The accordion believes a panel is being closed
                  } else {
                      var currHeader = ui.oldHeader;
                      var currContent = currHeader.next('.ui-accordion-content');
                  }
                  // Since we've changed the default behavior, this detects the actual status
                  var isPanelSelected = currHeader.attr('aria-selected') == 'true';

                  // Toggle the panel's header
                  currHeader.toggleClass('ui-corner-all', isPanelSelected).toggleClass('accordion-header-active ui-state-active ui-corner-top', !isPanelSelected).attr('aria-selected', ((!isPanelSelected).toString()));

                  // Toggle the panel's icon
                  //currHeader.children('.ui-icon').toggleClass('ui-icon-caret-1-s', isPanelSelected).toggleClass('ui-icon-caret-1-n', !isPanelSelected);

                  // Toggle the panel's content
                  currContent.toggleClass('accordion-content-active', !isPanelSelected)
                  if (isPanelSelected) {
                      currContent.slideUp();
                  } else {
                      currContent.slideDown();
                  }
                  $("td").addClass("sos-temp-padding");
                  setTimeout(function() {
                      $("td").removeClass("sos-temp-padding");
                  }, 500);
                  $("ul li:first a").click();
                  return false; // Cancel the default action
              }

          });
        
          
      });
  var pageModalBackup=$("#myPageModal").clone();
  
 
  	'use strict';
  	$("#addQsnBtn").click(function(){
  			$("#myQuestionModal").find("input,textarea,select")
						  	       .val('')
						  	       .end()
							  	   .find("input[type=checkbox], input[type=radio]")
						  	       .prop("checked", "")
						  	       .end();
		  var newId=$('[id^=row-qsn]').length + 1;
		  $("#myQuestionModal").modal('show');
		  $("#sos-qsn-modal-id").text(newId);
		  $(".sos-qsn-modal-id").val(newId);
		  
	  });
   
  		function submitPageForm() {
  			var page=setPageValues();
  			console.log(JSON.stringify(page));
  		$.ajax
            ({
               type: "POST",
               dataType : 'json',
               async : true,     
               url: "/admin/updatePage",
               data : JSON.stringify(page),
               contentType: "application/json; charset=utf-8"
               }).done(function(data,type,xml)
                         {
                           console.log(data);
                         }).fail(function()
                                   {
                             //alert("Something Bad Happened, Service failed");
                             console.log("Something Bad Happened, Service failed");
                       })
                       
            $("#closebtn").click();
  			location.reload(true);
			//$("#PageEditForm").submit();
		}
  		
  		function setPageValues(){
  			 var info=[],links=[];
  			  var pageobj = {
  						id:$(".sos-page-modal-id").val(),
  						pageName:$("#page-modal-pagename").val(),
  						title:$("#page-modal-pagetitle").val(),
  						pageTitle:$("#page-modal-headertitle").val(),
  						heading1:$("#page-modal-heading_1").val(),
  						heading2Black:$("#page-modal-heading_2_black").val(),
  						heading2White:$("#page-modal-heading_2_white").val(),
  						heading3:$("#page-modal-heading_3").val(),
  						siteId:$(".sos-page-modal-siteid").val(),
  						status:"active",
  						info,
  						leaderboard:null,
  						links
  					};
  			var maxInfo=$("[id='info']").length;
  			//alert("maxInfo"+maxInfo)
  	  		var maxLink=$("[id='link']").length;
  	  		for(var i=1;i<=maxInfo;i++){
  	  		var infoobj = {
  	  					id:$(".page-modal-infoId-"+i).val(),
  	  					textId:i,
						text:$("#page-modal-info_"+i).val(),
						pageId:pageobj.id,
						siteId:pageobj.siteId
				};
  	  		info.push(infoobj);
  	  		}
  	  		for(var j=1;j<=maxLink;j++){
  	  		var linkobj = {
  	  					id:$(".page-modal-linkId-"+j).val(),
						title:$(".page-modal-link-title-"+j).val(),
						linkText:$(".page-modal-link-text-"+j).val(),
						linkSrc:$(".page-modal-link-src-"+j).val(),
						target:"_self",
						pageId:pageobj.id
				};
  	  			links.push(linkobj);
  	  		}
  			  
  			return pageobj;  
  		}
  		function setQuestionValue(){
  			/*var imageD=document.getElementById('qsn-modal-img').files[0];
  			var reader  = new FileReader();
  			reader.readAsDataURL(imageD);
  			reader.onloadend = function () {
  	           console.log(reader.result);
  	       }
  			console.log(imageD);*/
  			
  			var answers=[];
  			var qobj = {
    				id:$(".sos-qsn-modal-id").val(),
    				content:$("#qns-modal-content").val() ,
    				response:$("#qns-modal-response").val() ,
    				//image_name:imageD,
    				//imageData:new FormData($('#qsn-modal-img').files[0]),
    				siteId:$(".sos-qsn-modal-siteid").val() ,
    				answers
    		};
  			
  			for(var i=1;i<=4;i++){
  				var isCr=0;
  				if($("[name='isCorrect']:checked").val()==i){
  					isCr='1';									//$(".qns-modal-isCorrect_"+i).val()
					}
  			var ansobj = {
  					
    				id:$(".qns-modal-answerId_"+i).val(),
    				question_id:$(".sos-qsn-modal-id").val(),
    				content:$("#qns-modal-answer_"+i).val(),
    				response:qobj.response,
    				is_correct:isCr,
    				siteId:$(".sos-qsn-modal-siteid").val() 
    			};
  			answers.push(ansobj);
  			}
  			return qobj;
  		}
  		function submitQuestionForm() {
  			var qsn=setQuestionValue();
  			console.log(JSON.stringify(qsn));
  			var formData = new FormData();
  			var imageD=document.getElementById('qsn-modal-img').files[0];
  			formData.append('image',imageD);
  			formData.append('question',JSON.stringify(qsn));
  			$.ajax
            ({
               type: "POST",
               //async : true,     
               url: "/admin/updateQuestion",
               data : formData,
               processData: false,
               contentType: false
               }).done(function(data,type,xml)
                         {
                           console.log(data);
                         }).fail(function()
                                   {
                             //alert("Something Bad Happened, Service failed");
                             console.log("Something Bad Happened, Service failed");
                       })
            $("#closebtn").click();
  			location.reload(true);
		}
  		
//  		function setQuestionValue(){
//  			/*var imageD=document.getElementById('qsn-modal-img').files[0];
//  			var reader  = new FileReader();
//  			reader.readAsDataURL(imageD);
//  			reader.onloadend = function () {
//  	           console.log(reader.result);
//  	       }
//  			console.log(imageD);*/
//  			var answers=[];
//  			var qobj = {
//    				id:$(".sos-qsn-modal-id").val(),
//    				content:$("#qns-modal-content").val() ,
//    				response:null ,
//    				//image_name:imageD,
//    				//imageData:new FormData($('#qsn-modal-img').files[0]),
//    				siteId:$(".sos-qsn-modal-siteid").val() ,
//    				answers
//    		};
//  			
//  			for(var i=1;i<=4;i++){
//  				var isCr=0;
//  				if($("[name='isCorrect']:checked").val()==i){
//  					isCr='1';									//$(".qns-modal-isCorrect_"+i).val()
//					}
//  			var ansobj = {
//  					
//    				id:$(".qns-modal-answerId_"+i).val(),
//    				question_id:$(".sos-qsn-modal-id").val(),
//    				content:$("#qns-modal-answer_"+i).val(),
//    				response:$("#qns-modal-response").val(),
//    				is_correct:isCr,
//    				siteId:$(".sos-qsn-modal-siteid").val() 
//    			};
//  			answers.push(ansobj);
//  			}
//  			return qobj;
//  		}
//  		function submitQuestionForm() {
//  			var qsn=setQuestionValue();
//  			console.log(JSON.stringify(qsn));
//  			$.ajax
//            ({
//               type: "POST",
//               dataType : 'json',
//               async : true,     
//               url: "/admin/updateQuestion",
//               data : JSON.stringify(qsn),
//               imageData:new FormData($("#myQuestionModal").files[0]),
//               contentType: "application/json; charset=utf-8"
//               }).done(function(data,type,xml)
//                         {
//                           console.log(data);
//                         }).fail(function()
//                                   {
//                             //alert("Something Bad Happened, Service failed");
//                             console.log("Something Bad Happened, Service failed");
//                       })
//            //$("#closebtn").click();
//  			//location.reload(true);
//		}
  	/*$('[id^=editQsn-]').click(function(e) {
  		var getRow=$(e.target).closest("tr");
  		console.log(getRow);
  		
  		$("#myQuestionModal").modal('show');
  		$("#sos-qsn-modal-id").text(newId);
  		$(".sos-qsn-modal-id").val(newId); 
  		$("#qns-modal-response").text(newId);
  		$("#qns-modal-answer_1").text(newId);
  		$("#qns-modal-answer_2").text(newId);
  		$("#qns-modal-answer_3").text(newId);
  		$("#qns-modal-answer_3").text(newId);
	});*/
  		
  		function deleteRow() {
			var trr=$(this.event.target).closest("tr").remove();
			//console.log(trr);
		}
  		
  	function editPage(id){
  		clearModal();
  		renderModal(id);
  		var pId=$(".sos-page-id-"+id).val();
  		$("#sos-page-modal-id").text(pId);
  		$(".sos-page-modal-id").val(pId);
  		$(".sos-page-modal-siteid").val($(".sos-siteid").val());
  		$("#page-modal-pagename").val($(".page-input-pagename-"+id).val());
  		$("#page-modal-pagetitle").val($(".page-input-pagetitle-"+id).val());
  		$("#page-modal-headertitle").val($(".page-input-headertitle-"+id).val());
  		$("#page-modal-heading_1").val($(".page-input-heading_1-"+id).val());
  		$("#page-modal-heading_2_black").val($(".page-input-heading_2_b-"+id).val());
  		$("#page-modal-heading_2_white").val($(".page-input-heading_2_w-"+id).val());
  		$("#page-modal-heading_3").val($(".page-input-heading_3-"+id).val());
  		var maxInfo=$("[id=maxInfo-"+id+"]").length;
  		var maxLink=$("[id=maxLink-"+id+"]").length;
  		//alert("info"+maxInfo)
  		for(var i=1;i<=maxInfo;i++){
  			$(".page-modal-infoId-"+i).val($(".page-info-"+id+"-"+i).val());
  			$("#page-modal-info_"+i).val($(".page-input-info-"+id+"-"+i).val());
  		}
  		for(var j=1;j<=maxLink;j++){
  		$(".page-modal-linkId-"+j).val($(".page-link-"+id+"-"+j).val());
  		$(".page-modal-link-title-"+j).val($(".page-input-link-"+id+"-"+j+"-title").val());
  		$(".page-modal-link-text-"+j).val($(".page-input-link-"+id+"-"+j+"-text").val());
  		$(".page-modal-link-src-"+j).val($(".page-input-link-"+id+"-"+j+"-src").val());
  		}
  		$("#myPageModal").modal('show');
  	}
  	function clearModal(){
  		$("#myPageModal").modal('hide').remove();
  		var newPageModal=pageModalBackup.clone();
  		$('body [id=localeForm]').after(newPageModal);
  	}
  	function renderModal(id){
  		$("#myPageModal").html();
  		var maxInfo=$("[id=maxInfo-"+id+"]").length;
  		var maxLink=$("[id=maxLink-"+id+"]").length;
  		//alert(maxInfo);
  		if(maxInfo>1){
  			for(var i=2;i<=maxInfo;i++){
  				$("#myPageModal #pageModalTable tr[id='info']:last").after("<tr id=\"info\">\r\n" + 
  						"<td>Info "+i+" </td>\r\n" + 
  						"	<td><input type=\"hidden\" class=\"page-modal-infoId-"+i+"\" >\r\n" +
  						"<span><textarea	class=\"form-control admin-textarea sos-input\" name=\"info"+i+"\" id=\"page-modal-info_"+i+"\" placeholder=\"Enter Info\"></textarea></span>\r\n" + 
  						"</tr>");
  			}
  		}
  		if(maxLink>1){
  			for(var i=2;i<=maxLink;i++){
  				$("#myPageModal #pageModalTable tr[id='link']:last").after("<tr id=\"link\">\r\n" + 
  						"	<td>Link "+i+"</td>\r\n" + 
  						"	<td><input type=\"hidden\" class=\"page-modal-linkId-"+i+"\" >\r\n" +
  						"		<span class=\"col-sm-3\"><input type=\"text\" class=\"form-control page-modal-link-title-"+i+"\" placeholder=\"Enter Link Title\" value=\"\" ></span>\r\n" + 
  						"		<span class=\"col-sm-4\"><input type=\"text\" class=\"form-control page-modal-link-text-"+i+"\" placeholder=\"Enter Link Text\" value=\"\" ></span>\r\n" + 
  						"		<span class=\"col-sm-4\"><input type=\"text\" class=\"form-control page-modal-link-src-"+i+"\" placeholder=\"Enter Link Source\" value=\"\" ></span>\r\n" + 
  						"		<span><i class=\"fa fa-trash\" id=\deleteRow\" onclick=\"javascript: deleteRow();\"></i></span>\r\n" +
  						"	</td>\r\n" + 
  						"</tr>");
  			}
  		}
  	}
  	function addInfo(){
  		var infoS=$("[id='info']").length+1;
  		//alert(infoS);
  		$("#myPageModal #pageModalTable tr[id='info']:last").after("<tr id=\"info\">\r\n" + 
				"<td>Info "+infoS+" </td>\r\n" + 
				"	<td><input type=\"hidden\" class=\"page-modal-infoId-"+infoS+"\" value=\"-1\">\r\n" +
				"<span><textarea	class=\"form-control admin-textarea sos-input\" name=\"info"+infoS+"\" id=\"page-modal-info_"+infoS+"\" placeholder=\"Enter Info\"></textarea></span>\r\n" + 
				"</tr>");
  		/*$("#myPageModal #pageModalTable tr:eq(7)").after("<tr id=\"info\">\r\n" + 
				"<td>Info "+infoS+" </td>\r\n" + 
				"	<td><span><textarea	class=\"form-control admin-textarea sos-input\" name=\"info"+infoS+"\" id=\"page-modal-info_"+infoS+"\" placeholder=\"Enter Info\"></textarea></span>\r\n" + 
				"</tr>");*/
  	}
  	function addLink(){
  		var linkS=$("[id='link']").length+1;
  		//alert(infoS);
  		$("#myPageModal #pageModalTable tr[id='link']:last").after("<tr id=\"link\">\r\n" + 
				"	<td>Link "+linkS+"</td>\r\n" + 
				"	<td><input type=\"hidden\" class=\"page-modal-linkId-"+linkS+"\" value=\"-1\">\r\n" +
				"		<span class=\"col-sm-4\"><input type=\"text\" class=\"form-control page-modal-link-title-"+linkS+"\" placeholder=\"Enter Link Title\" value=\"\" ></span>\r\n" + 
				"		<span class=\"col-sm-4\"><input type=\"text\" class=\"form-control page-modal-link-text-"+linkS+"\" placeholder=\"Enter Link Text\" value=\"\" ></span>\r\n" + 
				"		<span class=\"col-sm-4\"><input type=\"text\" class=\"form-control page-modal-link-src-"+linkS+"\" placeholder=\"Enter Link Source\" value=\"\" ></span>\r\n" + 
				"		<span><i class=\"fa fa-trash\" id=\deleteRow\" onclick=\"javascript: deleteRow();\"></i></span>\r\n" +
				"	</td>\r\n" + 
				"</tr>");
  	}
  	function editQuetion(id) {
  		var qid=$(".sos-question-id-"+id).val();
  		$("#sos-qsn-modal-id").text(qid);
  		$(".sos-qsn-modal-id").val(qid); 
  		$(".sos-qsn-modal-siteid").val($(".sos-siteid").val());
  		$("#qns-modal-content").val($(".qsn-input-content-"+id).val());
  		$("#qns-modal-response").val($(".qsn-input-response-"+id).val());
  		/*$("#qns-modal-answer_1").val($(".qsn-input-answer-"+id+"-1").val());
  		$("#qns-modal-answer_2").val($(".qsn-input-answer-"+id+"-2").val());
  		$("#qns-modal-answer_3").val($(".qsn-input-answer-"+id+"-3").val());
  		$("#qns-modal-answer_4").val($(".qsn-input-answer-"+id+"-4").val());*/
  		for(var i=1;i<=4;i++){
  			$("#qns-modal-answer_"+i).val($(".qsn-input-answer-"+id+"-"+i).val());
  			$(".qns-modal-answerId_"+i).val($(".qns-input-answerId-"+id+"_"+i).val());
  			$(".qns-modal-isCorrect_"+i).val($(".qns-input-isCorrect-"+id+"_"+i).val());
  		}
  		var a1=$(".qsn-input-iscorrect-opt-"+id).val();
  		$("#qns-modal-isCorrect-"+a1).prop('checked','checked');
  		$("#myQuestionModal").modal('show');
  		//$("#qsn-modal-img").val($(".sos-input-file-"+id).val());
	}
  	
  	function deleteQuetion(id) {
  		var boo=confirm("Are you sure want to delete?");
  		if(boo){
  			//alert("deleted")
  		}
  		else{
  			//alert("fooooooo");
  		}
	}
  	function deletePage(){
  		var boo=confirm("Are you sure want to delete?");
  		if(boo){
  			//alert("deleted")
  		}
  		else{
  			//alert("fooooooo");
  		}
  	}
  
  	
  /*var Field = function( id, content, response, image, type, enabled) {
	    //this.qorder = qorder || ($('[id^=row_'+type+']').length + 1);
	    this.id = id;
	    this.content = content;
	    this.response = response;
	    this.image = image;
	    this.enabled = enabled ? enabled : false;
	  }*/
  /*var QuestionView = (function() {
	  
	  var addQuestion = function addQuestion(e) {
		  e.preventDefault();
			//$("#myQuestionModal").css("diaply","block");
		  var modal = document.getElementById("myQuestionModal");
		  modal.style.display="block";
			  
		  }
  })();*/
  

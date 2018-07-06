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
  	
  	function editQuetion(id) {
  		var qid=$(".sos-question-id-"+id).val();
  		
  		//alert(qid);
  		$("#myQuestionModal").modal('show');
  		$("#sos-qsn-modal-id").text(qid);
  		$(".sos-qsn-modal-id").val(qid); 
  		$("#qns-modal-content").text($(".qsn-input-content-"+id).val());
  		$("#qns-modal-response").text($(".qsn-input-response-"+id).val());
  		$("#qns-modal-answer_1").text($(".qsn-input-answer-"+id+"-1").val());
  		$("#qns-modal-answer_2").text($(".qsn-input-answer-"+id+"-2").val());
  		$("#qns-modal-answer_3").text($(".qsn-input-answer-"+id+"-3").val());
  		$("#qns-modal-answer_4").text($(".qsn-input-answer-"+id+"-4").val());
  		var a1=$(".qsn-input-iscorrect-"+id).val();
  		alert(a1);	
  		$("#qns-modal-isCorrect-"+a1).attr('checked','checked');
  		//$("#qsn-modal-img").val((".sos-input-file-"+id).val());
	}
  	
  	function deleteQuetion(id) {
  		var boo=confirm("Are you sure want to delete?");
  		if(boo)
  			alert("boo")
  		else
  			alert("booooooo");
  		
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
  
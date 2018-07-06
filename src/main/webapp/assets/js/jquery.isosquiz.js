(function(e, t, n, r) {
    e.widget("isos.quiz", {
        options: {
            serviceURL: "/ajax/",
            quiz_data: null,
            results: null,
            time: 0,
            score: 0,
            rsQuestionsEl: "#rsQuestions",
            rsAnswersEl: "#rsAnswers",
            rsQuestions: null,
            rsAnswers: null,
            correctMsg: "That was correct!",
            incorrectMsg: "Oops! That was wrong!"
        },
        _create: function() {
            this._watch = new Stopwatch;
            this._currentQuestionID = this.options.quiz_data[0].id;
            this._currentQuestionIndex = -1;
            this._totalQuestionsNum = this.options.quiz_data.length;
            this._totalAnswersCorrect = 0;
            this._colours = ["green", "blue", "pink"];
            this._submitted = false;
            this._is_mobile = false;
            this._counti = null;
            this._orientation = null;
            this._is_mobile = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/);
            this.options.results = new Array;
            this._initQuiz()
        },
        _initQuiz: function(n) {
            if (this._is_mobile)
                this._doMobile();
            var r = this;
            e(this.options.rsQuestionsEl).royalSlider({
                autoScaleSlider: false,
                autoScaleSliderWidth: 1024,
                autoScaleSliderHeight: 690,
                imageScaleMode: "none",
                imageAlignCenter: false,
                imageScalePadding: 0,
                controlNavigation: "none",
                arrowsNav: false,
                arrowsNavAutoHide: true,
                arrowsNavHideOnTouch: false,
                slidesSpacing: 0,
                startSlideId: 0,
                loop: false,
                loopRewind: false,
                randomizeSlides: false,
                numImagesToPreload: 12,
                slidesOrientation: "vertical",
                transitionType: "move",
                transitionSpeed: 600,
                easeInOut: "easeInOutSine",
                easeOut: "easeOutSine",
                controlsInside: true,
                navigateByClick: false,
                sliderDrag: false,
                sliderTouch: false,
                keyboardNavEnabled: false,
                fadeinLoadedSlide: true,
                allowCSS3OnWebkit: true,
                globalCaption: true,
                addActiveClass: false,
                minSlideOffset: 10,
                autoHeight: false,
                slides: null,
                autoPlay: {
                    enabled: false,
                    pauseOnHover: false,
                    stopAtAction: false,
                    delay: 4e3
                }
            });
            this.options.rsQuestions = e(this.options.rsQuestionsEl).data("royalSlider");
            e(".rsSlide article").not("#quiz-landing").not("#quiz-leaderboard").not("#quiz-results").each(function(t, n) {
                e(this).addClass(r._colours[Math.floor(Math.random() * r._colours.length)])
            });
            setTimeout(function() {
                r._loadQuestionImage(false)
            }, 600);
            this.options.rsQuestions.ev.on("rsBeforeAnimStart", function() {
                r._currentQuestionIndex++;
                _gaq.push(["_trackEvent", "next question", "submit", "question " + (r._currentQuestionIndex + 1)]);
                if (e.browser.mozilla) {
                    e(".rsContainer").css({
                        top: "0"
                    })
                }
                if (r._currentQuestionIndex == r._totalQuestionsNum) {
                    e("#progress-wrapper").hide();
                    r._createScorePage()
                } else if (r._currentQuestionIndex == r._totalQuestionsNum + 1) {
                    r._createLeaderboardPage()
                }
                if (typeof r.options.quiz_data[r._currentQuestionIndex] == "undefined")
                    return;
                r._currentQuestionID = r.options.quiz_data[r._currentQuestionIndex].id;
                r.createAnswersSlider()
            });
            this.options.rsQuestions.ev.on("rsAfterSlideChange", function() {
                r._updateStage();
                if (r.options.rsQuestions.currSlideId == "1")
                    e("#progress-wrapper").show();
                if (r._currentQuestionIndex == r._totalQuestionsNum) {
                    if (e.browser.mozilla) {
                        setTimeout(function() {
                            var n;
                            if (e(t).width() > 959)
                                n = "-7590px";
                            else
                                n = "-10758px";
                            e(".rsContainer").css({
                                "-moz-transition-duration": "inherit",
                                "-moz-transition-timing-function": "inherit",
                                "-moz-transform": "none",
                                top: n
                            })
                        }, 600)
                    }
                    return
                } else if (r._currentQuestionIndex == r._totalQuestionsNum + 1) {
                    return
                }
                if (typeof r.options.quiz_data[r._currentQuestionIndex] == "undefined")
                    return;
                r.startTime(n);
                setTimeout(function() {
                    r._loadQuestionImage(true)
                }, 0)
            });
            e(".answers a").each(function(t, n) {
                e(this).on("click", {
                    base: r,
                    answerEl: e(this)
                }, r.onAnswerClick)
            })
        },
        _doMobile: function(n) {
            var r = this;
            e(t).scroll(function() {
                r._footerToBottom()
            });
            e(t).bind("orientationchange", function(e) {
                if (t.orientation == "0" || t.orientation == "180")
                    r._orientation = "portrait";
                else
                    r._orientation = "landscape";
                setTimeout(function() {
                    r._updateStage()
                }, 600)
            });
            e(t).trigger("orientationchange")
        },
        _updateStage: function(t) {
            var n = this;
            e.scrollTo(".main-container", 600, {
                axis: "y",
                easing: "easeInOutQuint",
                offset: {
                    top: 32,
                    left: 0
                },
                onAfter: function() {
                    n._footerToBottom()
                }
            })
        },
        _footerToBottom: function(n) {
            if (!this._is_mobile)
                return false;
            var r;
            var i;
            var s = parseInt(e(t).width());
            var o = parseInt(e(t).height());
            var u = parseInt(e(".header-container").height());
            var a = parseInt(e("#progress-wrapper").height());
            var f = parseInt(e(t).scrollTop());
            var l;
            var c = 409;
            var h = 260;
            if (this._orientation == "portrait") {
                i = c;
                l = 351
            } else {
                i = h;
                l = 203
            }
            r = o - a + f - u;
            r = r <= l ? i : r;
            e("#progress-wrapper").css({
                top: r + "px"
            })
        },
        _loadQuestionImage: function(t) {
            var n = parseInt(this._currentQuestionIndex) + 1;
            var r = parseInt(this._totalQuestionsNum);
            if (n >= r)
                return;
            var i = !t ? this._currentQuestionID : parseInt(this._currentQuestionID) + 1;
            var s = new Image;
            s.style.width = "88%";
            s.alt = "Question image";
            e(s).load(function() {
                e(this).appendTo("#q" + i + " .animation.with-shadow")
            });
            s.src = "assets/img/question_images/q" + i + ".jpg"
        },
        _createScorePage: function(t) {
            var n = this;
            for (result in this.options.results)
                if (this.options.results[result])
                    this._totalAnswersCorrect++;
            e("#quiz-results p.rsABlock-subtitle").html("You got " + this._totalAnswersCorrect + "/" + this._totalQuestionsNum + " correct in a time of " + this._watch.toString().substring(3, 9));
            this.options.time = parseInt(this._watch.getTotalElapsedMS());
            this.options.score = parseInt(this._totalAnswersCorrect * 1e3 / this.options.time * 1e5);
            e("#results-progress p").html("Score: " + this.options.score);
            e("#results-progress .progress-bullet").each(function(t, r) {
                if (n.options.results[t])
                    e(this).addClass("correct");
                else
                    e(this).addClass("incorrect")
            });
            var r = {
                target: "#divToUpdate",
                data: {
                    score: this.options.score,
                    time: this.options.time,
                    answered: this._totalAnswersCorrect,
                    totalquestions: this._totalQuestionsNum,
                },
                dataType: "json",
                beforeSubmit: function(t, r, i) {
                    if (n._submitted)
                        return false;
                    /*for (var s = 0; s < t.length; s++) {
                        if (!t[s].value) {
                            e(".form-responce").html("You must enter all fields!");
                            return false
                        }
                    }*/
                    var o = r[0];
                    if (!n._isValidEmailAddress(o.email.value)) {
                        e(".form-responce").html("That is not a valid email!");
                        return false
                    }
                    for (var s = 0; s < t.length; s++) {
                    	if(t[s].name == "comms" && t[s].value == "accept") {
                        	t[1].value="1";
                        	//console.log("comms"+t[s].value+" "+t[1].value);
                    	}
                    	if(t[s].name == "terms" && t[s].value == "accept") {
                        	t[2].value="1";
                        	//console.log("terms"+t[s].value+" "+t[2].value);
                    	}
                    }
//                    if (t[6].value == "accept") {
//                    	t[1].value="1";
//                    	console.log("t6"+t[6].value+" "+t[1].value);
//                    } else {
//                    	t[1].value="0";
//                    	console.log("t6"+t[6].value+" "+t[1].value);
//                    }
//                    
//                    if (t[7].value == "accept") {
//                    	t[2].value="1";
//                    	console.log("t7"+t[7].value+" "+t[2].value);
//                        //e(".form-responce").html("Please tick the box to agree to the terms and conditions!");
//                        //return false
//                    } else {
//                    	t[2].value="0";
//                    	console.log("t7"+t[7].value+" "+t[2].value);
//                    }
                    n._submitted = true;
                    e(".form-responce").html("Submitting score...")
                },
                success: function(t, r, i, s) {
                    n._counti = t.counti;
                    //console.log("T : "+t+" R :"+r+" I :"+i);
                    //_gaq.push(["_trackEvent", "submit your score button", "submit", "submit score"]);
                    e(".form-responce").html("Your score has been submitted!");
                    setTimeout(function() {
                        n.options.rsQuestions.next()
                        $('#signup-form').addClass('sos-signup-form');
                    }, 1e3)
                }
            };
            debugger ;e("#signup-form").ajaxForm(r)
        },
        _createLeaderboardPage: function(t) {
            var n = this;
            setTimeout(function() {
                /* add serviceURL here */
                //e("#leaderboardData").load(n.options.serviceURL + "load_scores/" + n._counti, function(t, n, r) {
                	$.get(n.options.serviceURL + "load_scores/" + n._counti, function(t, n, r) {
                	//console.log("T : "+t+" R :"+r+" N :"+n);
                	var score = eval(t);
                	var i=0;
                	$.each(t,function(){
                    		if(i<5){
                            		$("#leaderboard-wrapper #leaderboard").append("\r\n<div class=\"player-score clearfix\">\r\n"+ 
            							"		<p class=\"user-num\">"+score[i].id+"</p>\r\n" + 
            							"		<p class=\"user-score\">"+score[i].score+"</p>\r\n" + 
            							"		<p class=\"user-name\"><span>"+score[i].name+"</span></p>\r\n" + 
            							"		</div>\r\n");
                                        }
                            else{                                        
                                        $("#leaderboard-container").append("<div id=\"fb-root\"></div>\r\n" + 
                                				"<script>(function(d, s, id) {\r\n" + 
                                				"		  var js, fjs = d.getElementsByTagName(s)[0];\r\n" + 
                                				"		  if (d.getElementById(id)) return;\r\n" + 
                                				"		  js = d.createElement(s); js.id = id;\r\n" + 
                                				"		  js.src = \"//connect.facebook.net/en_GB/all.js#xfbml=1\";\r\n" + 
                                				"		  fjs.parentNode.insertBefore(js, fjs);\r\n" + 
                                				"		}(document, 'script', 'facebook-jssdk'));</script>"+              
                        					"		\r\n<div id=\"my-score\" class=\"player-score clearfix\">\r\n" + 
                        					"		<p class=\"user-num\">"+score[i].id+"</p>\r\n" + 
                        					"		<p class=\"user-score\">"+score[i].score+"</p>\r\n" + 
                        					"		<p class=\"user-name\"><span>"+score[i].name+"</span></p>\r\n" + 
                        					"		</div>\r\n"+
                        					"				<div id=\"share-score-wrapper\" class=\"underdashed\">\r\n" + 
                        					"				<div id=\"share-score\" class=\"clearfix\">\r\n" + 
                        					"					<p>Share </p>\r\n" + 
                        					"					<div id=\"fb-like-btn\"><fb:like send=\"true\" layout=\"button_count\" width=\"450\" show_faces=\"false\"></fb:like></div>\r\n" + 
                        					"					<script>FB.XFBML.parse();</script>					\r\n" + 
                        					"					<div id=\"t-tweet-btn\"><a href=\"https://twitter.com/share\" class=\"twitter-share-button\" data-lang=\"en\" data-count=\"none\"></a></div>\r\n" + 
                        					"					<script>twttr.widgets.load();</script>									\r\n" + 
                        					"					<div id=\"linkedin-share-btn\">\r\n" + 
                        					"						<script type=\"IN/Share\"></script>\r\n" + 
                        					"						<script>IN.parse();</script>\r\n" + 
                        					"					</div>	\r\n" + 
                        					"					<div id=\"google-share-btn\">\r\n" + 
                        					"						<div class=\"g-plusone\" data-size=\"medium\" data-annotation=\"none\"></div>\r\n" + 
                        					"					</div>					\r\n" + 
                        					"					<script>\r\n" + 
                        					"					var gbuttons = $(\".g-plusone\");\r\n" + 
                        					"					if (gbuttons.length > 0) {\r\n" + 
                        					"					    if (typeof (gapi) != \"undefined\") {\r\n" + 
                        					"					        gbuttons.each(function () {\r\n" + 
                        					"					            gapi.plusone.render($(this).get(0), {\"size\": \"medium\", \"annotation\":\"none\"});\r\n" + 
                        					"					        });\r\n" + 
                        					"					    } else {\r\n" + 
                        					"					        $.getScript(\"https://apis.google.com/js/plusone.js\");\r\n" + 
                        					"					    }\r\n" + 
                        					"					}\r\n" + 
                        					"					</script>					\r\n" + 
                        					"				</div>\r\n" + 
                        					"			</div>"
                                        
                                        
                                        
                                        
                                        );
                                                                                
                                        }
                                i++;
                            	});
                	//$(".player-score:last").addClass("").removeClass("");
                    if (n == "error") {} else {
                        e("#quiz-leaderboard .player-score").css({
                            left: "-528px",
                            "-khtml-opacity": "0",
                            "-moz-opacity": "0",
                            "-ms-filter": '"alpha(opacity=0)"',
                            filter: "alpha(opacity=0)",
                            filter: "progid:DXImageTransform.Microsoft.Alpha(opacity=0)",
                            opacity: "0"
                        });
                        var i = 0;
                        var s = 400;
                        var o;
                        e("#quiz-leaderboard .player-score").each(function(t, n) {
                            o = !t ? 0 : s + s * i;
                            e(this).delay(o).animate({
                                left: "+=528px",
                                "-khtml-opacity": "1",
                                "-moz-opacity": "1",
                                "-ms-filter": '"alpha(opacity=100)"',
                                filter: "alpha(opacity=100)",
                                filter: "progid:DXImageTransform.Microsoft.Alpha(opacity=1)",
                                opacity: "1"
                            }, 400);
                            !t ? true : i++
                        })
                    }
                })
            }, 600)
        },
        _isValidEmailAddress: function(e) {
            var t = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
            return t.test(e)
        },
        createAnswersSlider: function(t) {
            e(this.options.rsAnswersEl + "-" + this._currentQuestionID).royalSlider({
                autoScaleSlider: false,
                autoScaleSliderWidth: 486,
                autoScaleSliderHeight: 570,
                imageScaleMode: "none",
                imageAlignCenter: false,
                imageScalePadding: 0,
                controlNavigation: "none",
                arrowsNav: false,
                arrowsNavAutoHide: true,
                arrowsNavHideOnTouch: false,
                slidesSpacing: 0,
                startSlideId: 0,
                loop: false,
                loopRewind: false,
                randomizeSlides: false,
                numImagesToPreload: 12,
                slidesOrientation: "vertical",
                transitionType: "move",
                transitionSpeed: 600,
                easeInOut: "easeInOutSine",
                easeOut: "easeOutSine",
                controlsInside: true,
                navigateByClick: false,
                sliderDrag: false,
                sliderTouch: false,
                keyboardNavEnabled: false,
                fadeinLoadedSlide: true,
                allowCSS3OnWebkit: true,
                globalCaption: true,
                addActiveClass: false,
                minSlideOffset: 10,
                autoHeight: true,
                slides: null,
                autoPlay: {
                    enabled: false,
                    pauseOnHover: false,
                    stopAtAction: false,
                    delay: 4e3
                }
            });
            this.options.rsAnswers = e(this.options.rsAnswersEl + "-" + this._currentQuestionID).data("royalSlider")
        },
        createAnswerResponce: function(t) {
            var n = t.attr("id").substring(1);
            var r = this.options.rsAnswersEl + "-" + this._currentQuestionID;
            e(r + " .answers a").each(function() {
                if (!e(this).hasClass("correct") && !e(this).hasClass("incorrect"))
                    e(this).fadeTo("slow", .5);
                var t = this;
                setTimeout(function() {
                    e(t).remove()
                }, 2e3)
            });
            var i = this;
            setTimeout(function() {
                e(r + " .rsOverflow").css({
                    overflow: "visible"
                });
                e(r + " .rsSlide").css({
                    overflow: "visible"
                });
                e(r + " .response .btn-white-large").show();
                if (i._currentQuestionID != i._totalQuestionsNum) {} else {
                    e(r + " .response .btn-white-large").html("Go see your score!")
                }
                e(r + " .response a.btn-white-large").animate({
                    left: "-" + e(".left-wrapper").css("margin-left"),
                    "-khtml-opacity": "1",
                    "-moz-opacity": "1",
                    "-ms-filter": '"alpha(opacity=100)"',
                    filter: "alpha(opacity=100)",
                    filter: "progid:DXImageTransform.Microsoft.Alpha(opacity=1)",
                    opacity: "1"
                }, 1e3, function() {
                    e(this).on("click", function(e) {
                        i.options.rsQuestions.next();
                        return false
                    })
                })
            }, 2e3);
            e(r + " .answers").clone().insertAfter(r + " .response .rsABlock-subtitle");
            e(r + " .response a").each(function() {
                if (!e(this).hasClass("correct") && !e(this).hasClass("incorrect") && !e(this).hasClass("btn-white-large") && !e(this).hasClass("btn-white-small"))
                    e(this).remove()
            });
            e(r + " .response a.btn-answer-anim").css({
                cursor: "default"
            });
            e(r + " .response a.btn-answer-anim").on("click", function(e) {
                return false
            });
            e(r + " .response .rsABlock-subtitle").html(t.hasClass("correct") ? this.options.correctMsg : this.options.incorrectMsg);
            e(r + " .response .rsABlock-body").html(this.getAnswerField(this._currentQuestionID, n, "response"))
        },
        restartQuiz: function(e) {},
        startTime: function(t) {
            this._watch.start();
            this._watch.setListener(this.updateClock);
            e("#progress-wrapper").removeClass("progress-out-anim")
        },
        pauseTime: function(t) {
            this._watch.stop();
            e("#progress-wrapper").addClass("progress-out-anim")
        },
        stopTime: function(e) {},
        updateClock: function(t) {
            e("#progress p").html(t.toString().substring(3, 9))
        },
        getQuestion: function(e) {},
        getAnswer: function(e) {},
        getQuestionAnimation: function(e) {},
        resetOptions: function(e) {},
        getScore: function(e) {},
        onAnswerClick: function(t) {
            var n = t.data.answerEl;
            var r = t.data.base;
            var i = n.parents().eq(6).attr("id").substring(1);
            var s = n.attr("id").substring(1);
            var o = r.checkAnswer(i, s);
            r.pauseTime();
            if (o) {
                n.addClass("correct");
                e("#progress" + i).addClass("correct")
            } else {
                n.addClass("incorrect");
                e("#progress" + i).addClass("incorrect")
            }
            r.options.results[parseInt(i) - 1] = o;
            r.disableAnswers(i);
            r.createAnswerResponce(n);
            setTimeout(function() {
                r.options.rsAnswers.next()
            }, 1e3);
            return false
        },
        checkAnswer: function(e, t) {
            for (qKey in this.options.quiz_data) {
                if (e == this.options.quiz_data[qKey].id) {
                    for (aKey in this.options.quiz_data[qKey].answers) {
                        if (t == this.options.quiz_data[qKey].answers[aKey].id) {
                            return this.options.quiz_data[qKey].answers[aKey].is_correct == "1" ? true : false
                        }
                    }
                }
            }
            return false
        },
        getAnswerField: function(e, t, n) {
            for (qKey in this.options.quiz_data) {
                if (e == this.options.quiz_data[qKey].id) {
                    for (aKey in this.options.quiz_data[qKey].answers) {
                        if (t == this.options.quiz_data[qKey].answers[aKey].id) {
                            return this.options.quiz_data[qKey].answers[aKey][n]
                        }
                    }
                }
            }
            return false
        },
        disableAnswers: function(t) {
            e("#q" + t + " .answers a").each(function(t, n) {
                e(this).off();
                e(this).on("click", function(e) {
                    return false
                })
            })
        },
        submitScore: function(e, t, n, r, i) {},
        getResultsPage: function(e) {},
        _setOption: function(t, n) {
            switch (t) {
            case "someValue":
                break;
            default:
                this.options[t] = n;
                break
            }
            e.Widget.prototype._setOption.apply(this, arguments)
        },
        destroy: function() {
            e.Widget.prototype.destroy.call(this)
        }
    })
}
)(jQuery, window, document)

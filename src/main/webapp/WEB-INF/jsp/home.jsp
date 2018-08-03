<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title ng-cloak>{{title}}</title>
    <meta name="description" content="Test your knowledge on the basics of travel safety for a chance to win a $200 voucher every quarter" />
    <meta name="keywords" content="travel risk awareness, spot the risk, Spot the risk quiz, travel risk awareness quiz, travel safety quiz, travel security quiz" />
    <meta name="author" content="thisistommy" />
    <meta name="robots" content="index, follow" />
    <!--<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">-->
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
    <meta name="format-detection" content="telephone=no">

    <meta property="og:title" content="Spot the risk" />
    <meta property="og:type" content="game" />
    <meta property="og:url" content="http://spottherisk.com/" />
    <meta property="og:image" content="assets/img/share-pic.jpg" />
    <meta property="og:site_name" content="Spot the risk" />
    <meta property="og:description" content="Test your knowledge on the basics of travel safety for a chance to win a $200 voucher every quarter" />

    <link rel="stylesheet" href="assets/css/ui-grid.css" type="text/css">

	<!-- Bootstrap Core CSS -->
    <!-- <link href="assets/css/bootstrap.min.css" rel="stylesheet"> -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/2.3.2/css/bootstrap-responsive.min.css" />
    <!-- <link href="assets/css/bootstrap-responsive.min.css" rel="stylesheet"> -->

    <!-- Custom Fonts -->
    <!-- <link href="assets/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"> -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.2.0/css/font-awesome.min.css" />
    <!-- Custom CSS -->

<!--    <link href="assets/css/layout.css" rel="stylesheet">
    <link href="assets/css/skeleton.css" rel="stylesheet">-->

    
  <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries --> 
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
    <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->

    <!-- import css files -->
    <link href="assets/css/normalize.css" rel="stylesheet" type="text/css" />
    <!--<link href="/assets/css/base.css" rel="stylesheet" type="text/css" />-->
    <link href="assets/css/skeleton.css" rel="stylesheet" type="text/css" />
    <link href="assets/css/layout.css" rel="stylesheet" type="text/css" />
    <link href="assets/js/vendor/royalslider/royalslider.css" rel="stylesheet" type="text/css" />
    <link href="assets/js/vendor/royalslider/default/rs-default.css" rel="stylesheet" type="text/css" />
    <link rel="shortcut icon" href="/assets/img/favicon.ico" type="image/vnd.microsoft.icon" /><!-- type="image/x-icon" -->

    <!-- <script src="assets/js/vendor/modernizr-2.6.1-respond-1.1.0.min.js"></script> -->

    <!-- <script src="assets/js/jquery.min.js" defer="true"></script> -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="assets/js/bower_components/jquery/jquery.min.js"><\/script>')</script>
    <!-- import js files -->
    <script type="text/javascript" src="assets/js/vendor/jquery-ui-1.8.23.custom.min.js"></script>
    
    <!-- <script type="text/javascript" src="assets/js/vendor/jquery.scrollTo.min.js"></script> -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-scrollTo/1.4.13/jquery.scrollTo.min.js"></script>
    
    <script type="text/javascript" src="assets/js/vendor/stopwatch.js" defer="defer"></script>
    
    <!-- <script type="text/javascript" src="assets/js/vendor/modernizr-2.6.1-respond-1.1.0.min.js"></script> -->
	<script src="https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.6.1/modernizr.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/respond.js/1.1.0/respond.min.js"></script>
	
    <script type="text/javascript" src="assets/js/jquery.form.js" defer="defer"></script>
    <script type="text/javascript" src="assets/js/jquery.isosquiz.js"></script>
    <script type="text/javascript" src="assets/js/script.js"></script>
    <script type="text/javascript" src="assets/js/plugins.js"></script>


    <link href="assets/css/styles.css" rel="stylesheet">
</head>
<body class="upa-body app">
      <div id="wrapper">
		<!-- Header Start -->
		<header class="sos-header-container" ng-include="'assets/includes/header.html'"></header>
		<!-- Header End -->
        <!-- Content Start -->
		<div ng-include="'assets/includes/content.html'"></div>
		<!-- Content End -->
		<!-- Footer Start -->
		<footer ng-include="'assets/includes/footer.html'"></footer>
		<!-- Footer End -->
    </div>
    <!-- /#wrapper -->
    <!-- <script type="text/javascript" data-main="assets/js/bootstrapper.js" src="assets/js/bower_components/requirejs/require.js"></script> -->
    <script type="text/javascript" data-main="assets/js/bootstrapper.js" src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.1.11/require.js" defer="defer"></script>
	<!-- Loading bar html code -->
	<div class="spinner" ng-if="dataLoading"><div class="spinnerround"></div></div>

</body>
</html>


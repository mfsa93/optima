<!doctype html>
<html lang="es">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Optima</title>
	<!-- STYLES -->
  <link href='http://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,700' rel='stylesheet' type='text/css'>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
  <link rel="stylesheet" href="/css/bootstrap.min.css">
	<link rel="stylesheet" href="/css/improve.css">
	<link rel="stylesheet" href="/css/quill.base.css">
	<link rel="stylesheet" href="//cdn.quilljs.com/0.20.1/quill.snow.css" />

	<style media="screen">
		body {
			background: rgba(49,46,129,1);
		background: -moz-linear-gradient(top, rgba(49,46,129,1) 0%, rgba(128,172,218,1) 100%);
		background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(49,46,129,1)), color-stop(100%, rgba(128,172,218,1)));
		background: -webkit-linear-gradient(top, rgba(49,46,129,1) 0%, rgba(128,172,218,1) 100%);
		background: -o-linear-gradient(top, rgba(49,46,129,1) 0%, rgba(128,172,218,1) 100%);
		background: -ms-linear-gradient(top, rgba(49,46,129,1) 0%, rgba(128,172,218,1) 100%);
		background: linear-gradient(to bottom, rgba(49,46,129,1) 0%, rgba(128,172,218,1) 100%);
		filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#312e81', endColorstr='#80acda', GradientType=0 );
			background-size: cover;
			background-repeat: no-repeat;
    background-attachment: fixed;
		}
		.top-bar {
				background: #312E81;
		}

		.sidebar__right-fixed {
			position: fixed;
			margin: 0 30px 0 0
		}

		.editor {
			float: left;
			width: 100%;
		}
		.ql-container {
			padding: 0 !important;
		}
		.ql-editor {
			border-bottom: 1px solid #ddd;
			padding-bottom: 15px;
		}

		.ql-editor:focus {
			border-bottom: 2px solid #2196f3;
		}

		.list-group-item {
			cursor: pointer;
			transition: all 250ms all;
		}

		.list-inline li {
			padding: 5px;
		}

		.priority {
			display: inline-block;
			width: 12px;
			height: 12px;
			border-radius: 12px;
			transition: all 300ms;
		}

		.priority--active {
			border: 2px solid #333;
		}

		.priority--1 {
			background: #ACFF12;
		}

		.priority--2 {
			background: #FFF113;
		}

		.priority--3 {
			background: #F20022;
		}

		.center {
			display: block;
			margin: auto;
		}
		.quo-header {
			display: flex;
			align-items: center;
		}

		.quo-header h4, .quo-header h5 {
			margin: 0;
		}

		.quo-header h5 {
			align-self: flex-end;
		}

		.quo-header__priority {
			padding-left: 30px;
		}

		.label-Nula {
			background: #333;
		}

		.label-Por_confirmar {
			background: #CD940C;
		}

		.label-No_efectiva, .label-No_enviada {
			background: #FC3938;
		}

		.alert-message{
			position: fixed;
			top: 90px;
			right: 40px;
			min-height: 40px;
			padding: 10px;
			width: 250px;
			background: #FC3938;
			color: #fff;
			box-shadow: 0 0 5px rgba(0,0,0, .1);
			z-index: 1010;
			transition: all 500ms ease;
		}

		.alert-message--outside {
			right: -300px;
		}
	</style>


	<style>
		.flatpickr-input,.flatpickr-wrapper input{z-index:1;cursor:pointer}.flatpickr-wrapper{position:absolute;display:block}.flatpickr-wrapper.inline,.flatpickr-wrapper.static{display:block;position:relative}.flatpickr-wrapper.inline .flatpickr-calendar{position:relative}.flatpickr-wrapper.static .flatpickr-calendar{position:absolute}.flatpickr-wrapper.inline .flatpickr-calendar,.flatpickr-wrapper.open .flatpickr-calendar{z-index:99999;display:block}.flatpickr-calendar{background:#fff;border:1px solid #ddd;font-size:90%;border-radius:3px;position:absolute;top:100%;left:0;margin-top:3px;display:none;width:256px}.flatpickr-calendar.hasWeeks{width:288px}.flatpickr-calendar.hasWeeks .flatpickr-weekdays span{width:12.5%}.flatpickr-calendar:after,.flatpickr-calendar:before{position:absolute;display:block;pointer-events:none;border:solid transparent;content:'';height:0;width:0;bottom:100%;left:22px}.flatpickr-calendar:before{border-width:5px;margin:0 -5px;border-bottom-color:#ddd}.flatpickr-calendar:after{border-width:4px;margin:0 -4px;border-bottom-color:#fff}.flatpickr-month{background:0 0;color:#000;padding:4px 5px 2px;text-align:center;position:relative}.flatpickr-next-month,.flatpickr-prev-month{text-decoration:none;cursor:pointer;position:absolute;top:.5rem}.flatpickr-next-month i,.flatpickr-prev-month i{position:relative}.flatpickr-next-month:hover,.flatpickr-prev-month:hover{color:#f99595}.flatpickr-prev-month{float:left;left:.5rem}.flatpickr-next-month{float:right;right:.5rem}.flatpickr-current-month{font-size:135%;font-weight:300;color:rgba(0,0,0,.7);display:inline-block}.flatpickr-current-month .cur_month{font-weight:700;color:#000}.flatpickr-current-month .cur_year{background:0 0;box-sizing:content-box;color:inherit;cursor:default;padding:0 0 0 2px;margin:0;width:3.1em;display:inline;font-size:inherit;line-height:inherit;height:initial;border:0}.flatpickr-current-month .cur_year:hover{background:rgba(0,0,0,.05)}.flatpickr-weekdays{font-size:90%;background:0 0;padding:2px 0 4px;text-align:center}.flatpickr-weekdays span{opacity:.54;text-align:center;display:inline-block;width:14.28%;font-weight:700}.flatpickr-weeks{width:32px;float:left}.flatpickr-days{padding-top:1px}.flatpickr-day{background:0 0;border:1px solid transparent;border-radius:150px;box-sizing:border-box;color:#393939;cursor:pointer;display:inline-block;width:34px;height:34px;line-height:33px;margin:0 1px 1px;text-align:center}.flatpickr-day:hover{background:#e6e6e6;border-color:#e6e6e6}.flatpickr-day.today{border-color:#f99595}.flatpickr-day.today:hover{border-color:#f99595;background:#f99595;color:#fff}.flatpickr-day.selected,.flatpickr-day.selected:hover{background:#446cb3;color:#fff;border-color:#446cb3}.flatpickr-day.disabled,.flatpickr-day.disabled:hover{color:rgba(57,57,57,.3);background:0 0;border-color:transparent;cursor:default}.flatpickr-am-pm,.flatpickr-time input[type=number],.flatpickr-time-separator{height:38px;display:inline-block;line-height:38px;color:#393939}.flatpickr-time{overflow:auto;text-align:center;border-top:1px solid #ddd}.flatpickr-time input[type=number]{background:0 0;-webkit-appearance:none;-moz-appearance:textfield;box-shadow:none;border:0;border-radius:0;width:33%;min-width:33%;text-align:center;margin:0;padding:0;cursor:pointer;font-weight:700}.flatpickr-am-pm:hover,.flatpickr-time input[type=number]:hover{background:#f0f0f0}.flatpickr-time input[type=number].flatpickr-minute{width:26%;font-weight:300}.flatpickr-time input[type=number].flatpickr-second{font-weight:300}.flatpickr-time input[type=number]:focus{outline:0;border:0}.flatpickr-time.has-seconds input[type=number]{width:25%;min-width:25%}.flatpickr-am-pm{width:21%;padding:0 2%;cursor:pointer;text-align:left}
		.flatpickr-days:focus {
			box-shadow: 0;
			outline: none;
		}

		.panel-heading h5 {
			margin: 0;
			font-size: 18px;
		}

	.toast_messsage {
		width: 100%;
		background: #F2364E;
		position: fixed;
		color: #fff;
		padding: 15px;
		top: -200px;
		transition: all 400ms;
		text-align:center;
	}

	.toast_messsage--show {
		z-index: 1090;
		top: 0px;
	}

	.list-item {
		list-style: none;
	}

	.my-tooltip {
		background: #f9f9f9;
		box-shadow: 0 0 10px rgba(0,0,0, .2);
		padding: 7px 7px 0 7px;
		width: 200px;
		z-index: 1030;
		border-radius: 3px;
		transition: all 300ms;
	}
	</style>

</head>

<body>
	<div id="toast_messsage" class="toast_messsage"></div>
	<div id="app"></div>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
	<!-- scripts -->

	<script>
		window.localStorage.setItem('user', JSON.stringify(<?php echo json_encode(Auth::user()) ?>));
	</script>

  <script src="/js/vendor.js"></script>
  <script src="/js/app.js"></script>

</body>
</html>

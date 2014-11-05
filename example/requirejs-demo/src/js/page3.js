require.config({
	baseUrl: 'js',
	paths: {
		'jquery': '../../../../vendor/jquery/dist/jquery.min',
		'jquery.minicolors': '../../../../vendor/jquery.minicolors/jquery.minicolors.min'
	},
	shim: {
　　　　'jquery.minicolors': {
　　　　　　deps: ['jquery'],
　　　　　　exports: 'jQuery.fn.minicolors'
　　　　}
　　}
});

require(['jquery','jquery.minicolors'], function($) {
	$('#mini').minicolors();
});
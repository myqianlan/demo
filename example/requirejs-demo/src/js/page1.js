require.config({
    baseUrl: 'js',
    urlArgs: "version=" + (new Date()).getTime()
});


require(['tips'], function(T) {
    T.say(",tips");

    require(['fly'], function(F) {
        F.say(",fly");
    });
});

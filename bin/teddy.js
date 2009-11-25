#!/usr/bin/env node
// For now, we’re going to develop with absolute paths. It’s just easier this
// way. I don’t really want to deal with putting my poopy.js package yet.
process.mixin(require.async("/Users/elliottcable/Code/poopy.js/lib/acquire").wait());
var poopy = acquire.absolute("/Users/elliottcable/Code/poopy.js/lib/poopy.js").wait();

posix = require('posix');

// This is a miniature spec–ing library which should work similar to grizzly
// itself. The purpose being to allow us to develop grizzly itself in a BDD
// manner—we have to be able to run grizzly’s specs as we write it.
// 
// As this functionality is un–spec’d, there is no guarantee that it will
// operate properly. I would advise against using it to spec anything,
// unless you have a really good reason. Really, the only reason this
// exists is to provide an extra layer of properly described abstraction
// (grizzly itself) between your code (described with grizzly, or utilizing
// a library described with grizzly) and the (necessarily) completely un–
// tested code (in this case, teddy).
// 
// `teddy` will be deprecated, and `grizzly`’s tests will be run with
// `grizzly` itself, as soon as `grizzly` is capable of basic test execution.
(function () {
  var teddy = {};
  
  teddy['description'] = (function () {
    var description = {}.beget();
    
    description['execute'] = function () {
      
    };
    
    return description;
  })();
  
  teddy['check'] = (function () {
    var check = {}.beget();
    
   (check['constructor'] = function (blueprint) {
      if (typeof blueprint['target'] !== 'undefined') {
        this['target'] = blueprint['target'] };
      if (typeof blueprint['expectation'] !== 'undefined') {
        this['expectation'] = blueprint['expectation'] };
    }).prototype = check;
    
    check['execute'] = function (target) {
      if (typeof target === 'undefined') {
        if (typeof this['target']['call'] !== 'undefined') {
          target = this['target'].call() }
        else {
          target = this['target'] }
      };
      
      return this['expectation'].apply(target);
    };
    
    return check;
  })();
  
  
  teddy['run'] = function (directory) {
    teddy.running = true;
    
    if (typeof directory === "undefined") {
      directory = 'descriptions' };
    descriptionsDirectory = process.cwd() + '/' + directory;
    
    // FIXME: Globally define `description` BAD IDEA OMGZORZ. Should probably
    //        inject `description` and `check` into the compiled descriptions
    //        as arguments to the wrapper function.
    description = teddy.description;
    
    posix.readdir(descriptionsDirectory)
      .addCallback(function (descriptions) {
        for (var arr=descriptions,l=arr.length,i=0,it=arr[i];i<l;i++,it=arr[i]){
          var description = acquire(descriptionsDirectory + '/' + it);
          description.execute();
        };
      })
      .addErrback(function () {
        node.stdio.writeError("could not read " + descriptionsDirectory); });
    
    // FIXME: This is stupid, it will become false *before* the checks run
    //        #asyncronicityfail.
    teddy.running = false;
  };
  
  if (process.ARGV[1] === __filename && !teddy.running) { teddy.run() };
  return teddy;
})();

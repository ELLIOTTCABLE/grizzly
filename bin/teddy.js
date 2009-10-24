#!/usr/bin/env node
require("/acquire.js");
acquire("/poopy");

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
  
  (function () {
    teddy['description'] = {};
    
    teddy.description['Begettor'] = function () {
      
    };
    
    teddy.description['execute'] = function () {
      
    };
    
    return teddy.description;
  })();
  
  teddy['run'] = function (directory) {
    if (typeof directory === "undefined") {
      directory = 'descriptions' };
    descriptionsDirectory = node.cwd() + '/' + directory;
    
    // Globally define `description` BAD IDEA OMGZORZ
    description = teddy.description;
    
    node.fs.readdir(descriptionsDirectory)
      .addCallback(function (descriptions) {
        for (var arr=descriptions,l=arr.length,i=0,it=arr[i];i<l;i++,it=arr[i]){
          var description = acquire(descriptionsDirectory + '/' + it);
          description.execute();
        };
      })
      .addErrback(function () {
        node.stdio.writeError("could not read " + descriptionsDirectory); });
  };
  
  if (process.ARGV[1] === __filename && !teddy.running) {
    teddy.running = true; teddy.run(); };
  return teddy;
})();

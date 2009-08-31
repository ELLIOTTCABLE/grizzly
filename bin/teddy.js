#!/usr/bin/env node
include("../../poopy.js/lib/poopy.js");

(function () {
  var loadDescriptions = function (path) {
    node.createProcess('$(which ls) -Ap "' + path + '"')
      .addListener("output", function (data) { if(data != null) {
        
        for (var t = data.split("\n"), l = t.length, i = 0; i < l; i++) { var it = t[i];
          if(it[it.length - 1] == "/") {
            loadDescriptionsIn(path + "/" + it);
          } else if(it.length > 0) {
            puts('-- including: ' + it);
            include(it);
          };
        };
        
      }});
  };
  
  loadDescriptions('desc');
})();

function onLoad() {
  
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
  (function () {
    teddy = {};
    
    (function () {
      teddy['description'] = {};
      
      teddy.description['Begettor'] = function () {
        
      };
      
      teddy.description['execute'] = function () {
        puts(this + ' executed!');
      };
      
      return teddy['description'];
    })();
    
    return teddy;
  })();
  
};

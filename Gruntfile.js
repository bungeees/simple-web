module.exports = function(grunt){
  var src_root = "src/";
  var dest_root = "../htdocs/";

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    /*
       ----- COMPASS -----
    */

    compass: {
      compile: {
        options: {
          config: "config.rb"
        }
      }
    },

    /*
       ----- JADE -----
    */

    jade: {
      compile: {
        options: {
          data: function(){return require("./"+src_root+"jade/setting.json");},
          pretty: true
        },
        cwd: src_root+"jade/",
        expand: true,
        src: ["index.jade"],
        dest: dest_root,
        ext: ".html",
      }
    },

    /*
       ----- JSHINT -----
    */
    
    jshint: {
      cwd: src_root+"js/app/"
    },

    /*
       ----- CONCAT -----
    */

    concat: {
      js:{
        src: [
          src_root+"js/app/**/*.js",
          src_root+"js/main.js"
          ],
        dest: dest_root+"js/app.js"
      },
    },

    /*
       ----- CLEAN -----
    */

    clean: {
      options: {
        force: true
      },
      dest: dest_root
    },

    /*
       ----- COPY -----
    */

    copy: {
      favicon: {
        expand: true,
        cwd: src_root,
        src: "*.ico",
        dest: dest_root
      },
      css: {
        expand: true,
        cwd: src_root,
        src: "css/**/*.css",
        dest: dest_root,
      },
      js: {
        expand: true,
        cwd: src_root,
        src: [
          "js/app.js",
          "js/lib/**/*.js"
        ],
        dest: dest_root
      },
      img: {
        expand: true,
        cwd: src_root,
        src: [
          "img/*.png",
          "img/*.jpg",
          "img/*.jpeg"
        ],
        dest: dest_root,
      }
    },

    /*
       ----- CONNECT -----
    */

    connect: {
      http: {
        options: {
          port: 9000,
          hostname: "localhost",
          base: dest_root
        }
      }
    },

    /*
       ----- OPEN -----
    */

    open: {
      browser: {
        path: "http://localhost:9000/",
        app: "Google Chrome"
      }
    },

    /*
       ----- WATCH -----
    */

    watch: {
      options: {
        livereload: true
      },
      sass: {
        files: [
          src_root+"sass/**/*.scss",
          src_root+"sass/**/_*.scss"
        ],
        tasks: ["compass:compile","copy:css", "copy:img"]
      },
      jade: {
        files: [
          src_root+"jade/**/*.jade",
          src_root+"jade/**/*.json"
        ],
        tasks: ["jade:compile"]
      },
      js: {
        files: [
          src_root+"js/app/*.js",
          src_root+"js/main.js"
        ],
        tasks: ["jshint", "concat:js", "copy:js"]
      }
    },

    pngmin: {
      compile: {
        options: {
          force: true,
          ext: ".png"
        },
        files: [
          {
            src: dest_root+"img/*.png",
            dest: dest_root+"img/"
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-compass");
  grunt.loadNpmTasks("grunt-contrib-jade");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-open");
  grunt.loadNpmTasks("grunt-pngmin");

  var compile_tasks = [
    "clean:dest",
    "compass:compile",
    "jade:compile",
    "jshint",
    "concat",
    "copy:favicon",
    "copy:css",
    "copy:js",
    "copy:img",
    "pngmin:compile"
  ];
  var watch_tasks = [
    "connect:http",
    "open:browser",
    "watch"
  ];

  grunt.registerTask("c", compile_tasks);
  grunt.registerTask("w", watch_tasks);
  grunt.registerTask("default", compile_tasks.concat(watch_tasks));
};

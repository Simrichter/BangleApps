// Settings menu for the Puzzle15 app

(function(back) {
  var FILE = "puzzle15.json";
  // Load settings
  var settings = Object.assign({
    splashMode: "long",
    startWith: "4x4"
  }, require('Storage').readJSON(FILE, true) || {});

  function writeSettings() {
    require('Storage').writeJSON(FILE, settings);
  }

  // Helper method which uses int-based menu item for set of string values
  function stringItems(startvalue, writer, values) {
    return {
      value: (startvalue === undefined ? 0 : values.indexOf(startvalue)),
      format: v => values[v],
      min: 0,
      max: values.length - 1,
      wrap: true,
      step: 1,
      onchange: v => {
        writer(values[v]);
        writeSettings();
      }
    };
  }

  // Helper method which breaks string set settings down to local settings object
  function stringInSettings(name, values) {
    return stringItems(settings[name], v => settings[name] = v, values);
  }

  var mainmenu = {
    "": {
      "title": "15 Puzzle"
    },
    "< Back": () => back(),
    "Splash": stringInSettings("splashMode", ["long", "short", "off"]),
    "Start with": stringInSettings("startWith", ["3x3", "4x4", "5x5", "menu"])
  };

  // Actually display the menu
  E.showMenu(mainmenu);

})

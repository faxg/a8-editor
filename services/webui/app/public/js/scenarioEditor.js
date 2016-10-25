var topologyEditor = ace.edit('editorTopology');
var checksEditor = ace.edit('editorChecks');
var gremlinsEditor = ace.edit('editorGremlins');


/**
 * Knockout.js view model
 */
function RecipeViewModel(options) {
    var self = this;
    self.options = options; //  contains config properties (like service endpoints) from rendered template

    // Name of the recipe
    self.name = ko.observable("My Recipe");
    // short description.
    self.description = ko.observable("");
    // header field to use
    self.header = ko.observable("Cookie");
    // header field pattern (selektor)
    self.pattern = ko.observable("group=QA");

    // santitized camel case version of name (for generating ids, filenames etc.)
    self.sanitizedName = ko.computed(function() {
        return self.name().toLowerCase()
            // Replaces any - or _ characters with a space 
            .replace(/[-_]+/g, ' ')
            // Removes any non alphanumeric characters 
            .replace(/[^\w\s]/g, '')
            // Uppercases the first character in each group immediately following a space 
            // (delimited by spaces) 
            .replace(/ (.)/g, function($1) {
                return $1.toUpperCase();
            })
            // Removes spaces 
            .replace(/ /g, '');
    });

    // computed command line for a8ctl
    self.cmdLine = ko.computed(function() {
        var name = self.sanitizedName();
        var httpHeader = self.header();
        var selector = self.pattern();

        return `a8ctl recipe-run --topology ${name}.topology.json --scenarios ${name}.gremlins.json 
                --checks ${name}.checks.json 
                --header '${httpHeader}' 
                --pattern='${selector}' `;
    });

    // holds latest error message, e.g. parsing errors
    self.errorMessage = ko.observable("");
    // observables for ace editors / source code

    // topology editor source - changes are throttled, because depended observables 
    // will trigger REST calls to the backend 
    self.srcTopology = ko.observable("{}")
        .extend({ rateLimit: { timeout: 500, method: "notifyWhenChangesStop" } });
    self.srcGremlins = ko.observable("{}")
        .extend({ rateLimit: { timeout: 500, method: "notifyWhenChangesStop" } });
    self.srcChecks = ko.observable("{}")
        .extend({ rateLimit: { timeout: 500, method: "notifyWhenChangesStop" } });;

    // html fragment returned by topologyService#dependencyView API call.
    // does async request and DOM updates with JQuery
    self.htmlTopology = ko.computed(function() {
        var apiRoot = self.options['topologyServiceEndpoint'];
        var data = encodeURIComponent(self.srcTopology()); // wire data, urlencoded

        var url = `${apiRoot}/dependencyView?data=${data}`;

        // Reload dependency view
        $('#dependencyViewContainer').load(`${url}`);
    });



    // parser/validation of JSON sources
    self.parseHelper = function(src) {
        // ignore empty source
        if (!src) return "";

        try {
            var s = JSON.parse(src);
        } catch (parseException) {
            return parseException;
        }
        return "";
    };


    self.srcTopologyMessage = ko.computed(function() {
        return self.parseHelper(self.srcTopology());
    });
    self.srcGremlinsMessage = ko.computed(function() {
        return self.parseHelper(self.srcGremlins());
    });
    self.srcChecksMessage = ko.computed(function() {
        return self.parseHelper(self.srcChecks());
    });


    // call package & download 
    self.generateAndDownload = function() {
        var zip = new JSZip();
        zip.file(self.sanitizedName() + ".topology.json", self.srcTopology());
        zip.file(self.sanitizedName() + ".checks.json", self.srcChecks());
        zip.file(self.sanitizedName() + ".gremlins.json", self.srcGremlins());
        zip.file("start-recipe-" + self.sanitizedName() + ".sh", "#!/bin/sh\n#" + self.description() + "\n" + +self.cmdLine(), {
            "unixPermissions": 0755
        });

        zip.generateAsync({
                type: "blob"
            })
            .then(function(content) {
                saveAs(content, self.sanitizedName() + ".zip");
            });
    };

    /**
     * handler function to populate source editors from some (static) templates 
     */
    self.loadFromTemplate = function() {
        $.getJSON("/templates/sample.topology.json", function(data) {
            self.srcTopology(JSON.stringify(data, null, 2));
            topologyEditor.resize();
        });
        $.getJSON("/templates/sample.gremlins.json", function(data) {
            self.srcGremlins(JSON.stringify(data, null, 2));
            gremlinsEditor.resize();
        });
        $.getJSON("/templates/sample.checklist.json", function(data) {
            self.srcChecks(JSON.stringify(data, null, 2));
            checksEditor.resize();
        });
    }


}





/** initialize all editors */
var editor;
$('.editorComponent').each(function(index) {
    editor = ace.edit(this);
    editor.getSession().setMode('ace/mode/json');
    editor.setTheme("ace/theme/github");
    editor.setShowPrintMargin(false);
    editor.setHighlightActiveLine(true);
    editor.setBehavioursEnabled(true);
    editor.$blockScrolling = Infinity;
    editor.session.getUndoManager().reset();
    editor.resize();

});
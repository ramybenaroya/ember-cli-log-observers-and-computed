export {
    applyAOP,
    getCleanStackTrace,
    getStackTrace
};

function applyAOP(targetFunction, doBefore) {
    return function() {
        var length = arguments.length;
        var args = new Array(length);
        for (var x = 0; x < length; x++) {
            args[x] = arguments[x];
        }
        var self = this;
        var stackTrace = getStackTrace();
        var func = function() {
            doBefore.call(null, stackTrace);
            var length = arguments.length;
            var args = new Array(length);
            for (var x = 0; x < length; x++) {
                args[x] = arguments[x];
            }
            return self.apply(this, args);
        };
        return targetFunction.apply(func, args);
    };
}

function getCleanStackTrace() {
    var s = getStackTrace().stack,
        clean;
    // remove call to this function
    s.shift();
    // return clean
    return s.map(function(str) {
        clean = (str || "").trim().split("(")[0].split("?")[0].replace("at", "").split("http")[0].trim();
        return clean || "anonymous";
    });
}

function getStackTrace() {
    var callstack = [];
    var isCallstackPopulated = false;
    var lines, i, len, currentFunction, fn, fname;
    try {
        i.dont.exist += 0; //doesn't exist- that's the point
    } catch (e) {
        if (e.stack) { //Firefox
            lines = e.stack.split('\n');
            for (i = 0, len = lines.length; i < len; i++) {
                //if (lines[i].match(/^\s*[A-Za-z0-9\-_\$]+\(/)) {
                callstack.push(lines[i]);
                // }
            }
            if (callstack[0] && /^Type/.test(callstack[0])) {
                callstack.shift();
            }
            callstack.shift();
            isCallstackPopulated = true;
        } else if (window.opera && e.message) { //Opera
            lines = e.message.split('\n');
            for (i = 0, len = lines.length; i < len; i++) {
                var entry = lines[i];
                if (lines[i + 1]) {
                    entry += ' at ' + lines[i + 1];
                    i++;
                }
                callstack.push(entry);
            }
            if (callstack[0] && /^Type/.test(callstack[0])) {
                callstack.shift();
            }
            callstack.shift();
            isCallstackPopulated = true;
        }
    }
    if (!isCallstackPopulated) { //IE and Safari
        /* jshint ignore:start */
        currentFunction = arguments.callee.caller;
        /* jshint ignore:end */
        while (currentFunction) {
            fn = currentFunction.toString();
            fname = fn.substring(fn.indexOf('function') + 8, fn.indexOf('')) || 'anonymous';
            callstack.push(fname);
            currentFunction = currentFunction.caller;
        }
    }
    return {
        stack: callstack,
        str: callstack.join('\n\nStack Trace:\n')
    };
}
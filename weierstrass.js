// the nth function is (3/4)^n * (g(4^n x)) where g(0) is defined by: g(x) = |x| for -1 <= x < 1 and g(x+2) = g(x)
function g(x, n) {
  x *= Math.pow(4.0, n);
  ax = Math.abs(x);
  fx = Math.floor(ax);
  return Math.pow(3.0/4.0, n) * Math.abs(ax - fx - fx % 2);
}


// given x and m, returns g0(x) + g1(x) + ... + gm(x)
function gsum(x, m) {
  rslt = 0.0;
  for (var n = 0; n <= m; n++) {
    rslt += g(x, n);
  }
  return rslt;
}

// general purpose: just like linspace in numpy
function linspace(minx, maxx, npts) {
  var xs = [];
  var len = 1.0 * (maxx - minx);
  var dx = len / (npts-1);
  for (var i = 0; i < npts; i++) {
    xs.push(minx + i*dx);
  }
  return xs;
}

// get the x-coordinates based on the max iteration
function getXs(minx, maxx, m) {
  return linspace(minx, maxx, Math.pow(4,m)*(maxx - minx) + 1.0);
}

// map the provided function and m to the list of xs
function getYs(xs, m) {
  var ys = [];
  for (var i = xs.length - 1; i >= 0; i--) {
    ys[i] = gsum(xs[i], m);
  }
  return ys;
}

// get the label for the trace in the legent
function getLabel(n) {
  if(n == 0) return "g(0)";
  else return getLabel(n-1) + " + g(" + n + ")";
}

var minx = -4.0
var maxx = 4.0
var iters = 4;
var xs = getXs(minx, maxx, iters);
var graphDiv = 'plot';

var trace0 = {x: xs, y: getYs(xs, 0), mode: "lines", name: getLabel(0), hoverinfo: "none"}
Plotly.newPlot(graphDiv, [trace0], {title: "Building a Weierstrass Function"});
setTimeout(function() { draw(1);}, 3000);

function draw(n) {
  Plotly.addTraces(graphDiv, {x: xs, y: getYs(xs, n), mode: "lines", name: getLabel(n), hoverinfo: "none"});
  if (n < iters) setTimeout(function() { draw(n+1);}, 3000);
}


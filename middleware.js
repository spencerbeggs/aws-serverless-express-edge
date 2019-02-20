module.exports.eventContext = options => (req, res, next) => {
  options = options || {}; // defaults: {reqPropKey: 'apiGateway', deleteHeaders: true}
  const reqPropKey = options.reqPropKey || "edge";
  const deleteHeaders =
    options.deleteHeaders === undefined ? true : options.deleteHeaders;

  if (!req.headers["x-edge-event"] || !req.headers["x-edge-context"]) {
    console.error("Missing x-edge-event or x-edge-context header(s)");
    next();
    return;
  }

  req[reqPropKey] = {
    event: JSON.parse(decodeURIComponent(req.headers["x-edge-event"])),
    context: JSON.parse(decodeURIComponent(req.headers["x-edge-context"]))
  };

  if (deleteHeaders) {
    delete req.headers["x-edge-event"];
    delete req.headers["x-edge-context"];
  }
  delete req.headers["host"];
  next();
};

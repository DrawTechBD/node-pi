const throwResourceNotFound = (res, resource, property, value) => res.status(404).json({
  message: `No ${resource} found with ${property}=${value}.`,
  resource,
  property,
  value
});

module.exports = {
  throwResourceNotFound
}
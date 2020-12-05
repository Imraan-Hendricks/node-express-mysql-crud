const { validate, res } = require('../../../utils/validation');

const author = (type, isRequired) =>
  validate({ type, field: 'author', isRequired, min: 4, max: 100 })
    .trim()
    .matches(/^[A-Z](['-](?!['-])|\s[A-Z]|[a-z])*[a-z]$/)
    .withMessage('invalid');

const contentType = (type, isRequired) =>
  validate({ type, field: 'content-type', isRequired })
    .equals('application/json')
    .withMessage('incorrect content type');

const description = (type, isRequired) =>
  validate({ type, field: 'description', isRequired, min: 2, max: 300 })
    .trim()
    .matches(/^[^\\]+$/)
    .withMessage('backslash not allowed');

const id = (type, isRequired) =>
  validate({ type, field: 'id', isRequired })
    .isUUID(4)
    .withMessage('invalid id');

const limit = (type, isRequired) =>
  validate({
    type,
    field: 'limit',
    isRequired,
    defaultValue: '9006999999999999',
  })
    .isInt()
    .withMessage('must be an integer')
    .bail()
    .toInt();

const offset = (type, isRequired) =>
  validate({ type, field: 'offset', isRequired, defaultValue: '0' })
    .isInt()
    .withMessage('must be an integer')
    .bail()
    .toInt();

const sort = (type, isRequired) =>
  validate({ type, field: 'sort', isRequired, toJson: true }).custom(
    (value) => {
      if (!Array.isArray(value)) throw new Error('must be an array');
      return true;
    }
  );

const query = (type, isRequired) =>
  validate({ type, field: 'query', isRequired, toJson: true }).custom(
    (value) => {
      if (!Array.isArray(value)) throw new Error('must be an array');
      return true;
    }
  );

const title = (type, isRequired) =>
  validate({ type, field: 'title', isRequired, min: 4, max: 100 })
    .trim()
    .matches(
      /^[A-Z](["'-](?![!?"'-])|\s(?![!?\s])([A-Z]?)|([!?])(?![!?"'-])|[a-z])*[!?"'a-z]$/
    )
    .withMessage('invalid');

exports.check = {
  author,
  contentType,
  description,
  id,
  limit,
  offset,
  sort,
  query,
  title,
  res,
};

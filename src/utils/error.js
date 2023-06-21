const errors = ['login_error', 'set_profile_error'];

export default function handleError(e) {
  let error = false;
  errors.forEach(err => {
    error = error || (e.errors[err] ?? false);
  });
  return {error, message: e.message};
}

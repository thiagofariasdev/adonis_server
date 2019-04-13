'use strict'

const BaseExceptionHandler = use('BaseExceptionHandler')

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
	/**
	 * Handle exception thrown during the HTTP lifecycle
	 *
	 * @method handle
	 *
	 * @param  {Object} error
	 * @param  {Object} options.request
	 * @param  {Object} options.response
	 *
	 * @return {void}
	 */
	async handle(error, { request, response, view }) {
		const { code, status, message } = error;
		let url = request.originalUrl();
		if (error.code == 'EBADCSRFTOKEN') {
			return response.forbidden('server cant handle your request');
		}
		if (url.search(/\/api\//g) == -1) {
			let messages = {
				404: 'Not found',
				401: 'Unauthorized',
				400: 'Invalid',
				402: 'Payment necessary',
				500: 'Internal server error'
			}
			if (status == 401 && request.originalUrl().search(/\/login/g) != -1) {
				return response
					.status(status)
					.redirect(`/login?curl=${request.originalUrl()}`)
			} else if (status == 401) {
				return response
					.status(status)
					.redirect(`/login`);
			} else {
				let data = { code: status, message: messages[status], msg: message };
				return response
					.status(status)
					.send(view.render(`error.${status}`, data))
			}
		} else {
			return response
				.status(status)
				.json({ error: true, status: status, msg: message });
		}
	}

	/**
	 * Report exception for logging or debugging.
	 *
	 * @method report
	 *
	 * @param  {Object} error
	 * @param  {Object} options.request
	 *
	 * @return {void}
	 */
	async report(error, { request }) {
	}
}

module.exports = ExceptionHandler

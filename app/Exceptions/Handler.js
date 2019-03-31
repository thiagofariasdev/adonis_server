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
		let url = request.originalUrl();
		if (error.code == 'EBADCSRFTOKEN') {
			response.forbidden('server cant handle your request')
		}
		if (url.search(/\/api\//g) == -1) {
			let messages = {
				404: 'Not found',
				401: 'Unauthorized',
				400: 'Invalid',
				402: 'Payment necessary'
			}
			return response
				.status(error.status)
				.send(
					view.render('error.' + error.status, {
						code: error.status,
						message: messages[error.status] || 'Ooops!'
					})
				);
		} else {
			return response.status(error.status).json({ error: true, status: error.status, msg: error.message });
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

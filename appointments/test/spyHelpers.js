/**
 * Test helper function that produces a Response object (that is a Promise) to mimic what
 * would be returned from the fetch API.
 * @param {*} body 
 */
export const fetchResponseOk = body => 
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(body)
  })

/**
 * Test helper function that produces an error Response object that is also a promise
 */
export const fetchResponseError = () => 
  Promise.resolve({ ok: false })


/**
 * Produces the request body that will be used in the call to fetch
 */
export const requestBodyOf = fetchSpy => JSON.parse(fetchSpy.mock.calls[0][1]['body'])
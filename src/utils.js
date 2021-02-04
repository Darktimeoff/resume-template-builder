export async function callREST (path, reqData, method) {
  const requestSettings = {
    method: reqData ? 'POST' : 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }

  if (reqData) requestSettings.body = JSON.stringify(reqData)
  if (method) requestSettings.method = method

  const response = await fetch(path, requestSettings)

  if (!response.ok) {
    return {
      status: response.status,
      statusText: response.statusText,
      failed: true
    }
  }

  return await response.json()
}

export function uuid (base) {
  return `${base}-${Math.random() * 10}-${Math.random() * 10}`
}

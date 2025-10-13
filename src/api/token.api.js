const ACCESS_KEY = "access_token"
const REFRESH_KEY = "refresh_token"

export function getAccessToken() {
	try  {
		return JSON.parse(localStorage.getItem(ACCESS_KEY) || "null");
	} catch (e) {
		console.log(e);
		return null;
	}
}

export function getRefreshToken() {
	try  {
		return JSON.parse(localStorage.getItem(ACCESS_KEY) || "null");
	} catch (e) {
		console.log(e);
		return null;
	}
}

export function setTokens({accessToken, refreshToken}) {
	console.log("accessToken", accessToken);
	if (accessToken) {
		localStorage.setItem(ACCESS_KEY, JSON.stringify(accessToken));
	}

	if (refreshToken) {
		localStorage.setItem(REFRESH_KEY, JSON.stringify(refreshToken));
	}
}

export function clearTokens() {
	localStorage.removeItem(ACCESS_KEY);
	localStorage.removeItem(REFRESH_KEY);
}

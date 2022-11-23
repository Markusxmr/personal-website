import { v4 as uuid } from 'uuid';
import type { Handle } from '@sveltejs/kit';
import * as cookie from 'cookie';
// import { setSession } from '$houdini'

export const handle: Handle = async ({ event, resolve }) => {
	const cookies = cookie.parse(event.request.headers.get('cookie') || '');
	event.locals.userid = cookies['userid'] || uuid();

	// get the user information however you want
	// const user = await authenticateUser(event)
	// setSession(event, { user });
	// setSession(event, {});

	const response = await resolve(event);

	if (!cookies['userid']) {
		// if this is the first time the user has visited this app,
		// set a cookie so that we recognise them when they return
		response.headers.set(
			'set-cookie',
			cookie.serialize('userid', event.locals.userid, {
				path: '/',
				httpOnly: true
			})
		);
	}

	return response;
};

/** @type {import('@sveltejs/kit').GetSession} */
export function getSession(event: any) {
	return event.locals.user
		? {
			user: {
				// only include properties needed client-side —
				// exclude anything else attached to the user
				// like access tokens etc
				name: event.locals?.user?.name,
				email: event.locals?.user?.email,
				avatar: event.locals?.user?.avatar
			}
		}
		: {};
}
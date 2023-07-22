import { r as redirect, e as error } from "./index.js";
const handle = async ({ event, resolve }) => {
  if (event.url.pathname.startsWith("/protected-routes")) {
    const session = await event.locals.session;
    if (!session) {
      throw redirect(303, "/");
    }
  }
  if (event.url.pathname.startsWith("/protected-posts") && event.request.method === "POST") {
    const session = await event.locals.session;
    if (!session) {
      throw error(303, "/");
    }
  }
  return resolve(event);
};
export {
  handle
};

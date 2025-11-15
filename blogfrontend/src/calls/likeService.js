// src/calls/likeService.js
import apiServer from "../utils/apiServer.js";
import { LIKE_ROUTES } from "../utils/apiRoutes.js";

const likeService = {
  // Toggle like/unlike for a post (requires auth)
  toggleLike: async (postId) => {
    return apiServer(
      "post",
      LIKE_ROUTES.TOGGLE_LIKE(postId),
      {},
      { tokenRequired: true }
    );
  },
};

export default likeService;

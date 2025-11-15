// src/commentService.js
import apiServer from "../utils/apiServer.js";
import { COMMENT_ROUTES } from "../utils/apiRoutes.js";

const commentService = {
  // Get all comments for a post
  getComments: async (postId) => {
    return apiServer("get", COMMENT_ROUTES.GET_COMMENTS(postId));
  },

  // Add a new comment to a post (requires auth)
  addComment: async (postId, content) => {
    return apiServer(
      "post",
      COMMENT_ROUTES.ADD_COMMENT(postId),
      { content },
      { tokenRequired: true }
    );
  },
};

export default commentService;

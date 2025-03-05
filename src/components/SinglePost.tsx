import { useEntity, useUser } from "@replyke/react-js";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";

const SinglePost = ({
  handleOpenDiscussionSheet,
}: {
  handleOpenDiscussionSheet: () => void;
}) => {
  const { user } = useUser();
  const {
    entity,
    userDownvotedEntity,
    userUpvotedEntity,
    upvoteEntity,
    removeEntityUpvote,
    downvoteEntity,
    removeEntityDownvote,
  } = useEntity();

  const upvotesCount = entity?.upvotes.length || 0;
  const downvotesCount = entity?.downvotes.length || 0;

  const handleUpvote = () => {
    if (!user) return toast("Please login first");
    if (userUpvotedEntity) {
      removeEntityUpvote?.();
    } else {
      upvoteEntity?.();
    }
  };

  const handleDownvote = () => {
    if (!user) return toast("Please login first");

    if (userDownvotedEntity) {
      removeEntityDownvote?.();
    } else {
      downvoteEntity?.();
    }
  };

  return (
    <div className="bg-white p-4 mb-4 rounded-xl shadow-lg">
      {/* Post Content */}
      <p className="text-lg font-bold text-gray-800">{entity?.referenceId}</p>
      <p className="text-gray-600 mt-2">{entity?.content}</p>

      {/* Voting Section */}
      <div className="grid grid-cols-2 gap-2 items-center mt-4">
        {/* Upvote Button */}
        <Button
          onClick={handleUpvote}
          size="sm"
          className={cn(
            "cursor-pointer text-xs",
            userUpvotedEntity
              ? "bg-green-500 hover:bg-green-500  text-white"
              : "bg-gray-200 hover:bg-gray-200 text-gray-800"
          )}
        >
          {userUpvotedEntity ? "Upvoted" : "Upvote"}
          <span>({upvotesCount})</span>
        </Button>

        {/* Downvote Button */}
        <Button
          onClick={handleDownvote}
          size="sm"
          className={cn(
            "cursor-pointer text-xs",
            userDownvotedEntity
              ? "bg-red-500 hover:bg-red-500 text-white"
              : "bg-gray-200 hover:bg-gray-200 text-gray-800"
          )}
        >
          {userDownvotedEntity ? "Downvoted" : "Downvote"}
          <span>({downvotesCount})</span>
        </Button>
      </div>

      {/* Open Discussion Button */}
      <Button
        onClick={handleOpenDiscussionSheet}
        className="w-full mt-4 cursor-pointer"
      >
        Open Discussion{" "}
        {(entity?.repliesCount || 0) > 0 && `(${entity?.repliesCount})`}
      </Button>
    </div>
  );
};

export default SinglePost;

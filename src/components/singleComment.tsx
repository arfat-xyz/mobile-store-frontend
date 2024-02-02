import { IComment } from "../types/productTypes";

const SingleComment = ({ comment }: { comment: IComment }) => {
  const date = new Date(comment?.createdAt);
  return (
    <div className="mx-auto my-8 flex max-w-screen-sm rounded-xl border border-gray-100 p-4 text-left text-gray-600 shadow-lg sm:p-8">
      <img
        className="mr-5 block h-8 w-8 object-fill rounded-full text-left align-middle sm:h-16 sm:w-16"
        src={comment?.user?.image}
        alt="Profile Picture"
      />
      <div className="w-full text-left">
        <div className="mb-2 flex flex-col justify-between text-gray-600 sm:flex-row">
          <h3 className="font-medium">Diana Anderson</h3>
          <span className="text-xs">
            {date.toLocaleDateString() +
              "  " +
              date.getHours() +
              ":" +
              date.getMinutes()}
          </span>
        </div>
        <p className="text-sm">{comment?.comment}</p>
      </div>
    </div>
  );
};

export default SingleComment;

import { CopyPlus, Pencil, Search, TrashIcon } from "lucide-react";
import React from "react";

const posts = [
  {
    id: 1,
    title: "Daily Meeting Schedule with Stakeholders",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et...",
  },
  {
    id: 2,
    title: "Daily Meeting Schedule with Stakeholders",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et...",
  },
  {
    id: 3,
    title: "Daily Meeting Schedule with Stakeholders",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et...",
  },
  {
    id: 4,
    title: "Daily Meeting Schedule with Stakeholders",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et...",
  },
  {
    id: 5,
    title: "Daily Meeting Schedule with Stakeholders",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et...",
  },
];

const ManagePosts: React.FC = () => {
  return (
    <div className=" bg-[#020816] text-white px-4 md:px-10 xl:px-20 py-20 xl:py-20  font-blauer">
      <div className=" xl:max-w-[1740px] mx-auto space-y-5">
        <div className="space-y-2">
          <h1 className="text-[20px] md:text-3xl font-semibold ">Manage Posts</h1>
          <p className="text-[#A2A2A2] font-blauer text-xs md:text-base">
            View, edit, and manage all your blog posts.
          </p>
        </div>

        <div className="flex flex-col-reverse md:flex-row justify-between gap-4">
          {/* LEFT SIDE COLUMN */}
          <div className="border-[1.5px] md:w-[70%] border-[#2a354e] rounded-[20px] p-4 lg:p-8">
            <div className="flex justify-between w-full items-center mb-6">
              <div className="flex justify-between w-full">
                <h2 className="text-lg md:text-[22px] font-blauer font-medium">
                  All Posts
                </h2>
              </div>
            </div>

            {/* ALL POSTS HERE */}
            <div className="space-y-8 md:space-y-4">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="flex flex-col md:flex-row md:items-center justify-between rounded-lg py-4 md:p-4 space-y-4 md:space-y-0 md:border-none border-b-2 border-[#161C2A] "
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-2">
                    {/* IMAGE HERE */}
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-[18px] mr-4"></div>
                    <div className="flex-1 md:max-w-[70%] space-y-2 md:space-y-3 xl:space-y-1">
                      <h3 className="text-[14px] md:text-base lg:text-lg font-extrabold font-blauer line-clamp-1 leading-[1.2] md:leading-[1.2] lg:leading-[1.2] tracking-[0.3px]">
                        {post.title}
                      </h3>
                      <p className="text-[#A2A2A2] text-[10px] lg:text-[13px]">
                        {post.content}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <button className="text-red-500 hover:underline flex items-center gap-[3px] text-[8px] lg:text-[11px] font-blauer font-medium tracking-[1.2px]">
                      <TrashIcon className="w-[10px] md:w-3 h-4 md:mb-[3px]" />
                      DELETE
                    </button>
                    <button className="text-white hover:underline flex items-center gap-[3px] text-[8px] lg:text-[11px] font-blauer font-medium tracking-[1.2px]">
                      <Pencil className="w-[10px] md:w-3 h-4 md:mb-[3px]" />
                      EDIT
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE COLUMN */}
          <div className="flex flex-col items-center space-y-5 md:w-[30%]">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search here..."
                className="bg-transparent text-[#A2A2A2] text-sm md:text-base border-[1.5px] w-full font-blauer border-[#2a354e] rounded-xl px-6 py-3 pl-10 focus:outline-none"
              />
              <Search className="absolute top-3 left-3 w-6 h-6 text-[#2a354e]" />
            </div>
            <button className="flex flex-col space-y-3 items-center justify-center md:h-[30%] bg-transparent text-white border-[1.5px] w-full border-[#2a354e] rounded-xl px-6 py-2 focus:outline-none">
              <CopyPlus className="w-8 md:w-12 h-8 md:h-12 text-[#A2A2A2]" />
              <span className="font-blauer text-sm md:text-base text-[#A2A2A2]">
                Create New Post
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagePosts;

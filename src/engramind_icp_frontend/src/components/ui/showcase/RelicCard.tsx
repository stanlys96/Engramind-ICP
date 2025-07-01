import { Star, Users } from 'lucide-react';
import Image from 'next/image';

export const RelicCard = ({
  title,
  tags,
  image,
  creator,
  followers,
  rating,
}: {
  title: string;
  tags: string[];
  image: string;
  creator: string;
  followers: string | number;
  rating: string | number;
}) => (
  <div className=" dark:bg-neutral-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-4 hover hover:shadow-lg shadow-none transition-all duration-300 hover:border-purple-500">
    <Image
      src={image}
      width={400}
      height={300}
      alt={title}
      className="rounded-md w-full h-48 object-cover mb-4"
    />
    <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
    <div className="flex flex-wrap gap-2 my-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center justify-center text-xs font-medium text-white bg-purple-500 rounded-full px-3 py-1"
        >
          {tag}
        </span>
      ))}
    </div>
    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </p>
    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
      created by
    </div>
    <div className="flex justify-between items-center text-sm">
      <span className="text-purple-700 dark:text-purple-400 flex items-center text-xs">
        <Image
          height={200}
          width={200}
          src={image}
          alt={title}
          className="rounded-full w-4 h-4 mr-1"
        />
        {creator}
      </span>
      <div className="flex gap-3">
        <span className="flex text-purple-600 items-center">
          <Users className="text-purple-600 h-4" />
          {followers}
        </span>
        <span className="text-green-600 flex items-center">
          <Star className="text-green-600 fill-green-600 h-4" /> {rating}
        </span>
      </div>
    </div>
  </div>
);

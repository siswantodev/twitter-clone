import { SparklesIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import Input from './Input';
import Post from './Post';

export default function Feed() {
   const [posts, setPosts] = useState([]);

   useEffect(
      () =>
         onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')), (snapshot) => {
            setPosts(snapshot.docs);
         }),
      []
   );

   console.log(posts);

   return (
      <div className='xl:ml-[370px] border-r border-l border-gray-200 xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl'>
         <div className='flex sticky py-2 px-3 top-0 z-50 bg-white border-b border-gray-200'>
            <h2 className='text-lg sm:text-xl font-bold cursor-pointer'>Home</h2>
            <div className='hoverEffect flex items-center justify-center px-0 ml-auto w-9 h-9'>
               <SparklesIcon className='h-5' />
            </div>
         </div>

         <Input />
         {posts.map((post) => (
            <Post key={post.id} post={post} />
         ))}
      </div>
   );
}
